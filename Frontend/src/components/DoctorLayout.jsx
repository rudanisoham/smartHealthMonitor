import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import DoctorSidebar from './DoctorSidebar';
import DoctorHeader from './DoctorHeader';
import { getDoctorProfile } from '../utils/api';
import { RefreshCw } from 'lucide-react';

const getPageInfo = (pathname) => {
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
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const pageInfo = getPageInfo(location.pathname);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getDoctorProfile();
        if (res.data && res.data.success) {
            setDoctor(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch doctor profile', err);
        // If 401/403, we might want to redirect to login, but let's keep it for now
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <RefreshCw className="animate-spin" size={32} color="var(--primary)" />
      </div>
    );
  }

  // If doctor is not approved and NOT on the pending-approval page, redirect them
  if (doctor && !doctor.isApproved && !location.pathname.includes('pending-approval')) {
    return <Navigate to="/doctor/pending-approval" replace />;
  }

  // If doctor IS approved and tries to go to pending-approval, redirect to dashboard
  if (doctor && doctor.isApproved && location.pathname.includes('pending-approval')) {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return (
    <div className={`admin-app ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <DoctorSidebar />
      
      <main className="admin-main">
        <DoctorHeader 
          title={pageInfo.title} 
          subtitle={pageInfo.subtitle} 
          onToggleSidebar={toggleSidebar}
          doctorName={doctor?.user?.fullName || "Doctor"} 
        />

        <div className="admin-content">
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
