const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: true,
  },
  scheduledAt: Date,
  status: {
    type: String,
    enum: [
      'AWAITING_ASSIGNMENT', 
      'SCHEDULED', 
      'COMPLETED', 
      'CANCELLED', 
      'RESCHEDULED',
      'IN_PROGRESS'
    ],
    default: 'AWAITING_ASSIGNMENT',
  },
  notes: String,
  assignedByReception: {
    type: Boolean,
    default: false,
  },
  preferredDate: Date,
  preferredDateNote: String,
  tokenNumber: Number,
  estimatedTime: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
