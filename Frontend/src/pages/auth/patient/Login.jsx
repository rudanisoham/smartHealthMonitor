import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as apiLogin } from '../../../utils/api';
import { ArrowLeft, Loader } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await apiLogin({ email, password });

            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                // Check role and redirect
                if (res.data.user.role === 'PATIENT') {
                    navigate('/patient/dashboard');
                } else {
                    setError('This portal is for patients only. Please use the appropriate staff login.');
                }
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-main">
                    <Link to="/" className="btn-back-home">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <div className="login-badge">
                        <span>Smart Health Monitor · Patient</span>
                    </div>
                    <h1 className="login-title">Welcome back</h1>
                    <p className="login-subtitle">
                        View your health, appointments, prescriptions and alerts in one secure place.
                    </p>

                    {error && (
                        <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>
                            {error}
                        </div>
                    )}

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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-muted" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Login with your registered email</span>
                            <Link to="/auth/forgot" style={{ fontSize: '0.75rem', color: 'inherit', textDecoration: 'underline' }}>Forgot password?</Link>
                        </div>
                        <div className="mt-3">
                            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                {loading ? (
                                    <Loader className="animate-spin" size={18} />
                                ) : (
                                    <span>Sign in</span>
                                )}
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
