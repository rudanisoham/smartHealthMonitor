const LabReport = require('../models/LabReport');
const Patient = require('../models/Patient');

// @desc    Get all lab reports (or for logged in patient)
// @route   GET /api/reports
// @access  Private
exports.getReports = async (req, res, next) => {
  try {
    let reports = [];

    if (['ADMIN', 'DOCTOR', 'MEDICAL_STAFF', 'LAB_STAFF'].includes(req.user.role)) {
      // Staff sees all reports
      reports = await LabReport.find()
        .populate({ path: 'patient', populate: { path: 'user', select: 'fullName' } })
        .sort('-createdAt');
    } else {
      // Patient sees their own
      let patient = await Patient.findOne({ user: req.user._id });
      if (!patient) {
        patient = await Patient.create({ user: req.user._id });
      }
      reports = await LabReport.find({ patient: patient._id })
        .populate({ path: 'patient', populate: { path: 'user', select: 'fullName' } })
        .sort('-createdAt');
    }

    // Format data for frontend components to consume easily
    const formattedReports = reports.map(r => ({
      _id: r._id,
      patient: r.patient?.user?.fullName || 'Unknown Patient',
      title: r.title,
      type: r.reportType || 'OTHER',
      date: r.createdAt ? new Date(r.createdAt).toISOString().split('T')[0] : 'N/A',
      status: r.status,
      doctor: r.doctorComments ? 'Reviewed' : 'Pending',
      results: r.results
    }));

    res.status(200).json({
      success: true,
      count: formattedReports.length,
      data: formattedReports,
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

// @desc    Upload a new lab/medical report
// @route   POST /api/reports
// @access  Private (Medical/Lab/Admin)
exports.createReport = async (req, res, next) => {
  try {
    const { patientId, reportType, reportDate, notes, title } = req.body;
    
    // Support either a User ID or a Patient document ID
    let patientDoc = await Patient.findById(patientId);
    if (!patientDoc) {
      patientDoc = await Patient.findOne({ user: patientId });
    }
    if (!patientDoc) {
      return res.status(404).json({ success: false, error: 'Patient profile not found' });
    }

    // Determine type mapping since enum is strict
    const typeMapping = {
      'Blood Test': 'BLOOD_TEST',
      'CBC': 'BLOOD_TEST',
      'Glucose': 'BLOOD_TEST',
      'Lipid': 'BLOOD_TEST',
      'Thyroid': 'BLOOD_TEST',
      'Radiology': 'X_RAY',
      'Cardiology': 'ECG',
      'ECG': 'ECG',
      'Urine Analysis': 'URINE_TEST',
      'Urine': 'URINE_TEST',
      'Pathology': 'OTHER',
      'Other': 'OTHER'
    };

    const enumType = typeMapping[reportType] || 'OTHER';

    const report = await LabReport.create({
      patient: patientDoc._id,
      title: title || `${reportType || 'Medical'} Report`,
      reportType: enumType,
      results: notes || '',
      uploadedBy: req.user.fullName,
      status: req.body.status || 'REVIEWED', // Auto-reviewed for staff uploads, PENDING for doctor requests
      createdAt: reportDate ? new Date(reportDate) : Date.now()
    });

    res.status(201).json({ success: true, data: report });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update/Upload lab report result
// @route   PUT /api/reports/:id
// @access  Private (Lab Staff)
exports.updateReport = async (req, res, next) => {
  try {
    const { results, status, filePath } = req.body;
    let report = await LabReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }

    report.results = results || report.results;
    report.status = status || report.status;
    if (filePath) report.filePath = filePath;
    report.uploadedBy = req.user.fullName;

    await report.save();

    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
