import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert('Passwords do not match!');
            return;
        }
        alert('Password updated successfully!');
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            navigate('/auth/patient/login');
        }
    };

    return (
        <div>
            <div className="card" style={{ maxWidth: '600px' }}>
                <div className="section-title">Change Password</div>
                <p className="section-subtitle mt-1">Keep your account secure with a strong password</p>

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
                        />
                    </div>
                    <div className="form-group mt-2">
                        <button className="btn btn-primary btn-sm" type="submit">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>

            <div className="card mt-4" style={{ maxWidth: '600px' }}>
                <div className="section-title">Danger Zone</div>
                <p className="section-subtitle mt-1">Irreversible account actions</p>
                <div className="mt-3">
                    <button onClick={handleLogout} className="btn btn-outline btn-sm">
                        Logout from Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
