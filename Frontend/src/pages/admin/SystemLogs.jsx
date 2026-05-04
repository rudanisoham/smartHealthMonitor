import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminLogs } from '../../utils/api';
import { Loader, Search } from 'lucide-react';

export default function SystemLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getAdminLogs();
        setLogs(res.data.data);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => 
    log.details?.toLowerCase().includes(search.toLowerCase()) ||
    log.user?.toLowerCase().includes(search.toLowerCase()) ||
    log.action?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <AdminLayout title="System Logs" subtitle="Security audit trails and tracking">
      <div style={{padding: '5rem', textAlign: 'center'}}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
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
             <Search style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8'}} />
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
                if (log.role === 'ADMIN') dotColor = '#F59E0B';
                if (log.role === 'SYSTEM') dotColor = '#EF4444';
                return (
                  <tr key={log._id} style={{background: '#FFFFFF', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}>
                    <td style={{padding: '1.5rem 2.5rem', borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <div style={{width: '6px', height: '6px', borderRadius: '50%', background: dotColor}}></div>
                        <span style={{fontSize: '0.75rem', fontWeight: '700', color: '#334155'}}>{log.action}</span>
                      </div>
                    </td>
                    <td style={{padding: '1.5rem 1.5rem', fontSize: '0.85rem', color: '#0F172A', fontWeight: '500', borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid #F1F5F9'}}>{log.details}</td>
                    <td style={{padding: '1.5rem 1.5rem', fontSize: '0.85rem', color: '#64748B', fontWeight: '500', borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid #F1F5F9'}}>{log.user} ({log.role})</td>
                    <td style={{padding: '1.5rem 2.5rem', fontSize: '0.85rem', color: '#64748B', fontWeight: '500', borderBottom: index === filteredLogs.length - 1 ? 'none' : '1px solid #F1F5F9'}}>{new Date(log.createdAt).toLocaleString()}</td>
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
