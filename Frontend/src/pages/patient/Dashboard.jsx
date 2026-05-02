import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        latestVital: {},
        appointmentsCount: 0,
        unreadNotifications: 2,
        upcomingAppointments: [],
        prescriptions: []
    });

    useEffect(() => {
        // Fetch Vitals
        const vitals = JSON.parse(localStorage.getItem('vitals_history') || '[]');
        const latest = vitals[0] || {};

        // Fetch Appointments
        const appointments = JSON.parse(localStorage.getItem('appointments_history') || '[]');
        const upcoming = appointments.filter(a => a.status !== 'COMPLETED');

        // Fetch Prescriptions (Mock or real if exists)
        const prescriptions = JSON.parse(localStorage.getItem('prescriptions_history') || '[]');

        setStats({
            latestVital: latest,
            appointmentsCount: upcoming.length,
            unreadNotifications: 2, 
            upcomingAppointments: appointments.slice(0, 4),
            prescriptions: prescriptions.slice(0, 4)
        });
    }, []);

    const { latestVital, appointmentsCount, unreadNotifications, upcomingAppointments, prescriptions } = stats;

    // Determine risk level for UI
    let riskLevel = 'LOW';
    let riskClass = 'chip';
    if (latestVital.status === 'HIGH RISK') {
        riskLevel = 'HIGH';
        riskClass = 'chip-danger';
    } else if (latestVital.status === 'MEDIUM RISK') {
        riskLevel = 'MEDIUM';
        riskClass = 'chip-warning';
    }

    return (
        <>
            {/* KPI Cards */}
            <div className="grid grid-4">
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">Risk Status</div>
                            <div className="muted mt-1">AI Health Assessment</div>
                        </div>
                        <span className={riskClass}>{riskLevel} Risk</span>
                    </div>
                    <div className="card-value">
                        {latestVital.status ? riskLevel : '—'}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">Blood Pressure</div>
                            <div className="muted mt-1">Latest reading</div>
                        </div>
                        <span className="chip-neutral">mmHg</span>
                    </div>
                    <div className="card-value" style={{ fontSize: '1.5rem' }}>
                        {latestVital.bpSystolic && latestVital.bpDiastolic ? `${latestVital.bpSystolic}/${latestVital.bpDiastolic}` : '—'}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">Upcoming Appointments</div>
                            <div className="muted mt-1">Total scheduled</div>
                        </div>
                        <span className="chip-warning">Booked</span>
                    </div>
                    <div className="card-value">{appointmentsCount}</div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">Unread Notifications</div>
                            <div className="muted mt-1">Alerts & reminders</div>
                        </div>
                        <span className="chip-danger">Review</span>
                    </div>
                    <div className="card-value">{unreadNotifications}</div>
                </div>
            </div>

            {/* AI Check-in Banner (Mocking that one exists) */}
            <div className="card mb-4 mt-4" style={{ background: '#ffffff', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>✨</div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                            <span className="badge-soft" style={{ background: '#e0f2fe', color: '#0369a1', fontWeight: 800, fontSize: '0.65rem' }}>AI HEALTH ASSISTANT</span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Just now</span>
                        </div>
                        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', margin: 0, lineHeight: 1.4 }}>
                            "Your recent vitals look stable. Keep maintaining your current diet plan."
                        </p>
                    </div>
                    <button onClick={() => navigate('/patient/ai-checker')} className="btn btn-outline btn-sm" style={{ background: '#f8fafc', borderColor: '#e2e8f0', color: '#1e293b', fontWeight: 700, width: '100%', justifyContent: 'center', marginTop: '0.5rem', display: 'flex', maxWidth: '120px' }}>Details</button>
                </div>
            </div>

            <div className="grid grid-2 mt-4">
                {/* Health Stats */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="section-title">Latest Vitals</div>
                            <div className="section-subtitle">Most recent health readings</div>
                        </div>
                        <button onClick={() => navigate('/patient/health-data')} className="btn btn-outline btn-sm">Add Data</button>
                    </div>
                    <div className="mt-1">
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Heart Rate</span>
                                <span className="stat-value">
                                    {latestVital.heartRate ? <>{latestVital.heartRate} <span className="stat-unit">bpm</span></> : <span className="muted">No data</span>}
                                </span>
                            </div>
                            <div className="stat-icon red">
                                <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">SpO2</span>
                                <span className="stat-value">
                                    {latestVital.spo2 ? <>{latestVital.spo2} <span className="stat-unit">%</span></> : <span className="muted">No data</span>}
                                </span>
                            </div>
                            <div className="stat-icon blue">
                                <svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Temperature</span>
                                <span className="stat-value">
                                    {latestVital.temperature ? <>{latestVital.temperature} <span className="stat-unit">°C</span></> : <span className="muted">No data</span>}
                                </span>
                            </div>
                            <div className="stat-icon yellow">
                                <svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Weight</span>
                                <span className="stat-value">
                                    {latestVital.weight ? <>{latestVital.weight} <span className="stat-unit">kg</span></> : <span className="muted">No data</span>}
                                </span>
                            </div>
                            <div className="stat-icon blue">
                                <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M8 14l-2 7h12l-2-7"/></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="section-title">Upcoming Appointments</div>
                            <div className="section-subtitle">Your scheduled visits</div>
                        </div>
                        <button onClick={() => navigate('/patient/appointments')} className="btn btn-outline btn-sm">View all</button>
                    </div>
                    <div className="timeline mt-2">
                        {upcomingAppointments.length > 0 ? upcomingAppointments.map((appt, i) => (
                            <div className="timeline-item" key={i}>
                                <div className="timeline-bullet"></div>
                                <div className="timeline-content">
                                    <div>
                                        Dr. {appt.doctor} <span className="chip-neutral" style={{ fontSize: '0.7rem' }}>{appt.status}</span>
                                    </div>
                                    <div className="timeline-meta">
                                        {appt.date} {appt.time}
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="muted" style={{ padding: '1rem 0' }}>No upcoming appointments. <Link to="/patient/appointments">Book one</Link></div>
                        )}
                    </div>
                </div>
            </div>

            {/* Prescriptions Preview */}
            <div className="card mt-4">
                <div className="card-header">
                    <div>
                        <div className="section-title">Active Prescriptions</div>
                        <div className="section-subtitle">Medicines prescribed by your doctors</div>
                    </div>
                    <button onClick={() => navigate('/patient/prescriptions')} className="btn btn-outline btn-sm">View all</button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Diagnosis</th>
                                <th>Doctor</th>
                                <th>Medicines</th>
                                <th>Valid Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.length > 0 ? prescriptions.map((rx, i) => (
                                <tr key={i}>
                                    <td>{rx.diagnosis}</td>
                                    <td>Dr. {rx.doctor}</td>
                                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rx.medicines}</td>
                                    <td>{rx.validUntil || <span className="muted">—</span>}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="4" className="muted" style={{ textAlign: 'center', padding: '1.5rem' }}>No prescriptions yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
