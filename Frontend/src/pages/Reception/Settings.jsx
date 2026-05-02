import React from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Laptop, Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="admin-content">
      <div className="mb-6">
        <h2 className="section-title">Portal Settings</h2>
        <p className="section-subtitle">Configure your reception desk preferences and account security</p>
      </div>

      <div className="grid grid-3 gap-6">
        <div className="col-span-1">
          <div className="card" style={{ padding: '0' }}>
            <div className="sidebar-nav" style={{ padding: '1rem' }}>
              <button className="sidebar-link active" style={{ width: '100%', border: 'none' }}>
                <span className="icon"><User size={18} /></span>
                <span className="sidebar-text">Profile Information</span>
              </button>
              <button className="sidebar-link" style={{ width: '100%', border: 'none' }}>
                <span className="icon"><Bell size={18} /></span>
                <span className="sidebar-text">Notifications</span>
              </button>
              <button className="sidebar-link" style={{ width: '100%', border: 'none' }}>
                <span className="icon"><Shield size={18} /></span>
                <span className="sidebar-text">Security & Privacy</span>
              </button>
              <button className="sidebar-link" style={{ width: '100%', border: 'none' }}>
                <span className="icon"><Laptop size={18} /></span>
                <span className="sidebar-text">System Display</span>
              </button>
            </div>
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <h3 className="card-title">Profile Settings</h3>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center gap-6 mb-8 pb-8 border-bottom">
              <div className="header-avatar" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                R
              </div>
              <div>
                <button className="btn btn-primary mb-2">Change Avatar</button>
                <p className="muted">Recommended: 400x400px. Max 2MB.</p>
              </div>
            </div>

            <div className="form-grid form-2">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" defaultValue="Receptionist Staff" />
              </div>
              <div className="form-group">
                <label>Staff ID</label>
                <input type="text" className="form-control" defaultValue="STF-REC-001" disabled />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" defaultValue="reception@smarthealth.com" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" className="form-control" defaultValue="+1 (555) 000-1234" />
              </div>
            </div>

            <div className="form-group mt-4">
              <label>Workstation Bio</label>
              <textarea className="form-control" rows="3" defaultValue="Front desk reception and patient coordination specialist."></textarea>
            </div>

            <div className="mt-8 pt-6 border-top flex justify-end">
              <button className="btn btn-primary">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
