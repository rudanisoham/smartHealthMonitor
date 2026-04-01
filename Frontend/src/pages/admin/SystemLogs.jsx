import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const mockLogs = [
  { action: "INFO", desc: "User logged in: admin@health.com", user: "System Admin", time: "2026-04-01 22:27:57" },
  { action: "INFO", desc: "User logged in: neha@gmail.com", user: "neha", time: "2026-04-01 22:24:03" },
  { action: "INFO", desc: "User logged out: admin@health.com", user: "System Admin", time: "2026-04-01 22:21:28" },
  { action: "INFO", desc: "User logged in: admin@health.com", user: "System Admin", time: "2026-04-01 22:21:18" },
  { action: "INFO", desc: "User logged out: admin@health.com", user: "System Admin", time: "2026-04-01 22:18:01" },
  { action: "INFO", desc: "User logged in: admin@health.com", user: "System Admin", time: "2026-04-01 22:15:40" },
  { action: "WARN", desc: "Failed login attempt: doctor@health.com", user: "Unknown", time: "2026-04-01 21:05:12" },
  { action: "ERROR", desc: "Database connection timeout", user: "System", time: "2026-04-01 19:42:01" }
];

export default function SystemLogs() {
  const [search, setSearch] = useState('');

  const filteredLogs = mockLogs.filter(log => 
    log.desc.toLowerCase().includes(search.toLowerCase()) ||
    log.user.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="System Logs" subtitle="Security audit trails and tracking">
      
      {/* Container Card */}
      <div className="card" style={{padding: '0', overflow: 'hidden'}}>
        
        <div style={{padding: '1.75rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0'}}>
          <div>
            <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>Audit Trail</div>
            <div style={{fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Real-time system events</div>
          </div>
          <div style={{position: 'relative', width: '300px'}}>
             <svg style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
             <input 
                type="text" 
                placeholder="Search logs..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', color: '#1E293B', outline: 'none', transition: 'border-color 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
          </div>
        </div>

        <div style={{width: '100%', overflowX: 'auto', maxHeight: '600px', overflowY: 'auto'}}>
          <table className="premium-table" style={{width: '100%', minWidth: '900px', borderSpacing: 0}}>
            <thead style={{position: 'sticky', top: 0, zIndex: 10}}>
              <tr style={{background: '#FFFFFF'}}>
                <th style={{padding: '1.25rem 2.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left', width: '15%'}}>LEVEL/ACTION</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left', width: '45%'}}>DESCRIPTION</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left', width: '20%'}}>PERFORMED BY</th>
                <th style={{padding: '1.25rem 2.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left', width: '20%'}}>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => {
                let dotColor = '#3B82F6';
                if (log.action === 'WARN') dotColor = '#F59E0B';
                if (log.action === 'ERROR') dotColor = '#EF4444';
                return (
                  <tr key={index} style={{background: '#FFFFFF', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}>
                    <td style={{padding: '1.5rem 2.5rem', borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <div style={{width: '6px', height: '6px', borderRadius: '50%', background: dotColor}}></div>
                        <span style={{fontSize: '0.75rem', fontWeight: '700', color: '#334155'}}>{log.action}</span>
                      </div>
                    </td>
                    <td style={{padding: '1.5rem 1.5rem', fontSize: '0.85rem', color: '#0F172A', fontWeight: '500', borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid #F1F5F9'}}>{log.desc}</td>
                    <td style={{padding: '1.5rem 1.5rem', fontSize: '0.85rem', color: '#64748B', fontWeight: '500', borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid #F1F5F9'}}>{log.user}</td>
                    <td style={{padding: '1.5rem 2.5rem', fontSize: '0.85rem', color: '#64748B', fontWeight: '500', borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid #F1F5F9'}}>{log.time}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredLogs.length === 0 && (
            <div style={{padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.9rem'}}>No logs found matching "{search}"</div>
          )}
        </div>
      </div>
      
    </AdminLayout>
  );
}
