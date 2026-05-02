import React from 'react';
import { Outlet } from 'react-router-dom';
import ReceptionSidebar from './ReceptionSidebar';
import TopHeader from './TopHeader';

const ReceptionLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

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
                    &copy; {new Date().getFullYear()} Smart Health Monitor - Reception Desk. All rights reserved.
                </footer>
            </main>
        </div>
    );
};

export default ReceptionLayout;
