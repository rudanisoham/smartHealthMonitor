import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout title="Admin Dashboard" subtitle="System overview and realtime metrics">
      <div className="grid grid-4 mb-6">
        
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Total Patients</div>
              <div className="muted mt-1">Registered in system</div>
            </div>
          </div>
          <div className="card-value" style={{color: '#1E40AF'}}>4</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Verified Doctors</div>
              <div className="muted mt-1">Active practitioners</div>
            </div>
          </div>
          <div className="card-value" style={{color: '#3B82F6'}}>2</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Total Appointments</div>
              <div className="muted mt-1">Over all time</div>
            </div>
          </div>
          <div className="card-value" style={{color: '#10B981'}}>5</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Departments</div>
              <div className="muted mt-1">Hospital units</div>
            </div>
          </div>
          <div className="card-value" style={{color: '#8B5CF6'}}>0</div>
        </div>

      </div>
      
      <div className="grid grid-2">
        <div className="card">
            <div className="card-header">
                <div>
                    <div className="card-title">Quick Actions</div>
                    <div className="muted mt-1">Common administrative tasks</div>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              {[
                { 
                  icon: <svg fill="none" viewBox="0 0 24 24" stroke="#F97316" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>, 
                  text: 'Review Pending Doctors',
                  link: '/admin/doctors/requests'
                },
                { 
                  icon: <svg fill="none" viewBox="0 0 24 24" stroke="#EAB308" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>, 
                  text: 'Register New Doctor',
                  link: '/admin/doctors/add'
                },
                { 
                  icon: <svg fill="none" viewBox="0 0 24 24" stroke="#A855F7" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, 
                  text: 'Add Department',
                  link: '/admin/departments/add'
                },
                { 
                  icon: <svg fill="none" viewBox="0 0 24 24" stroke="#6366F1" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>, 
                  text: 'Register Patient On-Site',
                  link: '/admin/patients/add'
                }
              ].map((action, i) => (
                <Link key={i} to={action.link} style={{display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem', color: '#1E293B', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', textDecoration: 'none'}} onMouseOver={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)'; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)'; }}>
                  <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{action.icon}</span>
                  {action.text}
                </Link>
              ))}
            </div>
        </div>
        
        <div className="card">
            <div className="card-header" style={{alignItems: 'center'}}>
                <div>
                    <div className="card-title">Recent System Logs</div>
                    <div className="muted mt-1">Auditing and security trails</div>
                </div>
                <Link to="/admin/logs" style={{padding: '0.4rem 1rem', background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none'}} onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}>View all</Link>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
              {/* Scrollable container with right scrollbar */}
              <div style={{maxHeight: '300px', overflowY: 'auto', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                {[
                  { action: 'User logged in: admin@health.com', user: 'System Admin', time: '2026-04-01 21:53' },
                  { action: 'User logged in: soham@gmail.com', user: 'Soham Rudani', time: '2026-04-01 11:09' },
                  { action: 'New patient registered: soham@gmail.com', user: 'Soham Rudani', time: '2026-04-01 11:09' },
                  { action: 'User logged out: admin@health.com', user: 'System Admin', time: '2026-04-01 11:07' }
                ].map((log, i) => (
                  <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div>
                      <div style={{fontWeight: '600', fontSize: '0.85rem', color: '#0F172A'}}>{log.action}</div>
                      <div style={{fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem'}}>By: {log.user}</div>
                    </div>
                    <div style={{fontSize: '0.75rem', color: '#64748B'}}>{log.time}</div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}

