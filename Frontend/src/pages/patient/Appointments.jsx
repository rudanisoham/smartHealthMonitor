import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    
    // Mock data
    const specialties = ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine'];
    const departments = ['Heart Center', 'Brain Institute', 'Bone & Joint', 'Outpatient'];
    const doctors = [
        { id: '1', name: 'Dr. Sarah Jenkins', specialty: 'Cardiology', dept: 'Heart Center', bio: 'Expert in heart conditions with 15+ years experience.', exp: '15', rating: '4.8', availableDays: 'Monday,Wednesday,Friday' },
        { id: '2', name: 'Dr. Michael Chen', specialty: 'Neurology', dept: 'Brain Institute', bio: 'Specialist in neurological disorders.', exp: '12', rating: '4.9', availableDays: 'Tuesday,Thursday' }
    ];

    useEffect(() => {
        const stored = localStorage.getItem('appointments_history');
        if (stored) {
            setAppointments(JSON.parse(stored));
        } else {
            const initial = [
                { id: 1, doctor: 'Dr. Sarah Jenkins', status: 'CONFIRMED', date: '2026-05-10', time: '10:00 AM', notes: 'Routine checkup' },
                { id: 2, doctor: 'Dr. Michael Chen', status: 'COMPLETED', date: '2026-04-15', time: '02:30 PM', notes: 'Headaches' }
            ];
            setAppointments(initial);
            localStorage.setItem('appointments_history', JSON.stringify(initial));
        }
    }, []);

    const handleSelectDoctor = (doc) => {
        setSelectedDoctor(doc);
        setSearchQuery(doc ? doc.name : '');
        setShowDropdown(false);
    };

    const handleBook = (e) => {
        e.preventDefault();
        const newAppt = {
            id: Date.now(),
            doctor: selectedDoctor ? selectedDoctor.name : 'To be assigned',
            status: 'AWAITING_ASSIGNMENT',
            date: document.getElementById('preferredDate').value,
            time: document.getElementById('preferredDateNote').value,
            notes: document.getElementById('notes').value
        };
        const updated = [newAppt, ...appointments];
        setAppointments(updated);
        localStorage.setItem('appointments_history', JSON.stringify(updated));
        
        // Reset
        setSelectedDoctor(null);
        setSearchQuery('');
        e.target.reset();
        alert('Appointment requested successfully!');
    };

    const filteredDoctors = doctors.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialty.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
            <style>{`
                @media (min-width: 1024px) {
                    .main-booking-layout { grid-template-columns: 2fr 1fr !important; }
                }
                @media (max-width: 600px) {
                    .filter-row { grid-template-columns: 1fr !important; }
                }
                .preview-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; transition: all 0.3s; position: sticky; top: 2rem; }
                .preview-card-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 2rem; text-align: center; color: #94a3b8; border: 2px dashed #e2e8f0; border-radius: 16px; min-height: 400px; background: #f8fafc; }
                .preview-avatar { width: 100px; height: 100px; border-radius: 50%; background: #1e293b; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2.5rem; color: #cbd5e1; font-weight: 700; }
                
                .searchable-dropdown { position: relative; }
                .dropdown-list { position: absolute; top: calc(100% + 5px); left: 0; right: 0; background: white; border: 1px solid #e2e8f0; border-radius: 16px; max-height: 320px; overflow-y: auto; z-index: 1000; box-shadow: 0 15px 40px -10px rgba(0, 0, 0, 0.12), 0 10px 20px -10px rgba(0, 0, 0, 0.08); display: block; }
                .dropdown-item { padding: 0.9rem 1.25rem; cursor: pointer; border-bottom: 1px solid #f8fafc; }
                .dropdown-item:hover { background: #f1f5f9; }
                .dropdown-item-title { font-weight: 700; color: #1e293b; font-size: 0.95rem; }
                .dropdown-item-subtitle { color: #64748b; font-size: 0.8rem; margin-top: 0.15rem; }
                .form-control { border-radius: 12px !important; }
            `}</style>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'start' }} className="main-booking-layout">
                {/* Left: Booking Form */}
                <div className="card" style={{ margin: 0 }}>
                    <div className="section-title">Request an Appointment</div>
                    <p className="section-subtitle mt-1">Fill in details and select your preferred doctor</p>

                    <form className="form-grid mt-4" onSubmit={handleBook}>
                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label>Quick Filters</label>
                            <div className="filter-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <select className="form-control">
                                    <option value="">Specialties</option>
                                    {specialties.map((s, i) => <option key={i} value={s}>{s}</option>)}
                                </select>
                                <select className="form-control">
                                    <option value="">Departments</option>
                                    {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
                                </select>
                            </div>

                            <label>Search & Select Doctor <span className="muted" style={{ fontWeight: 400, fontSize: '0.75rem' }}>(Optional)</span></label>
                            <div className="searchable-dropdown">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search by doctor name or keywords..." 
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                                    onFocus={() => setShowDropdown(true)}
                                />
                                {showDropdown && (
                                    <div className="dropdown-list">
                                        <div className="dropdown-item" onClick={() => handleSelectDoctor(null)}>
                                            <div className="dropdown-item-title">No preference</div>
                                            <div className="dropdown-item-subtitle">Assign any available doctor</div>
                                        </div>
                                        {filteredDoctors.map(doc => (
                                            <div key={doc.id} className="dropdown-item" onClick={() => handleSelectDoctor(doc)}>
                                                <div className="dropdown-item-title">{doc.name}</div>
                                                <div className="dropdown-item-subtitle">{doc.specialty} • {doc.dept}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="preferredDate">Preferred Date <span style={{ color: '#ef4444' }}>*</span></label>
                            <input id="preferredDate" className="form-control" type="date" required min={new Date().toISOString().split('T')[0]} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="preferredDateNote">Preferred Time (optional)</label>
                            <input id="preferredDateNote" className="form-control" type="text" placeholder="e.g. 10:00 AM" />
                        </div>

                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <label htmlFor="notes">Reason / Symptoms <span style={{ color: '#ef4444' }}>*</span></label>
                            <textarea id="notes" className="form-control" rows="3" required placeholder="Describe your concern here..."></textarea>
                        </div>

                        <div className="form-group" style={{ gridColumn: '1/-1' }}>
                            <button className="btn btn-primary w-full" type="submit">Confirm & Request Appointment</button>
                        </div>
                    </form>
                </div>

                {/* Right: Doctor Preview Panel */}
                <div>
                    {!selectedDoctor ? (
                        <div className="preview-card-placeholder">
                            <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>👨‍⚕️</div>
                            <p style={{ fontWeight: 600, color: '#64748b' }}>Select a doctor</p>
                            <p style={{ fontSize: '0.85rem' }}>To view their profile summary and patient ratings</p>
                        </div>
                    ) : (
                        <div className="preview-card">
                            <div style={{ background: 'linear-gradient(135deg, #1e293b, #334155)', padding: '2rem 1.5rem', textAlign: 'center' }}>
                                <div className="preview-avatar">{selectedDoctor.name.charAt(4)}</div>
                                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{selectedDoctor.name}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{selectedDoctor.specialty}</p>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.1rem' }}>★ {selectedDoctor.rating}</div>
                                        <div className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Rating</div>
                                    </div>
                                    <div style={{ width: '1px', background: '#e2e8f0' }}></div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: '#1e293b', fontWeight: 700, fontSize: '1.1rem' }}>{selectedDoctor.exp} Yrs</div>
                                        <div className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Experience</div>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>About Doctor</p>
                                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, height: '4.5rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                        {selectedDoctor.bio}
                                    </p>
                                </div>
                                <button 
                                    className="btn btn-outline w-full mt-3" 
                                    onClick={() => navigate(`/patient/doctor-profile/${selectedDoctor.id}`)}
                                    type="button"
                                >
                                    View Full Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Appointments List */}
            <div className="card mt-4">
                <div className="section-title">Your Appointments</div>
                <div className="table-container mt-3">
                    <table>
                        <thead>
                            <tr>
                                <th>Date & Token</th>
                                <th>Doctor</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? appointments.map((appt) => (
                                <tr key={appt.id}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{appt.date} {appt.time}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{appt.doctor}</div>
                                    </td>
                                    <td>
                                        {appt.status === 'AWAITING_ASSIGNMENT' && <span className="chip-warning">Awaiting</span>}
                                        {appt.status === 'CONFIRMED' && <span className="chip">Confirmed</span>}
                                        {appt.status === 'CANCELLED' && <span className="chip-danger">Cancelled</span>}
                                        {appt.status === 'COMPLETED' && <span className="chip-neutral">Completed</span>}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            {appt.status === 'COMPLETED' && (
                                                <button 
                                                    className="btn btn-primary btn-sm" 
                                                    onClick={() => navigate(`/patient/write-review/${appt.id}`)}
                                                >
                                                    Rate / Review
                                                </button>
                                            )}
                                            {appt.status !== 'CANCELLED' && appt.status !== 'COMPLETED' && (
                                                <button className="btn btn-outline btn-sm" onClick={() => {
                                                    if(window.confirm('Cancel?')) {
                                                        const up = appointments.map(a => a.id === appt.id ? {...a, status: 'CANCELLED'} : a);
                                                        setAppointments(up);
                                                        localStorage.setItem('appointments_history', JSON.stringify(up));
                                                    }
                                                }}>Cancel</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="muted" style={{ textAlign: 'center', padding: '2rem' }}>No appointments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Close dropdown on outside click helper */}
            {showDropdown && <div style={{ position: 'fixed', inset: 0, zIndex: 999 }} onClick={() => setShowDropdown(false)}></div>}
        </>
    );
};

export default Appointments;
