import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminAnalytics } from '../../utils/api';
import { Loader, Download, TrendingUp, AlertTriangle } from 'lucide-react';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminAnalytics();
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <AdminLayout title="Reports & Analytics" subtitle="Export data and view system telemetry">
      <div style={{padding: '5rem', textAlign: 'center'}}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
  );

  const { stats, admissionsByMonth } = data;

  return (
    <AdminLayout title="Reports & Analytics" subtitle="Export data and view system telemetry">
      
      {/* Export Controls */}
      <div className="card mb-6">
        <div className="card-header">
          <div className="card-title">Data Export Engine</div>
        </div>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap'}}>
          <div style={{flex: 1, minWidth: '200px'}}>
            <label className="muted" style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase'}}>Date From</label>
            <input type="date" style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)'}} />
          </div>
          <div style={{flex: 1, minWidth: '200px'}}>
            <label className="muted" style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase'}}>Date To</label>
            <input type="date" style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)'}} />
          </div>
          <div style={{flex: 1, minWidth: '200px'}}>
            <label className="muted" style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.8rem', textTransform: 'uppercase'}}>Report Type</label>
            <select style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', background: 'white'}}>
              <option>Patient Admissions</option>
              <option>Department Capacity</option>
              <option>Financial Summary</option>
            </select>
          </div>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <button style={{padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer'}}>Preview</button>
            <button style={{padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer'}}>Export CSV</button>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        {/* Left Column: Data Stats */}
        <div className="card">
          <div className="card-header">
             <div className="card-title">System Metrics</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
            <div>
              <div className="card-value">{stats.totalPatients}</div>
              <div className="muted mt-1">Total Registered Patients</div>
            </div>
            <div className="header-avatar" style={{width: '48px', height: '48px', background: 'var(--primary-light)', color: 'var(--primary)'}}>
              <TrendingUp size={24} />
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div className="card-value" style={{color: 'var(--primary)', fontSize: '1.8rem'}}>₹{stats.totalRevenue.toLocaleString()}</div>
              <div className="muted mt-1">Total Revenue Collected</div>
            </div>
             <div className="header-avatar" style={{width: '48px', height: '48px', background: 'var(--success-light)', color: 'var(--success)'}}>
              <CheckCircle size={24} />
            </div>
          </div>
        </div>

        {/* Right Column: Monthly Admissions */}
        <div className="card">
          <div className="card-header">
             <div className="card-title">Recent Admissions Trend</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            {admissionsByMonth.length === 0 ? (
              <div className="muted text-center py-4">No recent admissions data found.</div>
            ) : admissionsByMonth.map((item, idx) => (
              <div key={idx} style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)'}}></div>
                <div style={{flex: 1, display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{fontWeight: '600', color: 'var(--text-main)'}}>Month {item._id}</div>
                  <div style={{fontWeight: '700'}}>{item.count} Admissions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
import { CheckCircle } from 'lucide-react';
