import React from 'react';
import { Bed, Users, AlertTriangle, ArrowRight, Activity } from 'lucide-react';

const BedManagement = () => {
  const departments = [
    { id: '1', name: 'Cardiology', occupied: 15, total: 20, critical: 3 },
    { id: '2', name: 'Neurology', occupied: 13, total: 15, critical: 1 },
    { id: '3', name: 'Pediatrics', occupied: 10, total: 10, critical: 0 },
    { id: '4', name: 'General Medicine', occupied: 32, total: 40, critical: 5 },
    { id: '5', name: 'ICU', occupied: 11, total: 12, critical: 8 },
    { id: '6', name: 'Emergency', occupied: 5, total: 10, critical: 2 },
  ];

  return (
    <div className="admin-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Hospital Bed Management</h2>
          <p className="section-subtitle">Real-time occupancy tracking and capacity planning</p>
        </div>
        <div className="flex gap-3">
          <div className="header-pill">
            <Activity size={14} className="me-2" /> Live Updates
          </div>
        </div>
      </div>

      <div className="grid grid-3 mb-6">
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div className="card-header">
            <span className="card-title">Total Capacity</span>
            <Bed className="text-primary" size={20} />
          </div>
          <div className="card-value">107</div>
          <span className="muted">Across all departments</span>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div className="card-header">
            <span className="card-title">Occupied Beds</span>
            <Users className="text-warning" size={20} />
          </div>
          <div className="card-value">86</div>
          <span className="muted">80.3% Occupancy rate</span>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div className="card-header">
            <span className="card-title">Critical Patients</span>
            <AlertTriangle className="text-danger" size={20} />
          </div>
          <div className="card-value">19</div>
          <span className="muted">Requiring high monitoring</span>
        </div>
      </div>

      <div className="grid grid-2">
        {departments.map((dept) => {
          const percent = Math.round((dept.occupied / dept.total) * 100);
          return (
            <div key={dept.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="author-name" style={{ fontSize: '1.1rem' }}>{dept.name} Department</h3>
                  <span className="muted">{dept.occupied} beds occupied of {dept.total}</span>
                </div>
                <span className={`chip ${percent >= 100 ? 'chip-danger' : percent > 85 ? 'chip-warning' : 'chip'}`}>
                  {percent}% Full
                </span>
              </div>
              
              <div className="progress-bar-bg mb-4" style={{ height: '10px' }}>
                <div 
                  className={`progress-bar-fill ${percent >= 100 ? 'danger' : percent > 85 ? 'warning' : 'success'}`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <div className="status-pill status-active" style={{ width: '8px', height: '8px', padding: 0 }}></div>
                    <span className="muted" style={{ fontSize: '0.8rem' }}>{dept.total - dept.occupied} Available</span>
                  </div>
                  {dept.critical > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="status-pill status-risk-high" style={{ width: '8px', height: '8px', padding: 0 }}></div>
                      <span className="muted" style={{ fontSize: '0.8rem' }}>{dept.critical} Critical</span>
                    </div>
                  )}
                </div>
                <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                  Manage <ArrowRight size={14} className="ms-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BedManagement;
