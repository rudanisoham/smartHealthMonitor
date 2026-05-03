import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, Trash2, Mail, Phone, Calendar, UserCheck, Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminStaff, deleteAdminStaff } from '../../utils/api';

const StaffManagement = ({ role: propRole }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const role = propRole || query.get('role') || 'RECEPTIONIST';
  
  const roleTitle = role === 'RECEPTIONIST' ? 'Receptionists' : role === 'LAB_STAFF' ? 'Lab Staff' : role === 'MEDICAL_STAFF' ? 'Medical Staff' : 'Staff Members';

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const res = await getAdminStaff(role);
        setStaff(res.data.data);
      } catch (err) {
        setError('Failed to fetch staff list');
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [role]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    try {
      await deleteAdminStaff(id);
      setStaff(staff.filter(s => s._id !== id));
    } catch (err) {
      alert('Failed to delete staff member');
    }
  };

  return (
    <AdminLayout>
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="section-title">Manage {roleTitle}</h2>
          <p className="section-subtitle">System users with {roleTitle} administrative privileges</p>
        </div>
        <Link to={`/admin/staff/add?role=${role}`} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Add New {role === 'RECEPTIONIST' ? 'Receptionist' : 'Staff Member'}
        </Link>
      </div>

      <div className="card mt-4">
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <Loader className="animate-spin" style={{ margin: '0 auto', color: 'var(--primary)' }} />
            <p className="muted mt-2">Loading staff records...</p>
          </div>
        ) : error ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger)' }}>{error}</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }} className="muted">No staff members found for this role.</td></tr>
                ) : (
                  staff.map((u) => (
                    <tr key={u._id}>
                      <td style={{ fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                            {u.fullName ? u.fullName.charAt(0) : '?'}
                          </div>
                          {u.fullName}
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.phone || <span className="muted">Not Provided</span>}</td>
                      <td>
                        <span className={`badge-soft ${u.isActive ? 'success' : 'danger'}`}>
                          {u.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-right">
                        <button onClick={() => handleDelete(u._id)} className="btn-icon" style={{ color: '#ef4444' }} title="Delete Account">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default StaffManagement;
