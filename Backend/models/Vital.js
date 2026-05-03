const mongoose = require('mongoose');

const VitalSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  heartRate: Number,
  bpSystolic: Number,
  bpDiastolic: Number,
  spo2: Number,
  temperature: Number,
  weight: Number,
  riskLevel: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'LOW',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vital', VitalSchema);
