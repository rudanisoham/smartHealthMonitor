const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// @desc    Get reception dashboard stats
// @route   GET /api/reception/dashboard
// @access  Private/Receptionist
exports.getDashboard = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Only count users who have a Patient profile AND are actually role PATIENT AND not a doctor
    const User = require('../models/User');
    const Doctor = require('../models/Doctor');
    const doctors = await Doctor.find().select('user');
    const doctorUserIds = doctors.map(d => d.user.toString());
    
    const patientUsers = await User.find({ 
      role: 'PATIENT',
      _id: { $nin: doctorUserIds }
    }).select('_id');
    const patientUserIds = patientUsers.map(u => u._id);
    const patientProfiles = await Patient.find({ user: { $in: patientUserIds } }).populate('user', 'fullName');
    const totalPatients = patientProfiles.filter(p => {
      const name = (p.user?.fullName || '').toLowerCase();
      return !name.includes('admin') && 
             !name.includes('doctor') && 
             !name.includes('dr.') && 
             !name.includes('dr ') && 
             !name.includes('receptionist') && 
             !name.includes('staff') && 
             !name.includes('lab');
    }).length;
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({
      status: { $in: ['AWAITING_ASSIGNMENT', 'PENDING'] }
    });
    
    // Count today's appointments
    const todaysAppointments = await Appointment.countDocuments({
      $or: [
        { scheduledAt: { $gte: today, $lt: tomorrow } },
        { createdAt: { $gte: today, $lt: tomorrow }, scheduledAt: { $exists: false } }
      ]
    });

    // Get pending queue (top 5)
    const pendingQueueRaw = await Appointment.find({
      status: { $in: ['AWAITING_ASSIGNMENT', 'PENDING'] }
    })
    .populate({
      path: 'patient',
      populate: { path: 'user', select: 'fullName email' }
    })
    .sort({ createdAt: -1 })
    .limit(5);

    const pendingQueue = pendingQueueRaw.map(app => ({
      _id: app._id,
      name: app.patient?.user?.fullName || 'Unknown',
      email: app.patient?.user?.email || '',
      time: app.createdAt ? new Date(app.createdAt).toLocaleTimeString() : 'N/A',
      dept: app.department || 'General' // assuming department exists on appointment, or mock it
    }));

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalPatients,
          totalAppointments,
          pendingAppointments,
          todaysAppointments
        },
        pendingQueue
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get reception appointments
// @route   GET /api/reception/appointments
// @access  Private/Receptionist
exports.getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'fullName' }
      })
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName' }
      })
      .sort({ createdAt: -1 });

    const formattedAppointments = appointments.map(app => ({
      _id: app._id,
      patient: app.patient?.user?.fullName || 'Unknown Patient',
      doctor: app.doctor?.user?.fullName || 'Not Assigned',
      dept: app.doctor?.department || 'General',
      date: app.scheduledAt ? new Date(app.scheduledAt).toLocaleDateString() : new Date(app.createdAt).toLocaleDateString(),
      time: app.scheduledAt ? new Date(app.scheduledAt).toLocaleTimeString() : new Date(app.createdAt).toLocaleTimeString(),
      status: app.status
    }));

    res.status(200).json({ success: true, data: formattedAppointments });
  } catch (err) {
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
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }

    // Generate token number
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Appointment.countDocuments({
      doctor: doctorId,
      scheduledAt: { $gte: today }
    });

    appointment.doctor = doctorId;
    appointment.scheduledAt = new Date(scheduledAt);
    appointment.status = 'SCHEDULED';
    appointment.assignedByReception = true;
    appointment.tokenNumber = todayCount + 1;

    await appointment.save();

    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get patients list for reception
// @route   GET /api/reception/patients
// @access  Private/Receptionist
exports.getPatients = async (req, res, next) => {
  try {
    const User = require('../models/User');
    const Doctor = require('../models/Doctor');
    
    // 1. Get all doctor user IDs to exclude them
    const doctors = await Doctor.find().select('user');
    const doctorUserIds = doctors.map(d => d.user.toString());

    // 2. Find all users with role 'PATIENT' AND not in doctor list
    const patientUsers = await User.find({ 
      role: 'PATIENT',
      _id: { $nin: doctorUserIds }
    }).select('_id');
    const patientUserIds = patientUsers.map(u => u._id);

    // 3. Find profiles for these users
    const validPatients = await Patient.find({ user: { $in: patientUserIds } })
      .populate('user', 'fullName email phone role')
      .sort({ createdAt: -1 });

    const formattedPatients = validPatients
      .filter(p => {
        const name = (p.user?.fullName || '').toLowerCase();
        return !name.includes('admin') && 
               !name.includes('doctor') && 
               !name.includes('dr.') && 
               !name.includes('dr ') && 
               !name.includes('receptionist') && 
               !name.includes('staff') && 
               !name.includes('lab');
      })
      .map(p => ({
        _id: p._id,
        id: p._id.toString().slice(-6).toUpperCase(),
        name: p.user?.fullName || 'Unknown',
        email: p.user?.email || '',
        phone: p.user?.phone || '',
      }));

    res.status(200).json({ success: true, data: formattedPatients });
  } catch (err) {
    console.error('Error fetching reception patients:', err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all doctors for assignment
// @route   GET /api/reception/doctors
// @access  Private/Receptionist
exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ isApproved: true })
      .populate('user', 'fullName email')
      .sort({ specialty: 1 });

    const formattedDoctors = doctors.map(d => ({
      _id: d._id,
      name: d.user?.fullName || 'Unknown',
      specialty: d.specialty,
      dept: d.department || d.specialty,
      availableDays: d.availableDays?.join(', ') || 'Not specified',
    }));

    res.status(200).json({ success: true, data: formattedDoctors });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update patient record
// @route   PUT /api/reception/patients/:id
// @access  Private/Receptionist
exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }

    // Update patient fields
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('user', 'fullName email phone');

    res.status(200).json({ success: true, data: updatedPatient });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete patient record
// @route   DELETE /api/reception/patients/:id
// @access  Private/Receptionist
exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }

    // Optional: Delete the user account as well
    const User = require('../models/User');
    await User.findByIdAndDelete(patient.user);
    await Patient.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get dynamic bed occupancy stats
// @route   GET /api/reception/beds
// @access  Private/Receptionist
exports.getBedStats = async (req, res, next) => {
  try {
    const Department = require('../models/Department');
    const Admission = require('../models/Admission');
    
    const departments = await Department.find();
    
    const bedStats = await Promise.all(departments.map(async (dept) => {
      const occupiedCount = await Admission.countDocuments({ 
        department: dept._id,
        status: 'ADMITTED'
      });
      
      return {
        _id: dept._id,
        name: dept.name,
        occupied: occupiedCount,
        total: dept.totalBeds || 10,
        critical: Math.floor(occupiedCount * 0.2)
      };
    }));

    res.status(200).json({ success: true, data: bedStats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all billing and collections
// @route   GET /api/reception/billing
// @access  Private/Receptionist
exports.getBilling = async (req, res, next) => {
  try {
    const Payment = require('../models/Payment');
    const payments = await Payment.find()
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName' }
      })
      .sort({ createdAt: -1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dailyCollection = payments
      .filter(p => p.createdAt >= today && p.status === 'COMPLETED')
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
          status: p.status || 'PENDING'
        })),
        stats: {
          dailyCollection,
          pendingCount
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
