import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAppointments, getPatientMe, getReports, getMyPrescriptions, getVitals } from '../../utils/api';
import { Loader, Activity, Calendar, Bell, ShieldCheck, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        patient: null,
        latestVital: {},
        appointmentsCount: 0,
        reportsCount: 0,
        upcomingAppointments: [],
        prescriptions: [],
        loading: true
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch patient profile first as it's critical
            const patientRes = await getPatientMe().catch(err => ({ data: { data: null } }));
            
            // Fetch other data in parallel, gracefully handling individual failures
            const [apptRes, reportsRes, prescriptionsRes, vitalsRes] = await Promise.all([
                getAppointments().catch(err => { console.error('Appt error:', err); return { data: { data: [], count: 0 } }; }),
                getReports().catch(err => { console.error('Reports error:', err); return { data: { data: [], count: 0 } }; }),
                getMyPrescriptions().catch(err => { console.error('Rx error:', err); return { data: { data: [], count: 0 } }; }),
                getVitals().catch(err => { 
                    console.error('Vitals error:', err); 
                    return { data: { data: [], count: 0, error: err.response?.data?.error || err.message } }; 
                })
            ]);

            setStats({
                patient: patientRes.data.data,
                latestVital: vitalsRes.data.data?.[0] || {},
                appointmentsCount: apptRes.data.count || 0,
                reportsCount: reportsRes.data.count || 0,
                upcomingAppointments: (apptRes.data.data || []).slice(0, 4),
                prescriptions: (prescriptionsRes.data.data || []).slice(0, 3),
                loading: false,
                fetchError: vitalsRes.data.error
            });
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setStats(prev => ({ ...prev, loading: false }));
        }
    };

    if (stats.loading) {
        return (
            <div className="admin-content flex justify-center items-center" style={{ minHeight: '400px' }}>
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    const { patient, latestVital, appointmentsCount, reportsCount, upcomingAppointments, prescriptions } = stats;

    return (
        <>
            <div className="mb-6">
                <h2 className="section-title">Welcome Back, {patient?.user?.fullName || 'Patient'}</h2>
                <p className="section-subtitle">Your personal health overview and upcoming medical activities</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-4">
                <div className="card" style={{ borderLeft: `4px solid ${latestVital?.riskLevel === 'HIGH' ? '#ef4444' : latestVital?.riskLevel === 'MEDIUM' ? '#f59e0b' : '#10b981'}` }}>
                    <div className="card-header">
                        <div>
                            <div className="card-title">Risk Status</div>
                            <div className="muted mt-1">AI Assessment</div>
                        </div>
                        <span className={`chip-${latestVital?.riskLevel === 'HIGH' ? 'danger' : latestVital?.riskLevel === 'MEDIUM' ? 'warning' : 'success'}`}>
                            {latestVital?.riskLevel || 'LOW'}
                        </span>
                    </div>
                    <div className="card-value" style={{ color: latestVital?.riskLevel === 'HIGH' ? '#ef4444' : 'inherit' }}>
                        {latestVital?.riskLevel === 'HIGH' ? 'Action Needed' : latestVital?.riskLevel === 'MEDIUM' ? 'Monitor' : 'Stable'}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">Heart Rate</div>
                            <div className="muted mt-1">Latest Pulse</div>
                        </div>
                        <Activity className="text-primary" size={20} />
                    </div>
                    <div className="card-value">
                        {latestVital?.heartRate ? <>{latestVital.heartRate} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>bpm</span></> : '—'}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">Blood Pressure</div>
                            <div className="muted mt-1">Latest Reading</div>
                        </div>
                        <ShieldCheck className="text-primary" size={20} />
                    </div>
                    <div className="card-value" style={{ fontSize: '1.5rem' }}>
                        {latestVital?.bpSystolic ? `${latestVital.bpSystolic}/${latestVital.bpDiastolic}` : '—'}
                        {latestVital?.bpSystolic && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.4rem' }}>mmHg</span>}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="card-title">Unread Alerts</div>
                            <div className="muted mt-1">Notifications</div>
                        </div>
                        <Bell className="text-primary" size={20} />
                    </div>
                    <div className="card-value" style={{ color: '#ef4444' }}>
                        0
                    </div>
                </div>
            </div>

            {/* Bed Stay Info (Dynamic) */}
            {patient?.currentAdmission && (
                <div className="card mb-4 mt-4" style={{ borderLeft: '4px solid var(--primary)', background: 'linear-gradient(to right, rgba(59,130,246,0.05), #ffffff)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, minWidth: '250px' }}>
                            <div style={{ fontSize: '2.5rem' }}>🛌</div>
                            <div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Current Hospital Stay</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                                    Bed {patient.currentAdmission.bed?.bedNumber} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.9rem' }}>— {patient.currentAdmission.bed?.department?.name}</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                    Admitted On: <strong>{new Date(patient.currentAdmission.admittedAt).toLocaleDateString()}</strong> | Status: <strong style={{ color: 'var(--primary)' }}>{patient.currentAdmission.status}</strong>
                                </div>
                            </div>
                        </div>
                        <Link to="/patient/billing" className="btn btn-primary" style={{ fontWeight: 700, width: '100%', maxWidth: '200px', justifyContent: 'center' }}>VIEW BILLING</Link>
                    </div>
                </div>
            )}

            {/* AI Check-in Banner */}
            <div className="card mb-4 mt-4" style={{ background: '#ffffff', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                    <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>✨</div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                            <span className="badge-soft" style={{ background: '#e0f2fe', color: '#0369a1', fontWeight: 800, fontSize: '0.65rem' }}>AI HEALTH ASSISTANT</span>
                        </div>
                        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', margin: 0, lineHeight: 1.4 }}>
                            {latestVital?.heartRate 
                                ? latestVital.riskLevel === 'HIGH'
                                    ? `"Your latest heart rate is ${latestVital.heartRate} bpm which is out of range. Please check your ${appointmentsCount} upcoming appointments for a consultation."`
                                    : `"Your vitals are looking ${latestVital.riskLevel === 'LOW' ? 'great' : 'stable'}. You have ${appointmentsCount > 0 ? appointmentsCount : 'no'} upcoming appointments scheduled."`
                                : `"Welcome! We've initialized your profile. Start by adding your first health reading to get AI-powered medical insights."`
                            }
                        </p>
                    </div>
                    <button onClick={() => navigate('/patient/ai-checker')} className="btn btn-outline btn-sm">Details</button>
                </div>
            </div>

            <div className="grid grid-2 mt-4">
                {/* Health Stats (Java Style) */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="section-title">Latest Vitals</div>
                            <div className="section-subtitle">Most recent health readings</div>
                        </div>
                        <button onClick={() => navigate('/patient/health-data')} className="btn btn-outline btn-sm">Add Data</button>
                    </div>
                    <div className="mt-1">
                        <div className="stat-item flex justify-between items-center py-3 border-bottom">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-soft-danger text-danger"><Activity size={20} /></div>
                                <span className="stat-label font-medium">Heart Rate</span>
                            </div>
                            <span className="stat-value font-bold">
                                {latestVital?.heartRate ? <>{latestVital.heartRate} <span className="text-sm font-normal text-muted">bpm</span></> : <span className="text-muted italic">No data</span>}
                            </span>
                        </div>
                        <div className="stat-item flex justify-between items-center py-3 border-bottom">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-soft-primary text-primary"><ShieldCheck size={20} /></div>
                                <span className="stat-label font-medium">SpO2</span>
                            </div>
                            <span className="stat-value font-bold">
                                {latestVital?.spo2 ? <>{latestVital.spo2} <span className="text-sm font-normal text-muted">%</span></> : <span className="text-muted italic">No data</span>}
                            </span>
                        </div>
                        <div className="stat-item flex justify-between items-center py-3 border-bottom">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-soft-warning text-warning"><TrendingUp size={20} /></div>
                                <span className="stat-label font-medium">Temperature</span>
                            </div>
                            <span className="stat-value font-bold">
                                {latestVital?.temperature ? <>{latestVital.temperature} <span className="text-sm font-normal text-muted">°C</span></> : <span className="text-muted italic">No data</span>}
                            </span>
                        </div>
                        <div className="stat-item flex justify-between items-center py-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-soft-info text-info"><Clock size={20} /></div>
                                <span className="stat-label font-medium">Weight</span>
                            </div>
                            <span className="stat-value font-bold">
                                {latestVital?.weight ? <>{latestVital.weight} <span className="text-sm font-normal text-muted">kg</span></> : <span className="text-muted italic">No data</span>}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="section-title">Upcoming Visits</div>
                            <div className="section-subtitle">Your scheduled consultations</div>
                        </div>
                        <button onClick={() => navigate('/patient/appointments')} className="btn btn-outline btn-sm">View all</button>
                    </div>
                    <div className="timeline mt-2">
                        {upcomingAppointments.length > 0 ? upcomingAppointments.map((appt, i) => (
                            <div className="timeline-item" key={i}>
                                <div className="timeline-bullet"></div>
                                <div className="timeline-content">
                                    <div className="font-bold">
                                        Dr. {appt.doctor?.user?.fullName || 'Assigned Doctor'} <span className="chip-neutral" style={{ fontSize: '0.7rem' }}>{appt.status}</span>
                                    </div>
                                    <div className="timeline-meta">
                                        {appt.scheduledAt ? new Date(appt.scheduledAt).toLocaleString() : 'Date TBD'}
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="muted py-8 text-center">No upcoming appointments. <Link to="/patient/appointments" className="text-primary underline">Book one</Link></div>
                        )}
                    </div>
                </div>
            </div>

            {/* Prescriptions Preview (Java Inspired) */}
            <div className="card mt-4">
                <div className="card-header">
                    <div>
                        <div className="section-title">Active Treatment Plans</div>
                        <div className="section-subtitle">Medicines prescribed by your doctors</div>
                    </div>
                    <button onClick={() => navigate('/patient/prescriptions')} className="btn btn-outline btn-sm">View all</button>
                </div>
                <div className="mt-4">
                    {prescriptions.length > 0 ? (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Diagnosis</th>
                                        <th>Doctor</th>
                                        <th>Medicines</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescriptions.map(p => (
                                        <tr key={p._id}>
                                            <td className="font-medium text-primary">{p.diagnosis || 'Routine Checkup'}</td>
                                            <td className="font-bold">Dr. {p.doctor?.user?.fullName}</td>
                                            <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.medicinesText || 'View details'}</td>
                                            <td className="muted">{new Date(p.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="muted py-8 text-center">No recent prescriptions found in your record.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
