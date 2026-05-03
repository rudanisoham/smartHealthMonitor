const mongoose = require('mongoose');

const LabTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a test name'],
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  turnaroundTime: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    enum: ['AVAILABLE', 'LIMITED', 'UNAVAILABLE'],
    default: 'AVAILABLE'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LabTest', LabTestSchema);
