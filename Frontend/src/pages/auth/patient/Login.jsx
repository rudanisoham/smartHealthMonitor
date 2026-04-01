import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, perform authentication here
        // Redirecting to dashboard for demonstration
        navigate('/patient/dashboard');
    };

    return (
        <div className="login-wrapper">

            {/* Left Panel: Form Section */}
            <div className="login-left-panel">
                <div className="login-form-container">

                    <div className="app-badge">
                        <span className="dot-blue"></span>
                        Smart Health Monitor - Patient
                    </div>

                    <h1 className="login-title">Welcome back</h1>
                    <p className="login-subtitle">
                        View your health, appointments, prescriptions and alerts in one secure place.
                    </p>

                    <form className="login-form" onSubmit={handleLogin}>

                        <div className="form-group-login">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                className="login-input"
                                required
                            />
                        </div>

                        <div className="form-group-login">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                className="login-input"
                                required
                            />
                        </div>

                        <div className="login-options-row">
                            <span className="info-text">Login with your registered email</span>
                            <a href="#" className="forgot-link">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn-signin">
                            Sign in
                        </button>
                    </form>

                    <div className="login-footer">
                        <span className="info-text">New here?</span>
                        <a href="#" className="create-link">Create your account</a>
                    </div>

                </div>
            </div>

            {/* Right Panel: Feature Info Section */}
            <div className="login-right-panel">
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
                        Secure patient access
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Login;
