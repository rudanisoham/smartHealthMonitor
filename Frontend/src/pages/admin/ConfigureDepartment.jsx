import React from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Link } from 'react-router-dom';

export default function ConfigureDepartment() {
  return (
    <AdminLayout title="Configure Department" subtitle="Update ward settings and capacity">
      <div className="card mb-6" style={{maxWidth: '800px', margin: '0 auto'}}>
        <div className="card-header">
          <div>
            <div className="card-title">Department Details</div>
            <div className="muted mt-1">Modify the primary settings for this sector</div>
          </div>
        </div>

        <form style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem'}}>
          
          <div className="grid grid-2">
            <div>
              <label style={{display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Department Name</label>
              <input 
                type="text" 
                defaultValue="Cardiology"
                style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none'}} 
              />
            </div>
            <div>
              <label style={{display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Department Code</label>
              <input 
                type="text" 
                defaultValue="CARD-01"
                style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none'}} 
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div>
               <label style={{display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Head of Department</label>
              <select style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', background: 'white', outline: 'none'}}>
                <option>Dr. John Smith</option>
                <option>Dr. Alice Lee</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Max Patient Capacity</label>
              <input 
                type="number" 
                defaultValue="45"
                style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none'}} 
              />
            </div>
          </div>

          <div>
            <label style={{display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Internal Description</label>
            <textarea 
              rows="4" 
              defaultValue="Primary cardiac care and surgery ward. Needs immediate equipment maintenance on floor 3."
              style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none', resize: 'vertical'}} 
            />
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)'}}>
            <Link to="/admin/departments" style={{color: 'var(--primary)', fontWeight: '600'}}>← Back to departments</Link>
            
            <div style={{display: 'flex', gap: '1rem'}}>
              <button type="button" style={{padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-sm)', background: 'transparent', color: 'var(--danger)', fontWeight: '600', border: '1px solid transparent', cursor: 'pointer'}}>
                Decommission Sector
              </button>
              <button type="submit" style={{padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: 'white', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(29, 78, 216, 0.2)'}}>
                Save deployment
              </button>
            </div>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
}
