import React from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Overview & live hospital health">
      <div className="grid grid-4 mb-6">
        
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Total users</div>
              <div className="muted mt-1">Admins, doctors & patients</div>
            </div>
            <span className="badge-soft">+8% vs week</span>
          </div>
          <div className="card-value">3,462</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Active Doctors</div>
              <div className="muted mt-1">Currently on duty</div>
            </div>
            <span className="status-pill status-active">Live</span>
          </div>
          <div className="card-value">128</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Total Patients</div>
              <div className="muted mt-1">Across all departments</div>
            </div>
          </div>
          <div className="card-value">982</div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Surgeries Today</div>
              <div className="muted mt-1">Scheduled & completed</div>
            </div>
          </div>
          <div className="card-value">24</div>
        </div>

      </div>
      
      <div className="grid grid-2">
        <div className="card">
            <div className="card-header">
                <div>
                    <div className="card-title">Recent Patient Admissions</div>
                    <div className="muted mt-1">Latest admitted patients</div>
                </div>
            </div>
            <div className="table-container">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Department</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="author-name">Sarah Jenkins</td>
                            <td className="muted">Cardiology</td>
                            <td><span className="status-pill status-active">Admitted</span></td>
                        </tr>
                        <tr>
                            <td className="author-name">Michael Chang</td>
                            <td className="muted">Neurology</td>
                            <td><span className="status-pill status-active">Admitted</span></td>
                        </tr>
                        <tr>
                            <td className="author-name">Emma Watson</td>
                            <td className="muted">Pediatrics</td>
                            <td><span className="badge-soft">Discharged</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className="card">
            <div className="card-header">
                <div>
                    <div className="card-title">Available Doctors</div>
                    <div className="muted mt-1">Currently on-call specialists</div>
                </div>
            </div>
            <div className="table-container">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Specialty</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="flex-author">
                                <div className="header-avatar" style={{width: '32px', height: '32px', fontSize: '0.8rem'}}>JS</div>
                                <div className="author-info">
                                    <span className="author-name">Dr. John Smith</span>
                                </div>
                            </td>
                            <td className="muted">Cardiologist</td>
                            <td><span className="status-pill status-active">Available</span></td>
                        </tr>
                        <tr>
                            <td className="flex-author">
                                <div className="header-avatar" style={{width: '32px', height: '32px', fontSize: '0.8rem', background: 'var(--accent)'}}>AL</div>
                                <div className="author-info">
                                    <span className="author-name">Dr. Alice Lee</span>
                                </div>
                            </td>
                            <td className="muted">Neurologist</td>
                            <td><span className="status-pill status-active">Available</span></td>
                        </tr>
                        <tr>
                            <td className="flex-author">
                                <div className="header-avatar" style={{width: '32px', height: '32px', fontSize: '0.8rem', background: 'var(--warning)'}}>RB</div>
                                <div className="author-info">
                                    <span className="author-name">Dr. Robert Brown</span>
                                </div>
                            </td>
                            <td className="muted">Pediatrician</td>
                            <td><span className="badge-soft">In Surgery</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}
