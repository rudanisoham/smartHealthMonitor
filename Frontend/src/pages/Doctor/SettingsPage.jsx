import React, { useState, useEffect } from 'react';
import { Mail, Clock, Check, Save, Loader } from 'lucide-react';
import { getDoctorProfile, updateDoctorProfile } from '../../utils/api';

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getDoctorProfile();
      if (res.data.success) {
        setAvailableDays(res.data.data.availableDays || daysOfWeek);
      }
    } catch (err) {
      console.error('Failed to load profile', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDayToggle = (day) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const handleAvailabilitySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateDoctorProfile({ availableDays });
      alert('Availability updated successfully!');
    } catch (err) {
      alert('Failed to update availability');
    } finally {
      setSubmitting(false);
    }
  };

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

  if (loading) return <div className="admin-content text-center py-10"><Loader className="animate-spin inline mr-2" /> Loading settings...</div>;

  return (
    <div className="admin-content">
      <div className="card-header-flex" style={{marginBottom: '2rem'}}>
        <div>
          <h1 className="page-title" style={{fontSize: '1.5rem', marginBottom: '0.25rem'}}>Settings</h1>
          <div className="muted" style={{fontSize: '1rem'}}>Security preferences and weekly availability</div>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', alignItems: 'start'}}>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          {/* Availability Settings */}
          <div className="card" style={{padding: '2rem'}}>
            <div className="card-header" style={{marginBottom: '1.5rem'}}>
              <div>
                <div className="section-title" style={{fontSize: '1.2rem'}}>Weekly Availability</div>
                <div className="section-subtitle">Select days you are available for consultations</div>
              </div>
              <div style={{background: '#f0fdf4', padding: '0.4rem', borderRadius: '50%'}}>
                <Clock size={20} color="#22c55e" />
              </div>
            </div>

            <form onSubmit={handleAvailabilitySubmit}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem'}}>
                {daysOfWeek.map(day => (
                  <div 
                    key={day} 
                    onClick={() => handleDayToggle(day)}
                    style={{
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: availableDays.includes(day) ? 'var(--primary)' : '#e2e8f0',
                      background: availableDays.includes(day) ? 'var(--primary-light)' : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{fontWeight: 600, color: availableDays.includes(day) ? 'var(--primary)' : '#64748b'}}>{day}</span>
                    {availableDays.includes(day) && <Check size={18} color="var(--primary)" />}
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
                {submitting ? <Loader className="animate-spin inline mr-2" size={16} /> : <><Save size={18} className="inline mr-2" /> Save Availability Schedule</>}
              </button>
            </form>
          </div>

          {/* Change Password Card */}
          <div className="card" style={{padding: '2rem'}}>
            <div className="card-header" style={{marginBottom: '2rem'}}>
              <div>
                <div className="section-title" style={{fontSize: '1.2rem'}}>Change Password</div>
                <div className="section-subtitle">Keep your account secure</div>
              </div>
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
                <button type="submit" className="btn btn-primary">Update Password</button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side Stack: Support & Danger Zone */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          
          {/* Help & Support Card */}
          <div className="card" style={{padding: '2rem'}}>
            <div className="card-header" style={{margin: 0}}>
              <div>
                <div className="section-title" style={{fontSize: '1.1rem'}}>Help & Support</div>
                <div className="section-subtitle">Technical assistance</div>
              </div>
            </div>
            <div className="muted mt-3 mb-4" style={{fontSize: '0.9rem'}}>
              Need help with the portal or facing technical issues? Contact IT support.
            </div>
            <button onClick={handleSupport} className="btn btn-outline" style={{width: '100%', fontWeight: 600}}>
              <Mail size={16} className="mr-2" /> Email Support
            </button>
          </div>

          {/* Danger Zone Card */}
          <div className="card" style={{padding: '2rem', border: '1px solid #fecaca', background: '#fef2f2'}}>
            <div className="card-header" style={{margin: 0}}>
              <div>
                <div className="section-title" style={{fontSize: '1.1rem', color: '#dc2626'}}>Danger Zone</div>
                <div className="section-subtitle" style={{color: '#f87171'}}>Irreversible actions</div>
              </div>
            </div>
            <div className="muted mt-3 mb-4" style={{fontSize: '0.9rem'}}>
              Suspending your account will instantly remove you from patient appointment bookings.
            </div>
            <button onClick={handleSuspend} className="btn btn-outline" style={{color: '#dc2626', borderColor: '#fca5a5', background: 'white', fontWeight: 600, width: '100%'}}>
              Suspend Account
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
