import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function Patients() {
  return (
    <AdminLayout title="Patients" subtitle="Manage patient records and histories">
      <div className="card mb-6">
        <div className="card-header">
          <div>
            <div className="card-title">Patient Directory</div>
            <div className="muted mt-1">Search, sort, and manage all registered patients</div>
          </div>
          <button className="badge-soft" style={{border: 'none', cursor: 'pointer', padding: '0.6rem 1.2rem', fontSize: '0.9rem'}}>+ Register Patient</button>
        </div>
        <div className="table-container mt-4">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age/Gender</th>
                <th>Assigned Ward</th>
                <th>Status</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="author-name">Sarah Jenkins</td>
                <td className="muted">45 • Female</td>
                <td className="muted">Cardiology</td>
                <td><span className="status-pill status-active">Admitted</span></td>
                <td className="muted">2 hours ago</td>
              </tr>
              <tr>
                <td className="author-name">Michael Chang</td>
                <td className="muted">32 • Male</td>
                <td className="muted">Neurology</td>
                <td><span className="status-pill status-active">Admitted</span></td>
                <td className="muted">5 hours ago</td>
              </tr>
              <tr>
                <td className="author-name">Emma Watson</td>
                <td className="muted">28 • Female</td>
                <td className="muted">Pediatrics</td>
                <td><span className="badge-soft">Discharged</span></td>
                <td className="muted">Yesterday</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
