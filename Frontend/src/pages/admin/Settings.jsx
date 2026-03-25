import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function Settings() {
  return (
    <AdminLayout title="Settings" subtitle="System preferences and configurations">
      <div className="grid grid-2">
        
        <div className="card">
          <div className="card-header">
            <div className="card-title">Hospital Profile</div>
          </div>
          <form style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div>
              <label style={{display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize:'0.9rem'}}>Facility Name</label>
              <input type="text" defaultValue="Smart Health Central Hospital" style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none'}} />
            </div>
            <div>
              <label style={{display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize:'0.9rem'}}>Contact Email</label>
              <input type="email" defaultValue="admin@smarthealth.com" style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none'}} />
            </div>
            <div>
              <label style={{display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize:'0.9rem'}}>Timezone</label>
              <select style={{width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'white'}}>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
              </select>
            </div>
            <button type="button" style={{padding: '0.75rem 1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', alignSelf: 'flex-start', marginTop: '0.5rem'}}>Save Profile</button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Security & Access</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <div style={{fontWeight: '600'}}>Two-Factor Authentication</div>
                <div className="muted" style={{fontSize: '0.8rem', marginTop: '0.2rem'}}>Require 2FA for all administrative accounts</div>
              </div>
              <input type="checkbox" defaultChecked style={{width: '18px', height: '18px'}} />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <div style={{fontWeight: '600'}}>Session Timeout</div>
                <div className="muted" style={{fontSize: '0.8rem', marginTop: '0.2rem'}}>Automatically log out idle users</div>
              </div>
              <select style={{padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'white'}}>
                <option>15 minutes</option>
                <option selected>30 minutes</option>
                <option>1 hour</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
