import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { addAdminStaff } from '../../utils/api';

export default function RegisterDoctor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    specialty: '',
    licenseNumber: '',
    experience: '5',
    department: '',
    role: 'DOCTOR'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [departments, setDepartments] = useState([]);
  const [deptsLoading, setDeptsLoading] = useState(true);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const { getAdminDepartments } = await import('../../utils/api');
        const res = await getAdminDepartments();
        setDepartments(res.data.data);
      } catch (err) {
        console.error("Failed to fetch departments", err);
      } finally {
        setDeptsLoading(false);
      }
    };
    fetchDepts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addAdminStaff(formData);
      alert('Doctor registered successfully!');
      navigate('/admin/doctors');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Register Doctor" subtitle="Onboard a new medical professional">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/admin/doctors" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#F8FAFC';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>
          <span style={{fontWeight: '800'}}>—</span> Back to Doctors
        </Link>
      </div>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <form className="card" style={{width: '100%', maxWidth: '800px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem'}} onSubmit={handleSubmit}>
          
          <div>
            <div style={{fontSize: '1.25rem', fontWeight: '800', color: '#0F172A'}}>Doctor Credentials</div>
            <div style={{fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Account and professional qualifications</div>
          </div>

          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          {/* Section 1: Authentication */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            <div style={{fontSize: '1.05rem', fontWeight: '700', color: '#0F172A'}}>Authentication</div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Full Name</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Dr. John Doe" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Professional Email</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="doctor@hospital.com" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Initial Password</label>
                <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
            </div>
          </div>

          {/* Section 2: Clinical Identity */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            <div style={{fontSize: '1.05rem', fontWeight: '700', color: '#0F172A'}}>Clinical Identity</div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Medical Specialty</label>
                <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} required placeholder="e.g. Cardiology" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>License Number</label>
                <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required placeholder="MD-12345678" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Years of Experience</label>
                <input type="number" name="experience" value={formData.experience} onChange={handleChange} required style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Assign Department</label>
                <div style={{position: 'relative'}}>
                  <select name="department" value={formData.department} onChange={handleChange} required style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC', appearance: 'none', cursor: 'pointer'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}>
                    <option value="" disabled hidden>-- Select Department --</option>
                    {deptsLoading ? <option disabled>Loading departments...</option> : 
                      departments.map(dept => (
                        <option key={dept._id} value={dept.title}>{dept.title}</option>
                      ))
                    }
                    {departments.length === 0 && !deptsLoading && <option disabled>No departments found</option>}
                  </select>
                  <svg style={{position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none'}} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              
            </div>
          </div>

          {/* Info Alert */}
          <div style={{background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem'}}>
            <div style={{background: '#3B82F6', color: '#FFFFFF', borderRadius: '4px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800', flexShrink: 0}}>i</div>
            <div style={{fontSize: '0.85rem', color: '#334155', lineHeight: '1.4', fontWeight: '500'}}>
              Doctors registered by an admin bypass the application review process. Their account will be instantly <span style={{color: '#16A34A', fontWeight: '700'}}>approved and ACTIVE</span>, and they can begin issuing prescriptions immediately.
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button type="submit" disabled={loading} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#1D4ED8';}} onMouseOut={(e) => {e.currentTarget.style.background = '#2563EB';}}>
              {loading ? <Loader className="animate-spin" size={18} /> : 'Register Doctor'}
            </button>
          </div>

        </form>
      </div>
      
    </AdminLayout>
  );
}
