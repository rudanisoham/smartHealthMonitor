import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Printer, Download, User, Calendar, Clipboard, FileText, Sun, Cloud, Moon } from 'lucide-react';

const PrescriptionDetailPage = () => {
  const { id } = useParams();

  // Mock data matching the JSP context
  const prescription = {
    id: id || "RX-782",
    date: "2026-04-01 10:45",
    diagnosis: "Severe Viral Fever & Fatigue",
    patient: {
      name: "Soham Rudani",
      email: "rudanisoham1@gmail.com",
      age: 24,
      bloodGroup: "A+"
    },
    doctor: {
      name: "Dr. John Smith",
      license: "MC/98234-B"
    },
    medicines: [
      { id: 1, name: "Paracetamol 500mg", dosage: "1 Tablet", timing: "1-1-1", duration: "5 Days" },
      { id: 2, name: "Amoxicillin 250mg", dosage: "1 Capsule", timing: "1-0-1", duration: "7 Days" },
      { id: 3, name: "Vitamin C", dosage: "1 Tablet", timing: "0-1-0", duration: "10 Days" }
    ],
    instructions: "Take medicine after meals only.\nDrink at least 3 liters of water daily.\nAvoid cold drinks and oily food for one week.",
    notes: "Patient reported high fever (102F) since last 2 nights. Pulse rate slightly elevated."
  };

  const renderTimingTags = (timing) => {
    const parts = timing.split('-');
    return (
      <div style={{ display: 'flex', gap: '0.35rem' }}>
        {parts[0] === '1' && (
          <span style={{ background: '#fef3c7', color: '#d97706', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sun size={12} /> Morning
          </span>
        )}
        {parts[1] === '1' && (
          <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Cloud size={12} /> Afternoon
          </span>
        )}
        {parts[2] === '1' && (
          <span style={{ background: '#ede9fe', color: '#7c3aed', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Moon size={12} /> Night
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/doctor/prescriptions" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back to Prescriptions
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Printer size={16} /> Print Prescription
          </button>
          <button className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={16} /> Save as PDF
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--primary-light)', paddingBottom: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ margin: 0, color: 'var(--primary)', fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.02em' }}>RX MEDICAL PRESCRIPTION</h1>
            <div className="muted" style={{ fontSize: '1rem', marginTop: '0.25rem' }}>Smart Health Digital Records System</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>{prescription.id}</div>
            <div className="muted">{prescription.date}</div>
          </div>
        </div>

        <div className="grid grid-2" style={{ gap: '3rem', marginBottom: '3rem' }}>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={14} /> Patient Information
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{prescription.patient.name}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="muted">Email:</span>
                <span style={{ fontWeight: 600 }}>{prescription.patient.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="muted">Blood Group:</span>
                <span className="chip-danger" style={{ fontSize: '0.75rem' }}>{prescription.patient.bloodGroup}</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clipboard size={14} /> Clinical Summary
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div className="muted" style={{ marginBottom: '0.25rem' }}>Diagnosis:</div>
                <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>{prescription.diagnosis}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="muted">License #:</span>
                <span style={{ fontWeight: 600 }}>{prescription.doctor.license}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '1.25rem', paddingLeft: '0.5rem', borderLeft: '4px solid var(--primary)' }}>Prescribed Medications</div>
          <div className="table-container">
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>#</th>
                  <th>Medicine Name</th>
                  <th>Dosage</th>
                  <th>Timing</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {prescription.medicines.map((med, index) => (
                  <tr key={med.id}>
                    <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{index + 1}</td>
                    <td><strong style={{ fontSize: '1rem' }}>{med.name}</strong></td>
                    <td>
                      <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
                        {med.dosage}
                      </span>
                    </td>
                    <td>{renderTimingTags(med.timing)}</td>
                    <td style={{ fontWeight: 600 }}>{med.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-2" style={{ gap: '2rem' }}>
          <div className="card" style={{ background: '#ffffff', border: '1px solid var(--border)', boxShadow: 'none' }}>
            <div style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={16} /> Special Instructions
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
              {prescription.instructions}
            </div>
          </div>
          <div className="card" style={{ background: '#ffffff', border: '1px solid var(--border)', boxShadow: 'none' }}>
            <div style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={16} /> Clinical Notes
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>
              {prescription.notes}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '4rem', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{prescription.doctor.name}</div>
          <div className="muted">Chief Medical Officer · Cardiology Department</div>
          <div style={{ marginTop: '1rem' }}>
            <img src="/api/placeholder/150/50" alt="Doctor Signature" style={{ opacity: 0.6, filter: 'grayscale(1)' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionDetailPage;
