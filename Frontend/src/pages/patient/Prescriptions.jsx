import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        // Mock data
        const initial = [
            {
                id: 1,
                date: '2026-04-15',
                diagnosis: 'Common Cold',
                doctor: 'Sarah Jenkins',
                specialty: 'General Medicine',
                medicines: 'Paracetamol 500mg, Cetirizine 10mg',
                validUntil: '2026-04-22'
            },
            {
                id: 2,
                date: '2026-03-10',
                diagnosis: 'Hypertension',
                doctor: 'Michael Chen',
                specialty: 'Cardiology',
                medicines: 'Lisinopril 10mg',
                validUntil: null
            }
        ];
        setPrescriptions(initial);
    }, []);

    return (
        <div className="card">
            <div className="card-header">
                <div>
                    <div className="section-title">Your Prescriptions</div>
                    <div className="section-subtitle">All prescriptions issued by your doctors</div>
                </div>
                <span className="chip-neutral">{prescriptions.length} Total</span>
            </div>

            <div className="table-container mt-3">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Diagnosis</th>
                            <th>Doctor</th>
                            <th>Medicines</th>
                            <th>Valid Until</th>
                            <th className="text-right" style={{ textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptions.length > 0 ? (
                            prescriptions.map((rx) => (
                                <tr key={rx.id}>
                                    <td>{rx.date}</td>
                                    <td><strong>{rx.diagnosis}</strong></td>
                                    <td>
                                        Dr. {rx.doctor}
                                        {rx.specialty && (
                                            <>
                                                <br />
                                                <span className="muted" style={{ fontSize: '0.8rem' }}>{rx.specialty}</span>
                                            </>
                                        )}
                                    </td>
                                    <td style={{ maxWidth: '200px' }}>{rx.medicines}</td>
                                    <td>
                                        {rx.validUntil ? (
                                            <span className="chip">{rx.validUntil}</span>
                                        ) : (
                                            <span className="muted">Ongoing</span>
                                        )}
                                    </td>
                                    <td className="text-right" style={{ textAlign: 'right' }}>
                                        <Link to={`/patient/prescription-detail/${rx.id}`} className="btn btn-primary btn-sm">Details</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '2.5rem' }} className="muted">
                                    No prescriptions issued yet. Book an appointment to consult a doctor.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Prescriptions;
