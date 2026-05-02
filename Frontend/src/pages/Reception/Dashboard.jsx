import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  Users, 
  Layers,
  ChevronRight,
  User,
  ArrowRight,
  MoreVertical
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Awaiting Assignment', value: '12', subtext: 'Patients in queue', color: '#f59e0b', icon: <Clock size={22} /> },
    { label: "Today's Appointments", value: '28', subtext: 'Scheduled for today', color: '#3b82f6', icon: <Calendar size={22} /> },
    { label: 'Total Appointments', value: '154', subtext: 'All time records', color: '#10b981', icon: <Layers size={22} /> },
    { label: 'Total Patients', value: '432', subtext: 'Registered in system', color: '#6366f1', icon: <Users size={22} /> },
  ];

  const pendingQueue = [
    { id: '1', name: 'John Smith', email: 'john.smith@email.com', time: '10:30 AM', dept: 'Cardiology' },
    { id: '2', name: 'Sarah Wilson', email: 'sarah.w@email.com', time: '11:15 AM', dept: 'General Medicine' },
    { id: '3', name: 'Michael Brown', email: 'm.brown@email.com', time: '01:45 PM', dept: 'Neurology' },
    { id: '4', name: 'Emily Davis', email: 'emily.d@email.com', time: '02:30 PM', dept: 'Pediatrics' },
    { id: '5', name: 'Robert Johnson', email: 'robt.j@email.com', time: '03:15 PM', dept: 'Cardiology' },
  ];

  const bedOverview = [
    { dept: 'Cardiology', available: 5, total: 20, status: 'Available', percent: 75 },
    { dept: 'Neurology', available: 2, total: 15, status: 'Limited', percent: 86 },
    { dept: 'Pediatrics', available: 0, total: 10, status: 'Full', percent: 100 },
    { dept: 'General Medicine', available: 8, total: 40, status: 'Available', percent: 80 },
    { dept: 'ICU', available: 1, total: 12, status: 'Critical', percent: 92 },
  ];

  return (
    <div className="admin-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Reception Dashboard</h2>
          <p className="section-subtitle">Real-time overview of patient queue and hospital capacity</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/reception/patient-entry')}>
          <UserPlus size={18} /> New Patient Entry
        </button>
      </div>

      <div className="grid grid-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="card-header">
              <span className="card-title">{stat.label}</span>
              <div style={{ color: stat.color }}>{stat.icon}</div>
            </div>
            <div className="card-value">{stat.value}</div>
            <span className="muted">{stat.subtext}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Pending Appointment Queue</h3>
            <button className="btn-icon" onClick={() => navigate('/reception/appointments')}>
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="table-container" style={{ border: 'none', marginTop: '0' }}>
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Department</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingQueue.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="flex-author">
                        <div className="header-avatar" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                          {item.name.charAt(0)}
                        </div>
                        <div className="author-info">
                          <span className="author-name" style={{ fontSize: '0.85rem' }}>{item.name}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge-soft">{item.dept}</span></td>
                    <td><span className="muted">{item.time}</span></td>
                    <td>
                      <button className="btn-icon" title="Assign Doctor">
                        <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Hospital Bed Occupancy</h3>
            <button className="btn-icon" onClick={() => navigate('/reception/beds')}>
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="mt-4">
            {bedOverview.map((item, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="author-name">{item.dept}</span>
                    <span className="muted" style={{ marginLeft: '1rem', fontSize: '0.8rem' }}>
                      {item.available} beds left / {item.total} total
                    </span>
                  </div>
                  <span className={`chip ${item.status === 'Full' ? 'chip-danger' : item.status === 'Critical' ? 'chip-danger' : item.status === 'Limited' ? 'chip-warning' : ''}`}>
                    {item.status}
                  </span>
                </div>
                <div className="progress-bar-bg" style={{ height: '8px' }}>
                  <div 
                    className={`progress-bar-fill ${item.percent > 90 ? 'danger' : item.percent > 70 ? 'warning' : 'success'}`} 
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal icon component
const UserPlus = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <line x1="19" y1="8" x2="19" y2="14"></line>
    <line x1="16" y1="11" x2="22" y2="11"></line>
  </svg>
);

export default Dashboard;
