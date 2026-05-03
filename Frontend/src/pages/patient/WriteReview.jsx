import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const WriteReview = () => {
    const navigate = useNavigate();
    const { appointmentId } = useParams();
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Review submitted successfully!');
        navigate('/patient/appointments');
    };

    return (
        <div style={{ padding: '2rem 0' }}>
            <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm mb-4">
                <i className="fas fa-arrow-left" style={{ marginRight: '0.5rem' }}></i> Cancel
            </button>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>Rate your experience</h2>
                <p className="muted" style={{ marginBottom: '1.5rem' }}>Appointment with <strong>Dr. John Doe</strong></p>

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
                                        required
                                        onChange={() => setRating(num)}
                                    />
                                    <label
                                        htmlFor={`star${num}`}
                                        title={`${num} stars`}
                                        style={{ color: rating >= num ? '#f59e0b' : '#cbd5e1', cursor: 'pointer', transition: 'color 0.2s' }}
                                        onMouseEnter={(e) => {
                                            // Simple hover effect logic would go here if needed
                                        }}
                                    >
                                        ★
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="comment">Write your review <span style={{ color: '#ef4444' }}>*</span></label>
                        <textarea
                            id="comment"
                            className="form-control"
                            rows="4"
                            required
                            placeholder="How was the consultation? Did the doctor explain things clearly?"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" style={{ padding: '1rem', fontSize: '1rem' }}>Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default WriteReview;
