import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, UserPlus } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const AddStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const role = query.get('role') || 'RECEPTIONIST';

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
            <p className="section-subtitle">Create a new system account for {role === 'RECEPTIONIST' ? 'Receptionist' : 'Lab Staff'}</p>
          </div>
        </div>

        <form className="mt-4">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" required placeholder="e.g. John Doe" />
          </div>

          <div className="form-group mt-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" required placeholder="staff@example.com" />
          </div>

          <div className="form-group mt-3">
            <label className="form-label">Initial Password</label>
            <input type="password" name="password" className="form-control" required placeholder="•••••••••" />
          </div>

          <div className="form-group mt-3">
            <label className="form-label">Phone Number (Optional)</label>
            <input type="text" className="form-control" placeholder="+1 234 567 890" />
          </div>

          <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <button type="submit" className="btn btn-primary w-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <UserPlus size={18} /> Create Account
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddStaff;
