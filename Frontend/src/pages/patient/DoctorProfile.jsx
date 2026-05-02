import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const DoctorProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const doctor = {
        name: 'John Doe',
        specialty: 'Cardiologist',
        department: 'Cardiology',
        avgRating: 4.8,
        reviewCount: 15,
        bio: 'Dr. John Doe is a leading expert in cardiovascular diseases with over 15 years of experience. He specializes in interventional cardiology and has performed numerous successful procedures.'
    };

    const reviews = [
        { patientName: 'Alice Johnson', rating: 5, comment: 'Excellent doctor! Very thorough and patient.', date: '2023-10-20' },
        { patientName: 'Bob Smith', rating: 4, comment: 'Good experience, but the wait time was a bit long.', date: '2023-10-15' }
    ];

    return (
        <div>
            <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm mb-4">
                <i className="fas fa-arrow-left" style={{ marginRight: '0.5rem' }}></i> Back to Appointments
            </button>

            <div className="doctor-hero" style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem', background: '#eff6ff', borderRadius: '12px', marginBottom: '2rem' }}>
                <div className="doc-avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#1d4ed8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
                    Dr
                </div>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>Dr. {doctor.name}</h2>
                    <div style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '0.75rem' }}>
                        <strong>{doctor.specialty}</strong> · {doctor.department}
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ color: '#f59e0b', fontSize: '1.25rem', letterSpacing: '2px' }}>
                            {'★'.repeat(Math.floor(doctor.avgRating))}{'☆'.repeat(5 - Math.floor(doctor.avgRating))}
                        </span>
                        <span className="muted" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                            {doctor.avgRating} / 5.0
                        </span>
                        <span className="muted" style={{ fontSize: '0.9rem' }}>({doctor.reviewCount} reviews)</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-2">
                <div className="card">
                    <div className="section-title">About the Doctor</div>
                    <div className="mt-3" style={{ lineHeight: 1.6, color: '#475569' }}>
                        {doctor.bio}
                    </div>
                </div>
                
                <div className="card">
                    <div className="section-title">Patient Reviews</div>
                    <div className="mt-3">
                        {reviews.length > 0 ? reviews.map((rev, index) => (
                            <div key={index} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                                    <div style={{ fontWeight: 600 }}>{rev.patientName}</div>
                                    <div style={{ color: '#f59e0b', fontSize: '1rem' }}>
                                        {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.5rem' }}>
                                    {rev.comment}
                                </div>
                                <div className="muted" style={{ fontSize: '0.75rem' }}>
                                    Reviewed on: {rev.date}
                                </div>
                            </div>
                        )) : (
                            <div className="muted" style={{ padding: '1.5rem', textAlign: 'center' }}>No reviews yet. Be the first to review!</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
