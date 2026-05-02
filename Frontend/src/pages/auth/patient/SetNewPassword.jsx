import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/patient.css';

const SetNewPassword = () => {
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();
        // In a real app, reset password here
        navigate('/auth/patient/login');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-main">
                    <Link to="/" className="btn-back-home">
                        <i className="fas fa-arrow-left"></i> Back to Home
                    </Link>
                    <div className="login-badge">
                        <span>Last Step</span>
                    </div>
                    <h1 className="login-title">New Password</h1>
                    <p className="login-subtitle">
                        Set a strong, secure password you haven't used before.
                    </p>

                    <form className="form-grid" onSubmit={handleReset}>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input
                                id="password"
                                name="password"
                                className="form-control"
                                type="password"
                                placeholder="Enter New Password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                type="password"
                                placeholder="Enter Confirm Password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary w-full">
                                <span>Save & Sign In</span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="login-extra" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                    <div className="login-kpi">
                        <h3 style={{ color: 'white' }}>Strong Security</h3>
                        <div className="login-kpi-value" style={{ fontSize: '4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Finalizing</div>
                        <p className="login-kpi-caption" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                            Once you save your new password, previous OTP codes for this reset will be invalidated for your safety.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetNewPassword;
