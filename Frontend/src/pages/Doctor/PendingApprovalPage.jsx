import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, LogOut, HelpCircle } from 'lucide-react';

const PendingApprovalPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '1.5rem' }}>
      <div style={{ maxWidth: '500px', width: '100%', background: 'white', padding: '2.5rem', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: '0 auto 1.5rem', fontSize: '2rem' }}>
          <Clock size={40} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>Account Awaiting Approval</h1>
        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#fef3c7', color: '#92400e', borderRadius: '2rem', fontWeight: 600, fontSize: '0.875rem', marginBottom: '2rem' }}>
          ⏳ Pending Administrator Review
        </div>
        <p style={{ lineHeight: 1.6, color: '#64748b', marginBottom: '2rem' }}>
          Hello {user.fullName || 'Doctor'}, your registration request has been received and is currently being reviewed by our medical board.
          You will receive an email notification once your account has been activated.
        </p>
        
        <button onClick={handleLogout} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', cursor: 'pointer', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1rem' }}>
          <LogOut size={18} /> Logout
        </button>

        <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#64748b' }}>
          Need urgent access? <a href="mailto:support@healthmonitor.com" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
