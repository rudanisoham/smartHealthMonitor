import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppointments, createAppointment, getAvailableDoctors, getAdminDepartments } from '../../utils/api';
import { Loader } from 'lucide-react';

const Appointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    // Quick filters
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [apptRes, docRes, deptRes] = await Promise.all([
                getAppointments(),
                getAvailableDoctors(),
                getAdminDepartments()
            ]);
            
            if (apptRes.data.success) setAppointments(apptRes.data.data);
            if (docRes.data.success) setDoctors(docRes.data.data);
            if (deptRes.data.success) setDepartments(deptRes.data.data);
        } catch (err) {
            console.error('Error fetching initial data:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAppointments = async () => {
        try {
            const res = await getAppointments();
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching appointments:', err);
        }
    };

    const handleSelectDoctor = (doc) => {
        setSelectedDoctor(doc);
        setSearchQuery(doc ? doc.user.fullName : '');
        setShowDropdown(false);
    };

    const handleBook = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const preferredDate = document.getElementById('preferredDate').value;
            const notes = document.getElementById('notes').value;
            const preferredDateNote = document.getElementById('preferredDateNote').value;

            const appointmentData = {
                doctor: selectedDoctor?._id || undefined,
                preferredDate: preferredDate,
                preferredDateNote: preferredDateNote,
                notes: notes,
                status: 'AWAITING_ASSIGNMENT',
            };

            const res = await createAppointment(appointmentData);
            if (res.data.success) {
                await fetchAppointments();
                setSelectedDoctor(null);
                setSearchQuery('');
                e.target.reset();
                alert('Appointment requested successfully!');
            }
        } catch (err) {
            console.error('Error creating appointment:', err);
            alert('Failed to create appointment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const specialties = [...new Set(doctors.map(d => d.specialty))];

    const filteredDoctors = doctors.filter(d => {
        const nameMatch = d.user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
        const specialtyMatch = !selectedSpecialty || d.specialty === selectedSpecialty;
        const deptMatch = !selectedDept || d.department?.title === selectedDept;
        
        // Availability Match
        const dateInput = document.getElementById('preferredDate')?.value;
        let dayMatch = true;
        if (dateInput) {
            const date = new Date(dateInput);
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const selectedDay = days[date.getDay()];
            dayMatch = d.availableDays?.includes(selectedDay);
        }

        return nameMatch && specialtyMatch && deptMatch && dayMatch;
    });

    if (loading) {
        return (
            <div className="admin-content flex justify-center items-center" style={{ minHeight: '400px' }}>
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

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
                                <select className="form-control" value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
                                    <option value="">All Specialties</option>
                                    {specialties.map((s, i) => <option key={i} value={s}>{s}</option>)}
                                </select>
                                <select className="form-control" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                                    <option value="">All Departments</option>
                                    {departments.map((d, i) => <option key={i} value={d.title}>{d.title}</option>)}
                                </select>
                            </div>

                            <label>Search & Select Doctor <span className="muted" style={{ fontWeight: 400, fontSize: '0.75rem' }}>(Optional)</span></label>
                            <div className="searchable-dropdown">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search by doctor name..." 
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
                                            <div key={doc._id} className="dropdown-item" onClick={() => handleSelectDoctor(doc)}>
                                                <div className="dropdown-item-title">Dr. {doc.user.fullName}</div>
                                                <div className="dropdown-item-subtitle">{doc.specialty} • {doc.department?.title || 'General'}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="preferredDate">Preferred Date <span style={{ color: '#ef4444' }}>*</span></label>
                            <input 
                                id="preferredDate" 
                                className="form-control" 
                                type="date" 
                                required 
                                min={new Date().toISOString().split('T')[0]} 
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
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
                            <button className="btn btn-primary w-full" type="submit" disabled={submitting}>
                                {submitting ? 'Submitting...' : 'Confirm & Request Appointment'}
                            </button>
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
                                <div className="preview-avatar">{selectedDoctor.user.fullName.charAt(0)}</div>
                                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Dr. {selectedDoctor.user.fullName}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{selectedDoctor.specialty}</p>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.1rem' }}>★ 4.9</div>
                                        <div className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rating</div>
                                    </div>
                                    <div style={{ width: '1px', background: '#e2e8f0' }}></div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: '#1e293b', fontWeight: 700, fontSize: '1.1rem' }}>{selectedDoctor.experience || 0} Yrs</div>
                                        <div className="muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Experience</div>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>About Doctor</p>
                                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, height: '4.5rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                        {selectedDoctor.bio || 'Professional medical expert dedicated to patient care.'}
                                    </p>
                                </div>
                                <button 
                                    className="btn btn-outline w-full mt-3" 
                                    onClick={() => navigate(`/patient/doctor-profile/${selectedDoctor._id}`)}
                                    type="button"
                                >
                                    View Full Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Appointments List - from Database */}
            <div className="card mt-4">
                <div className="section-title">Your Appointments</div>
                <p className="section-subtitle mt-1">Fetched live from the database</p>
                <div className="table-container mt-3">
                    <table>
                        <thead>
                            <tr>
                                <th>Date & Time</th>
                                <th>Doctor</th>
                                <th>Status</th>
                                <th>Notes</th>
                                <th style={{ textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? appointments.map((appt) => (
                                <tr key={appt._id}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>
                                            {appt.preferredDate 
                                                ? new Date(appt.preferredDate).toLocaleDateString() 
                                                : appt.scheduledAt 
                                                    ? new Date(appt.scheduledAt).toLocaleString() 
                                                    : 'TBD'}
                                        </div>
                                        {appt.tokenNumber && <span className="chip" style={{ background: '#eff6ff', color: '#1d4ed8', fontWeight: 800, fontSize: '0.7rem' }}>Token #{appt.tokenNumber}</span>}
                                        {appt.preferredDateNote && <div className="muted" style={{ fontSize: '0.8rem' }}>{appt.preferredDateNote}</div>}
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>
                                            {appt.doctor?.user?.fullName ? `Dr. ${appt.doctor.user.fullName}` : 'Awaiting Assignment'}
                                        </div>
                                    </td>
                                    <td>
                                        {appt.status === 'AWAITING_ASSIGNMENT' && <span className="chip-warning">Awaiting</span>}
                                        {appt.status === 'SCHEDULED' && <span className="chip">Scheduled</span>}
                                        {appt.status === 'CONFIRMED' && <span className="chip">Confirmed</span>}
                                        {appt.status === 'IN_PROGRESS' && <span className="chip-warning">In Progress</span>}
                                        {appt.status === 'CANCELLED' && <span className="chip-danger">Cancelled</span>}
                                        {appt.status === 'COMPLETED' && <span className="chip-neutral">Completed</span>}
                                    </td>
                                    <td>
                                        <div className="muted" style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {appt.notes || '—'}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            {appt.status === 'COMPLETED' && (
                                                <button 
                                                    className="btn btn-primary btn-sm" 
                                                    onClick={() => navigate(`/patient/write-review/${appt._id}`)}
                                                >
                                                    Rate / Review
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="muted" style={{ textAlign: 'center', padding: '2rem' }}>No appointments found in the database. Book one above!</td>
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
