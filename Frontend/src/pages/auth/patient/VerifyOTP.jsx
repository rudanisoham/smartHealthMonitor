import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/VerifyOTP.css';

const VerifyOTP = () => {
    const navigate = useNavigate();

    const handleVerify = (e) => {
        e.preventDefault();
        // In a real app, verify OTP here
        console.log("Verifying code...");
        // Redirect to dashboard or login
        navigate('/patient/dashboard');
    };

    return (
        <div className="verify-wrapper">

            {/* Left Panel: Form Section */}
            <div className="verify-left-panel">
                <div className="verify-form-container">

                    <div className="app-badge">
                        <span className="dot-blue"></span>
                        Verification
                    </div>

                    <h1 className="verify-title">Check your email</h1>
                    <p className="verify-subtitle">
                        We've sent a 6-digit code to <strong>rudanisoham9@gmail.com</strong>. Enter it below to proceed.
                    </p>

                    <div className="success-alert">
                        A One-Time Password (OTP) has been sent to your email.
                    </div>

                    <form className="verify-form" onSubmit={handleVerify}>

                        <div className="form-group-verify">
                            <label htmlFor="otp">Enter 6-Digit OTP</label>
                            <div className="otp-input-container">
                                <input
                                    type="text"
                                    id="otp"
                                    placeholder="0 0 0 0 0 0"
                                    className="verify-input"
                                    maxLength="11"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-verify-code">
                            Verify Code
                        </button>
                    </form>

                    <div className="verify-footer">
                        <span className="info-text">Didn't receive code?</span>
                        <button className="resend-btn" onClick={() => console.log("Resending code...")}>
                            Resend
                        </button>
                    </div>

                </div>
            </div>

            {/* Right Panel: Feature Info Section */}
            <div className="verify-right-panel">
                <div className="info-content-verify">

                    <h3 className="info-label-verify">2-STEP VERIFICATION</h3>
                    <h2 className="info-title-verify">Active</h2>
                    <p className="info-desc-verify">
                        OTP verification adds an extra layer of security to ensure only you can access your account reset.
                    </p>

                </div>
            </div>

        </div>
    );
};

export default VerifyOTP;
