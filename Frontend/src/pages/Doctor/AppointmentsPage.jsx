import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Filter, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDoctorAppointments } from '../../utils/api';

const AppointmentsPage = () => {
  const [filter, setFilter] = useState('ALL');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getDoctorAppointments();
        setAppointments(res.data.data);
      } catch (err) {
        setError('Failed to load appointments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(appt => 
    filter === 'ALL' || appt.status === filter
  );

  const total = appointments.length;
  const pending = appointments.filter(a => ['SCHEDULED', 'AWAITING_ASSIGNMENT'].includes(a.status)).length;
  const completed = appointments.filter(a => a.status === 'COMPLETED').length;

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading appointments...</div>;
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <>
      {/* KPI Cards */}
      <div className="grid grid-3" style={{marginBottom: '1.5rem'}}>
        <div className="card">
          <div className="card-header" style={{marginBottom: 0}}>
            <div>
              <div className="card-title">Total Appointments</div>
              <div className="muted mt-1">All time</div>
            </div>
            <span className="chip">📅</span>
          </div>
          <div className="card-value">{total}</div>
        </div>

        <div className="card">
          <div className="card-header" style={{marginBottom: 0}}>
            <div>
              <div className="card-title">Pending</div>
              <div className="muted mt-1">Awaiting confirmation</div>
            </div>
            <span className="chip-warning">⏳</span>
          </div>
          <div className="card-value">{pending}</div>
        </div>

        <div className="card">
          <div className="card-header" style={{marginBottom: 0}}>
            <div>
              <div className="card-title">Completed</div>
              <div className="muted mt-1">Successfully attended</div>
            </div>
            <span className="chip-neutral">✓</span>
          </div>
          <div className="card-value">{completed}</div>
        </div>
      </div>

      <div className="card-header-flex">
        <div className="filter-group">
          <button className={`filter-chip ${filter === 'ALL' ? 'active' : ''}`} onClick={() => setFilter('ALL')}>All Appointments</button>
          <button className={`filter-chip ${filter === 'SCHEDULED' ? 'active' : ''}`} onClick={() => setFilter('SCHEDULED')}>Scheduled</button>
          <button className={`filter-chip ${filter === 'IN_PROGRESS' ? 'active' : ''}`} onClick={() => setFilter('IN_PROGRESS')}>In Progress</button>
          <button className={`filter-chip ${filter === 'COMPLETED' ? 'active' : ''}`} onClick={() => setFilter('COMPLETED')}>Completed</button>
        </div>
      </div>

      <div className="card">
         <div className="table-container mt-0">
            <table>
              <thead>
                <tr>
                  <th>Token #</th>
                  <th>Date & Time</th>
                  <th>Patient Name</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(appt => (
                  <tr key={appt._id}>
                    <td>
                      <span className="chip" style={{ background: '#eff6ff', color: '#1d4ed8', fontWeight: 800 }}>
                        {appt.tokenNumber ? `#${appt.tokenNumber}` : '—'}
                      </span>
                    </td>
                    <td>
                      <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                        <CalendarIcon size={16} className="muted" />
                        <span>
                          <strong>{appt.scheduledAt ? new Date(appt.scheduledAt).toLocaleDateString() : new Date(appt.createdAt).toLocaleDateString()}</strong> at {appt.scheduledAt ? new Date(appt.scheduledAt).toLocaleTimeString() : new Date(appt.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </td>
                    <td style={{fontWeight: 600, color: 'var(--primary)'}}>
                      {appt.patient?.user?.fullName || 'Unknown'}
                    </td>
                    <td>{appt.notes || '-'}</td>
                    <td>
                      {['SCHEDULED', 'AWAITING_ASSIGNMENT'].includes(appt.status) && <span className="chip-warning">⏳ {appt.status}</span>}
                      {appt.status === 'IN_PROGRESS' && <span className="chip">✓ In Progress</span>}
                      {appt.status === 'COMPLETED' && <span className="chip-neutral">✓ Completed</span>}
                      {appt.status === 'CANCELLED' && <span className="chip-danger">✕ Cancelled</span>}
                    </td>
                    <td>
                      <div style={{display:'flex', gap:'0.5rem'}}>
                        <Link to={`/doctor/patients/${appt.patient?._id}`} className="btn-icon" title="View Patient Details">
                          <Eye size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
         {filteredAppointments.length === 0 && (
            <div style={{padding: '3rem', textAlign: 'center', color: 'var(--text-muted)'}}>
              No appointments found for the selected filter.
            </div>
         )}
      </div>
    </>
  );
};

export default AppointmentsPage;
