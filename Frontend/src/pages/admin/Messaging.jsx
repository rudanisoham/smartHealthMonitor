import React, { useState } from 'react';
import { Send, Users, User, Filter, ChevronDown, Mail, Bell, MessageSquare } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const Messaging = () => {
  const [target, setTarget] = useState('ALL');
  const [showFilters, setShowFilters] = useState(false);

  const mockBroadcasts = [
    { id: 1, subject: "Holiday Notice", body: "Dear Patients, the hospital will be closed on Friday for the public holiday.", target: "PATIENT", date: "2026-04-01 10:15", status: "SENT", recipients: 1250 },
    { id: 2, subject: "New Medical Guidelines", body: "Attention Doctors, please review the new surgical protocol document available on the portal.", target: "DOCTOR", date: "2026-03-28 14:30", status: "SENT", recipients: 45 },
  ];

  return (
    <AdminLayout>
      <div className="section-header mb-4">
        <h1 className="section-title">Broadcast Center</h1>
        <p className="section-subtitle">Send announcements and notifications to system users</p>
      </div>

      <div className="card">
        <h3 className="card-title mb-4">New Broadcast Message</h3>
        <form>
          <div className="form-group mb-4">
            <label className="form-label">Recipients Target</label>
            <div className="grid grid-3" style={{ gap: '1rem' }}>
              <div 
                className={`card ${target === 'ALL' ? 'active' : ''}`} 
                style={{ cursor: 'pointer', textAlign: 'center', padding: '1rem', border: target === 'ALL' ? '2px solid var(--primary)' : '1px solid var(--border)' }}
                onClick={() => setTarget('ALL')}
              >
                <Users size={24} style={{ marginBottom: '0.5rem', color: target === 'ALL' ? 'var(--primary)' : 'var(--text-muted)' }} />
                <div style={{ fontWeight: 700 }}>Everyone</div>
              </div>
              <div 
                className={`card ${target === 'PATIENT' ? 'active' : ''}`} 
                style={{ cursor: 'pointer', textAlign: 'center', padding: '1rem', border: target === 'PATIENT' ? '2px solid var(--primary)' : '1px solid var(--border)' }}
                onClick={() => setTarget('PATIENT')}
              >
                <User size={24} style={{ marginBottom: '0.5rem', color: target === 'PATIENT' ? 'var(--primary)' : 'var(--text-muted)' }} />
                <div style={{ fontWeight: 700 }}>Patients Only</div>
              </div>
              <div 
                className={`card ${target === 'DOCTOR' ? 'active' : ''}`} 
                style={{ cursor: 'pointer', textAlign: 'center', padding: '1rem', border: target === 'DOCTOR' ? '2px solid var(--primary)' : '1px solid var(--border)' }}
                onClick={() => setTarget('DOCTOR')}
              >
                <MessageSquare size={24} style={{ marginBottom: '0.5rem', color: target === 'DOCTOR' ? 'var(--primary)' : 'var(--text-muted)' }} />
                <div style={{ fontWeight: 700 }}>Doctors Only</div>
              </div>
            </div>
          </div>

          {target !== 'ALL' && (
            <div className="form-group mb-4">
              <button 
                type="button" 
                className="btn btn-outline btn-sm" 
                onClick={() => setShowFilters(!showFilters)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Filter size={16} /> Filter Recipients <ChevronDown size={16} style={{ transform: showFilters ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
              </button>
              
              {showFilters && (
                <div className="grid grid-3 mt-3" style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', gap: '1.5rem' }}>
                  {target === 'PATIENT' ? (
                    <>
                      <div className="form-group">
                        <label className="form-label">Blood Group</label>
                        <select className="form-control"><option>Any</option><option>A+</option><option>B+</option></select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Gender</label>
                        <select className="form-control"><option>Any</option><option>Male</option><option>Female</option></select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-group">
                        <label className="form-label">Department</label>
                        <select className="form-control"><option>Any</option><option>Cardiology</option><option>Neurology</option></select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Specialty</label>
                        <input type="text" className="form-control" placeholder="e.g. Surgery" />
                      </div>
                    </>
                  )}
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select className="form-control"><option>Active Users</option><option>All Users</option></select>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-2 mb-4" style={{ gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Delivery Method</label>
              <select className="form-control">
                <option>Email + In-App Notification</option>
                <option>Email Only</option>
                <option>In-App Notification Only</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message Subject</label>
              <input type="text" className="form-control" placeholder="e.g. Important Update on Hospital Hours" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Message Content</label>
            <textarea className="form-control" rows="6" placeholder="Write your broadcast message here..." required></textarea>
          </div>

          <div className="mt-4" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="reset" className="btn btn-outline">Clear</button>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Send size={18} /> Send Broadcast
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5">
        <h2 className="section-title mb-4">Recent Broadcasts</h2>
        <div className="grid" style={{ gap: '1rem' }}>
          {mockBroadcasts.map(msg => (
            <div key={msg.id} className="card" style={{ padding: '1.5rem', borderLeft: `4px solid ${msg.target === 'DOCTOR' ? 'var(--primary)' : 'var(--success)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`badge-soft ${msg.target === 'DOCTOR' ? '' : 'success'}`} style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    {msg.target}
                  </span>
                  <strong style={{ fontSize: '1.1rem' }}>{msg.subject}</strong>
                </div>
                <div className="muted" style={{ fontSize: '0.85rem' }}>{msg.date}</div>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>{msg.body}</p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', gap: '1rem' }}>
                <span className="muted" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Mail size={14} /> Email + In-App
                </span>
                <span className="muted" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Users size={14} /> {msg.recipients} Recipients
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 700, marginLeft: 'auto' }}>
                  {msg.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Messaging;
