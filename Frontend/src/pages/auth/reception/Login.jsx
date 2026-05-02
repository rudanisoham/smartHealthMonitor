import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, User, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import '../../../styles/patient.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/reception/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-main">
          <Link to="/" className="btn-back-home">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="login-badge">
            <span>Staff Portal · Reception</span>
          </div>
          <h1 className="login-title">Staff Login</h1>
          <p className="login-subtitle">
            Welcome back! Please enter your credentials to access the hospital management system.
          </p>

          <form className="form-grid" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Staff Email</label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <User size={18} className="text-muted me-2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="staff@smarthealth.com"
                  required
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Security Password</label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <Lock size={18} className="text-muted me-2" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" style={{ cursor: 'pointer' }} />
                <label htmlFor="remember" className="muted" style={{ cursor: 'pointer', fontSize: '0.85rem' }}>Remember me</label>
              </div>
              <Link to="/auth/reception/reset-password" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>Forgot password?</Link>
            </div>

            <div className="mt-6">
              <button type="submit" className="btn btn-primary w-full">
                <span>Sign In</span>
                <ArrowRight size={18} className="ms-2" />
              </button>
            </div>
          </form>

          <div className="login-footer mt-8">
            <p className="muted">Need access or lost credentials? <Link to="/contact" style={{ color: 'var(--primary)', fontWeight: '600' }}>Contact IT Admin</Link></p>
          </div>
        </div>

        <div className="login-extra">
          <div className="login-kpi">
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '2rem',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <ShieldCheck size={32} color="#38bdf8" />
            </div>
            <h3>Administrative Access</h3>
            <div className="login-kpi-value">Reception Desk</div>
            <p className="login-kpi-caption">
              Securely manage patient admissions, appointments, bed occupancy, and billing from a single centralized workstation.
            </p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '2' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#38bdf8' }}>✓</span> Rapid Patient Entry & Registration
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#38bdf8' }}>✓</span> Real-time Bed Capacity Monitoring
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#38bdf8' }}>✓</span> Instant Billing & Invoice Generation
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <div className="login-badge-secondary">
              <span className="flex h-2 w-2 rounded-full bg-accent"></span>
              <span>Secure encrypted session</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
