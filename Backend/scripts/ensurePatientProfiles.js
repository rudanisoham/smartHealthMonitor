/**
 * Run: node scripts/ensurePatientProfiles.js
 * Ensures every PATIENT-role user has a Patient profile document.
 */
require('dotenv').config();
const mongoose = require('mongoose');

async function ensureProfiles() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB Connected\n');

  const User = require('../models/User');
  const Patient = require('../models/Patient');

  const patientUsers = await User.find({ role: 'PATIENT' }).select('_id fullName email');
  console.log(`Found ${patientUsers.length} PATIENT-role users:`);

  for (const u of patientUsers) {
    const existing = await Patient.findOne({ user: u._id });
    if (!existing) {
      await Patient.create({ user: u._id });
      console.log(`  CREATED profile for: ${u.email} (${u.fullName})`);
    } else {
      console.log(`  OK - profile exists for: ${u.email} (${u.fullName})`);
    }
  }

  const total = await Patient.countDocuments();
  console.log(`\n✅ Done. Total Patient profiles: ${total}`);
  await mongoose.disconnect();
  process.exit(0);
}

ensureProfiles().catch(err => {
  console.error(err);
  process.exit(1);
});
