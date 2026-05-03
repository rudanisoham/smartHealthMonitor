const mongoose = require('mongoose');

const BedSchema = new mongoose.Schema({
  bedNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['General', 'Semi-Private', 'Private', 'ICU'],
    default: 'General',
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  dailyRate: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Bed', BedSchema);
