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
          <div className="sidebar-logo-icon">SH</div>
          <div className="sidebar-logo-text">
            <div style={{fontWeight: '900', color: '#0F172A', fontSize: '1.2rem', letterSpacing: '-0.02em'}}>Smart Health</div>
            <span>ADMIN CONSOLE</span>
          </div>
        </div>

        <div className="sidebar-section-label mt-4">NAVIGATION</div>
        <nav className="sidebar-nav" style={{flex: 1}}>
          <Link to="/admin/dashboard" className={`sidebar-link ${currentPath === '/admin/dashboard' ? 'active' : ''}`} title={isCollapsed ? "Dashboard" : ""}>
            <span className="icon">
              {/* Home Icon */}
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span>
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/doctors" className={`sidebar-link ${currentPath.startsWith('/admin/doctors') ? 'active' : ''}`} title={isCollapsed ? "Doctors" : ""}>
             <span className="icon">
              {/* User Icon */}
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <span>Doctors</span>
          </Link>
          <Link to="/admin/patients" className={`sidebar-link ${currentPath.startsWith('/admin/patients') ? 'active' : ''}`} title={isCollapsed ? "Patients" : ""}>
             <span className="icon">
              {/* User Outline Icon */}
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span>
            <span>Patients</span>
          </Link>
          <Link to="/admin/departments" className={`sidebar-link ${currentPath.startsWith('/admin/departments') ? 'active' : ''}`} title={isCollapsed ? "Departments" : ""}>
            <span className="icon">
              {/* Building Icon */}
              <svg className="nav-icon" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>
            </span>
            <span>Departments</span>
          </Link>
          <Link to="/admin/reports" className={`sidebar-link ${currentPath.startsWith('/admin/reports') ? 'active' : ''}`} title={isCollapsed ? "Reports & Analytics" : ""}>
             <span className="icon">
              {/* Bar Chart Icon */}
              <svg className="nav-icon" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </span>
            <span>Reports & Analytics</span>
          </Link>
          <Link to="/admin/logs" className={`sidebar-link ${currentPath === '/admin/logs' ? 'active' : ''}`} title={isCollapsed ? "System Logs" : ""}>
            <span className="icon">
              {/* List Lines Icon */}
              <svg className="nav-icon" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </span>
            <span>System Logs</span>
          </Link>
          <Link to="/admin/settings" className={`sidebar-link ${currentPath === '/admin/settings' ? 'active' : ''}`} title={isCollapsed ? "Settings" : ""}>
            <span className="icon">
              {/* Gear Icon (Simplified) */}
              <svg className="nav-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </span>
            <span>Settings</span>
          </Link>
        </nav>

        {/* Session Section & Footer */}
        <div style={{marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div>
            <div className="sidebar-section-label">SESSION</div>
            <Link to="/auth/admin/login" className="sidebar-link" title={isCollapsed ? "Sign out" : ""}>
              <span className="icon">
                {/* Log Out Icon */}
                <svg className="nav-icon" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              </span>
              <span>Sign out</span>
            </Link>
          </div>
          
          <div className="sidebar-footer-text" style={{paddingTop: '0.5rem', paddingLeft: '1rem'}}>
            <div style={{fontWeight: '800', fontSize: '0.85rem', color: '#0F172A'}}>SmartHealthMonitor</div>
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
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
              <h1 className="page-title" style={{margin: 0}}>{title}</h1>
              {subtitle && <span style={{fontSize: '0.85rem', color: '#64748B'}}>{subtitle}</span>}
            </div>
          </div>
          <div className="header-right" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{background: '#EFF6FF', color: '#1D4ED8', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid #BFDBFE'}}>
              <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB', display: 'inline-block'}}></span>
              System Healthy
            </div>
            <div className="header-avatar" style={{background: '#1D4ED8', color: 'white'}}>A</div>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
