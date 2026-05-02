import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = ({ isCollapsed }) => {
    const location = useLocation();

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">SH</div>
                <div className="sidebar-logo-text sidebar-text">
                    <div>Smart Health</div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Patient Portal</span>
                </div>
            </div>

            <div className="sidebar-section-label sidebar-text">Navigation</div>
            <nav className="sidebar-nav">
                <NavLink to="/patient/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 19V5"></path>
                            <path d="M4 19h16"></path>
                            <path d="M8 17V9"></path>
                            <path d="M12 17V7"></path>
                            <path d="M16 17v-5"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Dashboard</span>
                </NavLink>

                <NavLink to="/patient/health-data" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4.5 12.75 9 8.25l3 3 4.5-4.5"></path>
                            <path d="M21 12a9 9 0 1 1-9-9"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Health data</span>
                </NavLink>

                <NavLink to="/patient/analytics" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4 19V5"></path>
                            <path d="M4 19h16"></path>
                            <path d="M8 17V9"></path>
                            <path d="M12 17V7"></path>
                            <path d="M16 17v-3"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Analytics</span>
                </NavLink>

                <NavLink to="/patient/ai-checker" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 3v3"></path>
                            <path d="M12 18v3"></path>
                            <path d="M4.22 4.22 5.64 5.64"></path>
                            <path d="M18.36 18.36 19.78 19.78"></path>
                            <path d="M3 12h3"></path>
                            <path d="M18 12h3"></path>
                            <circle cx="12" cy="12" r="4"></circle>
                        </svg>
                    </span>
                    <span className="sidebar-text">AI checker</span>
                </NavLink>

                <NavLink to="/patient/appointments" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7 3v4"></path>
                            <path d="M17 3v4"></path>
                            <path d="M3 9h18"></path>
                            <path d="M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Appointments</span>
                </NavLink>

                <NavLink to="/patient/prescriptions" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7 3h10v6H7z"></path>
                            <path d="M7 9l-2 4h14l-2-4"></path>
                            <path d="M7 13v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Prescriptions</span>
                </NavLink>

                <NavLink to="/patient/reports" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7 3h10v6H7z"></path>
                            <path d="M7 9h10v12H7z"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Reports</span>
                </NavLink>

                <NavLink to="/patient/notifications" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Notifications</span>
                </NavLink>

                <NavLink to="/patient/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Profile</span>
                </NavLink>

                <NavLink to="/patient/billing" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2v20"></path>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Billing</span>
                </NavLink>

                <NavLink to="/patient/reminders" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 8v4l3 3"></path>
                            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Reminders</span>
                </NavLink>

                <NavLink to="/patient/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </span>
                    <span className="sidebar-text">Settings</span>
                </NavLink>
            </nav>

            <div className="sidebar-section-label sidebar-text">Session</div>
            <div className="sidebar-nav">
                <NavLink to="/auth/patient/login" className="sidebar-link">
                    <span className="icon">
                        <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M10 16l-4-4 4-4"></path>
                            <path d="M6 12h9"></path>
                            <path d="M14 3h6v18h-6"></path>
                        </svg>
                    </span>
                    <span className="sidebar-text">Sign out</span>
                </NavLink>
            </div>

            <div className="sidebar-footer sidebar-text">
                <div><strong>SmartHealthMonitor</strong></div>
                <div className="mt-1">Track health, appointments & alerts.</div>
            </div>
        </aside>
    );
};

export default Sidebar;
