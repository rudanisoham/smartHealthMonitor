import React, { useState, useEffect } from 'react';
import { getAppointments, getReports } from '../../utils/api';
import { Loader, Bell, Calendar, FileText, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        generateNotifications();
    }, []);

    const generateNotifications = async () => {
        try {
            setLoading(true);
            const [apptRes, reportRes] = await Promise.all([
                getAppointments(),
                getReports()
            ]);

            const notifs = [];

            // Generate notifications from appointments
            if (apptRes.data.success) {
                apptRes.data.data.forEach(appt => {
                    if (appt.status === 'SCHEDULED' || appt.status === 'CONFIRMED') {
                        notifs.push({
                            id: `appt-${appt._id}`,
                            title: 'Upcoming Appointment',
                            message: `You have a ${appt.status.toLowerCase()} appointment${appt.doctor?.user?.fullName ? ` with Dr. ${appt.doctor.user.fullName}` : ''} on ${appt.preferredDate ? new Date(appt.preferredDate).toLocaleDateString() : 'TBD'}.`,
                            type: 'WARNING',
                            read: false,
                            createdAt: appt.createdAt || new Date().toISOString()
                        });
                    }
                    if (appt.status === 'COMPLETED') {
                        notifs.push({
                            id: `appt-done-${appt._id}`,
                            title: 'Appointment Completed',
                            message: `Your appointment${appt.doctor?.user?.fullName ? ` with Dr. ${appt.doctor.user.fullName}` : ''} has been completed.`,
                            type: 'INFO',
                            read: true,
                            createdAt: appt.createdAt || new Date().toISOString()
                        });
                    }
                });
            }

            // Generate notifications from reports
            if (reportRes.data.success) {
                reportRes.data.data.forEach(report => {
                    if (report.status === 'ABNORMAL') {
                        notifs.push({
                            id: `report-${report._id}`,
                            title: `Report Alert: ${report.title}`,
                            message: `Your ${report.title} results show abnormal values. Please consult your doctor.`,
                            type: 'ALERT',
                            read: false,
                            createdAt: report.createdAt
                        });
                    } else if (report.status === 'NORMAL' || report.status === 'REVIEWED') {
                        notifs.push({
                            id: `report-ok-${report._id}`,
                            title: `Report Ready: ${report.title}`,
                            message: `Your ${report.title} results are available. Status: ${report.status}.`,
                            type: 'INFO',
                            read: true,
                            createdAt: report.createdAt
                        });
                    } else if (report.status === 'PENDING') {
                        notifs.push({
                            id: `report-pending-${report._id}`,
                            title: `Report In Progress: ${report.title}`,
                            message: `Your ${report.title} is currently being processed in the lab.`,
                            type: 'WARNING',
                            read: false,
                            createdAt: report.createdAt
                        });
                    }
                });
            }

            // Sort by date, newest first
            notifs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setNotifications(notifs);
        } catch (err) {
            console.error('Error generating notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
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
                    <div className="section-title">All Notifications</div>
                    <div className="section-subtitle">{unreadCount} unread — Generated from your live data</div>
                </div>
                {notifications.length > 0 && (
                    <button className="btn btn-outline btn-sm" onClick={markAllRead}>Mark all as read</button>
                )}
            </div>

            <div className="timeline mt-3">
                {notifications.length > 0 ? (
                    notifications.map((notif) => {
                        let bulletColor = '#38bdf8'; // INFO
                        if (notif.type === 'ALERT') bulletColor = '#f87171';
                        else if (notif.type === 'WARNING') bulletColor = '#fbbf24';

                        return (
                            <div key={notif.id} className="timeline-item" style={{ opacity: notif.read ? 0.6 : 1 }}>
                                <div className="timeline-bullet" style={{ background: bulletColor }}></div>
                                <div className="timeline-content">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <strong>{notif.title}</strong>
                                        {!notif.read && (
                                            <span className="chip" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>New</span>
                                        )}
                                        {notif.type === 'ALERT' && <span className="chip-danger" style={{ fontSize: '0.65rem' }}>Alert</span>}
                                        {notif.type === 'WARNING' && <span className="chip-warning" style={{ fontSize: '0.65rem' }}>Warning</span>}
                                        {notif.type === 'INFO' && <span className="chip-neutral" style={{ fontSize: '0.65rem' }}>Info</span>}
                                    </div>
                                    <div className="timeline-meta">{notif.message}</div>
                                    <div className="timeline-meta" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                                        {new Date(notif.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem' }} className="muted">
                        No notifications yet. You're all caught up!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
