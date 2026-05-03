import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { Lock, LogOut, Shield, CheckCircle } from 'lucide-react';

const Settings = () => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (passwords.new !== passwords.confirm) {
            setErrorMsg('New passwords do not match!');
            return;
        }

        if (passwords.new.length < 6) {
            setErrorMsg('Password must be at least 6 characters.');
            return;
        }

        setSaving(true);
        try {
            await API.put('/auth/updatepassword', {
                currentPassword: passwords.current,
                newPassword: passwords.new
            });
            setSuccessMsg('Password updated successfully in the database!');
            setPasswords({ current: '', new: '', confirm: '' });
            setTimeout(() => setSuccessMsg(''), 4000);
        } catch (err) {
            setErrorMsg(err.response?.data?.error || 'Failed to update password. Check your current password.');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/auth/patient/login');
        }
    };

    return (
        <div>
            {successMsg && (
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(52,211,153,0.15)', border: '1px solid #34d399', borderRadius: '8px', color: '#10b981', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', maxWidth: '600px' }}>
                    <CheckCircle size={18} /> {successMsg}
                </div>
            )}

            {errorMsg && (
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem', maxWidth: '600px' }}>
                    {errorMsg}
                </div>
            )}

            <div className="card" style={{ maxWidth: '600px' }}>
                <div className="section-title"><Lock size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Change Password</div>
                <p className="section-subtitle mt-1">Keep your account secure — password is stored encrypted in MongoDB</p>

                <form onSubmit={handleUpdatePassword} className="form-grid mt-3">
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            id="currentPassword"
                            className="form-control"
                            type="password"
                            placeholder="••••••••"
                            value={passwords.current}
                            onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                            required
                            disabled={saving}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            id="newPassword"
                            className="form-control"
                            type="password"
                            placeholder="••••••••"
                            minLength="6"
                            value={passwords.new}
                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                            required
                            disabled={saving}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            className="form-control"
                            type="password"
                            placeholder="••••••••"
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                            required
                            disabled={saving}
                        />
                    </div>
                    <div className="form-group mt-2">
                        <button className="btn btn-primary btn-sm" type="submit" disabled={saving}>
                            {saving ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="card mt-4" style={{ maxWidth: '600px' }}>
                <div className="section-title"><Shield size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Session & Security</div>
                <p className="section-subtitle mt-1">Manage your active session</p>
                <div className="mt-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: '#fecaca' }}>
                        <LogOut size={16} /> Logout from Account
                    </button>
                </div>
                <div className="mt-3" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Logging out will clear your JWT authentication token and redirect to the login page.
                </div>
            </div>
        </div>
    );
};

export default Settings;
