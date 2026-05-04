import React, { useState, useEffect } from 'react';
import { Send, Users, User, Filter, ChevronDown, Mail, Bell, MessageSquare, Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminBroadcasts, sendAdminBroadcast } from '../../utils/api';

const Messaging = () => {
  const [target, setTarget] = useState('ALL');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [method, setMethod] = useState('Email + In-App Notification');
  const [broadcasts, setBroadcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchBroadcasts();
  }, []);

  const fetchBroadcasts = async () => {
    try {
      const res = await getAdminBroadcasts();
      setBroadcasts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch broadcasts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendAdminBroadcast({ target, subject, body, method });
      alert("Broadcast sent successfully!");
      setSubject('');
      setBody('');
      fetchBroadcasts();
    } catch (err) {
      alert("Failed to send broadcast");
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <div className="section-header mb-4">
        <h1 className="section-title">Broadcast Center</h1>
        <p className="section-subtitle">Send announcements and notifications to system users</p>
      </div>

      <div className="card">
        <h3 className="card-title mb-4">New Broadcast Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="form-label">Recipients Target</label>
            <div className="grid grid-3" style={{ gap: '1rem' }}>
              <div 
                className={`card ${target === 'ALL' ? 'active' : ''}`} 
                style={{ cursor: 'pointer', textAlign: 'center', padding: '1rem', border: target === 'ALL' ? '2px solid var(--primary)' : '1px solid var(--border)', background: target === 'ALL' ? 'var(--primary-light)' : 'transparent' }}
                onClick={() => setTarget('ALL')}
              >
                <Users size={24} style={{ marginBottom: '0.5rem', color: target === 'ALL' ? 'var(--primary)' : 'var(--text-muted)' }} />
                <div style={{ fontWeight: 700 }}>Everyone</div>
              </div>
              <div 
                className={`card ${target === 'PATIENT' ? 'active' : ''}`} 
                style={{ cursor: 'pointer', textAlign: 'center', padding: '1rem', border: target === 'PATIENT' ? '2px solid var(--primary)' : '1px solid var(--border)', background: target === 'PATIENT' ? 'var(--primary-light)' : 'transparent' }}
                onClick={() => setTarget('PATIENT')}
              >
                <User size={24} style={{ marginBottom: '0.5rem', color: target === 'PATIENT' ? 'var(--primary)' : 'var(--text-muted)' }} />
                <div style={{ fontWeight: 700 }}>Patients Only</div>
              </div>
              <div 
                className={`card ${target === 'DOCTOR' ? 'active' : ''}`} 
                style={{ cursor: 'pointer', textAlign: 'center', padding: '1rem', border: target === 'DOCTOR' ? '2px solid var(--primary)' : '1px solid var(--border)', background: target === 'DOCTOR' ? 'var(--primary-light)' : 'transparent' }}
                onClick={() => setTarget('DOCTOR')}
              >
                <MessageSquare size={24} style={{ marginBottom: '0.5rem', color: target === 'DOCTOR' ? 'var(--primary)' : 'var(--text-muted)' }} />
                <div style={{ fontWeight: 700 }}>Doctors Only</div>
              </div>
            </div>
          </div>

          <div className="grid grid-2 mb-4" style={{ gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Delivery Method</label>
              <select className="form-control" value={method} onChange={(e) => setMethod(e.target.value)}>
                <option>Email + In-App Notification</option>
                <option>Email Only</option>
                <option>In-App Notification Only</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message Subject</label>
              <input type="text" className="form-control" placeholder="e.g. Important Update on Hospital Hours" required value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Message Content</label>
            <textarea className="form-control" rows="6" placeholder="Write your broadcast message here..." required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
          </div>

          <div className="mt-4" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="reset" className="btn btn-outline" onClick={() => { setSubject(''); setBody(''); }}>Clear</button>
            <button type="submit" disabled={sending} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {sending ? <Loader className="animate-spin" size={18} /> : <Send size={18} />}
              Send Broadcast
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5">
        <h2 className="section-title mb-4">Recent Broadcasts</h2>
        <div className="grid" style={{ gap: '1rem' }}>
          {loading ? (
            <div className="text-center py-4"><Loader className="animate-spin" /></div>
          ) : broadcasts.length === 0 ? (
            <div className="muted text-center py-4">No broadcasts sent yet.</div>
          ) : broadcasts.map(msg => (
            <div key={msg._id} className="card" style={{ padding: '1.5rem', borderLeft: `4px solid ${msg.targetGroup === 'DOCTOR' ? 'var(--primary)' : 'var(--success)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className={`badge-soft ${msg.targetGroup === 'DOCTOR' ? '' : 'success'}`} style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    {msg.targetGroup}
                  </span>
                  <strong style={{ fontSize: '1.1rem' }}>{msg.subject}</strong>
                </div>
                <div className="muted" style={{ fontSize: '0.85rem' }}>{new Date(msg.createdAt).toLocaleString()}</div>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>{msg.body}</p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', display: 'flex', gap: '1rem' }}>
                <span className="muted" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Mail size={14} /> {msg.deliveryMethod}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 700, marginLeft: 'auto' }}>
                  SENT
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
