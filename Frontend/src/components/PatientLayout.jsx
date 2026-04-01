import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import '../styles/PatientLayout.css';

const PatientLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className={`patient-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Sidebar isCollapsed={isSidebarCollapsed} />
            <main className="main-content">
                <TopHeader toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
                <div className="page-content-wrapper">
                    <Outlet />
                </div>
                <footer className="portal-footer">
                    &copy; 2026 Smart Health Monitor - Patient Portal.
                </footer>
            </main>
        </div>
    );
};

export default PatientLayout;
