import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

export default function AddDepartment() {
  return (
    <AdminLayout title="Create Department" subtitle="Add a new specialized unit to the hospital network">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/admin/departments" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#F8FAFC';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>
          <span style={{fontWeight: '800'}}>—</span> Back to Departments
        </Link>
      </div>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className="card" style={{width: '100%', maxWidth: '800px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', borderTop: '4px solid #0EA5E9', borderRadius: '12px'}}>
          
          <div>
            <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>Department Details</div>
            <div style={{fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Unit operations and capacity constraints</div>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
              <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Department Name</label>
              <input type="text" placeholder="Cardiology Wing" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
              <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Department Code</label>
              <input type="text" placeholder="CARD-WT" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
              <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Functional Description</label>
              <textarea placeholder="Description of services rendered in this department..." rows="4" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC', resize: 'vertical'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}></textarea>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
              <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Target Capacity Limit</label>
              <input type="number" placeholder="50" style={{maxWidth: '250px', padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              <div style={{fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem'}}>Bed count / concurrent active case limit.</div>
            </div>

          </div>

          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
            <button style={{padding: '0.75rem 1.5rem', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#1D4ED8';}} onMouseOut={(e) => {e.currentTarget.style.background = '#2563EB';}}>
              Create Department
            </button>
          </div>

        </div>
      </div>
      
    </AdminLayout>
  );
}
