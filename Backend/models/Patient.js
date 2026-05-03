const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bloodGroup: String,
  allergies: String,
  emergencyEmail: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  address: String,
  phone: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Doctor is also a User
  },
  medicineReminders: {
    enabled: {
      type: Boolean,
      default: true,
    },
    morning: {
      type: String,
      default: '08:00',
    },
    afternoon: {
      type: String,
      default: '13:00',
    },
    night: {
      type: String,
      default: '20:00',
    },
  },
});

module.exports = mongoose.model('Patient', PatientSchema);
