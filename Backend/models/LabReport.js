const mongoose = require('mongoose');

const LabReportSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a report title'],
  },
  description: String,
  results: String,
  filePath: String,
  uploadedBy: {
    type: String, // Name of the staff
  },
  reportType: {
    type: String,
    enum: ['BLOOD_TEST', 'X_RAY', 'MRI', 'ECG', 'CT_SCAN', 'URINE_TEST', 'OTHER'],
    default: 'OTHER',
  },
  status: {
    type: String,
    enum: ['NORMAL', 'ABNORMAL', 'PENDING', 'REVIEWED'],
    default: 'PENDING',
  },
  doctorComments: String,
  prescription: {
    type: mongoose.Schema.ObjectId,
    ref: 'Prescription',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('LabReport', LabReportSchema);
