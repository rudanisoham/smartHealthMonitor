const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

// @desc    Get all appointments for logged in patient
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res, next) => {
  try {
    let query;

    // If user is patient, only show their appointments
    if (req.user.role === 'PATIENT') {
      let patient = await Patient.findOne({ user: req.user._id });
      if (!patient) {
        patient = await Patient.create({ user: req.user._id });
      }
      query = Appointment.find({ patient: patient._id });
    } else if (req.user.role === 'DOCTOR') {
      // Doctor logic can be added here
      query = Appointment.find({ doctor: req.user.id });
    } else {
      query = Appointment.find();
    }

    const appointments = await query.populate({
      path: 'doctor',
      populate: { path: 'user', select: 'fullName' }
    }).populate({
      path: 'patient',
      populate: { path: 'user', select: 'fullName' }
    });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'fullName' }
      })
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName' }
      });

    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res, next) => {
  try {
    console.log('createAppointment - user:', req.user?.email, '| body:', JSON.stringify(req.body));

    let patientId;

    // If Receptionist or Admin is creating this for a patient
    if (['RECEPTIONIST', 'ADMIN'].includes(req.user.role)) {
      if (!req.body.patient) {
        return res.status(400).json({ success: false, error: 'Patient ID is required when booking as staff' });
      }
      
      // req.body.patient could be a Patient document ID or a User document ID.
      // We need the Patient document ID.
      let patientDoc = await Patient.findById(req.body.patient);
      if (!patientDoc) {
        // Fallback: If they sent a User ID, find the Patient profile for it
        patientDoc = await Patient.findOne({ user: req.body.patient });
      }
      if (!patientDoc) {
        return res.status(404).json({ success: false, error: 'Patient profile not found for the selected user' });
      }
      patientId = patientDoc._id;
    } 
    // If a Patient is booking for themselves
    else {
      let patient = await Patient.findOne({ user: req.user._id });
      if (!patient) {
        console.log('No patient profile found - auto-creating for:', req.user.email);
        patient = await Patient.create({ user: req.user._id });
      }
      patientId = patient._id;
    }

    const { doctor, preferredDate, preferredDateNote, notes, status, department } = req.body;

    // Build appointment document explicitly
    const appointmentDoc = {
      patient: patientId,
      status: status || 'AWAITING_ASSIGNMENT',
      notes: notes || '',
      preferredDateNote: preferredDateNote || '',
    };

    if (doctor) appointmentDoc.doctor = doctor;
    if (preferredDate) appointmentDoc.preferredDate = new Date(preferredDate);
    if (department) appointmentDoc.department = department;

    // If created by reception, mark it
    if (['RECEPTIONIST', 'ADMIN'].includes(req.user.role)) {
      appointmentDoc.assignedByReception = true;
    }

    const appointment = await Appointment.create(appointmentDoc);
    console.log('Appointment created:', appointment._id);

    res.status(201).json({ success: true, data: appointment });
  } catch (err) {
    console.error('createAppointment ERROR:', err.message);
    res.status(400).json({ success: false, error: err.message });
  }
};

