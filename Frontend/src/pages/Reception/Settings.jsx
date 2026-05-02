import React from 'react';
import { User, Bell, Lock, Shield, CreditCard, HelpCircle } from 'lucide-react';
import '../../styles/Dashboard.css';

const Settings = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Account Settings</h1>
          <p>Manage your profile, security, and notification preferences</p>
        </div>
      </header>

      <div className="settings-layout">
        <div className="settings-sidebar-nav">
          <button className="settings-nav-item active">
            <User size={18} /> Profile Information
          </button>
          <button className="settings-nav-item">
            <Lock size={18} /> Password & Security
          </button>
          <button className="settings-nav-item">
            <Bell size={18} /> Notifications
          </button>
          <button className="settings-nav-item">
            <Shield size={18} /> Access Permissions
          </button>
        </div>

        <div className="settings-content">
          <div className="dashboard-card">
            <div className="card-header">
              <div className="header-info">
                <h3>Profile Details</h3>
                <p>Personal information as it appears in the system</p>
              </div>
            </div>
            
            <div className="profile-edit-form">
              <div className="avatar-section mb-5">
                <div className="avatar-large">RP</div>
                <div className="avatar-actions">
                  <button className="btn-secondary-sm">Change Photo</button>
                  <button className="btn-link-danger">Remove</button>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" className="form-control" defaultValue="Reception Staff One" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-control" defaultValue="reception@smarthealth.com" disabled />
                </div>
                <div className="form-group">
                  <label>Staff ID</label>
                  <input type="text" className="form-control" defaultValue="REC-2026-001" disabled />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" className="form-control" defaultValue="+91 98765 43210" />
                </div>
              </div>

              <div className="form-footer mt-5 pt-4 border-top">
                <button className="btn-primary">Save Changes</button>
                <button className="btn-outline ms-3">Reset to Default</button>
              </div>
            </div>
          </div>

          <div className="dashboard-card mt-4">
            <div className="card-header">
              <div className="header-info">
                <h3>System Preferences</h3>
                <p>Customize your dashboard experience</p>
              </div>
            </div>
            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Email Notifications</span>
                  <span className="setting-desc">Receive updates about new patient assignments via email</span>
                </div>
                <div className="toggle-switch active"></div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Desktop Alerts</span>
                  <span className="setting-desc">Show real-time browser notifications for appointment requests</span>
                </div>
                <div className="toggle-switch"></div>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Dark Mode</span>
                  <span className="setting-desc">Switch interface to dark high-contrast theme</span>
                </div>
                <div className="toggle-switch"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
