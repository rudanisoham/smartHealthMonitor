import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/admin.css';

export default function AdminLayout({ children, title, subtitle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const sidebarRef = useRef(null);
  
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = sessionStorage.getItem('adminSidebarCollapsed');
    return saved === 'true';
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Restore scroll position on mount
  useEffect(() => {
    if (sidebarRef.current) {
      const savedScroll = sessionStorage.getItem('adminSidebarScroll');
      if (savedScroll) {
        sidebarRef.current.scrollTop = parseInt(savedScroll, 10);
      }
    }
  }, []);

  // Handle scroll to save position
  const handleSidebarScroll = (e) => {
    sessionStorage.setItem('adminSidebarScroll', e.target.scrollTop);
  };

  // Close mobile menu when navigating
  useEffect(() => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  }, [currentPath, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      sessionStorage.setItem('adminSidebarCollapsed', newState);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className={`admin-app ${!isMobile && isCollapsed ? 'sidebar-collapsed' : ''} ${isMobile && isMobileOpen ? 'mobile-sidebar-open' : ''}`}>
      
      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        onScroll={handleSidebarScroll}
        className={`admin-sidebar ${!isMobile && isCollapsed ? 'collapsed' : ''}`}
      >
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">SH</div>
          <div className="sidebar-logo-text sidebar-text">
            <div>Smart Health</div>
            <span className="text-xs text-muted">Admin Console</span>
          </div>
        </div>

        <div className="sidebar-section-label sidebar-text">Navigation</div>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard" className={`sidebar-link ${currentPath === '/admin/dashboard' ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Dashboard" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 10.5 12 3l9 7.5"></path>
                  <path d="M5 10v11h14V10"></path>
              </svg>
            </span>
            <span className="sidebar-text">Dashboard</span>
          </Link>
          <Link to="/admin/doctors" className={`sidebar-link ${currentPath === '/admin/doctors' ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Doctors" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
              </svg>
            </span>
            <span className="sidebar-text">Doctors</span>
          </Link>
          <Link to="/admin/doctors/requests" className={`sidebar-link ${currentPath === '/admin/doctors/requests' ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Pending Approvals" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </span>
            <span className="sidebar-text">Pending Approvals</span>
          </Link>
          <Link to="/admin/patients" className={`sidebar-link ${currentPath.startsWith('/admin/patients') ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Patients" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
              </svg>
            </span>
            <span className="sidebar-text">Patients</span>
          </Link>
        </nav>

        <div className="sidebar-section-label sidebar-text">Staff Management</div>
        <nav className="sidebar-nav">
          <Link to="/admin/staff?role=RECEPTIONIST" className={`sidebar-link ${currentPath.includes('receptionist') || (currentPath === '/admin/staff' && location.search.includes('RECEPTIONIST')) ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Receptionists" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </span>
            <span className="sidebar-text">Receptionists</span>
          </Link>
          <Link to="/admin/staff?role=MEDICAL_STAFF" className={`sidebar-link ${currentPath.includes('medical-staff') || (currentPath === '/admin/staff' && location.search.includes('MEDICAL_STAFF')) ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Medical Staff" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </span>
            <span className="sidebar-text">Medical Staff</span>
          </Link>
          <Link to="/admin/staff?role=LAB_STAFF" className={`sidebar-link ${currentPath.includes('lab-staff') || (currentPath === '/admin/staff' && location.search.includes('LAB_STAFF')) ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Lab Staff" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </span>
            <span className="sidebar-text">Lab Staff</span>
          </Link>
        </nav>

        <div className="sidebar-section-label sidebar-text">Operations</div>
        <nav className="sidebar-nav">
          <Link to="/admin/departments" className={`sidebar-link ${currentPath.startsWith('/admin/departments') ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Departments" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 21h18"></path>
                  <path d="M6 21V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"></path>
                  <path d="M10 9h4"></path>
                  <path d="M10 13h4"></path>
                  <path d="M10 17h4"></path>
              </svg>
            </span>
            <span className="sidebar-text">Departments</span>
          </Link>
          <Link to="/admin/reports" className={`sidebar-link ${currentPath.startsWith('/admin/reports') ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Reports & Analytics" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 19V5"></path>
                  <path d="M4 19h16"></path>
                  <path d="M8 17V9"></path>
                  <path d="M12 17V7"></path>
                  <path d="M16 17v-5"></path>
              </svg>
            </span>
            <span className="sidebar-text">Reports & Analytics</span>
          </Link>
          <Link to="/admin/logs" className={`sidebar-link ${currentPath.startsWith('/admin/logs') ? 'active' : ''}`} title={isCollapsed && !isMobile ? "System Logs" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 4h12"></path>
                  <path d="M6 8h12"></path>
                  <path d="M6 12h12"></path>
                  <path d="M6 16h12"></path>
                  <path d="M6 20h12"></path>
              </svg>
            </span>
            <span className="sidebar-text">System Logs</span>
          </Link>
          <Link to="/admin/reviews" className={`sidebar-link ${currentPath.startsWith('/admin/reviews') ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Doctor Reviews" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </span>
            <span className="sidebar-text">Doctor Reviews</span>
          </Link>
          <Link to="/admin/feedback" className={`sidebar-link ${currentPath.startsWith('/admin/feedback') ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Feedback & Inquiries" : ""}>
            <span className="icon" style={{ position: 'relative' }}>
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--danger)', width: '8px', height: '8px', borderRadius: '50%', border: '2px solid white' }}></span>
            </span>
            <span className="sidebar-text">Feedback & Inquiries</span>
          </Link>
          <Link to="/admin/messaging" className={`sidebar-link ${currentPath.startsWith('/admin/messaging') ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Broadcast Center" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <line x1="9" y1="10" x2="15" y2="10"></line>
                  <line x1="12" y1="7" x2="12" y2="13"></line>
              </svg>
            </span>
            <span className="sidebar-text">Broadcast Center</span>
          </Link>
          <Link to="/admin/site-content" className={`sidebar-link ${currentPath.startsWith('/admin/site-content') ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Site Content" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </span>
            <span className="sidebar-text">Site Content</span>
          </Link>
          <Link to="/admin/settings" className={`sidebar-link ${currentPath.startsWith('/admin/settings') ? 'active' : ''}`} title={isCollapsed && !isMobile ? "Settings" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"></path>
                  <path d="M19.4 15a7.9 7.9 0 0 0 .1-1l2-1.5-2-3.5-2.4 1a8 8 0 0 0-1.7-1L15 4h-6l-.4 2.5a8 8 0 0 0-1.7 1l-2.4-1-2 3.5L4.6 14a7.9 7.9 0 0 0 .1 1l-2 1.5 2 3.5 2.4-1a8 8 0 0 0 1.7 1L9 20h6l.4-2.5a8 8 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5z"></path>
              </svg>
            </span>
            <span className="sidebar-text">Settings</span>
          </Link>
        </nav>

        <div className="sidebar-section-label sidebar-text">Session</div>
        <div className="sidebar-nav">
          <a href="#" onClick={handleLogout} className="sidebar-link" title={isCollapsed && !isMobile ? "Sign out" : ""}>
            <span className="icon">
              <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M10 16l-4-4 4-4"></path>
                  <path d="M6 12h9"></path>
                  <path d="M14 3h6v18h-6"></path>
              </svg>
            </span>
            <span className="sidebar-text">Sign out</span>
          </a>
        </div>

        {/* Footer */}
        <div className="sidebar-footer sidebar-text">
          <div><strong>SmartHealthMonitor</strong></div>
          <div className="mt-1">Optimized for hospital operations &amp; insights.</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button 
              type="button"
              className="sidebar-toggle" 
              onClick={toggleSidebar}
              title={isMobile ? "Toggle Sidebar" : (isCollapsed ? "Show Sidebar" : "Hide Sidebar")}
            >
              <span className="sidebar-toggle-icon"></span>
            </button>
            <div>
              <div className="page-title">
                {title || "Admin Panel"}
              </div>
              <div className="page-title">
                <span>
                  {subtitle || "Smart Health Monitor"}
                </span>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="header-pill">
              <span>●</span>
              <span>System Healthy</span>
            </div>
            <div className="header-avatar">
              <span>A</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
