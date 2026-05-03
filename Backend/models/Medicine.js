const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a medicine name'],
    trim: true,
  },
  category: String,
  dosageForm: String, // Tablet, Syrup, etc.
  strength: String, // 500mg, etc.
  stockQuantity: {
    type: Number,
    default: 0,
  },
  expiryDate: Date,
  price: Number, // Price per unit
  unitsPerPack: {
    type: Number,
    default: 1,
  },
  pricePerPack: Number,
  description: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Medicine', MedicineSchema);
