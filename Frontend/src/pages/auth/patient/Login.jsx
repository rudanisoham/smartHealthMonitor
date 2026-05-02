import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, perform authentication here
        navigate('/patient/dashboard');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-main">
                    <Link to="/" className="btn-back-home">
                        <i className="fas fa-arrow-left"></i> Back to Home
                    </Link>
                    <div className="login-badge">
                        <span>Smart Health Monitor · Patient</span>
                    </div>
                    <h1 className="login-title">Welcome back</h1>
                    <p className="login-subtitle">
                        View your health, appointments, prescriptions and alerts in one secure place.
                    </p>

                    <form className="form-grid" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="••••••••"
                                required
                                minLength="6"
                            />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-muted" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Login with your registered email</span>
                            <Link to="/auth/patient/reset-password" style={{ fontSize: '0.75rem', color: 'inherit', textDecoration: 'underline' }}>Forgot password?</Link>
                        </div>
                        <div className="mt-3">
                            <button type="submit" className="btn btn-primary w-full">
                                <span>Sign in</span>
                            </button>
                        </div>
                    </form>

                    <div className="login-footer">
                        <span>New here?</span>
                        <Link to="/auth/patient/register" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 500 }}>Create your account</Link>
                    </div>
                </div>

                <div className="login-extra">
                    <div className="login-kpi">
                        <h3>Your Health in Your Hands</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <span style={{ color: '#38bdf8' }}>✓</span> Track vital signs and medical history 24/7
                            </li>
                            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <span style={{ color: '#38bdf8' }}>✓</span> Book appointments directly with your specialists
                            </li>
                            <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <span style={{ color: '#38bdf8' }}>✓</span> View and manage your digital prescriptions easily
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                                <span style={{ color: '#38bdf8' }}>✓</span> Use the AI Health Checker for instant symptom analysis
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4" style={{ marginTop: '2rem' }}>
                        <div className="login-badge-secondary">
                            <span>●</span>
                            <span>Secure patient access</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
