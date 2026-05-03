import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { getAdminDashboard } from '../../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    pendingDoctors: 0,
    totalAppointments: 0,
    totalDepartments: 0
  });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logsLoading, setLogsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getAdminDashboard();
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch admin dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchLogs = async () => {
      try {
        const { getAdminLogs } = await import('../../utils/api');
        const res = await getAdminLogs();
        setLogs(res.data.data);
      } catch (err) {
        console.error("Failed to fetch system logs", err);
      } finally {
        setLogsLoading(false);
      }
    };

    fetchDashboard();
    fetchLogs();
  }, []);

  if (loading) return (
    <AdminLayout title="Admin Dashboard" subtitle="System overview and realtime metrics">
        <div style={{ padding: '5rem', textAlign: 'center' }}>
            <div className="animate-spin" style={{margin: '0 auto', width: '40px', height: '40px', border: '4px solid var(--primary-light)', borderTopColor: 'var(--primary)', borderRadius: '50%'}}></div>
            <p className="muted mt-4">Initializing dashboard...</p>
        </div>
    </AdminLayout>
  );

  return (
    <AdminLayout title="Admin Dashboard" subtitle="System overview and realtime metrics">
      <div className="grid grid-5 mb-6">
        
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Total Patients</div>
              <div className="muted mt-1">Registered in system</div>
            </div>
          </div>
          <div className="card-value" style={{color: '#1E40AF'}}>{stats.totalPatients}</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Verified Doctors</div>
              <div className="muted mt-1">Active practitioners</div>
            </div>
          </div>
          <div className="card-value" style={{color: '#3B82F6'}}>{stats.totalDoctors}</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Pending Approvals</div>
              <div className="muted mt-1">Awaiting verification</div>
            </div>
          </div>
          <div className="card-value" style={{color: '#F59E0B'}}>{stats.pendingDoctors}</div>
          <Link to="/admin/doctors/requests" style={{fontSize: '0.8rem', color: '#F59E0B', fontWeight: '600', textDecoration: 'none', marginTop: '0.5rem', display: 'block'}}>View Requests →</Link>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Total Appointments</div>
              <div className="muted mt-1">Over all time</div>
            </div>
          </div>
          <div className="card-value" style={{color: '#10B981'}}>{stats.totalAppointments}</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Departments</div>
              <div className="muted mt-1">Hospital units</div>
            </div>
          </div>
          <div className="card-value" style={{color: '#8B5CF6'}}>{stats.totalDepartments}</div>
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
                {logsLoading ? (
                  <div className="muted text-center py-4">Loading logs...</div>
                ) : logs.length === 0 ? (
                  <div className="muted text-center py-4">No logs recorded yet.</div>
                ) : logs.map((log, i) => (
                  <div key={log._id || i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <div style={{flex: 1}}>
                      <div style={{fontWeight: '600', fontSize: '0.85rem', color: '#0F172A'}}>{log.action}</div>
                      <div style={{fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem'}}>By: {log.user} ({log.role})</div>
                    </div>
                    <div style={{fontSize: '0.75rem', color: '#94A3B8', marginLeft: '1rem'}}>{new Date(log.createdAt).toLocaleTimeString()}</div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}

