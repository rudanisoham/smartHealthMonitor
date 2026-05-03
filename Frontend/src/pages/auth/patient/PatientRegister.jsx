import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Heart, Calendar, ClipboardList, Activity, ShieldCheck } from 'lucide-react';

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Patient registration submitted');
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
            <span>Create your Smart Health account</span>
          </div>
          <h1 className="login-title">Sign up as patient</h1>
          <p className="login-subtitle">
            Track your health data, appointments, prescriptions and reports.
          </p>

          <form onSubmit={handleSubmit} className="form-grid form-2">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input 
                id="fullName" 
                name="fullName" 
                type="text" 
                className="form-control" 
                placeholder="John Doe" 
                value={formData.fullName}
                onChange={handleChange}
                required 
                minLength="2" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                className="form-control" 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="registerPassword">Password</label>
              <input 
                id="registerPassword" 
                name="password" 
                type="password" 
                className="form-control" 
                placeholder="•••••••••" 
                value={formData.password}
                onChange={handleChange}
                required 
                minLength="6" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmRegisterPassword">Confirm Password</label>
              <input 
                id="confirmRegisterPassword" 
                name="confirmPassword" 
                type="password" 
                className="form-control" 
                placeholder="•••••••••" 
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="phone">Phone Number</label>
              <input 
                id="phone" 
                name="phone" 
                type="tel" 
                className="form-control" 
                placeholder="+1234567890" 
                value={formData.phone}
                onChange={handleChange}
                pattern="^\+?[0-9]{10,15}$" 
              />
              <small className="muted" style={{ fontSize: '0.7rem' }}>Format: +1234567890 (optional)</small>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="flex items-center gap-2 text-xs muted" style={{ cursor: 'pointer' }}>
                <input type="checkbox" style={{ margin: '0 8px 0 0' }} required />
                <span>I agree to the terms of use and privacy policy.</span>
              </label>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <button type="submit" className="btn btn-primary w-full">
                <span>Create account</span>
                <UserPlus size={18} className="ml-2" />
              </button>
            </div>
          </form>

          <div className="login-footer">
            <span>Already have an account?</span>
            <Link to="/auth/patient/login" className="text-xs" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 500, marginLeft: '0.5rem' }}>
              Sign in
            </Link>
          </div>
        </div>

        <div className="login-extra" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="login-kpi" style={{ background: 'transparent', border: 'none', padding: 0 }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Your Health in Your Hands</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Heart size={20} color="#38bdf8" /> Track vital signs and medical history 24/7
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Calendar size={20} color="#38bdf8" /> Book appointments directly with your specialists
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <ClipboardList size={20} color="#38bdf8" /> View and manage your digital prescriptions easily
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Activity size={20} color="#38bdf8" /> Use the AI Health Checker for instant symptom analysis
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <div className="login-badge-secondary">
              <ShieldCheck size={14} />
              <span className="ml-1">Secure patient onboarding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;
