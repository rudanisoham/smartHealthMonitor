import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, ShieldCheck } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate OTP send
    navigate('/auth/verify-otp');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-main">
          <Link to="/" className="btn-back-home">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="login-badge">
            <span>Password reset</span>
          </div>
          <h1 className="login-title">Reset your password</h1>
          <p className="login-subtitle">
            Enter the email associated with your account. We’ll send reset instructions.
          </p>

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label htmlFor="resetEmail">Register Email Address</label>
              <input 
                id="resetEmail" 
                name="email" 
                className="form-control" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-full">
                <span>Send OTP Code</span>
                <Send size={16} className="ml-2" />
              </button>
            </div>
          </form>

          <div className="login-footer">
            <Link to="/auth/patient/login" className="text-xs" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Back to sign in
            </Link>
          </div>
        </div>

        <div className="login-extra">
          <div className="login-kpi">
            <h3>Account security</h3>
            <div className="login-kpi-value">100%</div>
            <p className="login-kpi-caption">
              Your health data is encrypted and protected with modern security standards.
            </p>
            <div className="mt-6">
              <ShieldCheck size={48} color="rgba(255,255,255,0.2)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
