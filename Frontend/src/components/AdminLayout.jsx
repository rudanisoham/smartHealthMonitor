import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/admin.css';

export default function AdminLayout({ children, title, subtitle }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`admin-app ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" style={{background: '#2563EB', borderRadius: '50%'}}>SH</div>
          <div className="sidebar-logo-text">
            <div style={{fontWeight: '800', color: '#1E293B', fontSize: '1.2rem'}}>Smart Health</div>
            <span style={{fontSize: '0.75rem', color: '#64728B', letterSpacing: '0.05em'}}>ADMIN CONSOLE</span>
          </div>
        </div>

        <div className="sidebar-section-label mt-4">NAVIGATION</div>
        <nav className="sidebar-nav" style={{flex: 1}}>
          <Link to="/admin/dashboard" className={`sidebar-link ${currentPath === '/admin/dashboard' ? 'active' : ''}`} title={isCollapsed ? "Dashboard" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span>
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/doctors" className={`sidebar-link ${currentPath === '/admin/doctors' ? 'active' : ''}`} title={isCollapsed ? "Doctors" : ""}>
             <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <span>Doctors</span>
          </Link>
          <Link to="/admin/patients" className={`sidebar-link ${currentPath === '/admin/patients' ? 'active' : ''}`} title={isCollapsed ? "Patients" : ""}>
             <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <span>Patients</span>
          </Link>
          <Link to="/admin/departments" className={`sidebar-link ${currentPath.startsWith('/admin/departments') ? 'active' : ''}`} title={isCollapsed ? "Departments" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/></svg>
            </span>
            <span>Departments</span>
          </Link>
          <Link to="/admin/analytics" className={`sidebar-link ${currentPath === '/admin/analytics' ? 'active' : ''}`} title={isCollapsed ? "Reports & Analytics" : ""}>
             <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>
            </span>
            <span>Reports & Analytics</span>
          </Link>
          <Link to="/admin/logs" className={`sidebar-link ${currentPath === '/admin/logs' ? 'active' : ''}`} title={isCollapsed ? "System Logs" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            </span>
            <span>System Logs</span>
          </Link>
          <Link to="/admin/settings" className={`sidebar-link ${currentPath === '/admin/settings' ? 'active' : ''}`} title={isCollapsed ? "Settings" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </span>
            <span>Settings</span>
          </Link>
        </nav>

        {/* Session Section & Footer */}
        <div style={{marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div>
            <div className="sidebar-section-label">SESSION</div>
            <Link to="/auth/admin/login" className="sidebar-link" style={{display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '0.85rem 1rem', background: 'transparent', border: 'none', color: '#4B5563', cursor: 'pointer', fontWeight: '500', borderRadius: '12px', transition: 'all 0.2s', textDecoration: 'none'}} onMouseOver={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#111827'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#4B5563'; }} title={isCollapsed ? "Sign out" : ""}>
              <span className="icon" style={{width: '40px', height: '40px', minWidth: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F4F6', borderRadius: '10px', color: '#6B7280', transition: 'all 0.2s'}}>
                <svg className="nav-icon" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              </span>
              <span>Sign out</span>
            </Link>
          </div>
          
          <div className="sidebar-footer-text" style={{paddingTop: '0.5rem'}}>
            <div style={{fontWeight: '800', fontSize: '0.85rem', color: '#111827'}}>SmartHealthMonitor</div>
            <div className="muted" style={{fontSize: '0.75rem', marginTop: '0.35rem', lineHeight: '1.4'}}>Optimized for hospital operations & insights.</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="sidebar-toggle" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              title={isCollapsed ? "Show Sidebar" : "Hide Sidebar"}
            >
              <svg className="nav-icon" viewBox="0 0 24 24" style={{width: '24px', height: '24px'}}>
                {isCollapsed ? (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                ) : (
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                )}
              </svg>
            </button>
            <h1 className="page-title">{title} <span>{subtitle}</span></h1>
          </div>
          <div className="header-right">
            <div className="header-avatar">A</div>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
