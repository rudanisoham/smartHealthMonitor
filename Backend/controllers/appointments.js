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
// @access  Private (Patient)
exports.createAppointment = async (req, res, next) => {
  try {
    let patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      patient = await Patient.create({ user: req.user._id });
    }

    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient profile not found' });
    }

    req.body.patient = patient._id;
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
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
