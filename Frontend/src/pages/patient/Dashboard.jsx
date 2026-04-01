import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Activity, Thermometer, Weight, HeartPulse } from 'lucide-react';
import '../../styles/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        latestVital: {},
        appointmentsCount: 0,
        unreadNotifications: 2,
        upcomingAppointments: []
    });

    useEffect(() => {
        // Fetch Vitals
        const vitals = JSON.parse(localStorage.getItem('vitals_history') || '[]');
        const latest = vitals[0] || {};

        // Fetch Appointments
        const appointments = JSON.parse(localStorage.getItem('appointments_history') || '[]');
        const upcoming = appointments.filter(a => a.status !== 'COMPLETED');

        setStats({
            latestVital: latest,
            appointmentsCount: upcoming.length,
            unreadNotifications: 2, // Mock fixed for now
            upcomingAppointments: appointments.slice(0, 1) // Just show latest for dash
        });
    }, []);

    const { latestVital, appointmentsCount, unreadNotifications, upcomingAppointments } = stats;

    return (
        <div className="dashboard-container">
            {/* Main Content Grid */}
            <div className="dashboard-content">

                {/* Top Stats Row */}
                <div className="stats-grid">
                    {/* Card 1 */}
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <div>
                                <h3>Risk Status</h3>
                                <p>AI Health Assessment</p>
                            </div>
                            <span className={latestVital.status === 'HIGH RISK' ? 'badge badge-red' : 'badge badge-gray'}>
                                {latestVital.status || 'No Data'}
                            </span>
                        </div>
                        <div className="stat-card-value text-blue-primary">
                            {latestVital.status === 'HIGH RISK' ? 'HIGH' : (latestVital.status === 'NORMAL' ? 'NORMAL' : '--')}
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <div>
                                <h3>Blood Pressure</h3>
                                <p>Latest reading</p>
                            </div>
                            <span className="unit">mmHg</span>
                        </div>
                        <div className="stat-card-value text-blue-primary">
                            {latestVital.bpSystolic && latestVital.bpDiastolic ? `${latestVital.bpSystolic}/${latestVital.bpDiastolic}` : '--'}
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <div>
                                <h3>Upcoming Appointments</h3>
                                <p>Total scheduled</p>
                            </div>
                            <span className="badge badge-yellow">Booked</span>
                        </div>
                        <div className="stat-card-value text-blue-primary">{appointmentsCount || 0}</div>
                    </div>

                    {/* Card 4 */}
                    <div className="stat-card">
                        <div className="stat-card-header">
                            <div>
                                <h3>Unread Notifications</h3>
                                <p>Alerts & reminders</p>
                            </div>
                            <span className="badge badge-red">Review</span>
                        </div>
                        <div className="stat-card-value text-blue-primary">{unreadNotifications}</div>
                    </div>
                </div>

                {/* Bottom Section Layout */}
                <div className="bottom-grid">

                    {/* Latest Vitals */}
                    <div className="panel vitals-panel">
                        <div className="panel-header">
                            <div>
                                <h2>Latest Vitals</h2>
                                <p>Most recent health readings</p>
                            </div>
                            <button className="btn-outline" onClick={() => navigate('/patient/health-data')}>Add Data</button>
                        </div>

                        <div className="vitals-list">
                            {/* Vital 1 */}
                            <div className="vital-item">
                                <div className="vital-info">
                                    <div className="vital-label">Heart Rate</div>
                                    <div className="vital-value">
                                        <strong>{latestVital.heartRate || '--'}</strong> <span>bpm</span>
                                    </div>
                                </div>
                                <div className="vital-icon icon-red">
                                    <HeartPulse size={20} />
                                </div>
                            </div>

                            {/* Vital 2 */}
                            <div className="vital-item">
                                <div className="vital-info">
                                    <div className="vital-label">SpO2</div>
                                    <div className="vital-value">
                                        <strong>{latestVital.spo2 || '--'}</strong> <span>%</span>
                                    </div>
                                </div>
                                <div className="vital-icon icon-blue">
                                    <Activity size={20} />
                                </div>
                            </div>

                            {/* Vital 3 */}
                            <div className="vital-item">
                                <div className="vital-info">
                                    <div className="vital-label">Temperature</div>
                                    <div className="vital-value">
                                        <strong>{latestVital.temperature || '--'}</strong> <span>°C</span>
                                    </div>
                                </div>
                                <div className="vital-icon icon-yellow">
                                    <Thermometer size={20} />
                                </div>
                            </div>

                            {/* Vital 4 */}
                            <div className="vital-item">
                                <div className="vital-info">
                                    <div className="vital-label">Weight</div>
                                    <div className="vital-value">
                                        <strong>{latestVital.weight || '--'}</strong> <span>kg</span>
                                    </div>
                                </div>
                                <div className="vital-icon icon-blue-light">
                                    <Weight size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="panel appointments-panel">
                        <div className="panel-header">
                            <div>
                                <h2>Upcoming Appointments</h2>
                                <p>Your scheduled visits</p>
                            </div>
                            <button className="btn-outline" onClick={() => navigate('/patient/appointments')}>View all</button>
                        </div>

                        <div className="appointment-list">
                            {upcomingAppointments.length > 0 ? upcomingAppointments.map(app => (
                                <div className="appointment-item" key={app.id}>
                                    <div className="appointment-dot"></div>
                                    <div className="appointment-details">
                                        <div className="appointment-title-row">
                                            <h4>{app.doctor}</h4>
                                            <span className={`badge ${app.status === 'COMPLETED' ? 'badge-gray' : 'badge-yellow'}`}>
                                                {app.status}
                                            </span>
                                        </div>
                                        <p className="appointment-time">{app.date} {app.time}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="no-data-msg">No upcoming appointments.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
