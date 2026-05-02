import React from 'react';
import { Outlet } from 'react-router-dom';
import ReceptionSidebar from './ReceptionSidebar';
import TopHeader from './TopHeader';
import '../styles/PatientLayout.css'; // Reusing the same layout base styles

const ReceptionLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`patient-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <ReceptionSidebar isCollapsed={isSidebarCollapsed} />
            <main className="main-content">
                <TopHeader toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
                <div className="page-content-wrapper">
                    <Outlet />
                </div>
                <footer className="portal-footer">
                    &copy; 2026 Smart Health Monitor - Reception Panel.
                </footer>
            </main>
        </div>
    );
};

export default ReceptionLayout;
