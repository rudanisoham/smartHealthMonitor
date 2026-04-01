import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/TopHeader.css';

const TopHeader = ({ toggleSidebar, isSidebarCollapsed }) => {
    const location = useLocation();

    // Determine header content based on current route
    let title = "Dashboard";
    let subtitle = "Your health summary and upcoming schedule";

    if (location.pathname.includes('health-data')) {
        title = "Health Data";
        subtitle = "Log and monitor your vital signs";
    } else if (location.pathname.includes('analytics')) {
        title = "Analytics";
        subtitle = "Detailed analysis of your health metrics";
    } else if (location.pathname.includes('ai-checker')) {
        title = "AI Symptom Checker";
        subtitle = "Get instant health insights based on your symptoms and vitals";
    } else if (location.pathname.includes('appointments')) {
        title = "Appointments";
        subtitle = "Book, view and manage your visits";
    } else if (location.pathname.includes('prescriptions')) {
        title = "Prescriptions";
        subtitle = "View all your medicines and doctor instructions";
    } else if (location.pathname.includes('reports')) {
        title = "Health Reports";
        subtitle = "Overview of your appointments, prescriptions and vitals";
    } else if (location.pathname.includes('notifications')) {
        title = "Notifications";
        subtitle = "Health alerts and system reminders";
    } else if (location.pathname.includes('profile')) {
        title = "Profile";
        subtitle = "Personal info, emergency contacts and account security";
    }

    return (
        <header className="global-top-header">
            <div className="header-title-section">
                <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                    {isSidebarCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                </button>
                <button className="mobile-menu-btn">
                    <Menu size={20} />
                </button>
                <div className="title-group-header">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>
            </div>
            <div className="header-actions-section">
                <div className="status-badge-header">
                    <span className="dot-header"></span>
                    Signed in
                </div>
                <div className="profile-avatar-header">P</div>
            </div>
        </header>
    );
};

export default TopHeader;
