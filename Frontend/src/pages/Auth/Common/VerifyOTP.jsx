import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Shield, Loader } from 'lucide-react';
import { verifyOtp } from '../../../utils/api';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('resetEmail');
    if (!email) {
      setError('Session expired. Please start the password reset process again.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await verifyOtp({ email, otp });
      localStorage.setItem('resetOtp', otp);
      navigate('/auth/reset-password');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP');
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
            <span>Verification</span>
          </div>
          <h1 className="login-title">Check your email</h1>
          <p className="login-subtitle">
            We've sent a 6-digit code to your email. Enter it below to proceed.
          </p>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label htmlFor="otp">Enter 6-Digit OTP</label>
              <input 
                id="otp" 
                name="otp" 
                className="form-control" 
                type="text" 
                maxLength="6" 
                pattern="\d{6}" 
                placeholder="000000" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ letterSpacing: '0.5rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }} 
                required 
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <Loader className="animate-spin" size={16} /> : (
                  <>
                    <span>Verify Code</span>
                    <CheckCircle size={16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p className="text-xs muted">
              Didn't receive code? <Link to="/auth/forgot" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Resend</Link>
            </p>
          </div>
        </div>

        <div className="login-extra" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
          <div className="login-kpi">
            <h3 style={{ color: 'white' }}>2-Step Verification</h3>
            <div className="login-kpi-value" style={{ color: 'white' }}>Active</div>
            <p className="login-kpi-caption" style={{ color: 'rgba(255,255,255,0.8)' }}>
              OTP verification adds an extra layer of security to ensure only you can access your account reset.
            </p>
            <div className="mt-6">
              <Shield size={48} color="rgba(255,255,255,0.2)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
