import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FlaskConical, 
  FileText, 
  Upload, 
  Search, 
  Settings, 
  LogOut,
  ClipboardList,
  History
} from 'lucide-react';

const LabSidebar = ({ collapsed }) => {
  const navItems = [
    { 
      section: 'Main',
      items: [
        { path: '/lab/dashboard', icon: <LayoutDashboard className="nav-icon" />, label: 'Dashboard' },
        { path: '/lab/patient-search', icon: <Search className="nav-icon" />, label: 'Patient Lookup' },
      ]
    },
    {
      section: 'Reports',
      items: [
        { path: '/lab/upload-report', icon: <Upload className="nav-icon" />, label: 'Upload Report' },
        { path: '/lab/history', icon: <History className="nav-icon" />, label: 'Report History' },
        { path: '/lab/tests', icon: <FlaskConical className="nav-icon" />, label: 'Test Directory' },
      ]
    },
    {
      section: 'System',
      items: [
        { path: '/lab/settings', icon: <Settings className="nav-icon" />, label: 'Settings' },
      ]
    }
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          <FlaskConical size={24} />
        </div>
        {!collapsed && (
          <div className="sidebar-logo-text">
            Smart Health <span>Laboratory Portal</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav mt-6">
        {navItems.map((section, idx) => (
          <div key={idx} className="sidebar-section">
            {!collapsed && <div className="sidebar-section-label mt-4 mb-2">{section.section}</div>}
            {section.items.map((item) => (
              <NavLink 
                key={item.path}
                to={item.path} 
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                {!collapsed && <span className="sidebar-text">{item.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer mt-auto pt-4 border-top">
        <button 
          className="sidebar-link w-full text-danger" 
          style={{ cursor: 'pointer', textAlign: 'left', background: 'none', border: 'none' }}
          onClick={() => {
            window.location.href = '/auth/lab/login';
          }}
        >
          <span className="icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>
            <LogOut className="nav-icon" />
          </span>
          {!collapsed && <span className="sidebar-text">Sign out</span>}
        </button>
      </div>
    </aside>
  );
};

export default LabSidebar;
