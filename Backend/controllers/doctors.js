const ErrorResponse = require('../utils/errorResponse');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const User = require('../models/User');
const LabReport = require('../models/LabReport');

// @desc    Get doctor dashboard stats
// @route   GET /api/doctors/dashboard
// @access  Private/Doctor
exports.getDashboard = async (req, res, next) => {
  try {
    let doctor = await Doctor.findOne({ user: req.user.id })
      .populate('user', 'fullName email')
      .populate('department', 'name');

    // If doctor profile doesn't exist but user is DOCTOR, create a basic one
    if (!doctor && req.user.role === 'DOCTOR') {
      doctor = await Doctor.create({
        user: req.user.id,
        specialty: 'General',
        licenseNumber: 'PENDING-' + req.user.id.toString().substring(0, 6)
      });
      doctor = await Doctor.findById(doctor._id).populate('user', 'fullName email').populate('department', 'name');
    }

    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor profile not found' });
    }

    // Get appointments
    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName email' }
      })
      .sort({ scheduledAt: -1, createdAt: -1 });

    const totalAppointments = appointments.length;
    const pendingAppointments = appointments.filter(a => ['SCHEDULED', 'AWAITING_ASSIGNMENT'].includes(a.status)).length;
    const confirmedAppointments = appointments.filter(a => a.status === 'IN_PROGRESS').length;

    const recentAppointments = appointments.slice(0, 5).map(a => ({
      id: a._id,
      patient: a.patient?.user?.fullName || 'Unknown Patient',
      time: a.scheduledAt ? new Date(a.scheduledAt).toLocaleString() : new Date(a.createdAt).toLocaleString(),
      note: a.notes || '',
      status: a.status
    }));

    // Get Lab reports count
    const pendingReports = await LabReport.countDocuments({ 
      patient: { $in: appointments.map(a => a.patient?._id).filter(id => id) },
      status: 'PENDING'
    });

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalAppointments,
          pending: pendingAppointments,
          confirmed: confirmedAppointments,
          pendingReports
        },
        profile: {
          fullName: doctor.user.fullName,
          email: doctor.user.email,
          specialty: doctor.specialty,
          licenseNumber: doctor.licenseNumber,
          department: doctor.department?.name || 'Not Assigned',
          experience: doctor.experience || 0
        },
        recentAppointments
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get doctor profile
// @route   GET /api/doctors/profile
// @access  Private/Doctor
exports.getDoctorProfile = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id }).populate('user', 'fullName email phone');

    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor profile not found' });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create doctor profile
// @route   POST /api/doctors
// @access  Private/Doctor
exports.createDoctorProfile = async (req, res, next) => {
  try {
    let doctor = await Doctor.findOne({ user: req.user.id });

    if (doctor) {
      return res.status(400).json({ success: false, error: 'Doctor profile already exists' });
    }

    req.body.user = req.user.id;
    doctor = await Doctor.create(req.body);

    res.status(201).json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/profile
// @access  Private/Doctor
exports.updateDoctorProfile = async (req, res, next) => {
  try {
    let doctor = await Doctor.findOne({ user: req.user.id });

    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor profile not found' });
    }

    // Don't allow changing user reference
    delete req.body.user;

    doctor = await Doctor.findOneAndUpdate({ user: req.user.id }, req.body, {
      new: true,
      runValidators: true
    }).populate('user', 'fullName email phone');

    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get doctor appointments
// @route   GET /api/doctors/appointments
// @access  Private/Doctor
exports.getDoctorAppointments = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor profile not found' });
    }

    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName email phone' }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get doctor patients (Improved to include anyone with an appointment)
// @route   GET /api/doctors/patients
// @access  Private/Doctor
exports.getDoctorPatients = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor profile not found' });
    }

    // Find patients who have appointments with this doctor
    const appointments = await Appointment.find({ doctor: doctor._id }).distinct('patient');
    
    // Find patients assigned or who have appointments
    const patients = await Patient.find({
      $or: [
        { assignedDoctor: req.user.id },
        { _id: { $in: appointments } }
      ]
    }).populate('user', 'fullName email phone');

    res.status(200).json({ success: true, data: patients });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get patient details for doctor
// @route   GET /api/doctors/patients/:id
// @access  Private/Doctor
exports.getPatientDetails = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('user', 'fullName email phone');
    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }

    // Get latest vitals
    const Vital = require('../models/Vital');
    const vitals = await Vital.find({ patient: patient._id }).sort({ createdAt: -1 }).limit(1);

    // Get prescriptions
    const Prescription = require('../models/Prescription');
    const prescriptions = await Prescription.find({ patient: patient._id }).sort({ createdAt: -1 });

    // Get lab reports
    const LabReport = require('../models/LabReport');
    const labReports = await LabReport.find({ patient: patient._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        patient,
        latestVitals: vitals[0] || null,
        prescriptions,
        labReports
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create prescription
// @route   POST /api/doctors/prescriptions
// @access  Private/Doctor
exports.createPrescription = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor profile not found' });
    }

    const { patientId, diagnosis, medicines, items, instructions, notes, validUntil, appointmentId } = req.body;

    const Prescription = require('../models/Prescription');
    const prescription = await Prescription.create({
      patient: patientId,
      doctor: doctor._id,
      appointment: appointmentId,
      diagnosis,
      items: items || [], // Structured items from the new UI
      medicinesText: medicines, // Simple text fallback
      notes: notes || instructions,
      validUntil,
      createdAt: Date.now()
    });

    res.status(201).json({ success: true, data: prescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get doctor prescriptions
// @route   GET /api/doctors/prescriptions
// @access  Private/Doctor
exports.getDoctorPrescriptions = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor profile not found' });
    }

    const Prescription = require('../models/Prescription');
    const prescriptions = await Prescription.find({ doctor: doctor._id })
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName email' }
      })
      .populate('items.medicine', 'name category unit')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: prescriptions });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single prescription by ID
// @route   GET /api/doctors/prescriptions/:id
// @access  Private
exports.getPrescriptionById = async (req, res, next) => {
  try {
    const Prescription = require('../models/Prescription');
    const prescription = await Prescription.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName email' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'fullName email' }
      })
      .populate('items.medicine', 'name category unit');

    if (!prescription) {
      return res.status(404).json({ success: false, error: 'Prescription not found' });
    }

    res.status(200).json({ success: true, data: prescription });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get lab reports for doctor
// @route   GET /api/doctors/lab-reports
// @access  Private/Doctor
exports.getLabReports = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor profile not found' });
    }

    const LabReport = require('../models/LabReport');
    // Find reports for patients who have appointments with this doctor
    const appointments = await Appointment.find({ doctor: doctor._id }).distinct('patient');
    
    const reports = await LabReport.find({ patient: { $in: appointments } })
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName' }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update lab report (add comments/review)
// @route   PUT /api/doctors/lab-reports/:id
// @access  Private/Doctor
exports.updateLabReport = async (req, res, next) => {
  try {
    const LabReport = require('../models/LabReport');
    let report = await LabReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }

    report = await LabReport.findByIdAndUpdate(req.params.id, {
      doctorComments: req.body.comments,
      status: 'REVIEWED'
    }, { new: true });

    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
