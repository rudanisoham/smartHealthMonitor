const mongoose = require('mongoose');

const AdmissionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  bed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bed',
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  admittedAt: {
    type: Date,
    default: Date.now,
  },
  dischargedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Admitted', 'Discharged', 'Cancelled'],
    default: 'Admitted',
  },
  reason: String,
  totalPaid: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Admission', AdmissionSchema);
