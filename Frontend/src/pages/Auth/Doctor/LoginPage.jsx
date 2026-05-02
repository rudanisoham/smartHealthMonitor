import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Proceed to dashboard on any submission for UI testing
    navigate('/doctor/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Left Form Area */}
        <div className="login-main">
          <div className="login-badge">Smart Health Monitor · Doctor</div>
          
          <h1 className="login-title">Doctor sign in</h1>
          <p className="login-subtitle">
            Access patients, appointments, prescriptions, alerts and reports in one place.
          </p>

          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                className="form-control" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem'}}>
              <span className="muted" style={{marginTop: 0}}>Login with your registered email</span>
              <a href="#" style={{color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem'}}>Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-3" style={{padding: '0.85rem'}}>
              Sign in
            </button>
          </form>

          <div className="login-footer">
            <span>Want to join the hospital?</span>
            <Link to="/auth/doctor/register" style={{color: 'var(--accent)', fontWeight: 600}}>Submit an application</Link>
          </div>
        </div>

        {/* Right Info Area */}
        <div className="login-extra">
          <div className="login-kpi">
            <h3 style={{color: 'white', marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '0.05em'}}>EMPOWERING CLINICAL EXCELLENCE</h3>
          </div>
          
          <div className="login-features">
            <div className="login-feature">
              <Check className="feature-icon" size={18} />
              <span>AI-powered patient risk analytics and alerts</span>
            </div>
            <div className="login-feature">
              <Check className="feature-icon" size={18} />
              <span>Instant access to vital diagnostic telemetry</span>
            </div>
            <div className="login-feature">
              <Check className="feature-icon" size={18} />
              <span>Streamlined digital prescription workflows</span>
            </div>
            <div className="login-feature">
              <Check className="feature-icon" size={18} />
              <span>Integrated appointment and schedule management</span>
            </div>
          </div>
          
          <div className="login-badge-secondary">
             <span className="icon" style={{marginRight: '8px', display: 'flex'}}>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
             </span>
             <span>Session encrypted</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
