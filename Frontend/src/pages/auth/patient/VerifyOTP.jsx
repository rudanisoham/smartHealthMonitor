import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/patient.css';

const VerifyOTP = () => {
    const navigate = useNavigate();

    const handleVerify = (e) => {
        e.preventDefault();
        // In a real app, verify OTP here
        navigate('/auth/patient/set-new-password');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-main">
                    <Link to="/" className="btn-back-home">
                        <i className="fas fa-arrow-left"></i> Back to Home
                    </Link>
                    <div className="login-badge">
                        <span>Verification</span>
                    </div>
                    <h1 className="login-title">Check your email</h1>
                    <p className="login-subtitle">
                        We've sent a 6-digit code to your email. Enter it below to proceed.
                    </p>

                    <form className="form-grid" onSubmit={handleVerify}>
                        <div className="form-group">
                            <label htmlFor="otp">Enter 6-Digit OTP</label>
                            <input
                                id="otp"
                                name="otp"
                                className="form-control"
                                type="text"
                                maxLength="6"
                                pattern="\d{6}"
                                placeholder="000000"
                                style={{ letterSpacing: '0.5rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary w-full">
                                <span>Verify Code</span>
                            </button>
                        </div>
                    </form>

                    <div className="login-footer">
                        <p className="text-xs muted" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Didn't receive code? <Link to="/auth/patient/reset-password" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Resend</Link></p>
                    </div>
                </div>

                <div className="login-extra" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
                    <div className="login-kpi">
                        <h3 style={{ color: 'white' }}>2-Step Verification</h3>
                        <div className="login-kpi-value" style={{ fontSize: '4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>Active</div>
                        <p className="login-kpi-caption" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
                            OTP verification adds an extra layer of security to ensure only you can access your account reset.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
