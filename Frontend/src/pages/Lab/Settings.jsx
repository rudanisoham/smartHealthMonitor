import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Laptop, Save } from 'lucide-react';
import { getMe, updateDetails } from '../../utils/api';

const LabSettings = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMe();
        setProfile({
          fullName: res.data.data.fullName || '',
          email: res.data.data.email || '',
          phone: res.data.data.phone || '',
          role: res.data.data.role || ''
        });
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to load profile data.' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await updateDetails(profile);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading settings...</div>;

  return (
    <div className="lab-settings">
      <div className="mb-6">
        <h2 className="section-title">Laboratory Settings</h2>
        <p className="section-subtitle">Manage preferences and profile details</p>
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
            </div>
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <h3 className="card-title">Profile Settings</h3>
          </div>
          
          <div className="mt-6">
            {message.text && (
              <div style={{ 
                padding: '1rem', 
                marginBottom: '1rem', 
                borderRadius: '8px', 
                background: message.type === 'success' ? '#d1fae5' : '#fee2e2', 
                color: message.type === 'success' ? '#059669' : '#dc2626' 
              }}>
                {message.text}
              </div>
            )}

            <div className="flex items-center gap-6 mb-8 pb-8 border-bottom">
              <div className="header-avatar" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                {profile.fullName.charAt(0) || 'L'}
              </div>
              <div>
                <button className="btn btn-primary mb-2">Change Avatar</button>
                <p className="muted">Recommended: 400x400px. Max 2MB.</p>
              </div>
            </div>

            <div className="form-grid form-2">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" className="form-control" value={profile.fullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input type="text" className="form-control" value={profile.role} disabled />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" className="form-control" value={profile.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" name="phone" className="form-control" value={profile.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="mt-8 pt-6 border-top flex justify-end">
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabSettings;
