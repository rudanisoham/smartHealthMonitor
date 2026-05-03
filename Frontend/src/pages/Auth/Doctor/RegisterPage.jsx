import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Loader } from 'lucide-react';
import { register as apiRegister, createDoctorProfile } from '../../../utils/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    specialty: '',
    department: '',
    licenseId: '',
    phone: '',
    experience: '',
    password: '',
    confirmPassword: '',
    certify: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({...formData, [e.target.name]: value});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const res = await apiRegister({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'DOCTOR',
        phone: formData.phone,
        specialty: formData.specialty,
        department: formData.department,
        licenseNumber: formData.licenseId,
        experience: formData.experience
      });

      if (res.data.success) {
        // We don't log them in yet, they must wait for approval
        alert('Application submitted successfully! Please wait for administrative approval. You can login once your account is activated.');
        navigate('/auth/doctor/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Left Form Area */}
        <div className="login-main">
          <div className="login-badge">Smart Health Monitor · Careers</div>
          
          <h1 className="login-title">Apply to join</h1>
          <p className="login-subtitle mb-4">
            Submit your medical credentials below. Our hospital administration will review your application.
          </p>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="form-grid form-2">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" className="form-control" placeholder="Dr. Full Name" value={formData.fullName} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Professional Email</label>
              <input type="email" name="email" className="form-control" placeholder="admin" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Medical Specialty</label>
              <select name="specialty" className="form-control" value={formData.specialty} onChange={handleChange} required>
                <option value="">Select Specialty...</option>
                <option value="Neurology">Neurology</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>

            <div className="form-group">
              <label>Assign Department</label>
              <select name="department" className="form-control" value={formData.department} onChange={handleChange} required>
                <option value="">Select Department...</option>
                <option value="Neurology">Neurology</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Medical License ID</label>
              <input type="text" name="licenseId" className="form-control" placeholder="MD-12345678" value={formData.licenseId} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="phone" className="form-control" placeholder="+1234567890" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Years of Experience</label>
              <input type="number" name="experience" className="form-control" placeholder="5" value={formData.experience} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Desired Password</label>
              <input type="password" name="password" className="form-control" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" className="form-control" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, fontSize: '0.85rem' }}>
                <input type="checkbox" name="certify" checked={formData.certify} onChange={handleChange} required style={{width: '1rem', height: '1rem'}}/>
                I certify that all credentials provided are accurate and authorize verification.
              </label>
            </div>

            <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
               <button type="submit" className="btn btn-primary w-full" style={{padding: '0.85rem'}} disabled={loading}>
                 {loading ? <Loader className="animate-spin" size={18} /> : 'Submit Application for Review'}
               </button>
            </div>

            <div className="muted" style={{ gridColumn: 'span 2', marginTop: '1rem', fontSize: '0.85rem' }}>
              Applications typically take 24-48 hours for administrative approval.
            </div>
            
            <div className="login-footer" style={{ gridColumn: 'span 2' }}>
              <span>Already an approved doctor?</span>
              <Link to="/auth/doctor/login" style={{color: 'var(--primary)', fontWeight: 600}}>Sign in here</Link>
            </div>

          </form>
        </div>

        {/* Right Info Area */}
        <div className="login-extra">
          <div className="login-kpi">
            <h3 style={{color: 'white', marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '0.05em'}}>JOIN A WORLD-CLASS TEAM</h3>
          </div>
          
          <div className="login-features">
            <div className="login-feature">
              <Check className="feature-icon" size={16} />
              <span style={{fontSize: '0.85rem'}}>Instantly access advanced longitudinal patient records</span>
            </div>
            <div className="login-feature">
              <Check className="feature-icon" size={16} />
              <span style={{fontSize: '0.85rem'}}>Utilize AI diagnostics to enhance treatment plans</span>
            </div>
            <div className="login-feature">
              <Check className="feature-icon" size={16} />
              <span style={{fontSize: '0.85rem'}}>Enjoy fully integrated cross-departmental communications</span>
            </div>
            <div className="login-feature">
              <Check className="feature-icon" size={16} />
              <span style={{fontSize: '0.85rem'}}>Flexible schedule generation across all intensive care units</span>
            </div>
          </div>
          
          <div className="login-badge-secondary" style={{marginTop: '2rem'}}>
             <span className="icon" style={{marginRight: '8px', display: 'flex', color: 'var(--primary)'}}>
               <div style={{width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%'}}></div>
             </span>
             <span style={{fontSize: '0.85rem', fontWeight: 600}}>Rigorous credential verification</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
