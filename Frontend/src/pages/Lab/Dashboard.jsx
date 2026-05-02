import React from 'react';
import { 
  FlaskConical, 
  ClipboardList, 
  AlertCircle, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  FileText,
  UserPlus,
  Upload,
  Activity,
  History,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LabDashboard = () => {
  const stats = [
    { label: 'Samples Collected', value: '84', icon: <FlaskConical />, color: 'blue', trend: '+14 today' },
    { label: 'Pending Tests', value: '18', icon: <Activity />, color: 'yellow', trend: '5 urgent' },
    { label: 'Reports Ready', value: '12', icon: <CheckCircle />, color: 'emerald', trend: 'To be signed' },
    { label: 'Turnaround Time', value: '4.2h', icon: <Clock />, color: 'purple', trend: '-20% improvement' },
  ];

  const recentRequests = [
    { id: 'LAB-501', patient: 'Sarah Miller', test: 'Complete Blood Count', priority: 'Urgent', status: 'In Progress' },
    { id: 'LAB-502', patient: 'James Wilson', test: 'Lipid Profile', priority: 'Normal', status: 'Pending' },
    { id: 'LAB-503', patient: 'Linda Chen', test: 'Urine Analysis', priority: 'Normal', status: 'Pending' },
  ];

  return (
    <div className="lab-dashboard">
      <div className="mb-6">
        <h2 className="section-title">Laboratory Dashboard</h2>
        <p className="section-subtitle">Real-time tracking of diagnostic tests and specimen processing</p>
      </div>

      <div className="grid grid-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="card">
            <div className="card-header">
              <div className={`stat-icon ${stat.color === 'emerald' ? 'success' : stat.color}`}>
                {stat.icon}
              </div>
              <span className="badge-soft">{stat.trend}</span>
            </div>
            <div className="card-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        {/* Lab Requests Queue */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="card-title">Active Test Requests</h3>
            <Link to="/lab/patient-search" className="text-primary text-sm font-semibold">View All</Link>
          </div>
          <div className="table-container" style={{ margin: 0, border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Test Type</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req.id}>
                    <td><strong>{req.id}</strong></td>
                    <td>{req.patient}</td>
                    <td><span className="badge-soft">{req.test}</span></td>
                    <td>
                      <span className={req.priority === 'Urgent' ? 'text-danger font-bold' : 'muted'}>
                        {req.priority}
                      </span>
                    </td>
                    <td>
                      <Link to="/lab/upload-report" className="btn-icon">
                        <Upload size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="card-title mb-6">Laboratory Shortcuts</h3>
          <div className="grid grid-2 gap-4">
            <Link to="/lab/upload-report" className="btn btn-primary" style={{ padding: '1.5rem', flexDirection: 'column', gap: '0.75rem' }}>
              <Upload size={32} />
              <span>Upload Results</span>
            </Link>
            <Link to="/lab/patient-search" className="btn btn-outline" style={{ padding: '1.5rem', flexDirection: 'column', gap: '0.75rem' }}>
              <Search size={32} />
              <span>Patient Search</span>
            </Link>
            <Link to="/lab/tests" className="btn btn-outline" style={{ padding: '1.5rem', flexDirection: 'column', gap: '0.75rem' }}>
              <FlaskConical size={32} />
              <span>Test Directory</span>
            </Link>
            <Link to="/lab/history" className="btn btn-outline" style={{ padding: '1.5rem', flexDirection: 'column', gap: '0.75rem' }}>
              <History size={32} />
              <span>Report History</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card mt-8">
        <h3 className="card-title mb-6">Recent Lab Activity</h3>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-bullet"></div>
            <div className="timeline-content">
              <div>Biochemistry results verified for <strong>Patient #1024</strong></div>
              <div className="timeline-meta">By Chief Pathologist Dr. Adams • 10 mins ago</div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-bullet"></div>
            <div className="timeline-content">
              <div>New sample collected: <strong>Blood Test (CBC)</strong></div>
              <div className="timeline-meta">Patient Emma Watson • 25 mins ago</div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-bullet" style={{ background: 'var(--warning)' }}></div>
            <div className="timeline-content">
              <div>Urgent request received: <strong>Troponin Test</strong></div>
              <div className="timeline-meta">From Emergency Ward • 1 hour ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;
