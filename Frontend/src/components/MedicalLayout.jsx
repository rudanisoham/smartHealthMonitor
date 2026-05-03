import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MedicalSidebar from './MedicalSidebar';
import { Bell, Search, Menu, User, Settings } from 'lucide-react';

const MedicalLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className={`admin-app ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${mobileSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
      {/* Mobile Overlay */}
      <div className="sidebar-overlay" onClick={() => setMobileSidebarOpen(false)}></div>

      <MedicalSidebar collapsed={sidebarCollapsed} />

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="sidebar-toggle" 
              onClick={() => {
                if (window.innerWidth <= 1024) {
                  setMobileSidebarOpen(!mobileSidebarOpen);
                } else {
                  setSidebarCollapsed(!sidebarCollapsed);
                }
              }}
            >
              <Menu size={20} />
            </button>
            <h1 className="page-title">Medical Portal <span>Store & Lab Management</span></h1>
          </div>

          <div className="header-right">
            <div className="search-bar">
              <Search className="search-icon" size={18} />
              <input type="text" placeholder="Search medicine or patients..." />
            </div>
            
            <div className="header-pill">
              Pharmacy Active
            </div>

            <button className="btn-icon">
              <Bell size={20} />
            </button>

            <div className="header-avatar">
              <User size={20} />
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>

        <footer className="admin-footer">
          <p>&copy; 2026 Smart Health Monitor System • <strong>Medical Staff Console</strong></p>
        </footer>
      </main>
    </div>
  );
};

export default MedicalLayout;
