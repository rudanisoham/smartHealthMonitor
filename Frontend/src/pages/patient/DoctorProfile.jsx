import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getDoctorById } from '../../utils/api';
import { Loader, ArrowLeft, Star } from 'lucide-react';

const DoctorProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctor();
    }, [id]);

    const fetchDoctor = async () => {
        try {
            setLoading(true);
            const res = await getDoctorById(id);
            if (res.data.success) {
                setDoctor(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching doctor:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-content flex justify-center items-center" style={{ minHeight: '400px' }}>
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (!doctor) return null;

    return (
        <div>
            <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm mb-4">
                <ArrowLeft size={14} /> Back to Appointments
            </button>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem', background: '#eff6ff', borderRadius: '12px', marginBottom: '2rem' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#1d4ed8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
                    {doctor.user?.fullName.charAt(0)}
                </div>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Dr. {doctor.user?.fullName}</h1>
                    <p className="muted">{doctor.specialty} • {doctor.department?.title || 'General'}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                        <span className="chip">{doctor.experience || 0} yrs experience</span>
                        <span className="chip" style={{ background: '#fef3c7', color: '#d97706' }}>★ 4.9 (15 reviews)</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-2">
                <div className="card">
                    <div className="section-title">About Doctor</div>
                    <p style={{ lineHeight: 1.7, color: '#475569', marginTop: '0.75rem' }}>{doctor.bio || 'Professional medical expert dedicated to patient care.'}</p>
                    <div style={{ marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span className="muted">Specialty</span>
                            <strong>{doctor.specialty}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span className="muted">Department</span>
                            <strong>{doctor.department?.title || 'General'}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                            <span className="muted">Available Days</span>
                            <strong>{doctor.availableDays?.join(', ') || 'Contact reception'}</strong>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="section-title">Book Appointment</div>
                    <p className="muted mt-1">Schedule a consultation with Dr. {doctor.user?.fullName}</p>
                    <div className="mt-4">
                        <Link to="/patient/appointments" className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                            📅 Book Appointment
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
