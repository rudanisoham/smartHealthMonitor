import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function SystemLogs() {
  return (
    <AdminLayout title="System Logs" subtitle="Monitor hospital network activity">
      <div className="card mb-6">
        
        {/* Filters & Search */}
        <div className="card-header" style={{flexDirection: 'column', gap: '1rem'}}>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <button className="badge-soft" style={{background: 'var(--primary)', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer'}}>All</button>
            <button className="badge-soft" style={{background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '0.5rem 1rem', cursor: 'pointer'}}>Error</button>
            <button className="badge-soft" style={{background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '0.5rem 1rem', cursor: 'pointer'}}>Warning</button>
            <button className="badge-soft" style={{background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '0.5rem 1rem', cursor: 'pointer'}}>Info</button>
          </div>
          <input 
            type="text" 
            placeholder="Filter by admin, action or resource" 
            style={{width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.95rem', color: 'var(--text-main)', outline: 'none'}}
          />
        </div>

        {/* Data Table */}
        <div className="table-container mt-4">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Level</th>
                <th>Message</th>
                <th>Admin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="muted">2026-03-24 08:30:12</td>
                <td><span className="status-pill" style={{background: 'var(--danger-light)', color: 'var(--danger)'}}>Error</span></td>
                <td style={{fontWeight: '600'}}>Database connection timeout on Ward 3</td>
                <td className="muted">System</td>
                <td className="muted">Reconnect Attempt</td>
              </tr>
              <tr>
                <td className="muted">2026-03-24 08:15:00</td>
                <td><span className="status-pill" style={{background: 'var(--warning-light)', color: 'var(--warning)'}}>Warning</span></td>
                <td style={{fontWeight: '600'}}>High CPU usage detected</td>
                <td className="muted">System</td>
                <td className="muted">Auto-scale triggered</td>
              </tr>
              <tr>
                <td className="muted">2026-03-24 08:05:41</td>
                <td><span className="status-pill" style={{background: 'var(--success-light)', color: 'var(--success)'}}>Info</span></td>
                <td style={{fontWeight: '600'}}>Dr. Smith updated patient #1029</td>
                <td className="muted">jsmith</td>
                <td className="muted">Update Record</td>
              </tr>
              <tr>
                <td className="muted">2026-03-24 07:50:22</td>
                <td><span className="status-pill" style={{background: 'var(--success-light)', color: 'var(--success)'}}>Info</span></td>
                <td style={{fontWeight: '600'}}>Daily DB Backup Completed</td>
                <td className="muted">System</td>
                <td className="muted">Backup</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
