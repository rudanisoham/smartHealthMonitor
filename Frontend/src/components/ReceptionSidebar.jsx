import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  BarChart2,
  UserPlus,
  Users,
  Calendar,
  Bed,
  CreditCard,
  Settings,
  LogOut
} from 'lucide-react';
import '../styles/Sidebar.css';

const ReceptionSidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/reception/dashboard', icon: <BarChart2 size={20} /> },
    { name: 'Patient Entry', path: '/reception/patient-entry', icon: <UserPlus size={20} /> },
    { name: 'Patients', path: '/reception/patients', icon: <Users size={20} /> },
    { name: 'Appointments', path: '/reception/appointments', icon: <Calendar size={20} /> },
    { name: 'Bed Management', path: '/reception/beds', icon: <Bed size={20} /> },
    { name: 'Billing', path: '/reception/billing', icon: <CreditCard size={20} /> },
    { name: 'Settings', path: '/reception/settings', icon: <Settings size={20} /> },
  ];

  const logout = () => {
    // Navigate to reception login
    navigate('/auth/reception/login');
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-logo">
          <span>SH</span>
        </div>
        {!isCollapsed && (
          <div className="brand-text">
            <h2>Smart Health</h2>
            <p>RECEPTION PANEL</p>
          </div>
        )}
      </div>

      <div className="sidebar-section">
        {!isCollapsed && <h3 className="section-title">MANAGEMENT</h3>}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
              title={isCollapsed ? item.name : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isCollapsed && <span className="nav-text">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-section session-section">
        {!isCollapsed && <h3 className="section-title">SESSION</h3>}
        <button className="nav-item btn-signout" onClick={logout} title={isCollapsed ? 'Sign out' : ''}>
          <span className="nav-icon"><LogOut size={20} /></span>
          {!isCollapsed && <span className="nav-text">Sign out</span>}
        </button>
      </div>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <p>SmartHealthMonitor</p>
        </div>
      )}
    </aside>
  );
};

export default ReceptionSidebar;
