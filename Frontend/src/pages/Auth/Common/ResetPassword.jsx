import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Lock, Loader } from 'lucide-react';
import { resetPassword as apiResetPassword } from '../../../utils/api';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const email = localStorage.getItem('resetEmail');
    const otp = localStorage.getItem('resetOtp');

    if (!email || !otp) {
      setError('Session expired. Please restart the password reset process.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await apiResetPassword({ email, otp, password });
      
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetOtp');
      
      // Navigate depending on the role? Or just generic login?
      // Since it's common reset password, navigate to the specific login if we know it.
      // But we can just navigate to '/' and let them choose, or if user data is returned, we can auto-login!
      if (res.data && res.data.user) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        switch (res.data.user.role) {
          case 'ADMIN': navigate('/admin/dashboard'); break;
          case 'DOCTOR': navigate('/doctor/dashboard'); break;
          case 'RECEPTIONIST': navigate('/reception/dashboard'); break;
          case 'PATIENT': navigate('/patient/dashboard'); break;
          case 'MEDICAL_STAFF': navigate('/medical/dashboard'); break;
          case 'LAB_STAFF': navigate('/lab/dashboard'); break;
          default: navigate('/');
        }
      } else {
        alert('Password reset successful. Please log in.');
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
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
            <span>Last Step</span>
          </div>
          <h1 className="login-title">New Password</h1>
          <p className="login-subtitle">
            Set a strong, secure password you haven't used before.
          </p>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

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
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? <Loader className="animate-spin" size={16} /> : (
                  <>
                    <span>Save & Sign In</span>
                    <Save size={16} className="ml-2" />
                  </>
                )}
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
