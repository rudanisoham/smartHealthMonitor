const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['DEBIT', 'CREDIT'], // DEBIT for charges, CREDIT for payments
    default: 'CREDIT',
  },
  description: String,
  method: {
    type: String,
    enum: ['CASH', 'CARD', 'UPI', 'RAZORPAY'],
    default: 'RAZORPAY',
  },
  razorpayPaymentId: String,
  razorpayOrderId: String,
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
