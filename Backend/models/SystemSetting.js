const mongoose = require('mongoose');

const SystemSettingSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    default: 'Smart Health Monitor',
  },
  contactEmail: {
    type: String,
    default: 'contact@healthmonitor.com',
  },
  contactPhone: {
    type: String,
    default: '+1 (555) 000-0000',
  },
  address: {
    type: String,
    default: '123 Health St, Medical City, HC 12345',
  },
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
  allowRegistration: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SystemSetting', SystemSettingSchema);
