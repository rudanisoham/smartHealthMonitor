import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FlaskConical, 
  Lock, 
  ArrowLeft, 
  CheckCircle, 
  Activity,
  ShieldCheck,
  Loader
} from 'lucide-react';
import { login as apiLogin } from '../../../utils/api';
import '../../../styles/patient.css';

const LabLogin = () => {
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
        
        if (res.data.user.role === 'LAB_STAFF' || res.data.user.role === 'ADMIN' || res.data.user.role === 'DOCTOR') {
          navigate('/lab/dashboard');
        } else {
          setError('Unauthorized: This portal is for Lab staff only.');
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
        {/* Left Side: Form */}
        <div className="login-main">
          <Link to="/" className="btn-back-home">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <div className="login-badge">Laboratory Access</div>
          
          <h2 className="login-title">Lab Console</h2>
          <p className="login-subtitle">
            Secure portal for laboratory technicians and pathologists to manage diagnostic reports.
          </p>

          {error && (
            <div className="card mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '1rem' }}>
              <p className="text-danger" style={{ margin: 0, fontSize: '0.85rem' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-4">
            <div className="form-group mb-4">
              <label>Lab ID / Email</label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <FlaskConical size={18} className="text-muted me-2" />
                <input 
                  type="email" 
                  placeholder="lab.admin@healthmonitor.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group mb-6">
              <label>Password</label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <Lock size={18} className="text-muted me-2" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" style={{ padding: '1rem' }} disabled={loading}>
              {loading ? <Loader className="animate-spin" size={18} /> : 'Authenticate & Access'}
            </button>
          </form>

          <div className="login-footer">
            <span>© 2026 Laboratory Services</span>
            <div className="flex gap-4">
              <Link to="/help" className="muted">Help Desk</Link>
              <Link to="/privacy" className="muted">Data Privacy</Link>
            </div>
          </div>
        </div>

        {/* Right Side: Visual/KPI */}
        <div className="login-extra">
          <div className="login-badge-secondary mb-8">
            <ShieldCheck size={20} />
            <span>CLIA Certified System</span>
          </div>

          <div className="login-kpi">
            <h3>Laboratory Accuracy</h3>
            <div className="login-kpi-value">99.9%</div>
            <p className="login-kpi-caption">
              Our automated diagnostic verification system ensures near-perfect accuracy for over 250+ unique test types.
            </p>
          </div>

          <div className="mt-8 pt-8 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-4">
              <div className="stat-icon" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                <Activity size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Live Processing</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>8 Active test batches being analyzed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabLogin;
