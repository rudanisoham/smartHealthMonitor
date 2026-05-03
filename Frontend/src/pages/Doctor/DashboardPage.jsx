import React, { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle, Bell, Plus, Calendar, Beaker } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDoctorDashboard } from '../../utils/api';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    stats: { totalAppointments: 0, pending: 0, confirmed: 0, unreadAlerts: 0 },
    profile: { fullName: '', email: '', specialty: '', licenseNumber: '', department: '', experience: 0 },
    recentAppointments: []
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDoctorDashboard();
        setData(res.data.data);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard...</div>;
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;

  const { stats = {}, profile = {}, recentAppointments = [] } = data || {};

  const kpis = [
    { title: "Total Appointments", subtitle: "All time", value: (stats.totalAppointments || 0).toString(), icon: <Calendar size={18} color="#3b82f6" />, bgColor: "#eff6ff" },
    { title: "Pending", subtitle: "Awaiting confirmation", value: (stats.pending || 0).toString(), icon: <Clock size={18} color="#eab308" />, bgColor: "#fefce8" },
    { title: "Confirmed", subtitle: "Ready to attend", value: (stats.confirmed || 0).toString(), icon: <CheckCircle size={18} color="#22c55e" />, bgColor: "#f0fdf4" },
    { title: "Lab Reports", subtitle: "Pending review", value: (stats.pendingReports || 0).toString(), icon: <Beaker size={18} color="#f97316" />, bgColor: "#fff7ed" }
  ];

  return (
    <>
      <div className="card-header-flex" style={{marginBottom: '2rem'}}>
        <div>
          <h1 className="page-title" style={{fontSize: '1.5rem', marginBottom: '0.25rem'}}>Dashboard</h1>
          <div className="muted" style={{fontSize: '1rem'}}>Your clinical overview and upcoming appointments</div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-4" style={{marginBottom: '1.5rem'}}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className="card" style={{padding: '1.5rem'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
               <div>
                  <div style={{fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.2rem'}}>{kpi.title}</div>
                  <div className="muted" style={{fontSize: '0.8rem'}}>{kpi.subtitle}</div>
               </div>
               <div style={{background: kpi.bgColor, padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                 {kpi.icon}
               </div>
             </div>
             <div style={{fontSize: '2rem', fontWeight: 800, color: 'var(--primary)'}}>
               {kpi.value}
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-2" style={{alignItems: 'start'}}>
        
        {/* Your Profile Card */}
        <div className="card">
          <div className="card-header" style={{alignItems: 'center'}}>
            <div>
              <div className="section-title" style={{fontSize: '1.2rem'}}>Your Profile</div>
              <div className="section-subtitle">Clinical identity and department</div>
            </div>
            <Link to="/doctor/profile" className="btn btn-outline btn-sm" style={{padding: '0.4rem 1rem', fontWeight: 600}}>
              Edit
            </Link>
          </div>
          
          <div className="mt-4" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
             <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Full Name</div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem'}}>{profile.fullName || '—'}</div>
             </div>

             <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Email</div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem'}}>{profile.email || '—'}</div>
             </div>

             <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Specialty</div>
                <div style={{fontWeight: 600, color: '#10b981', background: '#d1fae5', display: 'inline-block', padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.8rem'}}>{profile.specialty || 'General'}</div>
             </div>

             <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>License #</div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem'}}>{profile.licenseNumber || '—'}</div>
             </div>

             <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Department</div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem'}}>{profile.department || '—'}</div>
             </div>

             <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Experience</div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem'}}>{profile.experience ? `${profile.experience} years` : '—'}</div>
             </div>
          </div>
        </div>

        {/* Recent Appointments Card */}
        <div className="card" style={{borderTop: '3px solid var(--primary)'}}>
          <div className="card-header" style={{alignItems: 'center'}}>
            <div>
              <div className="section-title" style={{fontSize: '1.2rem'}}>Recent Appointments</div>
              <div className="section-subtitle">Latest 5 from your schedule</div>
            </div>
            <Link to="/doctor/appointments" className="btn btn-outline btn-sm" style={{padding: '0.4rem 1rem', fontWeight: 600}}>
              View all
            </Link>
          </div>
          
          <div className="mt-4" style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
             {recentAppointments.length === 0 ? (
                <div className="muted" style={{fontSize: '0.9rem'}}>No recent appointments.</div>
             ) : (
               recentAppointments.map(appt => (
                  <div key={appt.id} style={{display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
                     <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', marginTop: '0.4rem', flexShrink: 0}}></div>
                     <div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem'}}>
                           <span style={{fontWeight: 700, color: 'var(--text-main)'}}>{appt.patient}</span>
                           {appt.status === 'CANCELLED' ? (
                             <span style={{color: '#ef4444', background: '#fee2e2', padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase'}}>CANCELLED</span>
                           ) : (
                             <span className="chip-neutral" style={{fontSize: '0.7rem', padding: '0.15rem 0.5rem'}}>{appt.status}</span>
                           )}
                        </div>
                        <div className="muted" style={{fontSize: '0.85rem'}}>
                           {appt.time} {appt.note ? `- ${appt.note}` : ''}
                        </div>
                     </div>
                  </div>
               ))
             )}
          </div>
        </div>

      </div>
    </>
  );
};

export default DashboardPage;
