import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Trash2, Reply, Eye, Clock, CheckCircle, Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminFeedback } from '../../utils/api';

const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await getAdminFeedback();
        setFeedback(res.data.data);
      } catch (err) {
        console.error("Failed to fetch feedback", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  if (loading) return (
    <AdminLayout>
      <div style={{padding: '5rem', textAlign: 'center'}}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
  );

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
              {feedback.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-4">No feedback messages found.</td></tr>
              ) : feedback.map((msg) => (
                <tr key={msg._id}>
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
                  <td className="muted">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="text-right">
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <Link to={`/admin/feedback/${msg._id}/reply`} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {msg.status === 'PENDING' ? <Reply size={14} /> : <Eye size={14} />}
                        {msg.status === 'PENDING' ? 'Reply' : 'View'}
                      </Link>
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
