import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, Users, Layers, ChevronRight, ArrowRight, Loader, RefreshCw, UserPlus, Hotel } from 'lucide-react';
import { getReceptionDashboard, getReceptionBeds } from '../../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashData, setDashData] = useState(null);
  const [bedOverview, setBedOverview] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [dashRes, bedRes] = await Promise.all([
        getReceptionDashboard(),
        getReceptionBeds()
      ]);

      if (dashRes.data.success) setDashData(dashRes.data.data);

      if (bedRes.data.success) {
        setBedOverview((bedRes.data.data || []).slice(0, 5));
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const stats = [
    {
      label: 'Awaiting Assignment',
      value: dashData?.stats?.pendingAppointments ?? 0,
      subtext: 'Patients in queue',
      color: '#f59e0b',
      icon: <Clock size={22} />
    },
    {
      label: "Today's Appointments",
      value: dashData?.stats?.todaysAppointments ?? 0,
      subtext: 'Scheduled for today',
      color: '#3b82f6',
      icon: <Calendar size={22} />
    },
    {
      label: 'Total Appointments',
      value: dashData?.stats?.totalAppointments ?? 0,
      subtext: 'All time records',
      color: '#10b981',
      icon: <Layers size={22} />
    },
    {
      label: 'Total Patients',
      value: dashData?.stats?.totalPatients ?? 0,
      subtext: 'Registered in system',
      color: '#6366f1',
      icon: <Users size={22} />
    },
  ];

  const pendingQueue = dashData?.pendingQueue || [];

  if (loading) return (
    <div className="admin-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <div style={{ textAlign: 'center' }}>
        <Loader className="animate-spin text-primary" size={40} style={{ margin: '0 auto 1rem' }} />
        <p className="muted">Loading dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="admin-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Reception Dashboard</h2>
          <p className="section-subtitle">Real-time overview of patient queue and hospital capacity</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline" onClick={fetchAll}>
            <RefreshCw size={16} /> Refresh
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/reception/patient-entry')}>
            <UserPlus size={18} /> New Patient Entry
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-5" style={{ marginBottom: '2rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="card">
            <div className="card-header">
              <span className="card-title">{stat.label}</span>
              <div style={{ color: stat.color }}>{stat.icon}</div>
            </div>
            <div className="card-value" style={{ color: stat.color }}>{stat.value}</div>
            <span className="muted">{stat.subtext}</span>
          </div>
        ))}
          <div className="card stat-card p-6" style={{ borderBottom: '4px solid #f59e0b' }}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-amber-50 text-amber-500">
                <Hotel size={24} />
              </div>
              <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded">Live</span>
            </div>
            <div className="text-3xl font-black mb-1">
              {dashData?.stats?.bedOccupancy || '0%'}
            </div>
            <div className="text-xs font-bold uppercase muted tracking-widest">Bed Occupancy</div>
          </div>
      </div>

      {/* Two-col section */}
      <div className="grid grid-2">
        {/* Pending Appointment Queue */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Appointment Queue</h3>
              <p className="muted" style={{ fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
                Patients awaiting doctor assignment
              </p>
            </div>
            <button
              className="btn btn-primary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              onClick={() => navigate('/reception/appointments')}
            >
              Manage All
            </button>
          </div>

          <div className="table-container" style={{ border: 'none', marginTop: '0.5rem' }}>
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Preferred Time</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingQueue.length > 0 ? pendingQueue.map(item => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex-author">
                        <div className="header-avatar" style={{ width: '32px', height: '32px', fontSize: '0.8rem', flexShrink: 0 }}>
                          {(item.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="author-name" style={{ fontSize: '0.875rem' }}>{item.name}</div>
                          <div className="muted" style={{ fontSize: '0.75rem' }}>{item.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="muted" style={{ fontSize: '0.85rem' }}>
                      {item.time || '—'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn-icon"
                        title="Assign Doctor"
                        onClick={() => navigate(`/reception/appointments/${item._id}/assign`)}
                      >
                        <ArrowRight size={16} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
                      No pending requests. All caught up!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bed Overview */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Bed Overview</h3>
              <p className="muted" style={{ fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
                Capacity by department
              </p>
            </div>
            <button
              className="btn btn-outline"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              onClick={() => navigate('/reception/beds')}
            >
              Manage Beds
            </button>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {bedOverview.length > 0 ? bedOverview.map(dept => (
              <div key={dept._id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div>
                    <span className="author-name">{dept.name}</span>
                    <span className="muted" style={{ marginLeft: '0.75rem', fontSize: '0.8rem' }}>
                      {dept.available ?? (dept.total - dept.occupied)} available / {dept.total} total
                    </span>
                  </div>
                  <span className={`chip${dept.status === 'Full' ? '-danger' : dept.status === 'Critical' || dept.status === 'Limited' ? '-warning' : ''}`}
                    style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}>
                    {dept.status || 'Available'}
                  </span>
                </div>
                <div style={{ height: '8px', borderRadius: '99px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '99px',
                    width: `${dept.pct ?? Math.round(((dept.occupied || 0) / (dept.total || 1)) * 100)}%`,
                    background: (dept.pct ?? 0) >= 100 ? '#ef4444' : (dept.pct ?? 0) >= 70 ? '#f59e0b' : '#22c55e',
                    transition: 'width 0.6s ease'
                  }} />
                </div>
              </div>
            )) : (
              <div className="muted" style={{ padding: '1.5rem', textAlign: 'center' }}>
                No departments configured.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
