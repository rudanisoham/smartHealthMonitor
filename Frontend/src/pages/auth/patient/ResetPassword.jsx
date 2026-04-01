import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/ResetPassword.css';

const ResetPassword = () => {
    const navigate = useNavigate();

    const handleSendOTP = (e) => {
        e.preventDefault();
        // In a real app, send OTP here
        console.log("Sending OTP code...");
    };

    return (
        <div className="reset-wrapper">

            {/* Left Panel: Form Section */}
            <div className="reset-left-panel">
                <div className="reset-form-container">

                    <div className="app-badge">
                        <span className="dot-blue"></span>
                        Password reset
                    </div>

                    <h1 className="reset-title">Reset your password</h1>
                    <p className="reset-subtitle">
                        Enter the email associated with your account. We'll send reset instructions.
                    </p>

                    <form className="reset-form" onSubmit={handleSendOTP}>

                        <div className="form-group-reset">
                            <label htmlFor="email">Register Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="reset-input"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-send-otp">
                            Send OTP Code
                        </button>
                    </form>

                    <div className="reset-footer">
                        <Link to="/auth/patient/login" className="back-link">Back to sign in</Link>
                    </div>

                </div>
            </div>

            {/* Right Panel: Security Info */}
            <div className="reset-right-panel">
                <div className="security-content">

                    <h3 className="security-label">ACCOUNT SECURITY</h3>
                    <h2 className="security-value">100%</h2>
                    <p className="security-desc">
                        Your health data is encrypted and protected with modern security standards.
                    </p>

                </div>
            </div>

        </div>
    );
};

export default ResetPassword;
