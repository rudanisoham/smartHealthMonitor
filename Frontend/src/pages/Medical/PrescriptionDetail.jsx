import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Printer, 
  Download, 
  User, 
  Calendar, 
  Clipboard, 
  FileText, 
  Sun, 
  Cloud, 
  Moon,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { getPrescriptionById, fulfillPrescription } from '../../utils/api';

const MedicalPrescriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fulfilling, setFulfilling] = useState(false);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await getPrescriptionById(id);
        setPrescription(res.data.data);
      } catch (err) {
        console.error("Failed to fetch prescription", err);
        setError("Prescription not found or access denied.");
      } finally {
        setLoading(false);
      }
    };
    fetchPrescription();
  }, [id]);

  const handleFulfill = async () => {
    if (!window.confirm("Are you sure you want to mark this prescription as dispensed?")) return;
    
    setFulfilling(true);
    try {
      await fulfillPrescription(id);
      alert("Prescription fulfilled successfully!");
      const res = await getPrescriptionById(id);
      setPrescription(res.data.data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fulfill prescription");
    } finally {
      setFulfilling(false);
    }
  };

  const renderTimingTags = (timing) => {
    if (!timing) return null;
    const parts = timing.split('-');
    return (
      <div style={{ display: 'flex', gap: '0.35rem' }}>
        {parts[0] === '1' && (
          <span style={{ background: '#fef3c7', color: '#d97706', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sun size={12} /> M
          </span>
        )}
        {parts[1] === '1' && (
          <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Cloud size={12} /> A
          </span>
        )}
        {parts[2] === '1' && (
          <span style={{ background: '#ede9fe', color: '#7c3aed', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Moon size={12} /> N
          </span>
        )}
      </div>
    );
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}><div className="loader"></div></div>;
  if (error) return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <AlertCircle size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
      <h3>{error}</h3>
      <Link to="/medical/prescriptions" className="btn btn-primary mt-4">Back to List</Link>
    </div>
  );

  return (
    <div className="prescription-detail-page">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back
        </button>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline btn-sm" onClick={() => window.print()}>
            <Printer size={16} /> Print
          </button>
          {prescription.status !== 'Dispensed' && (
            <button 
              className="btn btn-primary btn-sm" 
              onClick={handleFulfill}
              disabled={fulfilling}
            >
              {fulfilling ? 'Processing...' : 'Mark as Dispensed'}
            </button>
          )}
        </div>
      </div>

      <div className="card shadow-sm" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ margin: 0, color: 'var(--primary)', fontWeight: 800, fontSize: '1.5rem' }}>DIGITAL PRESCRIPTION</h1>
            <div className="muted" style={{ fontSize: '0.85rem' }}>Pharmacy Fulfillment Record</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>ID: #{prescription._id.slice(-8).toUpperCase()}</div>
            <div className="muted" style={{ fontSize: '0.85rem' }}>{new Date(prescription.createdAt).toLocaleDateString()}</div>
            <span className={`chip-${prescription.status === 'Dispensed' ? 'success' : 'warning'}`} style={{ marginTop: '0.5rem', display: 'inline-block' }}>
              {prescription.status}
            </span>
          </div>
        </div>

        <div className="grid grid-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div className="muted" style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={14} /> Patient Information
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{prescription.patient?.user?.fullName || prescription.patientName}</div>
            <div className="muted" style={{ fontSize: '0.85rem' }}>Patient ID: {prescription.patient?._id || 'N/A'}</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div className="muted" style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clipboard size={14} /> Doctor Information
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Dr. {prescription.doctor?.user?.fullName || 'Assigned Physician'}</div>
            <div className="muted" style={{ fontSize: '0.85rem' }}>Diagnosis: {prescription.diagnosis || 'General Checkup'}</div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', paddingLeft: '0.5rem', borderLeft: '4px solid var(--primary)' }}>Prescribed Medications</div>
          <div className="table-container" style={{ margin: 0 }}>
            <table className="w-100">
              <thead>
                <tr>
                  <th style={{ background: '#f8fafc' }}>Medicine</th>
                  <th style={{ background: '#f8fafc' }}>Dosage</th>
                  <th style={{ background: '#f8fafc' }}>Timing</th>
                  <th style={{ background: '#f8fafc' }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                {prescription.items && prescription.items.length > 0 ? (
                  prescription.items.map((it, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{it.name || it.medicine?.name}</td>
                      <td>
                        <span style={{ background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                          {it.dosage}
                        </span>
                      </td>
                      <td>{renderTimingTags(it.frequency)}</td>
                      <td style={{ fontWeight: 600 }}>{it.duration}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 muted">No medications listed in structured format</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {prescription.instructions && (
          <div className="card" style={{ background: '#fffbeb', border: '1px solid #fef3c7', boxShadow: 'none' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <FileText size={16} /> Instructions to Pharmacist / Patient
            </div>
            <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#78350f' }}>
              {prescription.instructions}
            </div>
          </div>
        )}

        <div style={{ marginTop: '3rem', textAlign: 'right', opacity: 0.6 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>Electronically Verified By</div>
          <div style={{ fontWeight: 800 }}>Dr. {prescription.doctor?.user?.fullName}</div>
        </div>
      </div>
    </div>
  );
};

export default MedicalPrescriptionDetail;
