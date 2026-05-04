const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// ─── Helper: Get valid patient user IDs (role PATIENT only) ──────────────────
const getPatientUserIds = async () => {
  const users = await User.find({ role: 'PATIENT' }).select('_id');
  return users.map(u => u._id);
};

// ─── Helper: Semantic name filter (exclude staff mis-tagged as patients) ──────
const isActualPatient = (fullName = '') => {
  const n = fullName.toLowerCase();
  return !n.includes('admin') && !n.includes('dr.') && !n.startsWith('dr ') &&
         !n.includes('receptionist') && !n.includes('staff') && !n.includes('lab tech');
};

// @desc    Get reception dashboard stats
// @route   GET /api/reception/dashboard
// @access  Private/Receptionist
exports.getDashboard = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Strict patient count
    const patientUserIds = await getPatientUserIds();
    const patientProfiles = await Patient.find({ user: { $in: patientUserIds } })
      .populate('user', 'fullName');
    const totalPatients = patientProfiles.filter(p => isActualPatient(p.user?.fullName)).length;

    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({
      status: { $in: ['AWAITING_ASSIGNMENT', 'PENDING'] }
    });
    const todaysAppointments = await Appointment.countDocuments({
      $or: [
        { scheduledAt: { $gte: today, $lt: tomorrow } },
        { createdAt: { $gte: today, $lt: tomorrow }, scheduledAt: { $exists: false } }
      ]
    });

    // Pending queue (top 5)
    const pendingQueueRaw = await Appointment.find({
      status: { $in: ['AWAITING_ASSIGNMENT', 'PENDING'] }
    })
    .populate({ path: 'patient', populate: { path: 'user', select: 'fullName email' } })
    .sort({ createdAt: 1 })
    .limit(5);

    const pendingQueue = pendingQueueRaw.map(app => ({
      _id: app._id,
      name: app.patient?.user?.fullName || 'Unknown',
      email: app.patient?.user?.email || '',
      time: app.preferredDateNote || (app.createdAt ? new Date(app.createdAt).toLocaleTimeString() : 'N/A'),
      notes: app.notes || '',
      createdAt: app.createdAt
    }));

    // Bed Occupancy
    const Bed = require('../models/Bed');
    const totalBeds = await Bed.countDocuments();
    const occupiedBeds = await Bed.countDocuments({ status: 'OCCUPIED' });
    const bedOccupancy = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

    res.status(200).json({
      success: true,
      data: {
        stats: { totalPatients, totalAppointments, pendingAppointments, todaysAppointments, bedOccupancy: `${bedOccupancy}%` },
        pendingQueue
      }
    });
  } catch (err) {
    console.error('getDashboard error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get reception appointments (pending + all)
// @route   GET /api/reception/appointments
// @access  Private/Receptionist
exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate({ path: 'doctor', populate: { path: 'user', select: 'fullName' } })
      .populate({ path: 'patient', populate: { path: 'user', select: 'fullName email phone' } })
      .sort({ createdAt: -1 });

    const formatted = appointments.map(app => ({
      _id: app._id,
      patient: app.patient?.user?.fullName || 'Unknown Patient',
      patientEmail: app.patient?.user?.email || '',
      patientPhone: app.patient?.user?.phone || '',
      bloodGroup: app.patient?.bloodGroup || '',
      doctor: app.doctor?.user?.fullName ? `Dr. ${app.doctor.user.fullName}` : 'Not Assigned',
      dept: app.doctor?.specialty || 'General',
      date: app.scheduledAt ? new Date(app.scheduledAt).toLocaleDateString() : new Date(app.createdAt).toLocaleDateString(),
      time: app.scheduledAt ? new Date(app.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—',
      scheduledAt: app.scheduledAt,
      status: app.status,
      notes: app.notes || '',
      preferredDateNote: app.preferredDateNote || '',
      tokenNumber: app.tokenNumber || null,
      createdAt: app.createdAt
    }));

    const pending = formatted.filter(a => a.status === 'AWAITING_ASSIGNMENT' || a.status === 'PENDING');

    res.status(200).json({ success: true, data: { all: formatted, pending } });
  } catch (err) {
    console.error('getAppointments error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Assign doctor to appointment
// @route   PUT /api/reception/appointments/:id/assign
// @access  Private/Receptionist
exports.assignAppointment = async (req, res, next) => {
  try {
    const { doctorId, scheduledAt } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ success: false, error: 'Appointment not found' });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ success: false, error: 'Doctor not found' });

    // Generate token number (sequential per doctor per day)
    const dayStart = new Date(scheduledAt);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    const todayCount = await Appointment.countDocuments({
      doctor: doctorId,
      scheduledAt: { $gte: dayStart, $lt: dayEnd }
    });

    appointment.doctor = doctorId;
    appointment.scheduledAt = new Date(scheduledAt);
    appointment.status = 'SCHEDULED';
    appointment.assignedByReception = true;
    appointment.tokenNumber = todayCount + 1;
    await appointment.save();

    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    console.error('assignAppointment error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Cancel an appointment
// @route   PUT /api/reception/appointments/:id/cancel
// @access  Private/Receptionist
exports.cancelAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ success: false, error: 'Appointment not found' });
    appointment.status = 'CANCELLED';
    await appointment.save();
    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    console.error('cancelAppointment error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get ONLY real patients (role=PATIENT, no name tricks)
// @route   GET /api/reception/patients
// @access  Private/Receptionist
exports.getPatients = async (req, res, next) => {
  try {
    // Step 1: IDs of real PATIENT-role users
    const patientUserIds = await getPatientUserIds();

    // Step 2: Their Patient profiles with department info
    const validPatients = await Patient.find({ user: { $in: patientUserIds } })
      .populate('user', 'fullName email phone role')
      .populate('department', 'name')
      .sort({ createdAt: -1 });

    // Step 3: Semantic guard
    const formattedPatients = validPatients
      .filter(p => isActualPatient(p.user?.fullName))
      .map(p => ({
        _id: p._id,
        userId: p.user?._id,
        id: p._id.toString().slice(-6).toUpperCase(),
        name: p.user?.fullName || 'Unknown',
        email: p.user?.email || '',
        phone: p.user?.phone || p.phone || '',
        bloodGroup: p.bloodGroup || '',
        gender: p.gender || '',
        department: p.department?.name || null,
        departmentId: p.department?._id || null,
      }));

    res.status(200).json({ success: true, data: formattedPatients });
  } catch (err) {
    console.error('getPatients error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update patient record (updates User document)
// @route   PUT /api/reception/patients/:id
// @access  Private/Receptionist
exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, error: 'Patient not found' });

    const { fullName, phone, email } = req.body.user || req.body;

    // Update the User document linked to this patient
    await User.findByIdAndUpdate(patient.user, { fullName, phone, email });

    const updated = await Patient.findById(req.params.id)
      .populate('user', 'fullName email phone');

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('updatePatient error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete patient record + user account
// @route   DELETE /api/reception/patients/:id
// @access  Private/Receptionist
exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, error: 'Patient not found' });

    await User.findByIdAndDelete(patient.user);
    await Patient.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error('deletePatient error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get approved doctors for assignment
// @route   GET /api/reception/doctors
// @access  Private/Receptionist
exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ isApproved: true })
      .populate('user', 'fullName email')
      .populate('department', 'name')
      .sort({ specialty: 1 });

    const formatted = doctors.map(d => ({
      _id: d._id,
      name: d.user?.fullName || 'Unknown',
      specialty: d.specialty,
      department: d.department?.name || d.specialty,
      availableDays: d.availableDays || [],
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (err) {
    console.error('getDoctors error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get dynamic bed occupancy stats per department
// @route   GET /api/reception/beds
// @access  Private/Receptionist
exports.getBedStats = async (req, res, next) => {
  try {
    const Department = require('../models/Department');
    const Admission = require('../models/Admission');

    const departments = await Department.find();
    const bedStats = await Promise.all(departments.map(async dept => {
      let occupied = 0;
      try {
        occupied = await Admission.countDocuments({ department: dept._id, status: 'ADMITTED' });
      } catch (_) {}
      const total = dept.totalBeds || 10;
      const available = Math.max(0, total - occupied);
      const pct = total > 0 ? Math.round((occupied / total) * 100) : 0;
      let status = 'Available';
      if (pct >= 100) status = 'Full';
      else if (pct >= 90) status = 'Critical';
      else if (pct >= 70) status = 'Limited';

      return { _id: dept._id, name: dept.name, occupied, available, total, pct, status };
    }));

    res.status(200).json({ success: true, data: bedStats });
  } catch (err) {
    console.error('getBedStats error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get billing overview (payments list + stats)
// @route   GET /api/reception/billing
// @access  Private/Receptionist
exports.getBilling = async (req, res, next) => {
  try {
    const Payment = require('../models/Payment');
    const payments = await Payment.find()
      .populate({ path: 'patient', populate: { path: 'user', select: 'fullName' } })
      .sort({ createdAt: -1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyCollection = payments
      .filter(p => new Date(p.createdAt) >= today && p.status === 'COMPLETED')
      .reduce((acc, p) => acc + (p.amount || 0), 0);

    const pendingCount = payments.filter(p => p.status === 'PENDING').length;

    res.status(200).json({
      success: true,
      data: {
        payments: payments.map(p => ({
          _id: p._id,
          id: p._id.toString().slice(-8).toUpperCase(),
          patient: p.patient?.user?.fullName || 'Unknown',
          amount: p.amount || 0,
          date: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A',
          method: p.method || 'N/A',
          status: p.status || 'PENDING',
          description: p.description || ''
        })),
        stats: { dailyCollection, pendingCount }
      }
    });
  } catch (err) {
    console.error('getBilling error:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
