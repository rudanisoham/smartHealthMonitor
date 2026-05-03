const mongoose = require('mongoose');
const Vital = require('../models/Vital');
const Patient = require('../models/Patient');
const User = require('../models/User');

async function checkAllVitals() {
    await mongoose.connect('mongodb://localhost:27017/smartHealthMonitor');
    
    const vitals = await Vital.find();
    console.log('--- ALL VITALS IN DB ---');
    for (const v of vitals) {
        const p = await Patient.findById(v.patient).populate('user', 'email');
        console.log(`ID: ${v._id}, PatientID: ${v.patient}, User: ${p?.user?.email}, Risk: ${v.riskLevel}, HR: ${v.heartRate}`);
    }
    
    const patients = await Patient.find().populate('user', 'email');
    console.log('--- ALL PATIENT PROFILES ---');
    patients.forEach(p => {
        console.log(`PatientID: ${p._id}, User: ${p.user?.email}`);
    });
    
    process.exit(0);
}

checkAllVitals().catch(console.error);
