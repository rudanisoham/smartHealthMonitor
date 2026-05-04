const LabReport = require('../models/LabReport');
const LabTest = require('../models/LabTest');

// @desc    Get lab dashboard stats
// @route   GET /api/lab/dashboard
// @access  Private/Lab
exports.getDashboard = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalTestsCollected = await LabReport.countDocuments();
    const pendingTests = await LabReport.countDocuments({ status: { $in: ['PENDING', 'IN_PROGRESS'] } });
    const reportsReady = await LabReport.countDocuments({ status: 'REVIEWED' });

    const recentRequestsRaw = await LabReport.find({ status: { $in: ['PENDING', 'IN_PROGRESS'] } })
      .populate({ path: 'patient', populate: { path: 'user', select: 'fullName' } })
      .populate({ path: 'requestedBy', select: 'fullName' })
      .sort({ createdAt: -1 })
      .limit(20);

    const recentRequests = recentRequestsRaw.map(r => ({
      _id: r._id,
      patient: r.patient?.user?.fullName || 'Unknown',
      doctorName: r.requestedBy?.fullName || 'Unknown',
      test: r.reportType || 'OTHER',
      testTitle: r.title,
      priority: 'Normal',
      status: r.status,
      createdAt: r.createdAt,
      results: r.results || ''
    }));

    res.status(200).json({
      success: true,
      data: {
        stats: {
          samplesCollected: totalTestsCollected,
          pendingTests,
          reportsReady,
          turnaroundTime: '4.2h' // Mock dynamic calculation for now
        },
        recentRequests
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all lab tests catalog
// @route   GET /api/lab/tests
// @access  Private/Lab
exports.getTests = async (req, res, next) => {
  try {
    const tests = await LabTest.find().sort({ name: 1 });
    
    // Calculate category counts dynamically
    const categoryCounts = await LabTest.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const formattedTests = tests.map(t => ({
      _id: t._id,
      name: t.name,
      category: t.category,
      price: t.price,
      turnaround: t.turnaroundTime,
      stock: t.availability === 'AVAILABLE' ? 'In Stock' : (t.availability === 'LIMITED' ? 'Limited' : 'Out of Stock')
    }));

    const categories = categoryCounts.map(c => ({
      name: c._id,
      count: c.count
    }));

    res.status(200).json({ 
      success: true, 
      data: {
        tests: formattedTests,
        categories
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create a new lab test
// @route   POST /api/lab/tests
// @access  Private/Lab
exports.createTest = async (req, res, next) => {
  try {
    const test = await LabTest.create(req.body);
    res.status(201).json({ success: true, data: test });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get lab history reports
// @route   GET /api/lab/history
// @access  Private/Lab
exports.getHistory = async (req, res, next) => {
  try {
    const reports = await LabReport.find({ status: { $in: ['COMPLETED', 'REVIEWED', 'NORMAL', 'ABNORMAL'] } })
      .populate({ path: 'patient', populate: { path: 'user', select: 'fullName' } })
      .sort({ createdAt: -1 });

    const formattedReports = reports.map(r => ({
      _id: r._id,
      patient: r.patient?.user?.fullName || 'Unknown',
      date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'N/A',
      type: r.title || r.reportType || 'OTHER',
      status: r.status,
      technician: r.uploadedBy || 'System Admin',
      result: r.results || 'N/A',
      filePath: r.filePath || null
    }));

    res.status(200).json({ success: true, data: formattedReports });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
