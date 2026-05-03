import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Trash2, Reply, Eye, Clock, CheckCircle } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const FeedbackList = () => {
  const mockFeedback = [
    { id: 1, fullName: "Soham Rudani", email: "rudanisoham1@gmail.com", subject: "Appointment Query", status: "PENDING", date: "2026-04-01 10:45" },
    { id: 2, fullName: "Neha Sharma", email: "neha@gmail.com", subject: "Lab Report Issue", status: "REPLIED", date: "2026-03-30 15:20" },
    { id: 3, fullName: "Rohan Varma", email: "rohan@yahoo.com", subject: "New Department Request", status: "PENDING", date: "2026-03-28 09:15" },
  ];

  return (
    <AdminLayout>
      <div className="section-header mb-4">
        <h1 className="section-title">Feedback & Inquiries</h1>
        <p className="section-subtitle">Manage messages from visitors and patients</p>
      </div>

      <div className="card">
        <div className="card-header border-bottom pb-4 mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="card-title">All Messages</h3>
            <p className="muted text-sm">Ordered by most recent</p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Sender</th>
                <th>Subject</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockFeedback.map((msg) => (
                <tr key={msg.id}>
                  <td>
                    {msg.status === 'PENDING' ? (
                      <span className="chip-warning" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', width: 'fit-content' }}>
                        <Clock size={12} /> PENDING
                      </span>
                    ) : (
                      <span className="chip-success" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', width: 'fit-content' }}>
                        <CheckCircle size={12} /> REPLIED
                      </span>
                    )}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{msg.fullName}</div>
                    <div className="muted" style={{ fontSize: '0.8rem' }}>{msg.email}</div>
                  </td>
                  <td>{msg.subject}</td>
                  <td className="muted">{msg.date}</td>
                  <td className="text-right">
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <Link to={`/admin/feedback/${msg.id}`} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {msg.status === 'PENDING' ? <Reply size={14} /> : <Eye size={14} />}
                        {msg.status === 'PENDING' ? 'Reply' : 'View'}
                      </Link>
                      <button className="btn-icon" style={{ color: '#ef4444' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
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

export default FeedbackList;
