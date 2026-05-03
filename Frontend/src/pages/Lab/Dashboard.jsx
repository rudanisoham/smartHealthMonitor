import React, { useState, useEffect } from 'react';
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
import { getLabDashboard } from '../../utils/api';

const LabDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getLabDashboard();
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch lab dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);
  const stats = [
    { label: 'Samples Collected', value: data?.stats?.samplesCollected || 0, icon: <FlaskConical />, color: 'blue', trend: 'Latest' },
    { label: 'Pending Tests', value: data?.stats?.pendingTests || 0, icon: <Activity />, color: 'yellow', trend: 'In Queue' },
    { label: 'Reports Ready', value: data?.stats?.reportsReady || 0, icon: <CheckCircle />, color: 'emerald', trend: 'To be signed' },
    { label: 'Turnaround Time', value: data?.stats?.turnaroundTime || 'N/A', icon: <Clock />, color: 'purple', trend: 'Average' },
  ];

  const recentRequests = data?.recentRequests || [];

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard...</div>;

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
                  <tr key={req._id}>
                    <td><strong>{req._id.slice(-6).toUpperCase()}</strong></td>
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
