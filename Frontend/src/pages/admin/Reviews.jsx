import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminReviews } from '../../utils/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getAdminReviews();
        setReviews(res.data.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', color: '#f59e0b', gap: '2px' }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill={i < rating ? "#f59e0b" : "none"} strokeWidth={i < rating ? 0 : 2} />
        ))}
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.25rem' }}>({rating})</span>
      </div>
    );
  };

  if (loading) return (
    <AdminLayout>
      <div style={{padding: '5rem', textAlign: 'center'}}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="section-header mb-4">
        <h1 className="section-title">Doctor Reviews</h1>
        <p className="section-subtitle">Monitor patient feedback and ratings across departments</p>
      </div>

      <div className="card">
        <h3 className="card-title mb-4">All Patient Reviews</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-4">No reviews found.</td></tr>
              ) : reviews.map((rev) => (
                <tr key={rev._id}>
                  <td style={{ fontWeight: 600 }}>{rev.patient?.user?.fullName || 'Anonymous'}</td>
                  <td>{rev.doctor?.fullName || 'Dr. Not Found'}</td>
                  <td>{renderStars(rev.rating)}</td>
                  <td>
                    <div style={{ maxWidth: '350px', whiteSpace: 'normal', lineHeight: 1.5, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      {rev.comment}
                    </div>
                  </td>
                  <td className="muted" style={{ fontSize: '0.85rem' }}>{new Date(rev.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reviews;
