import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/patient.css';

const ResetPassword = () => {
    const navigate = useNavigate();

    const handleSendOTP = (e) => {
        e.preventDefault();
        // In a real app, send OTP here
        navigate('/auth/patient/verify-otp');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-main">
                    <Link to="/" className="btn-back-home">
                        <i className="fas fa-arrow-left"></i> Back to Home
                    </Link>
                    <div className="login-badge">
                        <span>Password reset</span>
                    </div>
                    <h1 className="login-title">Reset your password</h1>
                    <p className="login-subtitle">
                        Enter the email associated with your account. We’ll send reset instructions.
                    </p>

                    <form className="form-grid" onSubmit={handleSendOTP}>
                        <div className="form-group">
                            <label htmlFor="resetEmail">Register Email Address</label>
                            <input
                                id="resetEmail"
                                name="email"
                                className="form-control"
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary w-full">
                                <span>Send OTP Code</span>
                            </button>
                        </div>
                    </form>

                    <div className="login-footer">
                        <Link to="/auth/patient/login" style={{ fontSize: '0.75rem', color: 'inherit', textDecoration: 'underline' }}>Back to sign in</Link>
                    </div>
                </div>

                <div className="login-extra">
                    <div className="login-kpi">
                        <h3>Account security</h3>
                        <div className="login-kpi-value" style={{ fontSize: '4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>100%</div>
                        <p className="login-kpi-caption" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                            Your health data is encrypted and protected with modern security standards.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
