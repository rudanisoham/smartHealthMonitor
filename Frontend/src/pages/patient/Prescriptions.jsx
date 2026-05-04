import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyPrescriptions } from '../../utils/api';
import { Loader } from 'lucide-react';

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = async () => {
        try {
            setLoading(true);
            const res = await getMyPrescriptions();
            if (res.data.success) {
                const rxList = res.data.data.map(p => ({
                    id: p._id,
                    date: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A',
                    diagnosis: p.diagnosis || 'General Consultation',
                    doctor: p.doctor?.user?.fullName || 'Assigned Doctor',
                    specialty: p.doctor?.specialty || '',
                    medicines: p.medicinesText || 'View details',
                    validUntil: p.validUntil ? new Date(p.validUntil).toLocaleDateString() : null
                }));
                setPrescriptions(rxList);
            }
        } catch (err) {
            console.error('Error fetching prescriptions:', err);
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

    return (
        <div className="card">
            <div className="card-header">
                <div>
                    <div className="section-title">Your Prescriptions</div>
                    <div className="section-subtitle">Prescriptions from completed consultations — fetched from database</div>
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
                                    No prescriptions yet. Complete an appointment to receive prescriptions.
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
