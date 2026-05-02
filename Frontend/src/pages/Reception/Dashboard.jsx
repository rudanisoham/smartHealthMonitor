import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  Users, 
  Layers,
  ChevronRight,
  User,
  ArrowRight
} from 'lucide-react';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Awaiting Assignment', value: '12', subtext: 'Patients in queue', color: '#f59e0b', icon: <Clock /> },
    { label: "Today's Appointments", value: '28', subtext: 'Scheduled for today', color: '#3b82f6', icon: <Calendar /> },
    { label: 'Total Appointments', value: '154', subtext: 'All time', color: '#10b981', icon: <Layers /> },
    { label: 'Total Patients', value: '432', subtext: 'Registered', color: '#6366f1', icon: <Users /> },
  ];

  const pendingQueue = [
    { id: '1', name: 'John Smith', email: 'john.smith@email.com', time: '10:30 AM' },
    { id: '2', name: 'Sarah Wilson', email: 'sarah.w@email.com', time: '11:15 AM' },
    { id: '3', name: 'Michael Brown', email: 'm.brown@email.com', time: '01:45 PM' },
    { id: '4', name: 'Emily Davis', email: 'emily.d@email.com', time: '02:30 PM' },
    { id: '5', name: 'Robert Johnson', email: 'robt.j@email.com', time: '03:15 PM' },
  ];

  const bedOverview = [
    { dept: 'Cardiology', available: 5, total: 20, status: 'Available' },
    { dept: 'Neurology', available: 2, total: 15, status: 'Available' },
    { dept: 'Pediatrics', available: 0, total: 10, status: 'Full' },
    { dept: 'General Medicine', available: 8, total: 40, status: 'Available' },
    { dept: 'ICU', available: 1, total: 12, status: 'Critical' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Reception Dashboard</h1>
          <p>Appointment queue and bed overview</p>
        </div>
      </header>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
              <span className="stat-subtext">{stat.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div className="header-info">
              <h3>Appointment Queue</h3>
              <p>Patients awaiting doctor assignment</p>
            </div>
            <button className="btn-view-all" onClick={() => navigate('/reception/appointments')}>
              Manage All <ChevronRight size={16} />
            </button>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Preferred Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingQueue.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="patient-cell">
                        <div className="avatar-mini"><User size={14} /></div>
                        <div>
                          <div className="patient-name">{item.name}</div>
                          <div className="patient-email">{item.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{item.time}</td>
                    <td>
                      <button className="btn-action-primary" onClick={() => navigate(`/reception/appointments/${item.id}/assign`)}>
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="header-info">
              <h3>Bed Overview</h3>
              <p>Capacity by department</p>
            </div>
            <button className="btn-view-all" onClick={() => navigate('/reception/beds')}>
              Manage Beds <ChevronRight size={16} />
            </button>
          </div>
          <div className="list-wrapper">
            {bedOverview.map((item, index) => (
              <div key={index} className="bed-status-item">
                <div className="item-info">
                  <span className="dept-name">{item.dept}</span>
                  <span className="bed-count">{item.available} available / {item.total} total</span>
                </div>
                <div className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
          <div className="card-footer-action">
            <button className="btn-secondary-full" onClick={() => navigate('/reception/patient-entry')}>
              Assign Bed to Patient <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
