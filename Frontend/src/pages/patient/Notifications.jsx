import React, { useState, useEffect } from 'react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Mock data
        const initial = [
            {
                id: 1,
                title: 'High Blood Pressure Alert',
                message: 'Your recent blood pressure reading was significantly higher than normal. Please consult a doctor.',
                type: 'ALERT',
                read: false,
                createdAt: '2026-05-02T10:30:00'
            },
            {
                id: 2,
                title: 'Appointment Reminder',
                message: 'You have an upcoming appointment with Dr. Sarah Jenkins tomorrow at 10:00 AM.',
                type: 'WARNING',
                read: false,
                createdAt: '2026-05-01T14:15:00'
            },
            {
                id: 3,
                title: 'Profile Updated',
                message: 'Your personal information was successfully updated.',
                type: 'INFO',
                read: true,
                createdAt: '2026-04-28T09:00:00'
            }
        ];
        setNotifications(initial);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <div className="card">
            <div className="card-header">
                <div>
                    <div className="section-title">All Notifications</div>
                    <div className="section-subtitle">{unreadCount} unread</div>
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
                                        {notif.createdAt.replace('T', ' ').substring(0, 16)}
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
