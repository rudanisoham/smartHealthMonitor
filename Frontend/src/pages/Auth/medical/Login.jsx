import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Pill, User, Lock, ArrowRight, ArrowLeft, ClipboardList, Loader } from 'lucide-react';
import { login as apiLogin } from '../../../utils/api';
import '../../../styles/patient.css';

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
        
        if (['PHARMACIST', 'ADMIN', 'DOCTOR', 'RECEPTIONIST'].includes(res.data.user.role)) {
          navigate('/medical/dashboard');
        } else {
          setError('Unauthorized: This portal is for Medical staff only.');
        }
      }
    } catch (err) {
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
            <span>Medical Portal · Pharmacy & Lab</span>
          </div>
          <h1 className="login-title">Staff Login</h1>
          <p className="login-subtitle">
            Secure access for pharmacy staff and laboratory assistants. Manage prescriptions and medical reports.
          </p>

          {error && (
            <div className="card mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '1rem' }}>
              <p className="text-danger" style={{ margin: 0, fontSize: '0.85rem' }}>{error}</p>
            </div>
          )}

          <form className="form-grid" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Staff Email</label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <User size={18} className="text-muted me-2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="pharmacy@smarthealth.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" style={{ cursor: 'pointer' }} />
                <label htmlFor="remember" className="muted" style={{ cursor: 'pointer', fontSize: '0.85rem' }}>Remember me</label>
              </div>
              <Link to="/auth/forgot" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>Forgot password?</Link>
            </div>

            <div className="mt-6">
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <Loader className="animate-spin" size={18} /> : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight size={18} className="ms-2" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="login-footer mt-8">
            <p className="muted">Authorized personnel only. Access is monitored and logged.</p>
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
              <Pill size={32} color="#38bdf8" />
            </div>
            <h3>Clinical Operations</h3>
            <div className="login-kpi-value">Medical Desk</div>
            <p className="login-kpi-caption">
              Digitizing pharmacy inventory and diagnostic reporting for faster patient recovery and efficient healthcare delivery.
            </p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '2' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#38bdf8' }}>✓</span> Prescription Fulfillment Workflow
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#38bdf8' }}>✓</span> Automated Stock & Expiry Alerts
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#38bdf8' }}>✓</span> Secure Lab Report Management
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <div className="login-badge-secondary">
              <span className="flex h-2 w-2 rounded-full bg-accent"></span>
              <span>HIPAA Compliant System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
