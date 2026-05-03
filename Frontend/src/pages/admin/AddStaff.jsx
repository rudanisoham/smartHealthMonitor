import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, UserPlus, Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { addAdminStaff } from '../../utils/api';

const AddStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const defaultRole = query.get('role') || 'RECEPTIONIST';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: defaultRole
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addAdminStaff(formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        role: defaultRole
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add staff');
    } finally {
      setLoading(false);
    }
  };


  return (
    <AdminLayout>
      <div style={{ marginBottom: '1.5rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="card-header pb-4 mb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h2 className="section-title">Account Registration</h2>
            <p className="section-subtitle">Create a new system account for {formData.role === 'RECEPTIONIST' ? 'Receptionist' : 'Staff'}</p>
          </div>
        </div>

        {error && (
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', marginBottom: '1rem', fontSize: '0.85rem' }}>
            Staff member added successfully! A welcome email with credentials has been sent.
          </div>
        )}

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select name="role" className="form-control" value={formData.role} onChange={handleChange} required>
              <option value="RECEPTIONIST">Receptionist</option>
              <option value="MEDICAL_STAFF">Medical Staff (Pharmacist)</option>
              <option value="LAB_STAFF">Lab Staff (Technician)</option>
              <option value="DOCTOR">Doctor</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullName" className="form-control" required placeholder="e.g. John Doe" value={formData.fullName} onChange={handleChange} />
          </div>

          <div className="form-group mt-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" required placeholder="staff@example.com" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group mt-3">
            <label className="form-label">Initial Password</label>
            <input type="password" name="password" className="form-control" required placeholder="•••••••••" value={formData.password} onChange={handleChange} />
          </div>

          <div className="form-group mt-3">
            <label className="form-label">Phone Number (Optional)</label>
            <input type="text" name="phone" className="form-control" placeholder="+1 234 567 890" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <button type="submit" className="btn btn-primary w-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} disabled={loading}>
              {loading ? <Loader className="animate-spin" size={18} /> : <><UserPlus size={18} /> Create Account</>}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddStaff;
