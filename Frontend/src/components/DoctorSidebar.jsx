import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Pill, Bell, User, Settings, LogOut } from 'lucide-react';

const DoctorSidebar = () => {
  return (
    <aside className="admin-sidebar" style={{overflowY: 'auto'}}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">SH</div>
        <div className="sidebar-logo-text sidebar-text">
          <div>Smart Health</div>
          <span>Doctor Console</span>
        </div>
      </div>

      <div className="sidebar-section-label sidebar-text">Navigation</div>
      <nav className="sidebar-nav">
        <NavLink 
          to="/doctor/dashboard" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <span className="icon"><LayoutDashboard className="nav-icon" /></span>
          <span className="sidebar-text">Dashboard</span>
        </NavLink>

        <NavLink 
          to="/doctor/patients" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <span className="icon"><Users className="nav-icon" /></span>
          <span className="sidebar-text">Patients</span>
        </NavLink>

        <NavLink 
          to="/doctor/appointments" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <span className="icon"><Calendar className="nav-icon" /></span>
          <span className="sidebar-text">Appointments</span>
        </NavLink>

        <NavLink 
          to="/doctor/prescriptions" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <span className="icon"><Pill className="nav-icon" /></span>
          <span className="sidebar-text">Prescriptions</span>
        </NavLink>

        <NavLink 
          to="/doctor/alerts" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <span className="icon"><Bell className="nav-icon" /></span>
          <span className="sidebar-text">Alerts</span>
        </NavLink>

        <NavLink 
          to="/doctor/profile" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <span className="icon"><User className="nav-icon" /></span>
          <span className="sidebar-text">Profile</span>
        </NavLink>

        <NavLink 
          to="/doctor/settings" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <span className="icon"><Settings className="nav-icon" /></span>
          <span className="sidebar-text">Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-section-label sidebar-text">Session</div>
      <div className="sidebar-nav">
        <NavLink to="/doctor/login" className="sidebar-link">
          <span className="icon"><LogOut className="nav-icon" /></span>
          <span className="sidebar-text">Sign out</span>
        </NavLink>
      </div>

      <div className="sidebar-footer sidebar-text">
        <div><strong>SmartHealthMonitor</strong></div>
        <div className="mt-1">Clinical workflows · Alerts · Prescriptions.</div>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
