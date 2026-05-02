import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

export default function RegisterPatient() {
  return (
    <AdminLayout title="Register Patient" subtitle="Enroll a new patient into the hospital directory">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/admin/patients" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#F8FAFC';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>
          <span style={{fontWeight: '800'}}>—</span> Back to Patients
        </Link>
      </div>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className="card" style={{width: '100%', maxWidth: '800px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem', borderTop: '4px solid #0EA5E9', borderRadius: '12px'}}>
          
          <form style={{display: 'flex', flexDirection: 'column', gap: '2.5rem'}} onSubmit={(e) => e.preventDefault()}>
            
            {/* Sec 1: Auth */}
            <div>
              <div style={{fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #F1F5F9'}}>
                Identity Registration
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                  <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Full Name</label>
                  <input type="text" placeholder="John Doe" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                  <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Email Address</label>
                  <input type="email" placeholder="john@example.com" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                  <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Mobile Phone</label>
                  <input type="text" placeholder="+1 555-0192" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
                </div>
              </div>
            </div>

            {/* Sec 2: Demographics */}
            <div>
              <div style={{fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #F1F5F9'}}>
                Basic Demographics
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                  <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Blood Group</label>
                  <select style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC', cursor: 'pointer'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}>
                    <option value="">Select Group</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                  <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Date of Birth</label>
                  <input type="date" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
                </div>
                <div style={{gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                  <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Emergency Details</label>
                  <textarea placeholder="Allergies, chronic conditions, emergency contacts..." rows="3" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC', resize: 'vertical'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}></textarea>
                </div>
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
              <button style={{padding: '0.75rem 1.5rem', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#1D4ED8';}} onMouseOut={(e) => {e.currentTarget.style.background = '#2563EB';}}>
                Register Patient Record
              </button>
            </div>
          </form>

        </div>
      </div>
      
    </AdminLayout>
  );
}
