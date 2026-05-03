import React from 'react';
import { useLocation } from 'react-router-dom';

const TopHeader = ({ toggleSidebar }) => {
    const location = useLocation();

    // Generate page title based on the route
    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('dashboard')) return 'Patient Dashboard';
        if (path.includes('health-data')) return 'Health Data';
        if (path.includes('analytics')) return 'Health Analytics';
        if (path.includes('ai-checker')) return 'AI Checker';
        if (path.includes('appointments')) return 'Appointments';
        if (path.includes('prescriptions')) return 'Prescriptions';
        if (path.includes('reports')) return 'Medical Reports';
        if (path.includes('notifications')) return 'Notifications';
        if (path.includes('profile')) return 'Patient Profile';
        return 'Patient Portal';
    };

    return (
        <header className="admin-header">
            <div className="header-left">
                <button type="button" className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
                    <span className="sidebar-toggle-icon"></span>
                </button>
                <div>
                    <div className="page-title">
                        {getPageTitle()}
                        <span className="page-subtitle-mobile">Overview</span>
                    </div>
                </div>
            </div>
            <div className="header-right">
                <div className="header-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem', lineHeight: '0' }}>&bull;</span>
                    <span>Signed in</span>
                </div>
                <div className="header-avatar" title="Patient">
                    <span>P</span>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;
