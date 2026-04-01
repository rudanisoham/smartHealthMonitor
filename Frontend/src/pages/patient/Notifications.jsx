import React from 'react';
import { Menu } from 'lucide-react';
import '../../styles/Notifications.css';

const Notifications = () => {
    return (
        <div className="notifications-container">
            {/* Header */}
            <header className="page-header">
                <div className="header-title">
                    <button className="mobile-menu-btn">
                        <Menu size={20} />
                    </button>
                    <div>
                        <h1>Notifications</h1>
                        <p>Health alerts and system reminders</p>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="status-badge">
                        <span className="dot"></span>
                        Signed in
                    </div>
                    <div className="profile-avatar">P</div>
                </div>
            </header>

            {/* Main Content */}
            <div className="notifications-content">

                <div className="full-panel px-0">

                    <div className="panel-header-flex px-8 pt-8 pb-4 border-b">
                        <div>
                            <h2>All Notifications</h2>
                            <p>2 unread</p>
                        </div>
                        <button className="btn-outline-small">
                            Mark all as read
                        </button>
                    </div>

                    <div className="notifications-list">

                        {/* Notification Item 1 */}
                        <div className="notification-item unread">
                            <div className="unread-indicator"></div>
                            <div className="notification-body">
                                <div className="notification-title-row">
                                    <h3 className="notification-title">New Prescription</h3>
                                    <span className="badge-new">New</span>
                                    <span className="badge-info">Info</span>
                                </div>
                                <p className="notification-desc">
                                    Dr. Renish issued a prescription.
                                </p>
                                <span className="notification-time">2026-04-01 10:16</span>
                            </div>
                        </div>

                        {/* Notification Item 2 */}
                        <div className="notification-item unread">
                            <div className="unread-indicator"></div>
                            <div className="notification-body">
                                <div className="notification-title-row">
                                    <h3 className="notification-title">Emergency Alert Sent</h3>
                                    <span className="badge-new">New</span>
                                    <span className="badge-info">Info</span>
                                </div>
                                <p className="notification-desc">
                                    We have messaged your emergency contact (9316202895) about your current status.
                                </p>
                                <span className="notification-time">2026-04-01 03:56</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Notifications;
