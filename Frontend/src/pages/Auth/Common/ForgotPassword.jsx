import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, ShieldCheck, Loader } from 'lucide-react';
import { forgotPassword } from '../../../utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await forgotPassword({ email });
      localStorage.setItem('resetEmail', email);
      navigate('/auth/verify-otp');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
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
            <span>Password reset</span>
          </div>
          <h1 className="login-title">Reset your password</h1>
          <p className="login-subtitle">
            Enter the email associated with your account. We’ll send reset instructions.
          </p>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

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
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <Loader className="animate-spin" size={16} /> : (
                  <>
                    <span>Send OTP Code</span>
                    <Send size={16} className="ml-2" />
                  </>
                )}
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
