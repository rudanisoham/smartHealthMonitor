/**
 * One-time script to fix user roles in the database.
 * Run with: node scripts/fixRoles.js
 *
 * This script:
 * 1. Finds users with Doctor profiles → sets role to DOCTOR
 * 2. Logs all users and their current roles for inspection
 */
require('dotenv').config();
const mongoose = require('mongoose');

async function fixRoles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected\n');

    const User = require('../models/User');
    const Doctor = require('../models/Doctor');
    const Patient = require('../models/Patient');

    // ── 1. Show all users and roles ────────────────────────────────────────
    const allUsers = await User.find().select('fullName email role');
    console.log('=== ALL USERS IN DATABASE ===');
    allUsers.forEach(u => console.log(`  ${u.role.padEnd(20)} | ${u.email.padEnd(30)} | ${u.fullName}`));
    console.log('');

    // ── 2. Fix: Users with Doctor profiles should have role DOCTOR ──────────
    const doctors = await Doctor.find().populate('user', 'fullName email role');
    console.log(`=== ${doctors.length} DOCTOR PROFILES FOUND ===`);
    for (const doc of doctors) {
      if (!doc.user) continue;
      if (doc.user.role !== 'DOCTOR') {
        await User.findByIdAndUpdate(doc.user._id, { role: 'DOCTOR' });
        console.log(`  FIXED: ${doc.user.email} → DOCTOR (was ${doc.user.role})`);
      } else {
        console.log(`  OK:    ${doc.user.email} → already DOCTOR`);
      }
    }
    console.log('');

    // ── 3. Remove Patient profiles for non-PATIENT users ───────────────────
    // Re-fetch after role fixes
    const nonPatientUsers = await User.find({ role: { $ne: 'PATIENT' } }).select('_id email role');
    console.log(`=== NON-PATIENT USERS (${nonPatientUsers.length}) ===`);
    for (const u of nonPatientUsers) {
      const patientProfile = await Patient.findOne({ user: u._id });
      if (patientProfile) {
        await Patient.deleteOne({ user: u._id });
        console.log(`  CLEANED: Removed Patient profile for ${u.email} (role: ${u.role})`);
      }
    }
    console.log('');

    // ── 4. Final state ──────────────────────────────────────────────────────
    const finalUsers = await User.find().select('fullName email role');
    console.log('=== FINAL USER ROLES ===');
    finalUsers.forEach(u => console.log(`  ${u.role.padEnd(20)} | ${u.email.padEnd(30)} | ${u.fullName}`));

    const patientCount = await Patient.countDocuments();
    console.log(`\n✅ Done. Patient profiles remaining: ${patientCount}`);

  } catch (err) {
    console.error('Fix script failed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

fixRoles();
