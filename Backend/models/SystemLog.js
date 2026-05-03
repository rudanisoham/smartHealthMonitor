const mongoose = require('mongoose');

const SystemLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: [true, 'Please add an action'],
  },
  user: {
    type: String,
    required: [true, 'Please add a user name/identifier'],
  },
  role: {
    type: String,
    enum: ['ADMIN', 'DOCTOR', 'PATIENT', 'RECEPTIONIST', 'MEDICAL_STAFF', 'LAB_STAFF', 'SYSTEM'],
    default: 'SYSTEM',
  },
  details: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SystemLog', SystemLogSchema);
