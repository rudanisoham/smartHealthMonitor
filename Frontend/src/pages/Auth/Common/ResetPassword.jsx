import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Lock } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate reset
    navigate('/auth/patient/login');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-main">
          <Link to="/" className="btn-back-home">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="login-badge">
            <span>Last Step</span>
          </div>
          <h1 className="login-title">New Password</h1>
          <p className="login-subtitle">
            Set a strong, secure password you haven't used before.
          </p>

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input 
                id="password" 
                name="password" 
                className="form-control" 
                type="password" 
                placeholder="Enter New Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                id="confirmPassword" 
                name="confirmPassword" 
                className="form-control" 
                type="password" 
                placeholder="Enter Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-full">
                <span>Save & Sign In</span>
                <Save size={16} className="ml-2" />
              </button>
            </div>
          </form>
        </div>

        <div className="login-extra" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
          <div className="login-kpi">
            <h3 style={{ color: 'white' }}>Strong Security</h3>
            <div className="login-kpi-value" style={{ color: 'white' }}>Finalizing</div>
            <p className="login-kpi-caption" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Once you save your new password, previous OTP codes for this reset will be invalidated for your safety.
            </p>
            <div className="mt-6">
              <Lock size={48} color="rgba(255,255,255,0.2)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
