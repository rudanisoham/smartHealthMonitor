import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, LogIn, Heart, Calendar, ClipboardList, Activity } from 'lucide-react';

const PatientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle authentication here
    // For now, we'll just navigate to the dashboard (once implemented)
    // navigate('/patient/dashboard');
    alert('Patient login submitted');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-main">
          <Link to="/" className="btn-back-home">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="login-badge">
            <span>Smart Health Monitor • Patient</span>
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">
            View your health, appointments, prescriptions and alerts in one secure place.
          </p>

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                className="form-control" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="•••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                minLength="6" 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
              <span className="text-xs muted">Login with your registered email</span>
              <Link to="/auth/forgot" className="text-xs" style={{ color: 'inherit', textDecoration: 'underline' }}>Forgot password?</Link>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-primary w-full">
                <span>Sign in</span>
                <LogIn size={18} className="ml-2" />
              </button>
            </div>
          </form>

          <div className="login-footer">
            <span>New here?</span>
            <Link to="/auth/patient/register" className="text-xs" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 500, marginLeft: '0.5rem' }}>
              Create your account
            </Link>
          </div>
        </div>

        <div className="login-extra" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="login-kpi" style={{ background: 'transparent', border: 'none', padding: 0 }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Your Health in Your Hands</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Heart size={20} color="#38bdf8" /> Track vital signs and medical history 24/7
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Calendar size={20} color="#38bdf8" /> Book appointments directly with your specialists
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ClipboardList size={20} color="#38bdf8" /> View and manage your digital prescriptions easily
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Activity size={20} color="#38bdf8" /> Use the AI Health Checker for instant symptom analysis
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <div className="login-badge-secondary">
              <ShieldCheck size={14} />
              <span className="ml-1">Secure patient access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);

export default PatientLogin;
