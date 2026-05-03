import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, Trash2, Mail, Phone, Calendar, UserCheck } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const StaffManagement = ({ role: propRole }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const role = propRole || query.get('role') || 'RECEPTIONIST';
  
  const roleTitle = role === 'RECEPTIONIST' ? 'Receptionists' : role === 'LAB_STAFF' ? 'Lab Staff' : 'Staff Members';

  const mockStaff = [
    { id: 1, fullName: "Alice Johnson", email: "alice@health.com", phone: "+91 9876543210", lastLogin: "2026-04-01 10:30" },
    { id: 2, fullName: "Bob Smith", email: "bob@health.com", phone: "+91 9876543211", lastLogin: "2026-03-31 15:45" },
    { id: 3, fullName: "Charlie Brown", email: "charlie@health.com", phone: null, lastLogin: null },
  ];

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
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Last Login</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockStaff.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                        {u.fullName.charAt(0)}
                      </div>
                      {u.fullName}
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>{u.phone || <span className="muted">Not Provided</span>}</td>
                  <td className="muted">{u.lastLogin || 'Never'}</td>
                  <td className="text-right">
                    <button className="btn-icon" style={{ color: '#ef4444' }} title="Delete Account">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StaffManagement;
