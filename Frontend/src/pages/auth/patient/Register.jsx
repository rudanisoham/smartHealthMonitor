import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/Register.css';

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // In a real app, perform registration here
        // Redirecting to login or dashboard for demonstration
        navigate('/auth/patient/login');
    };

    return (
        <div className="register-wrapper">

            {/* Left Panel: Signup Form Section */}
            <div className="register-left-panel">
                <div className="register-form-container">

                    <div className="app-badge">
                        <span className="dot-blue"></span>
                        Create your Smart Health account
                    </div>

                    <h1 className="register-title">Sign up as patient</h1>
                    <p className="register-subtitle">
                        Track your health data, appointments, prescriptions and reports.
                    </p>

                    <form className="register-form" onSubmit={handleRegister}>

                        <div className="form-grid-2">
                            <div className="form-group-reg">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    placeholder="John Doe"
                                    className="reg-input"
                                    required
                                />
                            </div>

                            <div className="form-group-reg">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    className="reg-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group-reg">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="reg-input"
                                    required
                                />
                            </div>

                            <div className="form-group-reg">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    className="reg-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group-reg">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="+1234567890"
                                className="reg-input"
                            />
                            <span className="help-text">Format: +1234567890 (optional)</span>
                        </div>

                        <div className="checkbox-group">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">I agree to the terms of use and privacy policy.</label>
                        </div>

                        <button type="submit" className="btn-create-account">
                            Create account
                        </button>
                    </form>

                    <div className="register-footer">
                        <span className="info-text">Already have an account?</span>
                        <Link to="/auth/patient/login" className="signin-link">Sign in</Link>
                    </div>

                </div>
            </div>

            {/* Right Panel: Feature Info Section (Same as Login) */}
            <div className="register-right-panel">
                <div className="info-content">

                    <h2 className="info-title">YOUR HEALTH IN YOUR HANDS</h2>

                    <ul className="feature-list">
                        <li>
                            <span className="check-icon">✓</span>
                            Track vital signs and medical history 24/7
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Book appointments directly with your specialists
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            View and manage your digital prescriptions easily
                        </li>
                        <li>
                            <span className="check-icon">✓</span>
                            Use the AI Health Checker for instant symptom analysis
                        </li>
                    </ul>

                    <div className="secure-badge">
                        <span className="dot-blue-light"></span>
                        Secure patient onboarding
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Register;
