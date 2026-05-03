import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { getAdminReports, getAdminDashboard } from '../../utils/api';

export default function Reports() {
  const [search, setSearch] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportRes, dashRes] = await Promise.all([
          getAdminReports(),
          getAdminDashboard()
        ]);
        setAppointments(reportRes.data.data);
        setStats(dashRes.data.data.chartData);
      } catch (err) {
        console.error("Failed to load reports data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredAppointments = appointments.filter(app => 
    app.doc.toLowerCase().includes(search.toLowerCase()) ||
    app.pat.toLowerCase().includes(search.toLowerCase()) ||
    app.status.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <AdminLayout title="Platform Reports" subtitle="System analytics and financial overviews">
      <div style={{padding: '5rem', textAlign: 'center'}}>Initializing reports ledger...</div>
    </AdminLayout>
  );

  return (
    <AdminLayout title="Platform Reports" subtitle="System analytics and financial overviews">
      
      {/* Top Chart Card */}
      <div className="card mb-6" style={{padding: '0', overflow: 'hidden'}}>
        <div style={{padding: '1.75rem 2.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '2.5rem'}}>
          <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>System Allocation Chart</div>
          <div style={{fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Real-time breakdown of user roles and structural departments</div>
          
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', marginBottom: '1rem'}}>
             <div style={{
                width: '180px', height: '180px', 
                borderRadius: '50%', 
                background: stats ? `conic-gradient(#2563EB 0% ${stats.patientsPct}%, #10B981 ${stats.patientsPct}% ${stats.patientsPct + stats.doctorsPct}%, #8B5CF6 ${stats.patientsPct + stats.doctorsPct}% 100%)` : '#F1F5F9',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease'
             }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <div style={{
                   position: 'absolute', top: '22%', left: '22%', width: '56%', height: '56%', backgroundColor: '#FFFFFF', borderRadius: '50%',
                   display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                }}>
                   <span style={{fontSize: '1.2rem', fontWeight: '800', color: '#0F172A'}}>{stats?.totalNodes || 0}</span>
                   <span style={{fontSize: '0.7rem', color: '#64748B', fontWeight: '600'}}>Total Nodes</span>
                </div>
             </div>
             
             {/* Legend */}
             <div style={{display: 'flex', gap: '2rem', marginTop: '2.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#F8FAFC', padding: '0.5rem 1rem', borderRadius: '8px'}}>
                   <div style={{width: '14px', height: '14px', background: '#2563EB', borderRadius: '4px'}}></div>
                   <div style={{fontSize: '0.8rem', color: '#334155', fontWeight: '700'}}>Registered Patients ({stats?.patientsPct || 0}%)</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#F8FAFC', padding: '0.5rem 1rem', borderRadius: '8px'}}>
                   <div style={{width: '14px', height: '14px', background: '#10B981', borderRadius: '4px'}}></div>
                   <div style={{fontSize: '0.8rem', color: '#334155', fontWeight: '700'}}>Verified Doctors ({stats?.doctorsPct || 0}%)</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#F8FAFC', padding: '0.5rem 1rem', borderRadius: '8px'}}>
                   <div style={{width: '14px', height: '14px', background: '#8B5CF6', borderRadius: '4px'}}></div>
                   <div style={{fontSize: '0.8rem', color: '#334155', fontWeight: '700'}}>Active Departments ({stats?.departmentsPct || 0}%)</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Ledger Card */}
      <div className="card" style={{padding: '0', overflow: 'hidden'}}>
        
        <div style={{padding: '1.75rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '1rem'}}>
          <div>
            <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>All Historical Appointments</div>
            <div style={{fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Comprehensive ledger of all clinical meetings</div>
          </div>
          <div style={{position: 'relative', width: '300px'}}>
             <svg style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
             <input 
                type="text" 
                placeholder="Search report ledger..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', color: '#1E293B', outline: 'none', transition: 'border-color 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
          </div>
        </div>

        <div style={{width: '100%', overflowX: 'auto'}}>
          <table className="premium-table" style={{width: '100%', minWidth: '900px', borderSpacing: 0}}>
            <thead>
              <tr style={{background: '#FFFFFF'}}>
                <th style={{padding: '1.25rem 2.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left', width: '25%'}}>DATETIME</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left', width: '30%'}}>DOCTOR</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left', width: '25%'}}>PATIENT</th>
                <th style={{padding: '1.25rem 2.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left', width: '20%'}}>STATUS RESULT</th>
                <th style={{padding: '1.25rem 2.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'right', width: '10%'}}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((app, index) => (
                <tr key={app.id} style={{background: '#FFFFFF', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}>
                  <td style={{padding: '1.5rem 2.5rem', fontSize: '0.85rem', color: '#64748B', borderBottom: index === filteredAppointments.length - 1 ? 'none' : '1px solid #F1F5F9', fontWeight: '500'}}>{app.time}</td>
                  <td style={{padding: '1.5rem 1.5rem', fontSize: '0.85rem', color: '#0F172A', fontWeight: '700', borderBottom: index === filteredAppointments.length - 1 ? 'none' : '1px solid #F1F5F9'}}>{app.doc}</td>
                  <td style={{padding: '1.5rem 1.5rem', fontSize: '0.85rem', color: '#0F172A', fontWeight: '500', borderBottom: index === filteredAppointments.length - 1 ? 'none' : '1px solid #F1F5F9'}}>{app.pat}</td>
                  <td style={{padding: '1.5rem 2.5rem', borderBottom: index === filteredAppointments.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                    <span style={{background: app.statusBg, color: app.statusColor, padding: '0.25rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '800', textTransform: app.status === 'CANCELLED' ? 'uppercase' : 'none'}}>{app.status}</span>
                  </td>
                  <td style={{padding: '1.5rem 2.5rem', borderBottom: index === filteredAppointments.length - 1 ? 'none' : '1px solid #F1F5F9', textAlign: 'right'}}>
                    <Link to={`/admin/reports/${app.id}`} style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>View Audit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAppointments.length === 0 && (
            <div style={{padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.9rem'}}>No appointments found matching "{search}"</div>
          )}
        </div>
      </div>
      
    </AdminLayout>
  );
}
