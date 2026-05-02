import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function Analytics() {
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
        {/* Left Column: Data Exports */}
        <div className="card">
          <div className="card-header">
             <div className="card-title">Data Exports Generated</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
            <div>
              <div className="card-value">1,204</div>
              <div className="muted mt-1">Total exports this month</div>
            </div>
            <div className="header-avatar" style={{width: '48px', height: '48px', background: 'var(--primary-light)', color: 'var(--primary)'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div className="card-value" style={{color: 'var(--warning)', fontSize: '1.8rem'}}>14</div>
              <div className="muted mt-1">Failed Exports</div>
            </div>
             <div className="header-avatar" style={{width: '48px', height: '48px', background: 'var(--warning-light)', color: 'var(--warning)'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            </div>
          </div>
        </div>

        {/* Right Column: System Reports */}
        <div className="card">
          <div className="card-header">
             <div className="card-title">Scheduled System Reports</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)'}}></div>
              <div>
                <div style={{fontWeight: '600', color: 'var(--text-main)'}}>Daily Admission Summary</div>
                <div className="muted" style={{fontSize: '0.75rem'}}>Last run - Today at 07:45 - CSV</div>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)'}}></div>
              <div>
                <div style={{fontWeight: '600', color: 'var(--text-main)'}}>Weekly Department Capacity</div>
                <div className="muted" style={{fontSize: '0.75rem'}}>Last run - Sunday at 23:59 - PDF</div>
              </div>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)'}}></div>
              <div>
                <div style={{fontWeight: '600', color: 'var(--text-main)'}}>Monthly Financial Audit</div>
                <div className="muted" style={{fontSize: '0.75rem'}}>Last run - 1st of Month - XLSX</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
