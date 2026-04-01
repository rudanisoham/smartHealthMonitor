import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

export default function PatientProfile() {
  return (
    <AdminLayout title="Patient Record Profile" subtitle="View system data for a registered patient">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/admin/patients" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#F8FAFC';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>
          <span style={{fontWeight: '800'}}>—</span> Back to Patient List
        </Link>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        {/* Top Cards Row */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
          
          {/* Left Card: Account details */}
          <div className="card" style={{padding: '2rem'}}>
            <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem'}}>
              <div style={{width: '72px', height: '72px', borderRadius: '50%', background: '#0EA5E9', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700'}}>S</div>
              <div>
                <div style={{fontSize: '1.4rem', fontWeight: '800', color: '#0F172A'}}>Soham Rudani</div>
                <div style={{fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Joined: 2026-04-01</div>
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <div style={{background: '#F8FAFC', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
                <div style={{fontSize: '0.75rem', fontWeight: '700', color: '#64748B'}}>System Account ID</div>
                <div style={{fontSize: '0.95rem', fontWeight: '700', color: '#0F172A'}}>3</div>
              </div>
              <div style={{background: '#F8FAFC', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
                <div style={{fontSize: '0.75rem', fontWeight: '700', color: '#64748B'}}>Email</div>
                <div style={{fontSize: '0.95rem', fontWeight: '700', color: '#0F172A'}}>rudanisoham1@gmail.com</div>
              </div>
              <div style={{background: '#F8FAFC', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
                <div style={{fontSize: '0.75rem', fontWeight: '700', color: '#64748B'}}>Account Role</div>
                <div style={{display: 'flex'}}><span style={{background: '#DCFCE7', color: '#16A34A', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700'}}>Patient</span></div>
              </div>
            </div>
          </div>

          {/* Right Card: Demographics */}
          <div className="card" style={{padding: '2rem', borderTop: '4px solid #0EA5E9', borderRadius: '12px'}}>
            <div style={{marginBottom: '2rem'}}>
              <div style={{fontSize: '1.2rem', fontWeight: '800', color: '#0F172A'}}>Health Demographics</div>
              <div style={{fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Basic medical metadata</div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <div style={{background: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <div style={{fontSize: '0.8rem', fontWeight: '600', color: '#475569'}}>Blood Group</div>
                <div style={{display: 'flex'}}><span style={{background: '#FEE2E2', color: '#EF4444', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700'}}>A+</span></div>
              </div>
              <div style={{background: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <div style={{fontSize: '0.8rem', fontWeight: '600', color: '#475569'}}>Biological Sex</div>
                <div style={{fontSize: '0.95rem', fontWeight: '800', color: '#0F172A'}}>—</div>
              </div>
              <div style={{background: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <div style={{fontSize: '0.8rem', fontWeight: '600', color: '#475569'}}>Registered Phone</div>
                <div style={{fontSize: '0.95rem', fontWeight: '700', color: '#0F172A'}}>+919316202895</div>
              </div>
            </div>
          </div>

        </div>

        {/* Info Alert Box */}
        <div style={{background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <div style={{background: '#F59E0B', color: '#FFFFFF', borderRadius: '4px', padding: '0.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <div style={{fontSize: '0.85rem', color: '#1E3A8A', lineHeight: '1.5'}}>
            <span style={{fontWeight: '700'}}>HIPAA Privacy Lock:</span> As a system administrator, you cannot view the clinical diagnostic records, issued prescriptions, or detailed vital metrics for this patient. Only assigned registered doctors can view specific Personal Health Information (PHI).
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{border: '1px solid #FECACA', background: '#FEF2F2', borderRadius: '12px', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <div style={{fontSize: '1.1rem', fontWeight: '800', color: '#DC2626'}}>Danger Zone</div>
          <div style={{fontSize: '0.85rem', color: '#EF4444', marginTop: '0.1rem', marginBottom: '1.5rem', fontWeight: '500'}}>Administrative overrides</div>
          
          <button style={{padding: '0.6rem 1.25rem', background: 'transparent', border: '1px solid #EF4444', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700', color: '#EF4444', cursor: 'pointer', transition: 'all 0.2s'}} onMouseOver={(e) => {e.currentTarget.style.background = '#EF4444'; e.currentTarget.style.color = '#FFFFFF';}} onMouseOut={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#EF4444';}}>
            Hard Delete Patient Record
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
