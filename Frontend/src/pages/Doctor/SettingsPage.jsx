import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const SettingsPage = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const handleChange = (e) => setPasswords({...passwords, [e.target.name]: e.target.value});

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert('Password updated (mock)');
  };

  const handleSupport = () => {
    alert('Contacting support (mock)');
  };

  const handleSuspend = () => {
    if (window.confirm('Are you strictly sure you want to suspend your account? Admin approval is required for reactivation.')) {
      alert('Account suspended (mock)');
    }
  };

  return (
    <>
      <div className="card-header-flex" style={{marginBottom: '2rem'}}>
        <div>
          <h1 className="page-title" style={{fontSize: '1.5rem', marginBottom: '0.25rem'}}>Settings</h1>
          <div className="muted" style={{fontSize: '1rem'}}>Security preferences and account configurations</div>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', alignItems: 'start'}}>
        
        {/* Left Side: Change Password Card */}
        <div className="card" style={{padding: '2rem'}}>
          <div className="card-header" style={{marginBottom: '2rem'}}>
            <div>
              <div className="section-title" style={{fontSize: '1.2rem'}}>Change Password</div>
              <div className="section-subtitle">Keep your account secure</div>
            </div>
            <span className="chip-neutral" style={{fontSize: '0.75rem', padding: '0.3rem 0.8rem'}}>Security</span>
          </div>

          <form onSubmit={handlePasswordSubmit} className="form-grid">
            <div className="form-group">
              <label>Current Password</label>
              <input 
                type="password" 
                name="currentPassword" 
                className="form-control" 
                placeholder="Enter current password" 
                value={passwords.currentPassword} 
                onChange={handleChange} 
                required
              />
            </div>
            
            <div className="form-group" style={{marginTop: '0.5rem'}}>
              <label>New Password</label>
              <input 
                type="password" 
                name="newPassword" 
                className="form-control" 
                placeholder="Enter new password" 
                value={passwords.newPassword} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary" style={{padding: '0.75rem 1.5rem'}}>Update Password</button>
            </div>
          </form>
        </div>

        {/* Right Side Stack: Support & Danger Zone */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          
          {/* Help & Support Card */}
          <div className="card" style={{padding: '2rem'}}>
            <div className="card-header" style={{margin: 0}}>
              <div>
                <div className="section-title" style={{fontSize: '1.1rem'}}>Help & Support</div>
                <div className="section-subtitle">Technical assistance and documentation</div>
              </div>
            </div>
            
            <div className="muted mt-3 mb-4" style={{fontSize: '0.9rem', lineHeight: 1.5}}>
              Need help with the portal or facing technical issues? Contact hospital IT support.
            </div>
            
            <button onClick={handleSupport} className="btn btn-outline" style={{width: '100%', gap: '0.5rem', fontWeight: 600}}>
              <Mail size={16} /> Email Support
            </button>
          </div>

          {/* Danger Zone Card */}
          <div className="card" style={{padding: '2rem', border: '1px solid #fecaca', background: '#fef2f2'}}>
            <div className="card-header" style={{margin: 0}}>
              <div>
                <div className="section-title" style={{fontSize: '1.1rem', color: '#dc2626'}}>Danger Zone</div>
                <div className="section-subtitle" style={{color: '#f87171'}}>Irreversible account actions</div>
              </div>
            </div>
            
            <div className="muted mt-3 mb-4" style={{fontSize: '0.9rem', lineHeight: 1.5}}>
              Suspending your account will instantly remove you from patient appointment bookings. This action cannot be undone by you. Admin approval will be required to reactivate.
            </div>
            
            <button 
              onClick={handleSuspend} 
              className="btn btn-outline" 
              style={{
                color: '#dc2626', 
                borderColor: '#fca5a5', 
                background: 'white',
                fontWeight: 600,
                padding: '0.6rem 1.25rem'
              }}
            >
              Suspend Account
            </button>
          </div>

        </div>

      </div>
    </>
  );
};

export default SettingsPage;
