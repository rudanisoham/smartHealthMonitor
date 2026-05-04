const mongoose = require('mongoose');

const BedSchema = new mongoose.Schema({
  bedNumber: {
    type: String,
    required: [true, 'Please add a bed number'],
    unique: true
  },
  type: {
    type: String,
    enum: ['NORMAL', 'ICU'],
    default: 'NORMAL'
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'],
    default: 'AVAILABLE'
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    default: null
  },
  assignedAt: {
    type: Date,
    default: null
  },
  dailyCharge: {
    type: Number,
    default: 500.0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bed', BedSchema);
