import React, { useState } from 'react';
import { Calendar, Search, Filter, Clock, CheckCircle2, XCircle } from 'lucide-react';
import '../../styles/Dashboard.css';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('all');

  const appointments = [
    { id: 'APT101', patient: 'John Smith', date: '2026-05-10', time: '10:30 AM', doctor: 'Dr. Sarah Connor', status: 'Confirmed' },
    { id: 'APT102', patient: 'Sarah Wilson', date: '2026-05-10', time: '11:15 AM', doctor: 'Pending Assignment', status: 'Pending' },
    { id: 'APT103', patient: 'Michael Brown', date: '2026-05-11', time: '09:45 AM', doctor: 'Dr. James Smith', status: 'Confirmed' },
    { id: 'APT104', patient: 'Emily Davis', date: '2026-05-11', time: '02:30 PM', doctor: 'Pending Assignment', status: 'Pending' },
    { id: 'APT105', patient: 'Robert Johnson', date: '2026-05-12', time: '11:00 AM', doctor: 'Dr. Emily White', status: 'Cancelled' },
    { id: 'APT106', patient: 'Emma Wilson', date: '2026-05-12', time: '01:15 PM', doctor: 'Dr. Sarah Connor', status: 'Confirmed' },
  ];

  const filteredAppointments = activeTab === 'all' 
    ? appointments 
    : appointments.filter(a => a.status.toLowerCase() === activeTab);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Appointments</h1>
          <p>Oversee all patient schedules and doctor assignments</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <Calendar size={18} /> Schedule New
          </button>
        </div>
      </header>

      <div className="tabs-wrapper mb-4">
        <div className="tabs">
          <button className={`tab-item ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Appointments</button>
          <button className={`tab-item ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>Pending Approval</button>
          <button className={`tab-item ${activeTab === 'confirmed' ? 'active' : ''}`} onClick={() => setActiveTab('confirmed')}>Confirmed</button>
          <button className={`tab-item ${activeTab === 'cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('cancelled')}>Cancelled</button>
        </div>
      </div>

      <div className="dashboard-card no-padding">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Appt ID</th>
                <th>Patient Name</th>
                <th>Date & Time</th>
                <th>Assigned Doctor</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td className="fw-bold">{appt.id}</td>
                  <td>{appt.patient}</td>
                  <td>
                    <div className="dt-cell">
                      <div className="dt-date">{appt.date}</div>
                      <div className="dt-time text-muted small"><Clock size={12} className="inline-icon" /> {appt.time}</div>
                    </div>
                  </td>
                  <td>
                    <span className={appt.doctor === 'Pending Assignment' ? 'text-warning fw-bold' : ''}>
                      {appt.doctor}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${appt.status.toLowerCase()}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="text-right">
                    {appt.status === 'Pending' ? (
                      <button className="btn-action-primary">Assign Doctor</button>
                    ) : (
                      <button className="btn-action-outline">View Details</button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colspan="6" className="text-center py-5 text-muted">
                    No appointments found for this category.
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
