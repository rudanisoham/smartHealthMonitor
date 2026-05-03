const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Medicine = require('../models/Medicine');
const Appointment = require('../models/Appointment');
const LabReport = require('../models/LabReport');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Patient.deleteMany();
    await Doctor.deleteMany();
    await Medicine.deleteMany();
    await Appointment.deleteMany();
    await LabReport.deleteMany();

    console.log('Data Cleared...');

    // Create Users
    const users = await User.create([
      {
        fullName: 'Admin User',
        email: 'admin@health.com',
        password: 'password123',
        role: 'ADMIN',
        phone: '1234567890',
      },
      {
        fullName: 'Dr. Sarah Wilson',
        email: 'sarah@health.com',
        password: 'password123',
        role: 'DOCTOR',
        phone: '1234567891',
      },
      {
        fullName: 'Dr. Michael Chen',
        email: 'michael@health.com',
        password: 'password123',
        role: 'DOCTOR',
        phone: '1234567896',
      },
      {
        fullName: 'Receptionist John',
        email: 'reception@health.com',
        password: 'password123',
        role: 'RECEPTIONIST',
        phone: '1234567892',
      },
      {
        fullName: 'Medical Staff Mike',
        email: 'medical@health.com',
        password: 'password123',
        role: 'MEDICAL_STAFF',
        phone: '1234567893',
      },
      {
        fullName: 'Lab Tech Emma',
        email: 'lab@health.com',
        password: 'password123',
        role: 'LAB_STAFF',
        phone: '1234567894',
      },
      {
        fullName: 'Patient Robert',
        email: 'robert@email.com',
        password: 'password123',
        role: 'PATIENT',
        phone: '1234567895',
      },
      {
        fullName: 'Jane Doe',
        email: 'jane@email.com',
        password: 'password123',
        role: 'PATIENT',
        phone: '9876543210',
      }
    ]);

    console.log('Users Created...');

    // Create Doctor profiles
    const drSarah = users.find(u => u.fullName === 'Dr. Sarah Wilson');
    const drMichael = users.find(u => u.fullName === 'Dr. Michael Chen');

    const doctors = await Doctor.create([
      {
        user: drSarah._id,
        specialty: 'Cardiology',
        licenseNumber: 'DOC-10001',
        isApproved: true,
        experience: 15,
        phone: drSarah.phone,
        bio: 'Expert in heart conditions with 15+ years of clinical experience.',
        status: 'ACTIVE',
      },
      {
        user: drMichael._id,
        specialty: 'Neurology',
        licenseNumber: 'DOC-10002',
        isApproved: true,
        experience: 12,
        phone: drMichael.phone,
        bio: 'Specialist in neurological disorders and brain health.',
        status: 'ACTIVE',
      }
    ]);

    console.log('Doctors Created...');

    // Create Patient Profiles
    const robert = users.find(u => u.fullName === 'Patient Robert');
    const jane = users.find(u => u.fullName === 'Jane Doe');

    const patients = await Patient.create([
      {
        user: robert._id,
        bloodGroup: 'O+',
        allergies: 'Peanuts',
        gender: 'Male',
        address: '123 Green St, New York',
        phone: robert.phone,
        emergencyEmail: 'robert.emergency@email.com',
      },
      {
        user: jane._id,
        bloodGroup: 'A-',
        allergies: 'Penicillin',
        gender: 'Female',
        address: '456 Oak Ave, Boston',
        phone: jane.phone,
        emergencyEmail: 'jane.emergency@email.com',
      }
    ]);

    console.log('Patients Created...');

    // Create Appointments
    await Appointment.create([
      {
        doctor: doctors[0]._id,
        patient: patients[0]._id,
        scheduledAt: new Date('2026-05-10T10:00:00'),
        status: 'SCHEDULED',
        notes: 'Routine heart checkup',
        preferredDate: new Date('2026-05-10'),
        preferredDateNote: '10:00 AM',
      },
      {
        doctor: doctors[1]._id,
        patient: patients[0]._id,
        scheduledAt: new Date('2026-04-15T14:30:00'),
        status: 'COMPLETED',
        notes: 'Recurring headaches follow-up',
        preferredDate: new Date('2026-04-15'),
        preferredDateNote: '2:30 PM',
      },
      {
        patient: patients[0]._id,
        status: 'AWAITING_ASSIGNMENT',
        notes: 'General health check',
        preferredDate: new Date('2026-05-20'),
        preferredDateNote: 'Morning preferred',
      },
      {
        doctor: doctors[0]._id,
        patient: patients[1]._id,
        scheduledAt: new Date('2026-05-12T09:00:00'),
        status: 'SCHEDULED',
        notes: 'Annual cardiac screening',
        preferredDate: new Date('2026-05-12'),
        preferredDateNote: '9:00 AM',
      }
    ]);

    console.log('Appointments Created...');

    // Create Lab Reports
    await LabReport.create([
      {
        patient: patients[0]._id,
        title: 'Complete Blood Count (CBC)',
        description: 'Comprehensive blood analysis including RBC, WBC, platelets.',
        results: 'All values within normal range',
        reportType: 'BLOOD_TEST',
        status: 'NORMAL',
        uploadedBy: 'Lab Tech Emma',
        doctorComments: 'Blood work looks healthy. Continue current regimen.',
      },
      {
        patient: patients[0]._id,
        title: 'Lipid Profile Panel',
        description: 'Cholesterol, triglycerides, HDL, LDL measurement.',
        results: 'LDL slightly elevated at 145 mg/dL',
        reportType: 'BLOOD_TEST',
        status: 'ABNORMAL',
        uploadedBy: 'Lab Tech Emma',
        doctorComments: 'LDL is borderline high. Consider dietary adjustments and retest in 3 months.',
      },
      {
        patient: patients[0]._id,
        title: 'Chest X-Ray',
        description: 'PA and lateral chest radiograph.',
        results: 'No acute cardiopulmonary abnormality',
        reportType: 'X_RAY',
        status: 'NORMAL',
        uploadedBy: 'Lab Tech Emma',
      },
      {
        patient: patients[0]._id,
        title: 'Thyroid Function Test',
        description: 'TSH, T3, T4 levels assessment.',
        reportType: 'BLOOD_TEST',
        status: 'PENDING',
        uploadedBy: 'Lab Tech Emma',
      },
      {
        patient: patients[1]._id,
        title: 'Electrocardiogram (ECG)',
        description: '12-lead ECG recording at rest.',
        results: 'Normal sinus rhythm',
        reportType: 'ECG',
        status: 'REVIEWED',
        uploadedBy: 'Lab Tech Emma',
        doctorComments: 'ECG is normal. No signs of arrhythmia.',
      }
    ]);

    console.log('Lab Reports Created...');

    // Create Medicines
    await Medicine.create([
      { name: 'Paracetamol', category: 'Analgesic', dosageForm: 'Tablet', strength: '500mg', stockQuantity: 500, price: 5.50, expiryDate: new Date('2027-12-31') },
      { name: 'Amoxicillin', category: 'Antibiotic', dosageForm: 'Capsule', strength: '250mg', stockQuantity: 200, price: 12.00, expiryDate: new Date('2027-06-30') },
      { name: 'Ibuprofen', category: 'Analgesic', dosageForm: 'Tablet', strength: '400mg', stockQuantity: 350, price: 8.75, expiryDate: new Date('2027-09-15') },
      { name: 'Metformin', category: 'Antidiabetic', dosageForm: 'Tablet', strength: '500mg', stockQuantity: 150, price: 15.00, expiryDate: new Date('2027-03-20') },
      { name: 'Omeprazole', category: 'Antacid', dosageForm: 'Capsule', strength: '20mg', stockQuantity: 280, price: 10.50, expiryDate: new Date('2027-11-10') },
    ]);

    console.log('Medicines Created...');

    console.log('\n====================================');
    console.log('  SEED COMPLETED SUCCESSFULLY!');
    console.log('====================================');
    console.log('\nTest Accounts:');
    console.log('  Patient:     robert@email.com / password123');
    console.log('  Patient 2:   jane@email.com / password123');
    console.log('  Reception:   reception@health.com / password123');
    console.log('  Medical:     medical@health.com / password123');
    console.log('  Lab Staff:   lab@health.com / password123');
    console.log('  Admin:       admin@health.com / password123');
    console.log('====================================\n');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
