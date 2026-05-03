import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Mail, CheckCircle, Clock } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const FeedbackReply = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const message = {
    id: id || 1,
    fullName: "Soham Rudani",
    email: "rudanisoham1@gmail.com",
    subject: "Appointment Query",
    message: "I would like to know if Dr. John is available this Saturday for a follow-up consultation. I've been experiencing mild symptoms again.",
    createdAt: "2026-04-01 10:45",
    status: id === "2" ? "REPLIED" : "PENDING",
    adminReply: id === "2" ? "Yes, Dr. John is available from 10 AM to 2 PM this Saturday. Please book via the portal." : null,
    repliedAt: id === "2" ? "2026-04-01 14:30" : null
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back to List
        </button>
      </div>

      <div className="grid grid-2" style={{ gap: '2rem' }}>
        <div className="card">
          <h3 className="section-title mb-4">Original Message</h3>
          <div className="mt-4">
            <div className="form-group mb-4">
              <label className="form-label">Sender</label>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{message.fullName}</div>
              <div className="muted">{message.email}</div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">Subject</label>
              <div style={{ fontWeight: 600 }}>{message.subject}</div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">Content</label>
              <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)', lineHeight: 1.6 }}>
                {message.message}
              </div>
            </div>
            <div className="muted" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} /> Submitted on {message.createdAt}
            </div>
          </div>
        </div>

        <div className="card">
          {message.status === 'PENDING' ? (
            <>
              <h3 className="section-title mb-4">Compose Reply</h3>
              <form className="mt-4">
                <div className="form-group mb-4">
                  <label className="form-label">Response Text</label>
                  <textarea className="form-control" rows="10" placeholder="Type your response here..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Send size={18} /> Send Response Email
                </button>
              </form>
            </>
          ) : (
            <>
              <h3 className="section-title mb-4">Reply Details</h3>
              <div className="mt-4">
                <div className="form-group mb-4">
                  <label className="form-label">Sent Response</label>
                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--success)', lineHeight: 1.6 }}>
                    {message.adminReply}
                  </div>
                </div>
                <div className="chip-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                  <CheckCircle size={16} /> Replied on {message.repliedAt}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default FeedbackReply;
