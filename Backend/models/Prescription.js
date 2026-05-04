const mongoose = require('mongoose');

const PrescriptionItemSchema = new mongoose.Schema({
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: false // Make it optional for custom medicines
  },
  name: String, // Store name directly
  dosage: String,
  frequency: String,
  duration: String,
  quantity: Number
});

const PrescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  diagnosis: String,
  items: [PrescriptionItemSchema],
  medicinesText: String,
  notes: String,
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'DISPENSED'],
    default: 'PENDING'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
