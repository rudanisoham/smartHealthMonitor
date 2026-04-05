import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DoctorSidebar from './DoctorSidebar';
import DoctorHeader from './DoctorHeader';

const getPageInfo = (pathname) => {
  // Return title and subtitle based on route
  if (pathname.includes('/dashboard')) return { title: 'Dashboard', subtitle: 'Your clinical overview and upcoming appointments' };
  if (pathname.includes('/patients')) return { title: 'Patients', subtitle: 'Manage your patient roster and medical records' };
  if (pathname.includes('/appointments')) return { title: 'Appointments', subtitle: 'View and manage your schedule' };
  if (pathname.includes('/prescriptions')) return { title: 'Prescriptions', subtitle: 'Issue and track digital prescriptions' };
  if (pathname.includes('/alerts')) return { title: 'Alerts', subtitle: 'Critical notices and AI-driven insights' };
  if (pathname.includes('/profile')) return { title: 'Profile', subtitle: 'Your clinical identity and department' };
  if (pathname.includes('/settings')) return { title: 'Settings', subtitle: 'Configure your clinic portal preferences' };
  if (pathname.includes('/add-diagnosis')) return { title: 'Add Diagnosis', subtitle: 'Record a new clinical finding' };
  if (pathname.includes('/report-view')) return { title: 'Medical Report', subtitle: 'Review pathology and diagnostic reports' };
  return { title: 'Doctor Console', subtitle: '' };
};

const DoctorLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const pageInfo = getPageInfo(location.pathname);

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);

  // In a real app, this would come from a Context/State manager
  const mockDoctor = { name: "Dr. Smith", isApproved: true };

  return (
    <div className={`admin-app ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <DoctorSidebar />
      
      <main className="admin-main">
        <DoctorHeader 
          title={pageInfo.title} 
          subtitle={pageInfo.subtitle} 
          onToggleSidebar={toggleSidebar}
          doctorName={mockDoctor.name} 
        />

        <div className="admin-content">
          {/* Approval Warning Banner */}
          {!mockDoctor.isApproved && (
            <div style={{padding: '1rem 1.25rem', background: 'rgba(251,191,36,0.15)', border: '1px solid #fbbf24', borderRadius: '10px', color: '#fbbf24', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
              <span style={{fontSize: '1.25rem'}}>⏳</span>
              <div>
                <strong>Application Under Review</strong>
                <div style={{fontSize: '0.875rem', marginTop: '0.2rem', opacity: 0.85}}>Your account is pending admin approval. Some features may be restricted until approved.</div>
              </div>
            </div>
          )}

          {/* Render nested routes */}
          <Outlet />

        </div>

        <footer className="admin-footer">
           © 2026 Smart Health Monitor. All rights reserved. Secure Cloud Environment.
        </footer>
      </main>
    </div>
  );
};

export default DoctorLayout;
