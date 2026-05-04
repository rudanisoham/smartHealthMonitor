const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Department = require('../models/Department');
const SystemLog = require('../models/SystemLog');
const Feedback = require('../models/Feedback');
const Review = require('../models/Review');
const SystemSetting = require('../models/SystemSetting');
const Message = require('../models/Message');
const Admission = require('../models/Admission');
const Payment = require('../models/Payment');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboard = async (req, res, next) => {
  try {
    const totalPatients = await Patient.countDocuments();
    
    // Split doctor counts
    const allDoctors = await User.find({ role: 'DOCTOR' });
    let verifiedDoctors = 0;
    let pendingDoctors = 0;

    for (const docUser of allDoctors) {
      const profile = await Doctor.findOne({ user: docUser._id });
      if (profile && profile.isApproved) {
        verifiedDoctors++;
      } else {
        pendingDoctors++;
      }
    }
    
    const totalAppointments = await Appointment.countDocuments();
    const totalDepartments = await Department.countDocuments();

    // Chart data for Reports page
    const totalNodes = totalPatients + verifiedDoctors + totalDepartments;
    const chartData = {
      patientsPct: totalNodes > 0 ? Math.round((totalPatients / totalNodes) * 100) : 0,
      doctorsPct: totalNodes > 0 ? Math.round((verifiedDoctors / totalNodes) * 100) : 0,
      departmentsPct: totalNodes > 0 ? Math.round((totalDepartments / totalNodes) * 100) : 0,
      totalNodes
    };

    res.status(200).json({
      success: true,
      data: {
        totalPatients,
        totalDoctors: verifiedDoctors,
        pendingDoctors,
        totalAppointments,
        totalDepartments,
        chartData
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get system logs
// @route   GET /api/admin/logs
// @access  Private/Admin
exports.getSystemLogs = async (req, res, next) => {
  try {
    const logs = await SystemLog.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all historical reports/appointments
// @route   GET /api/admin/reports
// @access  Private/Admin
exports.getReports = async (req, res, next) => {
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
      .sort({ scheduledAt: -1, createdAt: -1 });

    const formatted = appointments.map(app => ({
      id: app._id,
      time: app.scheduledAt ? new Date(app.scheduledAt).toLocaleString() : new Date(app.createdAt).toLocaleString(),
      doc: app.doctor?.user?.fullName || 'Unassigned',
      pat: app.patient?.user?.fullName || 'Unknown',
      status: app.status,
      statusColor: app.status === 'CANCELLED' ? '#EF4444' : app.status === 'SCHEDULED' ? '#D97706' : '#475569',
      statusBg: app.status === 'CANCELLED' ? '#FEE2E2' : app.status === 'SCHEDULED' ? '#FEF3C7' : '#F1F5F9'
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get specific report by ID
// @route   GET /api/admin/reports/:id
// @access  Private/Admin
exports.getReportById = async (req, res, next) => {
  try {
    const LabReport = require('../models/LabReport');
    const report = await LabReport.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName' }
      })
      .populate('doctor', 'fullName');
      
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }
    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all doctors
// @route   GET /api/admin/doctors
// @access  Private/Admin
exports.getDoctors = async (req, res, next) => {
  try {
    // Find all users with role DOCTOR
    const doctorUsers = await User.find({ role: 'DOCTOR' });
    
    const doctorDetails = await Promise.all(doctorUsers.map(async (user) => {
      let docProfile = await Doctor.findOne({ user: user._id });
      return {
        _id: user._id,
        name: user.fullName,
        email: user.email,
        phone: user.phone || docProfile?.phone || '—',
        specialty: docProfile?.specialty || 'General',
        department: docProfile?.department || 'General',
        licenseNumber: docProfile?.licenseNumber || 'N/A',
        status: docProfile?.status || (user.isActive ? 'Active' : 'Inactive'),
        isActive: user.isActive,
        isApproved: docProfile?.isApproved || false
      };
    }));

    res.status(200).json({ success: true, data: doctorDetails });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get pending doctors
// @route   GET /api/admin/doctors/pending
// @access  Private/Admin
exports.getPendingDoctors = async (req, res, next) => {
  try {
    const doctorUsers = await User.find({ role: 'DOCTOR' });
    const pending = [];

    for (const user of doctorUsers) {
      const profile = await Doctor.findOne({ user: user._id });
      if (!profile || !profile.isApproved) {
        pending.push({
          _id: profile ? profile._id : user._id,
          isUser: !profile, // Flag if we are using User ID instead of Doctor ID
          userId: user._id,
          name: user.fullName,
          email: user.email,
          phone: user.phone || '—',
          specialty: profile?.specialty || 'General',
          licenseNumber: profile?.licenseNumber || 'PENDING',
          experience: profile?.experience || 0
        });
      }
    }
    
    res.status(200).json({ success: true, data: pending });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Approve a doctor
// @route   PUT /api/admin/doctors/:id/approve
// @access  Private/Admin
exports.approveDoctor = async (req, res, next) => {
  try {
    let doctor = await Doctor.findById(req.params.id);
    
    // If not found by Doctor ID, try finding by User ID (for legacy/inconsistent accounts)
    if (!doctor) {
      doctor = await Doctor.findOne({ user: req.params.id });
    }

    // If still not found, create a basic profile for this user
    if (!doctor) {
      const user = await User.findById(req.params.id);
      if (!user || user.role !== 'DOCTOR') {
        return res.status(404).json({ success: false, error: 'Doctor account not found' });
      }
      doctor = await Doctor.create({
        user: user._id,
        specialty: 'General',
        licenseNumber: 'MD-' + Math.floor(100000 + Math.random() * 900000),
        isApproved: true
      });
    } else {
      doctor.isApproved = true;
      await doctor.save();
    }

    // Log the approval
    const userObj = await User.findById(doctor.user);
    await SystemLog.create({
      action: `Doctor Approved: ${userObj.fullName}`,
      user: req.user.fullName,
      role: 'ADMIN',
      details: `Doctor ID: ${doctor._id}`
    });

    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all patients
// @route   GET /api/admin/patients
// @access  Private/Admin
exports.getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().populate('user', 'fullName email phone role');
    
    // Only show users with PATIENT role
    const formattedPatients = patients
      .filter(p => p.user && p.user.role === 'PATIENT')
      .map(p => ({
        _id: p._id,
        name: p.user?.fullName || 'Unknown',
        email: p.user?.email || 'N/A',
        phone: p.user?.phone || p.phone || 'N/A',
        bloodGroup: p.bloodGroup || '—',
        gender: p.gender || '—',
        createdAt: p.user?.createdAt || p._id.getTimestamp()
      }));

    res.status(200).json({ success: true, data: formattedPatients });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get patient by ID
// @route   GET /api/admin/patients/:id
// @access  Private/Admin
exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('user', 'fullName email phone role createdAt');

    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }

    res.status(200).json({ success: true, data: patient });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete a patient
// @route   DELETE /api/admin/patients/:id
// @access  Private/Admin
exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }
    
    // Log deletion
    const userObj = await User.findById(patient.user);
    await SystemLog.create({
      action: `Patient Deleted: ${userObj?.fullName || 'Unknown'}`,
      user: req.user.fullName,
      role: 'ADMIN',
      details: `Email: ${userObj?.email}`
    });

    await patient.deleteOne();
    
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Add staff (Admin creates a user and sends welcome email)
// @route   POST /api/admin/staff
// @access  Private/Admin
exports.addStaff = async (req, res, next) => {
  try {
    const { fullName, email, password, role, phone, specialty, licenseNumber, experience, department } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    user = await User.create({
      fullName,
      email,
      password,
      role,
      phone
    });

    if (role === 'DOCTOR') {
      // Find or create department by name if provided as string
      let deptId = null;
      if (department) {
        let foundDept = await Department.findOne({ name: department });
        if (!foundDept) {
          // Auto-create department if it doesn't exist
          foundDept = await Department.create({
            name: department,
            description: `Auto-generated department for ${department}`
          });
          console.log(`Created new department: ${department}`);
        }
        deptId = foundDept._id;
      }

      await Doctor.create({
        user: user._id,
        specialty: specialty || 'General',
        licenseNumber: licenseNumber || 'PENDING-' + user._id.toString().substring(0, 6),
        experience: experience || 0,
        department: deptId,
        isApproved: true
      });
    }

    // Log the creation
    await SystemLog.create({
      action: `New ${role} Registered: ${fullName}`,
      user: req.user.fullName,
      role: 'ADMIN',
      details: `Email: ${email}`
    });

    // Send Welcome Email
    const { sendWelcomeCredentials } = require('../utils/emailService');
    await sendWelcomeCredentials(email, fullName, role, password);

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Register a patient (Admin)
// @route   POST /api/admin/patients
// @access  Private/Admin
exports.addPatient = async (req, res, next) => {
  try {
    const { fullName, email, phone, bloodGroup, dob, emergencyDetails } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: 'User already exists with this email' });
    }

    // Generate random password for patient
    const password = Math.random().toString(36).slice(-8);

    user = await User.create({
      fullName,
      email,
      password,
      role: 'PATIENT',
      phone
    });

    const patient = await Patient.create({
      user: user._id,
      bloodGroup: bloodGroup || '',
      dateOfBirth: dob ? new Date(dob) : null,
      emergencyDetails: emergencyDetails || '',
      gender: '', // can be added to form if needed
      address: '',
      allergies: ''
    });

    // Log the registration
    await SystemLog.create({
      action: `New Patient Registered: ${fullName}`,
      user: req.user.fullName,
      role: 'ADMIN',
      details: `Registered by Admin`
    });

    // Send Welcome Email
    const { sendWelcomeCredentials } = require('../utils/emailService');
    await sendWelcomeCredentials(email, fullName, 'PATIENT', password);

    res.status(201).json({ success: true, data: patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all departments
// @route   GET /api/admin/departments
// @access  Private/Admin
exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find().sort({ name: 1 });

    const formattedDepts = departments.map(d => ({
      _id: d._id,
      title: d.name,
      description: d.description || '—',
      occ: `${d.currentOccupancy}/${d.capacity}`,
      status: d.status,
    }));

    res.status(200).json({ success: true, data: formattedDepts });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get department by ID
// @route   GET /api/admin/departments/:id
// @access  Private/Admin
exports.getDepartmentById = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    // Find doctors in this department
    const doctors = await Doctor.find({ department: department._id }).populate('user', 'fullName');
    
    // Find beds in this department
    const Bed = require('../models/Bed');
    const beds = await Bed.find({ department: department._id }).populate({
      path: 'patient',
      populate: { path: 'user', select: 'fullName' }
    });

    res.status(200).json({ 
      success: true, 
      data: {
        department,
        doctors,
        beds
      } 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update department
// @route   PUT /api/admin/departments/:id
// @access  Private/Admin
exports.updateDepartment = async (req, res, next) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!dept) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }

    // Log update
    await SystemLog.create({
      action: `Department Updated: ${dept.name}`,
      user: req.user.fullName,
      role: 'ADMIN'
    });

    res.status(200).json({ success: true, data: dept });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Add department
// @route   POST /api/admin/departments
// @access  Private/Admin
exports.addDepartment = async (req, res, next) => {
  try {
    const { name, description, capacity } = req.body;

    const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Department already exists' });
    }

    const department = await Department.create({
      name,
      description: description || '',
      capacity: parseInt(capacity) || 0,
    });

    // Log department creation
    await SystemLog.create({
      action: `New Department Created: ${name}`,
      user: req.user.fullName,
      role: 'ADMIN'
    });

    res.status(201).json({ success: true, data: department });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Delete department
// @route   DELETE /api/admin/departments/:id
// @access  Private/Admin
exports.deleteDepartment = async (req, res, next) => {
  try {
    const dept = await Department.findById(req.params.id);
    if (!dept) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }
    
    // Log deletion
    await SystemLog.create({
      action: `Department Deleted: ${dept.name}`,
      user: req.user.fullName,
      role: 'ADMIN'
    });

    await dept.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all staff
// @route   GET /api/admin/staff
// @access  Private/Admin
exports.getStaff = async (req, res, next) => {
  try {
    const { role } = req.query;
    const users = await User.find({ role: role || { $in: ['RECEPTIONIST', 'MEDICAL_STAFF', 'LAB_STAFF'] } });
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete staff
// @route   DELETE /api/admin/staff/:id
// @access  Private/Admin
exports.deleteStaff = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Staff member not found' });
    }

    // Log deletion
    await SystemLog.create({
      action: `Staff Member Deleted: ${user.fullName}`,
      user: req.user.fullName,
      role: 'ADMIN',
      details: `Role: ${user.role}`
    });

    await user.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getAnalytics = async (req, res, next) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments({ isApproved: true });
    const totalAdmissions = await Admission.countDocuments();
    const totalRevenueRes = await Payment.aggregate([
      { $match: { status: 'PAID' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = totalRevenueRes.length > 0 ? totalRevenueRes[0].total : 0;

    // Monthly admissions (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const admissionsByMonth = await Admission.aggregate([
      { $match: { admittedAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $month: "$admittedAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalPatients,
          totalDoctors,
          totalAdmissions,
          totalRevenue
        },
        admissionsByMonth
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all feedback
// @route   GET /api/admin/feedback
// @access  Private/Admin
exports.getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Reply to feedback
// @route   PUT /api/admin/feedback/:id/reply
// @access  Private/Admin
exports.replyFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, error: 'Feedback not found' });
    }

    feedback.reply = req.body.reply;
    feedback.status = 'REPLIED';
    feedback.repliedAt = Date.now();
    await feedback.save();

    // Log the reply
    await SystemLog.create({
      action: `Feedback Replied: ${feedback.subject}`,
      user: req.user.fullName,
      role: 'ADMIN'
    });

    res.status(200).json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get feedback by ID
// @route   GET /api/admin/feedback/:id
// @access  Private/Admin
exports.getFeedbackById = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, error: 'Feedback not found' });
    }
    res.status(200).json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get system settings
// @route   GET /api/admin/settings
// @access  Private/Admin
exports.getSettings = async (req, res, next) => {
  try {
    let settings = await SystemSetting.findOne();
    if (!settings) {
      settings = await SystemSetting.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update system settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await SystemSetting.findOne();
    if (!settings) {
      settings = await SystemSetting.create(req.body);
    } else {
      settings = await SystemSetting.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true
      });
    }

    // Log setting update
    await SystemLog.create({
      action: `System Settings Updated`,
      user: req.user.fullName,
      role: 'ADMIN'
    });

    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Send broadcast message
// @route   POST /api/admin/broadcast
// @access  Private/Admin
exports.sendBroadcast = async (req, res, next) => {
  try {
    const { target, subject, body, method } = req.body;
    
    // In a real app, this would trigger email/push notifications
    const message = await Message.create({
      sender: req.user.id,
      receiver: null, // null means broadcast or system
      subject,
      body,
      targetGroup: target,
      deliveryMethod: method,
      isBroadcast: true
    });

    // Log broadcast
    await SystemLog.create({
      action: `Broadcast Sent: ${subject}`,
      details: `Target: ${target}`,
      user: req.user.fullName,
      role: 'ADMIN'
    });

    res.status(200).json({ success: true, data: message });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get broadcast history
// @route   GET /api/admin/broadcasts
// @access  Private/Admin
exports.getBroadcasts = async (req, res, next) => {
  try {
    const broadcasts = await Message.find({ isBroadcast: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: broadcasts });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all reviews
// @route   GET /api/admin/reviews
// @access  Private/Admin
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'fullName' }
      })
      .populate('doctor', 'fullName')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get messages
// @route   GET /api/admin/messages
// @access  Private/Admin
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }]
    })
      .populate('sender', 'fullName role')
      .populate('receiver', 'fullName role')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
