import React from 'react';
import { Menu } from 'lucide-react';

const DoctorHeader = ({ title, subtitle, onToggleSidebar, doctorName = "Dr. Smith" }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
          <Menu size={20} />
        </button>
        <div className="page-title">
          {title}
          {subtitle && <span>{subtitle}</span>}
        </div>
      </div>
      
      <div className="header-right">
        <div className="header-pill">Available</div>
        <div className="header-avatar" title={doctorName}>
          {doctorName.charAt(4)} {/* 'Dr. S' -> 'S' */}
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader;
