import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Loader, RefreshCw, Search, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getReceptionAppointments, cancelAppointment } from '../../utils/api';

const STATUS_MAP = {
  AWAITING_ASSIGNMENT: { label: '⏳ Awaiting', cls: 'chip-warning' },
  PENDING:             { label: 'Pending',    cls: 'chip-warning' },
  SCHEDULED:           { label: '✅ Scheduled', cls: 'chip' },
  COMPLETED:           { label: 'Completed',  cls: 'chip-neutral' },
  CANCELLED:           { label: 'Cancelled',  cls: 'chip-danger' },
  RESCHEDULED:         { label: 'Rescheduled', cls: 'chip-warning' },
  IN_PROGRESS:         { label: 'In Progress', cls: 'chip' },
};

const Appointments = () => {
  const navigate = useNavigate();
  const [pending, setPending] = useState([]);
  const [all, setAll]         = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [filter, setFilter]   = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast]     = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getReceptionAppointments();
      if (res.data.success) {
        setPending(res.data.data.pending || []);
        setAll(res.data.data.all || []);
      } else {
        setError('Server returned an error. Please try again.');
      }
    } catch (err) {
      console.error('getReceptionAppointments error:', err);
      const msg = err.response?.data?.error || err.message || 'Failed to load appointments';
      setError(`${err.response?.status === 403 ? '⛔ Access Denied — make sure you are logged in as a Receptionist. ' : ''}${msg}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await cancelAppointment(id);
      await fetchAppointments();
      showToast('Appointment cancelled');
    } catch {
      showToast('Failed to cancel appointment', 'error');
    }
  };

  const filteredAll = all.filter(a => {
    const matchFilter =
      filter === 'All'       ? true :
      filter === 'Pending'   ? (a.status === 'AWAITING_ASSIGNMENT' || a.status === 'PENDING') :
      filter === 'Scheduled' ? a.status === 'SCHEDULED' :
      filter === 'Completed' ? a.status === 'COMPLETED' :
      filter === 'Cancelled' ? a.status === 'CANCELLED' : true;

    const matchSearch = !searchTerm ||
      a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.doctor.toLowerCase().includes(searchTerm.toLowerCase());

    return matchFilter && matchSearch;
  });

  if (loading) return (
    <div className="admin-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <div style={{ textAlign: 'center' }}>
        <Loader className="animate-spin text-primary" size={40} style={{ margin: '0 auto 1rem' }} />
        <p className="muted">Loading appointments…</p>
      </div>
    </div>
  );

  return (
    <div className="admin-content">
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          padding: '1rem 1.5rem', borderRadius: '12px', fontWeight: 600,
          background: toast.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: toast.type === 'error' ? '#b91c1c' : '#166534',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
        }}>
          {toast.msg}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Appointment Queue</h2>
          <p className="section-subtitle">
            Assign doctors and manage patient consultations
            {!error && <> · <strong>{all.length}</strong> total, <strong style={{ color: '#f59e0b' }}>{pending.length}</strong> pending</>}
          </p>
        </div>
        <button className="btn btn-outline" onClick={fetchAppointments}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{
          background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c',
          padding: '1rem 1.25rem', borderRadius: '12px', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem'
        }}>
          <AlertCircle size={20} />
          <div>
            <strong>Could not load appointments</strong>
            <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>{error}</div>
          </div>
        </div>
      )}

      {/* ── Pending Queue ─────────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">⏳ Awaiting Assignment</h3>
            <p className="muted" style={{ fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
              Patients who need a doctor assigned
            </p>
          </div>
          <span className="chip-warning">{pending.length} pending</span>
        </div>

        <div className="table-container" style={{ marginTop: '1rem' }}>
          <table className="premium-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Contact</th>
                <th>Preferred Time / Notes</th>
                <th>Requested On</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {pending.length > 0 ? pending.map(app => (
                <tr key={app._id}>
                  <td>
                    <div className="flex-author">
                      <div className="header-avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem', flexShrink: 0 }}>
                        {(app.patient || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="author-name">{app.patient}</div>
                        {app.bloodGroup && <div className="muted" style={{ fontSize: '0.72rem' }}>{app.bloodGroup}</div>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.875rem' }}>{app.patientEmail || '—'}</div>
                    <div className="muted" style={{ fontSize: '0.8rem' }}>{app.patientPhone || '—'}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.875rem' }}>{app.preferredDateNote || '—'}</div>
                    {app.notes && <div className="muted" style={{ fontSize: '0.8rem' }}>{app.notes}</div>}
                  </td>
                  <td className="muted" style={{ fontSize: '0.85rem' }}>
                    {app.createdAt ? new Date(app.createdAt).toLocaleString() : '—'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="flex gap-2" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
                        onClick={() => navigate(`/reception/appointments/${app._id}/assign`)}
                      >
                        Assign Doctor <ArrowRight size={14} />
                      </button>
                      <button
                        className="btn btn-outline"
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', borderColor: '#ef4444', color: '#ef4444' }}
                        onClick={() => handleCancel(app._id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                    No pending requests — all caught up!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── All Appointments ──────────────────────────────────────── */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">All Appointments</h3>
            <p className="muted" style={{ fontSize: '0.85rem', margin: '0.25rem 0 0' }}>Complete appointment history</p>
          </div>
          <div className="search-bar" style={{ minWidth: '220px' }}>
            <Search className="search-icon" size={16} />
            <input type="text" placeholder="Search patient or doctor…"
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div style={{ padding: '0 1.5rem 1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['All', 'Pending', 'Scheduled', 'Completed', 'Cancelled'].map(f => (
            <button key={f}
              className={`filter-chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="table-container" style={{ marginTop: 0 }}>
          <table className="premium-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Scheduled</th>
                <th>Status</th>
                <th>Token</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAll.length > 0 ? filteredAll.map(app => {
                const s = STATUS_MAP[app.status] || { label: app.status, cls: 'chip-neutral' };
                return (
                  <tr key={app._id}>
                    <td><span className="badge-soft">{app._id.slice(-6).toUpperCase()}</span></td>
                    <td>
                      <div className="author-name">{app.patient}</div>
                      <div className="muted" style={{ fontSize: '0.75rem' }}>{app.patientEmail}</div>
                    </td>
                    <td>
                      <div className="author-name">{app.doctor}</div>
                      <div className="muted" style={{ fontSize: '0.75rem' }}>{app.dept}</div>
                    </td>
                    <td className="muted" style={{ fontSize: '0.85rem' }}>
                      {app.scheduledAt
                        ? <><div>{new Date(app.scheduledAt).toLocaleDateString()}</div>
                           <div>{new Date(app.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div></>
                        : '—'}
                    </td>
                    <td><span className={s.cls}>{s.label}</span></td>
                    <td>
                      {app.tokenNumber
                        ? <span className="badge-soft" style={{ color: 'var(--primary)', fontWeight: 700 }}>#{app.tokenNumber}</span>
                        : <span className="muted">—</span>}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="flex gap-2" style={{ justifyContent: 'flex-end' }}>
                        {(app.status === 'AWAITING_ASSIGNMENT' || app.status === 'PENDING') && (
                          <button className="btn-icon" style={{ color: '#22c55e' }} title="Assign Doctor"
                            onClick={() => navigate(`/reception/appointments/${app._id}/assign`)}>
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {app.status !== 'CANCELLED' && app.status !== 'COMPLETED' && (
                          <button className="btn-icon" style={{ color: '#ef4444' }} title="Cancel"
                            onClick={() => handleCancel(app._id)}>
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    {error ? 'Could not load appointments.' : 'No appointments found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
