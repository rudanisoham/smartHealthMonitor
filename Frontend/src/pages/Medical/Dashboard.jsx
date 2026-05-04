import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  ClipboardList, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  PlusCircle,
  Search,
  Settings,
  ArrowRight,
  Clock,
  User
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
    { label: 'Medicines', value: data?.stats?.totalMedicines || 0, icon: <Pill size={24} />, color: '#3b82f6' },
    { label: 'Pending', value: data?.stats?.pendingPrescriptions || 0, icon: <ClipboardList size={24} />, color: '#f59e0b' },
    { label: 'Low Stock', value: data?.stats?.lowStock || 0, icon: <AlertTriangle size={24} />, color: '#ef4444' },
    { label: 'Fulfilled', value: data?.stats?.dispensedToday || 0, icon: <CheckCircle size={24} />, color: '#10b981' },
  ];

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="medical-dashboard">
      <div className="mb-6">
        <h2 className="section-title">Medical Dashboard</h2>
        <p className="section-subtitle">Pharmacy overview and stock management</p>
      </div>

      <div className="grid grid-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="card shadow-sm" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="muted" style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</div>
                <div className="card-value" style={{ fontSize: '1.75rem', margin: '0.5rem 0' }}>{stat.value}</div>
              </div>
              <div style={{ color: stat.color, background: `${stat.color}15`, padding: '0.75rem', borderRadius: '12px' }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-3" style={{ gap: '1.5rem' }}>
        {/* Quick Actions - Simplified */}
        <div className="card shadow-sm">
          <div className="card-header" style={{ marginBottom: '1.25rem' }}>
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/medical/inventory/add" className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}>
              <PlusCircle size={18} style={{ marginRight: '0.75rem' }} /> Add New Medicine
            </Link>
            <Link to="/medical/inventory" className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}>
              <Pill size={18} style={{ marginRight: '0.75rem' }} /> View Inventory
            </Link>
            <Link to="/medical/prescriptions" className="btn btn-outline" style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem' }}>
              <ClipboardList size={18} style={{ marginRight: '0.75rem' }} /> Prescription Queue
            </Link>
          </div>
        </div>

        {/* Prescription Queue - Simplified */}
        <div className="card shadow-sm col-span-2">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 className="card-title">Pending Prescriptions</h3>
            <Link to="/medical/prescriptions" className="btn btn-outline btn-sm">View All</Link>
          </div>
          <div className="table-container" style={{ margin: 0, border: 'none' }}>
            <table className="w-100">
              <thead>
                <tr>
                  <th style={{ background: 'transparent' }}>Patient</th>
                  <th style={{ background: 'transparent' }}>Doctor</th>
                  <th style={{ background: 'transparent' }}>Time</th>
                  <th style={{ background: 'transparent', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.pendingPrescriptions?.length > 0 ? (
                  data.pendingPrescriptions.map((prx) => (
                    <tr key={prx._id} className="hover-row">
                      <td style={{ fontWeight: 600 }}>{prx.patient}</td>
                      <td>Dr. {prx.doctor}</td>
                      <td className="muted" style={{ fontSize: '0.85rem' }}>{prx.time}</td>
                      <td className="text-center">
                        <Link to={`/medical/prescriptions/${prx._id}`} className="btn btn-primary btn-sm">
                          Dispense
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 muted">No pending prescriptions</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-2 mt-8" style={{ gap: '1.5rem' }}>
        {/* Low Stock - Simplified */}
        <div className="card shadow-sm">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="#ef4444" /> Low Stock Alerts
            </h3>
            <Link to="/medical/inventory" className="btn btn-outline btn-sm">Manage</Link>
          </div>
          <div className="flex-col gap-3">
            {data?.lowStockItems?.length > 0 ? data.lowStockItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#fff1f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#991b1b' }}>{item.name}</div>
                  <div className="muted" style={{ fontSize: '0.8rem' }}>{item.category}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#ef4444', fontWeight: 800 }}>{item.stock} {item.unit}</div>
                  <div className="muted" style={{ fontSize: '0.7rem' }}>Threshold: {item.min}</div>
                </div>
              </div>
            )) : (
              <div className="text-center py-4 muted">Inventory is healthy</div>
            )}
          </div>
        </div>

        {/* Activity - Simplified */}
        <div className="card shadow-sm">
          <div className="card-header" style={{ marginBottom: '1.25rem' }}>
            <h3 className="card-title">Recent System Activity</h3>
          </div>
          <div className="timeline" style={{ padding: '0 0.5rem' }}>
            <div className="timeline-item">
              <div className="timeline-bullet" style={{ background: '#10b981' }}></div>
              <div className="timeline-content">
                <div style={{ fontWeight: 600 }}>Medicine Inventory Updated</div>
                <div className="muted" style={{ fontSize: '0.8rem' }}>System Sync · Just now</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-bullet" style={{ background: '#3b82f6' }}></div>
              <div className="timeline-content">
                <div style={{ fontWeight: 600 }}>Prescription DISP-829 Fulfilled</div>
                <div className="muted" style={{ fontSize: '0.8rem' }}>By Pharmacist · 10 mins ago</div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-bullet" style={{ background: '#f59e0b' }}></div>
              <div className="timeline-content">
                <div style={{ fontWeight: 600 }}>Low Stock Warning: Amoxicillin</div>
                <div className="muted" style={{ fontSize: '0.8rem' }}>System Alert · 2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .hover-row:hover { background-color: #f8fafc; }
        .timeline { border-left: 2px solid #e2e8f0; margin-left: 0.5rem; position: relative; }
        .timeline-item { margin-bottom: 1.5rem; padding-left: 1.5rem; position: relative; }
        .timeline-bullet { position: absolute; left: -7px; top: 4px; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px #e2e8f0; }
      `}</style>
    </div>
  );
};

export default MedicalDashboard;
