import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../utils/api';
import { Loader, ArrowLeft, Star } from 'lucide-react';

const WriteReview = () => {
    const navigate = useNavigate();
    const { appointmentId } = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchAppointment();
    }, [appointmentId]);

    const fetchAppointment = async () => {
        try {
            const res = await API.get(`/appointments/${appointmentId}`);
            if (res.data.success) {
                setAppointment(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching appointment:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating.');
            return;
        }

        setSubmitting(true);
        try {
            // For now, store review locally (backend review model can be added later)
            const review = {
                appointmentId,
                rating,
                comment,
                createdAt: new Date().toISOString()
            };

            // Save to localStorage as temporary store
            const existing = JSON.parse(localStorage.getItem('patient_reviews') || '[]');
            existing.push(review);
            localStorage.setItem('patient_reviews', JSON.stringify(existing));

            alert('Review submitted successfully! Thank you for your feedback.');
            navigate('/patient/appointments');
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Failed to submit review.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-content flex justify-center items-center" style={{ minHeight: '400px' }}>
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    const doctorName = appointment?.doctor?.user?.fullName 
        ? `Dr. ${appointment.doctor.user.fullName}` 
        : 'your doctor';

    return (
        <div style={{ padding: '2rem 0' }}>
            <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm mb-4">
                <ArrowLeft size={14} /> Cancel
            </button>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>Rate your experience</h2>
                <p className="muted" style={{ marginBottom: '1.5rem' }}>
                    Appointment with <strong>{doctorName}</strong>
                    {appointment?.scheduledAt && (
                        <> on {new Date(appointment.scheduledAt).toLocaleDateString()}</>
                    )}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label>Select Rating <span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end', fontSize: '2.5rem', gap: '0.25rem' }}>
                            {[5, 4, 3, 2, 1].map((num) => (
                                <React.Fragment key={num}>
                                    <input
                                        type="radio"
                                        id={`star${num}`}
                                        name="rating"
                                        value={num}
                                        style={{ display: 'none' }}
                                        onChange={() => setRating(num)}
                                    />
                                    <label
                                        htmlFor={`star${num}`}
                                        style={{
                                            cursor: 'pointer',
                                            color: rating >= num ? '#f59e0b' : '#e2e8f0',
                                            transition: 'color 0.2s',
                                        }}
                                    >
                                        ★
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                        <span className="muted" style={{ fontSize: '0.85rem' }}>{rating > 0 ? `${rating}/5 stars` : 'Click a star to rate'}</span>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="reviewComment">Your Feedback</label>
                        <textarea
                            id="reviewComment"
                            className="form-control"
                            rows="4"
                            placeholder="Share your experience with the doctor..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={submitting || rating === 0}>
                        {submitting ? 'Submitting...' : '✅ Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WriteReview;
