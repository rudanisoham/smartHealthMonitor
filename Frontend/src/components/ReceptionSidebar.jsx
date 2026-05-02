import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Calendar,
  Bed,
  CreditCard,
  Settings,
  LogOut,
  Hospital
} from 'lucide-react';

const ReceptionSidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/reception/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Patient Entry', path: '/reception/patient-entry', icon: <UserPlus size={18} /> },
    { name: 'Patients', path: '/reception/patients', icon: <Users size={18} /> },
    { name: 'Appointments', path: '/reception/appointments', icon: <Calendar size={18} /> },
    { name: 'Bed Management', path: '/reception/beds', icon: <Bed size={18} /> },
    { name: 'Billing', path: '/reception/billing', icon: <CreditCard size={18} /> },
    { name: 'Settings', path: '/reception/settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Hospital size={22} strokeWidth={2.5} />
        </div>
        <div className="sidebar-logo-text sidebar-text">
          <div>Smart Health</div>
          <span>Reception Desk</span>
        </div>
      </div>

      <div className="sidebar-section-label sidebar-text">Management</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span className="sidebar-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-section-label sidebar-text">Session</div>
      <div className="sidebar-nav">
        <button 
          onClick={() => navigate('/auth/reception/login')} 
          className="sidebar-link"
          style={{ width: '100%', cursor: 'pointer' }}
        >
          <span className="icon"><LogOut size={18} /></span>
          <span className="sidebar-text">Sign out</span>
        </button>
      </div>

      <div className="sidebar-footer sidebar-text">
        <div><strong>Reception Portal</strong></div>
        <div className="mt-1">Hospital Management System v2.0</div>
      </div>
    </aside>
  );
};

export default ReceptionSidebar;
