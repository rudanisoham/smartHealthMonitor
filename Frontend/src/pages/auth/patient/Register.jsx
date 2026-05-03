import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as apiRegister } from '../../../utils/api';
import { ArrowLeft, Loader } from 'lucide-react';
import API from '../../../utils/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            // 1. Register user account
            const res = await apiRegister({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: 'PATIENT',
                phone: formData.phone
            });

            if (res.data.success) {
                // 2. Auto-login and create patient profile
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                // 3. Create empty patient profile linked to the new user
                try {
                    await API.post('/patients', {
                        user: res.data.user.id,
                        gender: '',
                        bloodGroup: '',
                        address: '',
                        allergies: ''
                    });
                } catch (profileErr) {
                    console.log('Patient profile creation handled by backend or already exists');
                }

                alert('Account created successfully! Welcome to Smart Health Monitor.');
                navigate('/patient/dashboard');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.error || 'Registration failed. Email may already be in use.');
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
                        <span>Create your Smart Health account</span>
                    </div>
                    <h1 className="login-title">Sign up as patient</h1>
                    <p className="login-subtitle">
                        Track your health data, appointments, prescriptions and reports.
                    </p>

                    {error && (
                        <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>
                            {error}
                        </div>
                    )}

                    <form className="form-grid form-2" onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                className="form-control"
                                placeholder="John Doe"
                                required
                                minLength="2"
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="john@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="registerPassword">Password</label>
                            <input
                                id="registerPassword"
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="••••••••"
                                required
                                minLength="6"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmRegisterPassword">Confirm Password</label>
                            <input
                                id="confirmRegisterPassword"
                                name="confirmPassword"
                                type="password"
                                className="form-control"
                                placeholder="••••••••"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                className="form-control"
                                placeholder="+1234567890"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <small className="text-muted" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Format: +1234567890 (optional)</small>
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                <input type="checkbox" required style={{ margin: 0 }} />
                                <span>I agree to the terms of use and privacy policy.</span>
                            </label>
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                {loading ? (
                                    <Loader className="animate-spin" size={18} />
                                ) : (
                                    <span>Create account</span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="login-footer">
                        <span>Already have an account?</span>
                        <Link to="/auth/patient/login" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
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
                            <span>Secure patient onboarding</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
