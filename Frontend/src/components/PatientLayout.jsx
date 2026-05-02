import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

const PatientLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`admin-app ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Sidebar isCollapsed={isSidebarCollapsed} />
            <div className="sidebar-overlay" onClick={toggleSidebar}></div>
            <main className="admin-main">
                <TopHeader toggleSidebar={toggleSidebar} />
                <div className="admin-content">
                    <Outlet />
                </div>
                <footer className="admin-footer">
                    &copy; {new Date().getFullYear()} Smart Health Monitor. All rights reserved.
                </footer>
            </main>
        </div>
    );
};

export default PatientLayout;
