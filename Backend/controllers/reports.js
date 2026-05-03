const LabReport = require('../models/LabReport');
const Patient = require('../models/Patient');

// @desc    Get all lab reports for logged in patient
// @route   GET /api/reports
// @access  Private
exports.getReports = async (req, res, next) => {
  try {
    let patient = await Patient.findOne({ user: req.user._id });
    if (!patient) {
      patient = await Patient.create({ user: req.user._id });
    }

    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient profile not found' });
    }

    const reports = await LabReport.find({ patient: patient._id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get single report
// @route   GET /api/reports/:id
// @access  Private
exports.getReport = async (req, res, next) => {
  try {
    const report = await LabReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
