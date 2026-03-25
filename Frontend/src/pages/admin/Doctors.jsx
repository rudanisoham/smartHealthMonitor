import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function Doctors() {
  return (
    <AdminLayout title="Doctors" subtitle="Manage hospital staff & specialists">
      <div className="card mb-6">
        <div className="card-header">
          <div>
            <div className="card-title">All Doctors</div>
            <div className="muted mt-1">A complete list of all registered doctors across all departments</div>
          </div>
          <button className="badge-soft" style={{border: 'none', cursor: 'pointer', padding: '0.6rem 1.2rem', fontSize: '0.9rem'}}>+ Add New Doctor</button>
        </div>
        <div className="table-container mt-4">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="flex-author">
                  <div className="header-avatar" style={{width: '40px', height: '40px'}}>JS</div>
                  <div className="author-info">
                    <span className="author-name">Dr. John Smith</span>
                    <span className="author-sub">ID: #DOC-1029</span>
                  </div>
                </td>
                <td className="muted">Cardiology</td>
                <td className="muted">12 Years</td>
                <td className="muted">john.s@smarthealth.com</td>
                <td><span className="status-pill status-active">On Duty</span></td>
                <td><span className="badge-soft" style={{cursor:'pointer'}}>View Profile</span></td>
              </tr>
              <tr>
                <td className="flex-author">
                  <div className="header-avatar" style={{width: '40px', height: '40px', background: 'var(--accent)'}}>AL</div>
                  <div className="author-info">
                    <span className="author-name">Dr. Alice Lee</span>
                    <span className="author-sub">ID: #DOC-8213</span>
                  </div>
                </td>
                <td className="muted">Neurology</td>
                <td className="muted">8 Years</td>
                <td className="muted">alice.l@smarthealth.com</td>
                <td><span className="status-pill status-active">On Duty</span></td>
                <td><span className="badge-soft" style={{cursor:'pointer'}}>View Profile</span></td>
              </tr>
              <tr>
                <td className="flex-author">
                  <div className="header-avatar" style={{width: '40px', height: '40px', background: 'var(--warning)'}}>RB</div>
                  <div className="author-info">
                    <span className="author-name">Dr. Robert Brown</span>
                    <span className="author-sub">ID: #DOC-5512</span>
                  </div>
                </td>
                <td className="muted">Pediatrics</td>
                <td className="muted">15 Years</td>
                <td className="muted">robert.b@smarthealth.com</td>
                <td><span className="badge-soft">Off Duty</span></td>
                <td><span className="badge-soft" style={{cursor:'pointer'}}>View Profile</span></td>
              </tr>
              <tr>
                <td className="flex-author">
                  <div className="header-avatar" style={{width: '40px', height: '40px', background: 'var(--danger)'}}>EM</div>
                  <div className="author-info">
                    <span className="author-name">Dr. Emily Martinez</span>
                    <span className="author-sub">ID: #DOC-9921</span>
                  </div>
                </td>
                <td className="muted">Orthopedics</td>
                <td className="muted">6 Years</td>
                <td className="muted">emily.m@smarthealth.com</td>
                <td><span className="status-pill status-active">On Duty</span></td>
                <td><span className="badge-soft" style={{cursor:'pointer'}}>View Profile</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
