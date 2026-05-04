const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please add a full name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
  },
  status: {
    type: String,
    enum: ['PENDING', 'REPLIED'],
    default: 'PENDING',
  },
  reply: {
    type: String,
  },
  repliedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
