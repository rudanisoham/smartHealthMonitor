import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { login as apiLogin } from '../../utils/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await apiLogin({ email, password });
      
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        
        if (res.data.user.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          setError('Unauthorized: This portal is for Administrators only.');
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{display: 'flex', minHeight: '100vh', width: '100vw', fontFamily: 'var(--font-family)', margin: 0, overflow: 'hidden'}}>
      {/* Left Column */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', padding: '3.5rem 4rem', background: '#FFFFFF', position: 'relative'}}>
        
        {/* Top Badge */}
        <div style={{marginBottom: 'auto'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#E8F0FE', color: '#2563EB', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800'}}>
             <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#2563EB'}}></span>
             Smart Health Monitor - Admin
          </div>
        </div>

        {/* Main Form Area */}
        <div style={{maxWidth: '480px', width: '100%', margin: 'auto'}}>
          <h1 style={{fontSize: '3.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '1rem', lineHeight: '1.2', letterSpacing: '-0.02em'}}>Welcome back, Admin</h1>
          <p style={{fontSize: '1rem', color: '#64748B', marginBottom: '2.5rem', lineHeight: '1.6'}}>
            Monitor your hospital in real-time. Review doctors, patients, departments and analytics from one clean console.
          </p>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            <div>
              <label style={{display: 'block', fontWeight: '800', fontSize: '0.75rem', color: '#0F172A', marginBottom: '0.5rem'}}>Work email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid transparent', background: '#F8FAFC', color: '#0F172A', fontSize: '1rem', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box'}} onFocus={(e) => e.target.style.border = '1px solid #2563EB'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
            </div>
            
            <div>
              <label style={{display: 'block', fontWeight: '800', fontSize: '0.75rem', color: '#0F172A', marginBottom: '0.5rem'}}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid transparent', background: '#F8FAFC', color: '#0F172A', fontSize: '1rem', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box'}} onFocus={(e) => e.target.style.border = '1px solid #2563EB'} onBlur={(e) => e.target.style.border = '1px solid transparent'} />
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#475569', cursor: 'pointer', fontWeight: '500'}}>
                <input type="checkbox" style={{width: '16px', height: '16px', accentColor: '#2563EB'}} />
                Keep me signed in on this device
              </label>
              <a href="#" style={{color: '#38BDF8', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none'}}>Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '1.1rem', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', marginTop: '1.5rem', transition: 'background 0.2s'}} onMouseOver={(e) => e.target.style.background = '#1D4ED8'} onMouseOut={(e) => e.target.style.background = '#2563EB'}>
              {loading ? <Loader className="animate-spin" size={20} /> : 'Sign in to Admin Panel'}
            </button>
          </form>
        </div>

        {/* Footer Area */}
        <div style={{marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8'}}>
          <span>Secured access - Role-based control</span>
          <span>Need help? Contact your IT team.</span>
        </div>
      </div>

      {/* Right Column */}
      <div style={{flex: 1, background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', position: 'relative', display: 'flex', alignItems: 'center', padding: '4rem'}}>
        {/* Subtle dot pattern overlay */}
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.3}}></div>
        
        <div style={{position: 'relative', zIndex: 10, maxWidth: '520px', marginLeft: '3rem'}}>
          <h2 style={{color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '800', letterSpacing: '0.15em', marginBottom: '1.5rem'}}>ENTERPRISE HOSPITAL MANAGEMENT</h2>
          
          <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            <li style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94A3B8', fontSize: '0.95rem'}}>
              <span style={{color: '#38BDF8', fontWeight: 'bold'}}>✓</span> Real-time occupancy tracking and bed management
            </li>
            <li style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94A3B8', fontSize: '0.95rem'}}>
              <span style={{color: '#38BDF8', fontWeight: 'bold'}}>✓</span> Advanced doctor and staff scheduling algorithms
            </li>
            <li style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94A3B8', fontSize: '0.95rem'}}>
              <span style={{color: '#38BDF8', fontWeight: 'bold'}}>✓</span> Encrypted patient data and secure access logs
            </li>
            <li style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94A3B8', fontSize: '0.95rem'}}>
              <span style={{color: '#38BDF8', fontWeight: 'bold'}}>✓</span> Comprehensive financial and clinical reporting
            </li>
          </ul>

          <div style={{marginTop: '3.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(15, 23, 42, 0.4)', padding: '0.6rem 1.2rem', borderRadius: '999px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.05)'}}>
            <span style={{width: '6px', height: '6px', borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 8px #38BDF8'}}></span>
            <span style={{color: 'white', fontSize: '0.8rem', fontWeight: '700'}}>Encrypted admin session</span>
          </div>
        </div>
      </div>
    </div>
  );
}
