const Patient = require('../models/Patient');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private (Admin, Doctor, Receptionist)
exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().populate({
      path: 'user',
      match: { role: 'PATIENT' },
      select: 'fullName email phone role'
    });

    // Filter out patients where the linked user doesn't match the role 'PATIENT'
    const filteredPatients = patients.filter(p => p.user !== null);

    res.status(200).json({
      success: true,
      count: filteredPatients.length,
      data: filteredPatients,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private
exports.getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('user', 'fullName email phone');

    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Create new patient
// @route   POST /api/patients
// @access  Private (Receptionist)
exports.createPatient = async (req, res, next) => {
  try {
    // Check if user exists
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const patient = await Patient.create(req.body);

    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get current patient profile
// @route   GET /api/patients/me
// @access  Private
exports.getPatientMe = async (req, res, next) => {
  try {
    let patient = await Patient.findOne({ user: req.user._id }).populate('user', 'fullName email phone');

    if (!patient) {
      // Auto-create missing profile for any authenticated user accessing patient routes
      patient = await Patient.create({ user: req.user._id });
      patient = await Patient.findById(patient._id).populate('user', 'fullName email phone');
    }

    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient profile not found' });
    }

    // Check for active bed assignment (New System)
    const Bed = require('../models/Bed');
    let currentBed = null;
    try {
      currentBed = await Bed.findOne({ 
        patient: patient._id, 
        status: 'OCCUPIED' 
      }).populate('department', 'name');
    } catch (bedErr) {
      console.error('Error fetching bed for patient:', bedErr);
    }

    // Fetch latest lab reports for profile overview
    const LabReport = require('../models/LabReport');
    const recentReports = await LabReport.find({ patient: patient._id })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({
      success: true,
      data: {
        ...patient.toObject(),
        currentBed: currentBed,
        recentReports: recentReports
      },
    });
  } catch (err) {
    console.error('Error in getPatientMe:', err);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

// @desc    Update patient profile
// @route   PUT /api/patients/me
// @access  Private
exports.updatePatientMe = async (req, res, next) => {
  try {
    let patient = await Patient.findOne({ user: req.user.id });

    if (!patient) {
      patient = await Patient.create({ user: req.user.id });
    }

    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient profile not found' });
    }

    patient = await Patient.findByIdAndUpdate(
      patient._id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'fullName email phone');

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get all approved doctors for patients
// @route   GET /api/patients/doctors
// @access  Private (Patient)
exports.getAvailableDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ isApproved: true })
      .populate('user', 'fullName email')
      .populate('department', 'name');

    // Map to include title for frontend compatibility
    const formattedDoctors = doctors.map(doc => {
      const docObj = doc.toObject();
      if (docObj.department) {
        docObj.department.title = docObj.department.name;
      }
      return docObj;
    });

    res.status(200).json({
      success: true,
      count: formattedDoctors.length,
      data: formattedDoctors,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get single doctor profile for patients
// @route   GET /api/patients/doctors/:id
// @access  Private (Patient)
exports.getDoctorProfile = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'fullName email phone')
      .populate('department', 'name');

    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }

    const docObj = doctor.toObject();
    if (docObj.department) {
      docObj.department.title = docObj.department.name;
    }

    res.status(200).json({
      success: true,
      data: docObj,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get my prescriptions
// @route   GET /api/patients/prescriptions
// @access  Private (Patient)
exports.getMyPrescriptions = async (req, res, next) => {
  try {
    let patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      patient = await Patient.create({ user: req.user._id });
    }

    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient profile not found' });
    }

    const Prescription = require('../models/Prescription');
    const prescriptions = await Prescription.find({ patient: patient._id })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'fullName' }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get billing data
// @route   GET /api/patients/billing
// @access  Private (Patient)
exports.getBillingData = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient profile not found' });
    }

    const Admission = require('../models/Admission');
    const LabReport = require('../models/LabReport');
    const Appointment = require('../models/Appointment');
    const Payment = require('../models/Payment');

    // 1. Calculate Bed Costs
    const admissions = await Admission.find({ patient: patient._id }).populate('bed');
    let totalBedCost = 0;
    let stayDays = 0;
    admissions.forEach(adm => {
      const start = new Date(adm.admittedAt);
      const end = adm.dischargedAt ? new Date(adm.dischargedAt) : new Date();
      const diffTime = Math.abs(end - start);
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      stayDays += days;
      totalBedCost += days * (adm.bed?.dailyRate || 0);
    });

    // 2. Calculate Lab Costs
    const labReports = await LabReport.find({ patient: patient._id });
    const totalLabCost = labReports.length * 350; // Flat rate for now or fetch from LabTest

    // 3. Calculate Appointment Costs
    const appointments = await Appointment.find({ patient: patient._id, status: 'COMPLETED' });
    const totalConsultCost = appointments.length * 500;

    // 4. Fetch Payments (Credits)
    const payments = await Payment.find({ patient: patient._id }).sort({ createdAt: -1 });
    const totalPaid = payments.filter(p => p.status === 'COMPLETED').reduce((acc, p) => acc + p.amount, 0);

    const totalDues = totalBedCost + totalLabCost + totalConsultCost;
    const balance = totalDues - totalPaid;

    res.status(200).json({
      success: true,
      data: {
        totalBedCost,
        totalLabCost,
        totalConsultCost,
        totalPaid,
        balance,
        stayDays,
        labReports,
        payments
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
