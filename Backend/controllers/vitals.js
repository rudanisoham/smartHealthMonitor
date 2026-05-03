const Vital = require('../models/Vital');
const Patient = require('../models/Patient');

// @desc    Get all vitals for logged in patient
// @route   GET /api/vitals
// @access  Private
exports.getVitals = async (req, res, next) => {
  try {
    let patient = await Patient.findOne({ user: req.user._id });
    
    if (!patient) {
      patient = await Patient.create({ user: req.user._id });
    }

    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient profile not found' });
    }

    const vitals = await Vital.find({ patient: patient._id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: vitals.length,
      data: vitals,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new vital reading
// @route   POST /api/vitals
// @access  Private
exports.createVital = async (req, res, next) => {
  try {
    let patient = await Patient.findOne({ user: req.user._id });
    
    if (!patient) {
      patient = await Patient.create({ user: req.user._id });
    }

    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient profile not found' });
    }

    // Auto-calculate risk level
    const { heartRate, spo2, bpSystolic, temperature } = req.body;
    let riskLevel = 'LOW';
    if (heartRate && (heartRate < 50 || heartRate > 120)) riskLevel = 'HIGH';
    else if (heartRate && (heartRate < 60 || heartRate > 100)) riskLevel = 'MEDIUM';
    if (spo2 && spo2 < 90) riskLevel = 'HIGH';
    else if (spo2 && spo2 < 95 && riskLevel !== 'HIGH') riskLevel = 'MEDIUM';
    if (bpSystolic && bpSystolic > 150) riskLevel = 'HIGH';
    if (temperature && temperature > 38.5) riskLevel = 'HIGH';
    else if (temperature && temperature > 37.5 && riskLevel !== 'HIGH') riskLevel = 'MEDIUM';

    req.body.patient = patient._id;
    req.body.riskLevel = riskLevel;

    console.log('Saving vital reading:', req.body);
    const vital = await Vital.create(req.body);

    res.status(201).json({
      success: true,
      data: vital,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
