import React, { useState } from 'react';
import { Search, Calendar as CalendarIcon, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';

const Appointments = () => {
  const [filter, setFilter] = useState('All');

  const appointments = [
    { id: 'APP001', patient: 'John Smith', doctor: 'Dr. Sarah Connor', date: '2026-05-10', time: '10:30 AM', status: 'Confirmed', dept: 'Cardiology' },
    { id: 'APP002', patient: 'Emma Watson', doctor: 'Dr. James Wilson', date: '2026-05-10', time: '11:15 AM', status: 'Pending', dept: 'Neurology' },
    { id: 'APP003', patient: 'Robert Dow', doctor: 'Dr. Lisa Cuddy', date: '2026-05-10', time: '01:45 PM', status: 'Cancelled', dept: 'Pediatrics' },
    { id: 'APP004', patient: 'Sarah Jane', doctor: 'Dr. Eric Foreman', date: '2026-05-11', time: '09:00 AM', status: 'Confirmed', dept: 'General Medicine' },
    { id: 'APP005', patient: 'Bruce Wayne', doctor: 'Dr. Sarah Connor', date: '2026-05-11', time: '10:00 AM', status: 'Confirmed', dept: 'Cardiology' },
  ];

  const filteredApps = filter === 'All' ? appointments : appointments.filter(a => a.status === filter);

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
              <tr key={app.id}>
                <td><span className="badge-soft">{app.id}</span></td>
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
                    app.status === 'Confirmed' ? 'chip' : 
                    app.status === 'Pending' ? 'chip-warning' : 
                    'chip-danger'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    {app.status === 'Pending' && (
                      <button className="btn-icon text-success" title="Confirm"><CheckCircle size={16} /></button>
                    )}
                    <button className="btn-icon text-danger" title="Cancel"><XCircle size={16} /></button>
                    <button className="btn-icon" title="Details"><ChevronRight size={16} /></button>
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
