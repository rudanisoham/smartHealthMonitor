const mongoose = require('mongoose');

const BedStaySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  bed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bed',
    required: true
  },
  bedNumber: String,
  assignedAt: {
    type: Date,
    required: true
  },
  releasedAt: {
    type: Date
  },
  dailyCharge: {
    type: Number,
    required: true
  },
  totalBill: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'COMPLETED'],
    default: 'ACTIVE'
  },
  settled: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('BedStay', BedStaySchema);
