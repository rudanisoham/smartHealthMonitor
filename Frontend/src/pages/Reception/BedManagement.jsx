import React from 'react';
import { Bed, Plus, MoreVertical, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import '../../styles/Dashboard.css';

const BedManagement = () => {
  const departments = [
    { name: 'Cardiology', total: 20, occupied: 15, floor: '2nd Floor' },
    { name: 'Neurology', total: 15, occupied: 13, floor: '3rd Floor' },
    { name: 'Pediatrics', total: 10, occupied: 10, floor: '1st Floor' },
    { name: 'General Medicine', total: 40, occupied: 32, floor: 'G Floor' },
    { name: 'Orthopedics', total: 15, occupied: 8, floor: '1st Floor' },
    { name: 'Emergency', total: 12, occupied: 11, floor: 'G Floor' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Bed Management</h1>
          <p>Monitor real-time bed availability across all hospital wings</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <Plus size={18} /> Add New Bed
          </button>
        </div>
      </header>

      <div className="grid grid-3 mb-5">
        <div className="card stat-card-simple">
          <div className="card-body">
            <span className="stat-label">Total Capacity</span>
            <h2 className="stat-value">112</h2>
            <p className="stat-desc">Across 6 departments</p>
          </div>
        </div>
        <div className="card stat-card-simple highlight-blue">
          <div className="card-body">
            <span className="stat-label">Total Occupied</span>
            <h2 className="stat-value">99</h2>
            <p className="stat-desc">88% current occupancy</p>
          </div>
        </div>
        <div className="card stat-card-simple highlight-green">
          <div className="card-body">
            <span className="stat-label">Available Now</span>
            <h2 className="stat-value">13</h2>
            <p className="stat-desc">Ready for new patients</p>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <div className="header-info">
            <h3>Department Breakdown</h3>
            <p>Bed status by specialized medical wing</p>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Floor/Wing</th>
                <th>Capacity</th>
                <th>Occupancy Rate</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => {
                const occupancy = (dept.occupied / dept.total) * 100;
                let status = 'Available';
                let statusClass = 'success';
                if (occupancy === 100) { status = 'Full'; statusClass = 'danger'; }
                else if (occupancy >= 80) { status = 'Near Capacity'; statusClass = 'warning'; }

                return (
                  <tr key={index}>
                    <td className="fw-bold">{dept.name}</td>
                    <td className="text-muted">{dept.floor}</td>
                    <td>
                      <div className="bed-metric">
                        <span className="occupied">{dept.occupied}</span> / <span className="total">{dept.total}</span>
                      </div>
                    </td>
                    <td style={{ minWidth: '150px' }}>
                      <div className="progress-bar-wrapper">
                        <div className="progress-bar-bg">
                          <div 
                            className={`progress-bar-fill ${statusClass}`} 
                            style={{ width: `${occupancy}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{Math.round(occupancy)}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`chip chip-${statusClass}`}>{status}</span>
                    </td>
                    <td className="text-right">
                      <button className="icon-btn"><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BedManagement;
