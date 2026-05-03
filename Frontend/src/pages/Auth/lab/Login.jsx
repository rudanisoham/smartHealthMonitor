import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FlaskConical, 
  Lock, 
  ArrowLeft, 
  CheckCircle, 
  Activity,
  ShieldCheck
} from 'lucide-react';
import '../../../styles/patient.css';

const LabLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication
    navigate('/lab/dashboard');
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

            <button type="submit" className="btn btn-primary w-full" style={{ padding: '1rem' }}>
              Authenticate & Access
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
