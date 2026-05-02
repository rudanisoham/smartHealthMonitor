import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

export default function RegisterDoctor() {
  return (
    <AdminLayout title="Register Doctor" subtitle="Onboard a new medical professional">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/admin/doctors" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#F8FAFC';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>
          <span style={{fontWeight: '800'}}>—</span> Back to Doctors
        </Link>
      </div>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className="card" style={{width: '100%', maxWidth: '800px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          
          <div>
            <div style={{fontSize: '1.25rem', fontWeight: '800', color: '#0F172A'}}>Doctor Credentials</div>
            <div style={{fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Account and professional qualifications</div>
          </div>

          {/* Section 1: Authentication */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            <div style={{fontSize: '1.05rem', fontWeight: '700', color: '#0F172A'}}>Authentication</div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Full Name</label>
                <input type="text" placeholder="Dr. John Doe" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Professional Email</label>
                <input type="email" placeholder="doctor@hospital.com" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Phone Number</label>
                <input type="text" placeholder="+1 (555) 000-0000" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Initial Password</label>
                <input type="password" placeholder="••••••••" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
            </div>
          </div>

          {/* Section 2: Clinical Identity */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
            <div style={{fontSize: '1.05rem', fontWeight: '700', color: '#0F172A'}}>Clinical Identity</div>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Medical Specialty</label>
                <input type="text" placeholder="e.g. Cardiology" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>License Number</label>
                <input type="text" placeholder="MD-12345678" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Years of Experience</label>
                <input type="text" defaultValue="5" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Assign Department</label>
                <div style={{position: 'relative'}}>
                  <select defaultValue="" style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC', appearance: 'none', cursor: 'pointer'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}>
                    <option value="" disabled hidden>No Department Assigned</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="pediatrics">Pediatrics</option>
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
            <button style={{padding: '0.75rem 1.5rem', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#1D4ED8';}} onMouseOut={(e) => {e.currentTarget.style.background = '#2563EB';}}>
              Register Doctor
            </button>
          </div>

        </div>
      </div>
      
    </AdminLayout>
  );
}
