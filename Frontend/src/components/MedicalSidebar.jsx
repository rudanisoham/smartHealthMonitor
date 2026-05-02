import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Pill, 
  FileText, 
  Upload, 
  Search, 
  Settings, 
  LogOut,
  PlusCircle,
  ClipboardList
} from 'lucide-react';

const MedicalSidebar = ({ collapsed }) => {
  const navItems = [
    { 
      section: 'Main',
      items: [
        { path: '/medical/dashboard', icon: <LayoutDashboard className="nav-icon" />, label: 'Dashboard' },
        { path: '/medical/inventory', icon: <Pill className="nav-icon" />, label: 'Medicine Inventory' },
        { path: '/medical/prescriptions', icon: <ClipboardList className="nav-icon" />, label: 'Prescriptions' },
      ]
    },
    {
      section: 'Diagnostics',
      items: [
        { path: '/medical/patient-search', icon: <Search className="nav-icon" />, label: 'Patient Lookup' },
        { path: '/medical/upload-report', icon: <Upload className="nav-icon" />, label: 'Upload Report' },
        { path: '/medical/reports', icon: <FileText className="nav-icon" />, label: 'Medical Reports' },
      ]
    },
    {
      section: 'System',
      items: [
        { path: '/medical/settings', icon: <Settings className="nav-icon" />, label: 'Settings' },
      ]
    }
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Pill size={24} />
        </div>
        {!collapsed && (
          <div className="sidebar-logo-text">
            Smart Health <span>Medical Portal</span>
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
            // handle logout
            window.location.href = '/auth/medical/login';
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

export default MedicalSidebar;
