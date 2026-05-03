import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { addAdminDepartment } from '../../utils/api';

export default function AddDepartment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addAdminDepartment(formData);
      alert('Department created successfully!');
      navigate('/admin/departments');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create department');
    } finally {
      setLoading(false);
    }
  };

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
          
          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <div>
            <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>Department Details</div>
            <div style={{fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Unit operations and capacity constraints</div>
          </div>

          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
              <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Department Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Cardiology Wing" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
              <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Functional Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description of services rendered in this department..." rows="4" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC', resize: 'vertical'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}></textarea>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
              <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Target Capacity Limit</label>
              <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="50" style={{maxWidth: '250px', padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              <div style={{fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem'}}>Bed count / concurrent active case limit.</div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '1rem'}}>
              <button type="submit" disabled={loading} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#1D4ED8';}} onMouseOut={(e) => {e.currentTarget.style.background = '#2563EB';}}>
                {loading ? <Loader className="animate-spin" size={18} /> : 'Create Department'}
              </button>
            </div>
          </form>

        </div>
      </div>
      
    </AdminLayout>
  );
}
