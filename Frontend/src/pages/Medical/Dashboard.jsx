import React from 'react';
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
  PlusCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MedicalDashboard = () => {
  const stats = [
    { label: 'Total Medicines', value: '1,248', icon: <Pill />, color: 'blue', trend: '+12 this week' },
    { label: 'Pending Prescriptions', value: '28', icon: <ClipboardList />, color: 'yellow', trend: '8 urgent' },
    { label: 'Low Stock Alerts', value: '14', icon: <AlertTriangle />, color: 'red', trend: 'Immediate action' },
    { label: 'Reports Pending', value: '42', icon: <FileText />, color: 'blue', trend: 'Due today' },
  ];

  const pendingPrescriptions = [
    { id: 'PRX-901', patient: 'Michael J.', doctor: 'Dr. Sarah Connor', time: '10 mins ago', status: 'Pending' },
    { id: 'PRX-902', patient: 'Emma Watson', doctor: 'Dr. James Wilson', time: '25 mins ago', status: 'In Progress' },
    { id: 'PRX-903', patient: 'Chris Evans', doctor: 'Dr. Lisa Cuddy', time: '1 hour ago', status: 'Pending' },
  ];

  const lowStock = [
    { name: 'Paracetamol 500mg', stock: 45, unit: 'Tablets', min: 100 },
    { name: 'Amoxicillin 250mg', stock: 12, unit: 'Bottles', min: 20 },
    { name: 'Insulin Glargine', stock: 8, unit: 'Vials', min: 15 },
  ];

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
                  <tr key={prx.id}>
                    <td><strong>{prx.id}</strong></td>
                    <td>{prx.patient}</td>
                    <td>{prx.doctor}</td>
                    <td>
                      <span className={`chip-${prx.status === 'In Progress' ? 'warning' : 'neutral'}`}>
                        {prx.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/medical/prescriptions/${prx.id}`} className="btn-icon">
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
            <Link to="/medical/upload-report" className="btn btn-primary" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem' }}>
              <Upload size={24} />
              <span style={{ fontSize: '0.85rem' }}>Upload Report</span>
            </Link>
            <Link to="/medical/inventory/add" className="btn btn-outline" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem' }}>
              <PlusCircle size={24} />
              <span style={{ fontSize: '0.85rem' }}>Add Medicine</span>
            </Link>
            <Link to="/medical/patient-search" className="btn btn-outline" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem' }}>
              <UserPlus size={24} />
              <span style={{ fontSize: '0.85rem' }}>Patient Search</span>
            </Link>
            <Link to="/medical/reports" className="btn btn-outline" style={{ padding: '1rem', flexDirection: 'column', gap: '0.5rem' }}>
              <FileText size={24} />
              <span style={{ fontSize: '0.85rem' }}>View Reports</span>
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
