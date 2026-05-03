const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a department name'],
    unique: true,
    trim: true,
  },
  description: String,
  capacity: {
    type: Number,
    default: 0,
  },
  currentOccupancy: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Under Maintenance'],
    default: 'Active',
  },
  headDoctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Department', DepartmentSchema);
