import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import ReceptionSidebar from './ReceptionSidebar';
import TopHeader from './TopHeader';

/**
 * ReceptionLayout — only renders for RECEPTIONIST or ADMIN role.
 * Any other role is redirected to the reception login page.
 */
const ReceptionLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    // ── Role Guard ──────────────────────────────────────────────────────────
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    // Not logged in at all → go to reception login
    if (!token || !userStr) {
        return <Navigate to="/auth/reception/login" replace />;
    }

    let user = null;
    try { user = JSON.parse(userStr); } catch (_) {}

    // Logged in as wrong role → go to reception login with a hint
    const allowedRoles = ['RECEPTIONIST', 'ADMIN'];
    if (!user || !allowedRoles.includes(user.role)) {
        // Clear any cross-portal session to avoid confusion
        // (don't clear — patient may be in another tab; just redirect)
        return <Navigate to="/auth/reception/login" replace />;
    }
    // ────────────────────────────────────────────────────────────────────────

    const toggleSidebar = () => setIsSidebarCollapsed(v => !v);

    return (
        <div className={`admin-app ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <ReceptionSidebar isCollapsed={isSidebarCollapsed} />
            <div className="sidebar-overlay" onClick={toggleSidebar}></div>
            <main className="admin-main">
                <TopHeader toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
                <div className="admin-content">
                    <Outlet />
                </div>
                <footer className="admin-footer">
                    &copy; {new Date().getFullYear()} Smart Health Monitor — Reception Desk. All rights reserved.
                </footer>
            </main>
        </div>
    );
};

export default ReceptionLayout;
