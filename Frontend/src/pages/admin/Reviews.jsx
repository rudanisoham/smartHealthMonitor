import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const Reviews = () => {
  const mockReviews = [
    { id: 1, patient: "Soham Rudani", doctor: "Dr. John Smith", rating: 5, comment: "Excellent doctor, very attentive and explained everything clearly.", date: "2026-04-01" },
    { id: 2, patient: "Neha Sharma", doctor: "Dr. Sarah Wilson", rating: 4, comment: "Great experience, wait time was a bit long though.", date: "2026-03-29" },
    { id: 3, patient: "Rohan Varma", doctor: "Dr. Mike Ross", rating: 2, comment: "Doctor was rushed and didn't answer my questions properly.", date: "2026-03-25" },
  ];

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
              {mockReviews.map((rev) => (
                <tr key={rev.id}>
                  <td style={{ fontWeight: 600 }}>{rev.patient}</td>
                  <td>{rev.doctor}</td>
                  <td>{renderStars(rev.rating)}</td>
                  <td>
                    <div style={{ maxWidth: '350px', whiteSpace: 'normal', lineHeight: 1.5, color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      {rev.comment}
                    </div>
                  </td>
                  <td className="muted" style={{ fontSize: '0.85rem' }}>{rev.date}</td>
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
