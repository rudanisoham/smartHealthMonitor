import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/SetNewPassword.css';

const SetNewPassword = () => {
    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();
        // In a real app, save new password here
        console.log("Saving new password...");
        // Redirect to login or success page
        navigate('/auth/patient/login');
    };

    return (
        <div className="set-password-wrapper">

            {/* Left Panel: Form Section */}
            <div className="set-password-left-panel">
                <div className="set-password-form-container">

                    <div className="app-badge">
                        <span className="dot-blue"></span>
                        Last Step
                    </div>

                    <h1 className="set-password-title">New Password</h1>
                    <p className="set-password-subtitle">
                        Set a strong, secure password you haven't used before.
                    </p>

                    <form className="set-password-form" onSubmit={handleSave}>

                        <div className="form-group-set">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="Enter New Password"
                                className="set-input"
                                required
                            />
                        </div>

                        <div className="form-group-set">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Enter Confirm Password"
                                className="set-input"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-save-signin">
                            Save & Sign In
                        </button>
                    </form>

                </div>
            </div>

            {/* Right Panel: Feature Info Section */}
            <div className="set-password-right-panel">
                <div className="info-content-set">

                    <h3 className="info-label-set">STRONG SECURITY</h3>
                    <h2 className="info-title-set">Finalizing</h2>
                    <p className="info-desc-set">
                        Once you save your new password, previous OTP codes for this reset will be invalidated for your safety.
                    </p>

                </div>
            </div>

        </div>
    );
};

export default SetNewPassword;
