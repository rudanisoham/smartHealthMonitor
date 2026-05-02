import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, User, Lock, ArrowRight } from 'lucide-react';
import '../../../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/reception/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card-wrapper">
        <div className="login-branding">
          <div className="logo-box">
            <ShieldCheck size={32} />
          </div>
          <h2>Smart Health</h2>
          <p>RECEPTION ACCESS</p>
        </div>

        <div className="login-form-card">
          <div className="form-header">
            <h3>Staff Login</h3>
            <p>Welcome back! Please enter your credentials.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Staff Email</label>
              <div className="input-with-icon">
                <User size={18} />
                <input type="email" placeholder="staff@smarthealth.com" required />
              </div>
            </div>

            <div className="form-group mt-3">
              <label>Security Password</label>
              <div className="input-with-icon">
                <Lock size={18} />
                <input type="password" placeholder="••••••••" required />
              </div>
            </div>

            <div className="form-utils mt-2">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/auth/reception/reset-password">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-primary-full mt-4">
              Sign In <ArrowRight size={18} className="ms-2" />
            </button>
          </form>

          <div className="form-footer mt-4">
            <p>Need access? <Link to="/contact">Contact IT Administrator</Link></p>
          </div>
        </div>
      </div>
      
      <div className="login-footer-simple">
        <p>&copy; 2026 Smart Health Monitor System. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
