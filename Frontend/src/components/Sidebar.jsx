import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  BarChart2,
  Activity,
  TrendingUp,
  Sparkles,
  Calendar,
  Pill,
  FileText,
  Bell,
  User,
  LogOut
} from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/patient/dashboard', icon: <BarChart2 size={20} /> },
    { name: 'Health data', path: '/patient/health-data', icon: <Activity size={20} /> },
    { name: 'Analytics', path: '/patient/analytics', icon: <TrendingUp size={20} /> },
    { name: 'AI checker', path: '/patient/ai-checker', icon: <Sparkles size={20} /> },
    { name: 'Appointments', path: '/patient/appointments', icon: <Calendar size={20} /> },
    { name: 'Prescriptions', path: '/patient/prescriptions', icon: <Pill size={20} /> },
    { name: 'Reports', path: '/patient/reports', icon: <FileText size={20} /> },
    { name: 'Notifications', path: '/patient/notifications', icon: <Bell size={20} /> },
    { name: 'Profile', path: '/patient/profile', icon: <User size={20} /> },
  ];

  const logout = () => {
    navigate('/auth/patient/login');
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
            <p>PATIENT PORTAL</p>
          </div>
        )}
      </div>

      <div className="sidebar-section">
        {!isCollapsed && <h3 className="section-title">NAVIGATION</h3>}
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

export default Sidebar;
