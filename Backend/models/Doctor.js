const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  specialty: {
    type: String,
    required: [true, 'Please add a specialty'],
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please add a license number'],
    unique: true,
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  experience: Number,
  phone: String,
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE',
  },
  profileImage: String,
  bio: String,
  availableDays: {
    type: [String],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
