import React, { useState } from 'react';
import { Calendar as CalendarIcon, Filter, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockAppointments = [
  { id: 101, patientId: 101, patientName: "Alice Cooper", date: "2026-04-02", time: "09:30 AM", status: "CONFIRMED", reason: "Routine checkup" },
  { id: 102, patientId: 102, patientName: "Bob Singer", date: "2026-04-02", time: "11:00 AM", status: "PENDING", reason: "First visit" },
  { id: 103, patientId: 103, patientName: "Charlie Day", date: "2026-04-01", time: "03:45 PM", status: "COMPLETED", reason: "Follow up" },
  { id: 104, patientId: 104, patientName: "Diana Prince", date: "2026-04-03", time: "02:00 PM", status: "CANCELLED", reason: "Not specified" },
];

const AppointmentsPage = () => {
  const [filter, setFilter] = useState('ALL');

  const filteredAppointments = mockAppointments.filter(appt => 
    filter === 'ALL' || appt.status === filter
  );

  const total = mockAppointments.length;
  const pending = mockAppointments.filter(a => a.status === 'PENDING').length;
  const completed = mockAppointments.filter(a => a.status === 'COMPLETED').length;

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
          <button className={`filter-chip ${filter === 'PENDING' ? 'active' : ''}`} onClick={() => setFilter('PENDING')}>Pending</button>
          <button className={`filter-chip ${filter === 'CONFIRMED' ? 'active' : ''}`} onClick={() => setFilter('CONFIRMED')}>Confirmed</button>
          <button className={`filter-chip ${filter === 'COMPLETED' ? 'active' : ''}`} onClick={() => setFilter('COMPLETED')}>Completed</button>
        </div>
      </div>

      <div className="card">
         <div className="table-container mt-0">
            <table>
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Patient Name</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(appt => (
                  <tr key={appt.id}>
                    <td>
                      <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                        <CalendarIcon size={16} className="muted" />
                        <span><strong>{appt.date}</strong> at {appt.time}</span>
                      </div>
                    </td>
                    <td style={{fontWeight: 600, color: 'var(--primary)'}}>
                      {appt.patientName}
                    </td>
                    <td>{appt.reason || '-'}</td>
                    <td>
                      {appt.status === 'PENDING' && <span className="chip-warning">⏳ Pending</span>}
                      {appt.status === 'CONFIRMED' && <span className="chip">✓ Confirmed</span>}
                      {appt.status === 'COMPLETED' && <span className="chip-neutral">✓ Completed</span>}
                      {appt.status === 'CANCELLED' && <span className="chip-danger">✕ Cancelled</span>}
                    </td>
                    <td>
                      <div style={{display:'flex', gap:'0.5rem'}}>
                        <Link to={`/doctor/patients/${appt.patientId || 101}`} className="btn-icon" title="View Patient Details">
                          <Eye size={18} />
                        </Link>
                        {appt.status === 'PENDING' && (
                          <>
                            <button className="btn-icon" style={{color:'var(--success)', borderColor:'var(--success-light)'}} title="Confirm">
                              <CheckCircle size={18} />
                            </button>
                            <button className="btn-icon" style={{color:'var(--danger)', borderColor:'var(--danger-light)'}} title="Cancel">
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
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
