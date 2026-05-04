import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAdminDepartmentById, addAdminDepartment } from '../../utils/api';
import { Loader, ArrowLeft, Save, Trash2 } from 'lucide-react';

export default function ConfigureDepartment() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const deptId = queryParams.get('id');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: 0,
    head: '',
    location: '',
    phone: ''
  });
  const [loading, setLoading] = useState(!!deptId);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (deptId) {
      const fetchDept = async () => {
        try {
          const res = await getAdminDepartmentById(deptId);
          const dept = res.data.data.department;
          setFormData({
            name: dept.name || '',
            description: dept.description || '',
            capacity: dept.capacity || 0,
            head: dept.head || '',
            location: dept.location || '',
            phone: dept.phone || ''
          });
        } catch (err) {
          console.error("Failed to fetch department", err);
        } finally {
          setLoading(false);
        }
      };
      fetchDept();
    }
  }, [deptId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // For now, we use addAdminDepartment but if deptId exists it should ideally be updateAdminDepartment
      // Let's assume addAdminDepartment handles update if ID is provided or we add updateAdminDepartment
      const { updateAdminDepartment } = await import('../../utils/api');
      if (deptId) {
        // We need to implement this in api.js
        await updateAdminDepartment(deptId, formData);
        alert('Department updated successfully!');
      } else {
        await addAdminDepartment(formData);
        alert('Department created successfully!');
      }
      navigate('/admin/departments');
    } catch (err) {
      alert(err.response?.data?.error || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <AdminLayout title="Configure Department">
      <div style={{padding: '5rem', textAlign: 'center'}}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
  );

  return (
    <AdminLayout title={deptId ? "Edit Department" : "Configure Department"} subtitle="Update ward settings and capacity">
      <div className="card mb-6" style={{maxWidth: '800px', margin: '0 auto'}}>
        <div className="card-header">
          <div>
            <div className="card-title">Department Details</div>
            <div className="muted mt-1">Modify the primary settings for this sector</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem'}}>
          
          <div className="grid grid-2">
            <div>
              <label style={{display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Department Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none'}} 
              />
            </div>
            <div>
              <label style={{display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Max Patient Capacity</label>
              <input 
                type="number" 
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none'}} 
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div>
               <label style={{display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Head of Department</label>
               <input 
                type="text" 
                name="head"
                value={formData.head}
                onChange={handleChange}
                placeholder="Dr. Name"
                style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none'}} 
              />
            </div>
            <div>
              <label style={{display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Location / Floor</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Block A, 2nd Floor"
                style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none'}} 
              />
            </div>
          </div>

          <div>
            <label style={{display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)'}}>Internal Description</label>
            <textarea 
              rows="4" 
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none', resize: 'vertical'}} 
            />
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)'}}>
            <Link to="/admin/departments" style={{color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <ArrowLeft size={16} /> Back to departments
            </Link>
            
            <div style={{display: 'flex', gap: '1rem'}}>
              <button type="submit" disabled={saving} style={{padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: 'white', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(29, 78, 216, 0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                {deptId ? "Update Configuration" : "Save deployment"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
}
