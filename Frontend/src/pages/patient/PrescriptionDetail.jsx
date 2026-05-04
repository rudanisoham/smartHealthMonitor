import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../utils/api';
import { Loader, ArrowLeft, Printer } from 'lucide-react';

const PrescriptionDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [prescription, setPrescription] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPrescription();
    }, [id]);

    const fetchPrescription = async () => {
        try {
            setLoading(true);
            const { getMyPrescriptions } = await import('../../utils/api');
            const res = await getMyPrescriptions();
            if (res.data.success) {
                const rx = res.data.data.find(p => p._id === id);
                if (rx) {
                    setPrescription({
                        id: rx._id.slice(-8).toUpperCase(),
                        createdAt: new Date(rx.createdAt).toLocaleString(),
                        validUntil: rx.validUntil ? new Date(rx.validUntil).toLocaleDateString() : null,
                        doctor: {
                            fullName: rx.doctor?.user?.fullName || 'Assigned Doctor',
                            specialty: rx.doctor?.specialty || 'General Medicine',
                            department: rx.doctor?.department || 'Outpatient',
                            licenseNumber: rx.doctor?.licenseNumber || 'N/A',
                        },
                        diagnosis: rx.diagnosis || 'General Consultation',
                        medicinesText: rx.medicinesText, // Will map to UI or show as text
                        medicines: [], // For legacy UI mapping if needed
                        instructions: rx.notes || 'Follow the doctor\'s instructions.',
                        notes: rx.notes || ''
                    });
                }
            }
        } catch (err) {
            console.error('Error fetching prescription:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderTiming = (t) => {
        const parts = t.split('-');
        return (
            <div style={{ display: 'flex', gap: '4px' }}>
                {parts[0] === '1' && <span style={{ background: '#fef3c7', color: '#d97706', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>☀ M</span>}
                {parts[1] === '1' && <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>🌤 A</span>}
                {parts[2] === '1' && <span style={{ background: '#ede9fe', color: '#7c3aed', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 700 }}>🌙 N</span>}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="admin-content flex justify-center items-center" style={{ minHeight: '400px' }}>
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (!prescription) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p className="muted">Prescription not found.</p>
                <button onClick={() => navigate(-1)} className="btn btn-outline mt-4"><ArrowLeft size={16} /> Back</button>
            </div>
        );
    }

    return (
        <div className="admin-content" style={{ padding: 0 }}>
            <div className="no-print" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">
                    <ArrowLeft size={14} /> Back to Prescriptions
                </button>
                <button onClick={() => window.print()} className="btn btn-outline btn-sm">
                    <Printer size={14} /> Print
                </button>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0369a1 100%)', borderRadius: '12px', padding: '2rem', color: 'white', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>Prescription #{prescription.id}</div>
                        <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>Issued on {prescription.createdAt}</div>
                    </div>
                    <div>
                        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700 }}>
                            {prescription.validUntil ? `Valid until ${prescription.validUntil}` : 'Ongoing'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
                <div className="card">
                    <div className="section-title" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: '1rem' }}>Prescribed By</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 800, color: '#1d4ed8' }}>
                            {prescription.doctor.fullName.charAt(0)}
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Dr. {prescription.doctor.fullName}</div>
                            <div className="muted" style={{ fontSize: '0.85rem' }}>{prescription.doctor.specialty}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Department</span>
                        <span style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 500 }}>{prescription.doctor.department}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>License #</span>
                        <span style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 500 }}>{prescription.doctor.licenseNumber}</span>
                    </div>
                </div>

                <div className="card">
                    <div className="section-title" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: '1rem' }}>Diagnosis</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1d4ed8', padding: '1rem', background: '#eff6ff', borderRadius: '10px', borderLeft: '4px solid #1d4ed8' }}>
                        {prescription.diagnosis}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9', marginTop: '1rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Issued On</span>
                        <span style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 500 }}>{prescription.createdAt}</span>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="section-title" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: '1rem' }}>Prescribed Medicines</div>
                <div className="table-container">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Medicines and Dosages</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '1rem', whiteSpace: 'pre-wrap', color: '#0f172a', fontWeight: 500, lineHeight: 1.5 }}>
                                    {prescription.medicinesText || 'No specific medicines listed.'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card">
                <div className="section-title" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#64748b', marginBottom: '1rem' }}>Instructions & Notes</div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: 600, color: '#64748b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Instructions</div>
                    <div style={{ fontSize: '0.95rem', color: '#0f172a', lineHeight: 1.7 }}>{prescription.instructions}</div>
                </div>
                <div>
                    <div style={{ fontWeight: 600, color: '#64748b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Doctor Notes</div>
                    <div style={{ fontSize: '0.95rem', color: '#0f172a', lineHeight: 1.7 }}>{prescription.notes}</div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionDetail;
