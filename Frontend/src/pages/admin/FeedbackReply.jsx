import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Mail, CheckCircle, Clock, Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminFeedbackById, replyAdminFeedback } from '../../utils/api';

const FeedbackReply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await getAdminFeedbackById(id);
        setMessage(res.data.data);
        if (res.data.data.reply) {
          setReply(res.data.data.reply);
        }
      } catch (err) {
        console.error("Failed to fetch feedback message", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await replyAdminFeedback(id, { reply });
      alert("Reply sent successfully!");
      navigate('/admin/feedback');
    } catch (err) {
      alert("Failed to send reply");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <AdminLayout>
      <div style={{padding: '5rem', textAlign: 'center'}}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
  );

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
              <Clock size={14} /> Submitted on {new Date(message.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="card">
          {message.status === 'PENDING' ? (
            <>
              <h3 className="section-title mb-4">Compose Reply</h3>
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label className="form-label">Response Text</label>
                  <textarea 
                    className="form-control" 
                    rows="10" 
                    placeholder="Type your response here..." 
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" disabled={submitting} className="btn btn-primary w-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  {submitting ? <Loader className="animate-spin" size={18} /> : <Send size={18} />}
                  Send Response Email
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
                    {message.reply}
                  </div>
                </div>
                <div className="chip-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                  <CheckCircle size={16} /> Replied on {new Date(message.repliedAt).toLocaleString()}
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
