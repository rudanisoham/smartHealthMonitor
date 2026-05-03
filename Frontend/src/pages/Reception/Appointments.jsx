import React, { useState, useEffect } from 'react';
import { Search, Calendar as CalendarIcon, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getReceptionAppointments } from '../../utils/api';

const Appointments = () => {
  const [filter, setFilter] = useState('All');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getReceptionAppointments();
        setAppointments(res.data.data);
      } catch (err) {
        console.error("Failed to load appointments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  // We will map 'Pending' to 'PENDING', 'Confirmed' to 'SCHEDULED' / 'COMPLETED' etc if needed
  // Adjust filter map based on exact DB status strings if necessary, but assuming we want to match exactly what is in filter
  const filteredApps = filter === 'All' ? appointments : appointments.filter(a => {
    if (filter === 'Pending') return a.status === 'PENDING' || a.status === 'AWAITING_ASSIGNMENT';
    if (filter === 'Confirmed') return a.status === 'SCHEDULED';
    if (filter === 'Cancelled') return a.status === 'CANCELLED';
    return true;
  });

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading appointments...</div>;

  return (
    <div className="admin-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Appointment Management</h2>
          <p className="section-subtitle">Track and coordinate patient-doctor consultations</p>
        </div>
        <button className="btn btn-primary">
          <CalendarIcon size={18} /> Schedule New
        </button>
      </div>

      <div className="card mb-6">
        <div className="filter-group">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map((f) => (
            <button 
              key={f}
              className={`filter-chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor / Department</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app) => (
              <tr key={app._id}>
                <td><span className="badge-soft">{app._id.slice(-6).toUpperCase()}</span></td>
                <td><span className="author-name">{app.patient}</span></td>
                <td>
                  <div className="author-info">
                    <span className="author-name">{app.doctor}</span>
                    <span className="author-sub">{app.dept}</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-muted" />
                    <span className="author-name">{app.time}</span>
                    <span className="muted">| {app.date}</span>
                  </div>
                </td>
                <td>
                  <span className={`chip ${
                    app.status === 'SCHEDULED' ? 'chip' : 
                    (app.status === 'PENDING' || app.status === 'AWAITING_ASSIGNMENT') ? 'chip-warning' : 
                    'chip-danger'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    {(app.status === 'PENDING' || app.status === 'AWAITING_ASSIGNMENT') && (
                      <button 
                        className="btn-icon text-success" 
                        title="Confirm"
                        onClick={() => navigate(`/reception/appointments/${app._id}/assign`)}
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button className="btn-icon text-danger" title="Cancel">
                      <XCircle size={16} />
                    </button>
                    <button className="btn-icon" title="Details">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
