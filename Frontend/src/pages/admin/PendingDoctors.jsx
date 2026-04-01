import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

export default function PendingDoctors() {
  return (
    <AdminLayout title="Pending Approvals" subtitle="Review doctors waiting to join the hospital">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/admin/doctors" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#F8FAFC';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>
          <span style={{fontWeight: '800'}}>—</span> Back to Doctors
        </Link>
      </div>

      {/* Main Container */}
      <div className="card" style={{padding: '0', overflow: 'hidden'}}>
        
        {/* Card Header inside the main container */}
        <div style={{padding: '1.75rem 2.5rem', borderBottom: '1px solid #E2E8F0'}}>
          <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>Applications Under Review</div>
          <div style={{fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Awaiting credential verification</div>
        </div>

        {/* Table */}
        <div style={{width: '100%', overflowX: 'auto'}}>
          <table className="premium-table" style={{width: '100%', minWidth: '900px', borderSpacing: 0}}>
            <thead>
              <tr style={{background: '#FFFFFF'}}>
                <th style={{padding: '1.25rem 2.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left'}}>NAME</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'center'}}>CONTACT</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'center'}}>SPECIALTY</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'center'}}>LICENSE</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'center'}}>STATUS/ACCOUNT</th>
                <th style={{padding: '1.25rem 2.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'right'}}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" style={{padding: '6rem 2rem', textAlign: 'center', background: '#FFFFFF', borderBottom: 'none'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem'}}>
                    <div style={{width: '56px', height: '56px', background: '#A7F3D0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                      <div style={{position: 'absolute', width: '100%', height: '100%', border: '4px solid #FFFFFF', borderRadius: '12px', top: 0, left: 0, boxSizing: 'border-box'}}></div>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div style={{color: '#64748B', fontSize: '0.95rem', fontWeight: '600'}}>No pending applications. All caught up!</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </AdminLayout>
  );
}
