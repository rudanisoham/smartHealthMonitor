const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Department = require('../models/Department');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password, role, phone, specialty, licenseNumber, experience, department } = req.body;

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      role,
      phone,
    });

    // If role is DOCTOR, create a pending profile
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
        licenseNumber: licenseNumber || 'MD-' + Math.floor(100000 + Math.random() * 900000),
        experience: experience || 0,
        department: deptId,
        isApproved: false
      });
    }

    // NEW: If role is PATIENT, create a profile
    if (role === 'PATIENT') {
      const Patient = require('../models/Patient');
      await Patient.create({
        user: user._id
      });
      console.log(`Created new patient profile for user: ${user.email}`);
    }

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // NEW: Check if doctor is approved
    if (user.role === 'DOCTOR') {
      const doctor = await Doctor.findOne({ user: user._id });
      if (!doctor || !doctor.isApproved) {
        return res.status(403).json({ 
          success: false, 
          error: 'Your doctor account is pending approval or profile is missing. Please contact the administrator for access.' 
        });
      }
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
};

// @desc    Get current logged in user
// @route   POST /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({ success: false, error: 'Current password is incorrect' });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ success: false, error: 'There is no user with that email' });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.resetPasswordOtp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    // Send email
    const { sendOtpEmail } = require('../utils/emailService');
    await sendOtpEmail(user.email, otp);

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Email could not be sent' });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verifyotp
// @access  Public
exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ 
      email, 
      resetPasswordOtp: otp,
      otpExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    res.status(200).json({ success: true, data: 'OTP verified' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword
// @access  Public
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ 
      email, 
      resetPasswordOtp: otp,
      otpExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    // Set new password
    user.password = password;
    user.resetPasswordOtp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
