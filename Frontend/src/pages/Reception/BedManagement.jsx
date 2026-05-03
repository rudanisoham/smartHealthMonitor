import React, { useState, useEffect } from 'react';
import { Bed, Users, AlertTriangle, ArrowRight, Activity, Loader } from 'lucide-react';
import { getReceptionBeds } from '../../utils/api';

const BedManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBeds();
  }, []);

  const fetchBeds = async () => {
    try {
      setLoading(true);
      const res = await getReceptionBeds();
      if (res.data.success) {
        setDepartments(res.data.data);
      }
    } catch (err) {
      setError("Failed to load bed statistics");
    } finally {
      setLoading(false);
    }
  };

  const totalCapacity = departments.reduce((acc, d) => acc + (d.total || 0), 0);
  const totalOccupied = departments.reduce((acc, d) => acc + (d.occupied || 0), 0);
  const totalCritical = departments.reduce((acc, d) => acc + (d.critical || 0), 0);
  const occupancyRate = totalCapacity > 0 ? ((totalOccupied / totalCapacity) * 100).toFixed(1) : 0;

  if (loading) return (
    <div className="admin-content flex justify-center items-center py-20">
      <Loader className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="admin-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Hospital Bed Management</h2>
          <p className="section-subtitle">Real-time occupancy tracking and capacity planning</p>
        </div>
        <div className="flex gap-3">
          <button className="header-pill" onClick={fetchBeds}>
            <Activity size={14} className="me-2" /> Refresh Data
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-6">{error}</div>}

      <div className="grid grid-3 mb-6">
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div className="card-header">
            <span className="card-title">Total Capacity</span>
            <Bed className="text-primary" size={20} />
          </div>
          <div className="card-value">{totalCapacity}</div>
          <span className="muted">Across all departments</span>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div className="card-header">
            <span className="card-title">Occupied Beds</span>
            <Users className="text-warning" size={20} />
          </div>
          <div className="card-value">{totalOccupied}</div>
          <span className="muted">{occupancyRate}% Occupancy rate</span>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div className="card-header">
            <span className="card-title">Critical Patients</span>
            <AlertTriangle className="text-danger" size={20} />
          </div>
          <div className="card-value">{totalCritical}</div>
          <span className="muted">Estimated high monitoring</span>
        </div>
      </div>

      <div className="grid grid-2">
        {departments.map((dept) => {
          const percent = dept.total > 0 ? Math.round((dept.occupied / dept.total) * 100) : 0;
          return (
            <div key={dept._id} className="card">
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
