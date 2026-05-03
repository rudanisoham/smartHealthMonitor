import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  ClipboardList, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  FileText,
  UserPlus,
  Upload,
  PlusCircle,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMedicalDashboard } from '../../utils/api';

const MedicalDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getMedicalDashboard();
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch medical dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);
  const stats = [
    { label: 'Total Medicines', value: data?.stats?.totalMedicines || 0, icon: <Pill />, color: 'blue', trend: '+12 this week' },
    { label: 'Pending Prescriptions', value: data?.stats?.pendingPrescriptions || 0, icon: <ClipboardList />, color: 'yellow', trend: 'Urgent' },
    { label: 'Low Stock Alerts', value: data?.stats?.lowStock || 0, icon: <AlertTriangle />, color: 'red', trend: 'Immediate action' },
    { label: 'Dispensed Today', value: data?.stats?.dispensedToday || 0, icon: <CheckCircle />, color: 'blue', trend: 'Steady flow' },
  ];

  const pendingPrescriptions = data?.pendingPrescriptions || [];
  const lowStock = data?.lowStockItems || [];

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard...</div>;

  return (
    <div className="medical-dashboard">
      <div className="mb-6">
        <h2 className="section-title">Medical Dashboard</h2>
        <p className="section-subtitle">Real-time overview of pharmacy inventory and lab requests</p>
      </div>

      <div className="grid grid-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="card">
            <div className="card-header">
              <div className={`stat-icon ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="badge-soft">{stat.trend}</span>
            </div>
            <div className="card-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        {/* Prescription Queue */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="card-title">Recent Prescription Requests</h3>
            <Link to="/medical/prescriptions" className="text-primary text-sm font-semibold">View All</Link>
          </div>
          <div className="table-container" style={{ margin: 0, border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingPrescriptions.map((prx) => (
                  <tr key={prx._id}>
                    <td><strong>{prx._id.slice(-6).toUpperCase()}</strong></td>
                    <td>{prx.patient}</td>
                    <td>{prx.doctor}</td>
                    <td>
                      <span className={`chip-${prx.status === 'In Progress' ? 'warning' : 'neutral'}`}>
                        {prx.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/medical/prescriptions/${prx._id}`} className="btn-icon">
                        <CheckCircle size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="card-title">Low Stock Inventory</h3>
            <Link to="/medical/inventory" className="text-primary text-sm font-semibold">Manage Inventory</Link>
          </div>
          <div className="flex-col gap-4">
            {lowStock.map((item, idx) => (
              <div key={idx} className="stat-item" style={{ padding: '1.25rem' }}>
                <div className="flex items-center gap-4">
                  <div className="stat-icon red" style={{ width: '40px', height: '40px' }}>
                    <Pill size={18} />
                  </div>
                  <div>
                    <div className="author-name">{item.name}</div>
                    <div className="muted">{item.stock} {item.unit} remaining</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-danger font-bold">-{item.min - item.stock}</div>
                  <div className="muted" style={{ fontSize: '0.75rem' }}>Below Threshold</div>
                </div>
              </div>
            ))}
            <Link to="/medical/inventory/add" className="btn btn-outline w-full mt-2">
              <PlusCircle size={18} /> Restock Inventory
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-3 mt-8">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="card-title mb-4">Quick Actions</h3>
          <div className="grid grid-2 gap-3">
            <Link to="/medical/inventory/add" className="btn btn-primary" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem' }}>
              <PlusCircle size={24} />
              <span style={{ fontSize: '0.85rem' }}>Add Medicine</span>
            </Link>
            <Link to="/medical/inventory" className="btn btn-outline" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem' }}>
              <Pill size={24} />
              <span style={{ fontSize: '0.85rem' }}>Inventory</span>
            </Link>
            <Link to="/medical/prescriptions" className="btn btn-outline" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem' }}>
              <ClipboardList size={24} />
              <span style={{ fontSize: '0.85rem' }}>Prescriptions</span>
            </Link>
            <Link to="/medical/settings" className="btn btn-outline" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem' }}>
              <Settings size={24} />
              <span style={{ fontSize: '0.85rem' }}>Settings</span>
            </Link>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="card col-span-2">
          <h3 className="card-title mb-6">Recent Activity</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-bullet"></div>
              <div className="timeline-content">
                <div>Lab Report Uploaded for <strong>Patient #1024</strong></div>
                <div className="timeline-meta">By Lab Assistant Sarah • 15 mins ago</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-bullet" style={{ background: 'var(--success)' }}></div>
              <div className="timeline-content">
                <div>Prescription <strong>PRX-899</strong> Dispensed Successfully</div>
                <div className="timeline-meta">To Patient Michael J. • 45 mins ago</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-bullet" style={{ background: 'var(--warning)' }}></div>
              <div className="timeline-content">
                <div>Inventory Alert: <strong>Amoxicillin</strong> stock is critical</div>
                <div className="timeline-meta">Automatic System Alert • 2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
