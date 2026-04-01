import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronDown, Trash2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import '../../styles/Appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [booking, setBooking] = useState({
        doctorId: '',
        date: '',
        time: '',
        reason: ''
    });
    const [statusMessage, setStatusMessage] = useState(null);

    const doctors = [
        { id: '1', name: 'Dr. Renish', specialty: 'Neurology' },
        { id: '2', name: 'Dr. Smith', specialty: 'Cardiology' },
        { id: '3', name: 'Dr. Sarah', specialty: 'General Medicine' },
        { id: '4', name: 'Dr. Manoj', specialty: 'Dermatology' }
    ];

    useEffect(() => {
        const stored = localStorage.getItem('appointments_history');
        if (stored) {
            setAppointments(JSON.parse(stored));
        } else {
            const initial = [
                { id: 1, date: '2026-04-02', time: '15:41', doctor: 'Dr. Renish', specialty: 'Neurology', status: 'COMPLETED' }
            ];
            setAppointments(initial);
            localStorage.setItem('appointments_history', JSON.stringify(initial));
        }
    }, []);

    const handleBook = () => {
        if (!booking.doctorId || !booking.date || !booking.time) {
            setStatusMessage({ type: 'error', text: 'Please fill all required fields.' });
            return;
        }

        // Past date check
        const selectedDate = new Date(`${booking.date}T${booking.time}`);
        const now = new Date();
        if (selectedDate < now) {
            setStatusMessage({ type: 'error', text: 'Cannot book appointments in the past.' });
            return;
        }

        const doctor = doctors.find(d => d.id === booking.doctorId);

        const newApp = {
            id: Date.now(),
            date: booking.date,
            time: booking.time,
            doctor: doctor.name,
            specialty: doctor.specialty,
            status: 'BOOKED',
            reason: booking.reason
        };

        const updated = [newApp, ...appointments];
        setAppointments(updated);
        localStorage.setItem('appointments_history', JSON.stringify(updated));

        // Reset form and show success
        setBooking({ doctorId: '', date: '', time: '', reason: '' });
        setStatusMessage({ type: 'success', text: 'Appointment booked successfully!' });

        setTimeout(() => setStatusMessage(null), 3000);
    };

    const handleCancel = (id) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            const updated = appointments.filter(a => a.id !== id);
            setAppointments(updated);
            localStorage.setItem('appointments_history', JSON.stringify(updated));
        }
    };

    const handleComplete = (id) => {
        const updated = appointments.map(app =>
            app.id === id ? { ...app, status: 'COMPLETED' } : app
        );
        setAppointments(updated);
        localStorage.setItem('appointments_history', JSON.stringify(updated));
    };

    return (
        <div className="appointments-container">
            <div className="appointments-grid">

                {/* Left Panel: Book Appointment */}
                <div className="booking-panel">
                    <div className="panel-header-simple">
                        <div className="header-icon-wrap">
                            <CalendarIcon size={24} className="text-blue-primary" />
                        </div>
                        <div>
                            <h2>Book Appointment</h2>
                            <p>Choose your doctor and preferred slot</p>
                        </div>
                    </div>

                    {statusMessage && (
                        <div className={`status-banner ${statusMessage.type}`}>
                            {statusMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            {statusMessage.text}
                        </div>
                    )}

                    <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Select Doctor*</label>
                            <div className="custom-select-wrapper">
                                <select
                                    className="custom-select"
                                    value={booking.doctorId}
                                    onChange={(e) => setBooking({ ...booking, doctorId: e.target.value })}
                                >
                                    <option value="" disabled>-- Choose a Doctor --</option>
                                    {doctors.map(d => (
                                        <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="select-icon" />
                            </div>
                        </div>

                        <div className="form-row-multi">
                            <div className="form-group">
                                <label>Date*</label>
                                <div className="input-with-icon">
                                    <input
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                        value={booking.date}
                                        onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Time*</label>
                                <div className="input-with-icon">
                                    <input
                                        type="time"
                                        value={booking.time}
                                        onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Reason for Visit</label>
                            <textarea
                                className="notes-textarea"
                                placeholder="Describe your health concern..."
                                value={booking.reason}
                                onChange={(e) => setBooking({ ...booking, reason: e.target.value })}
                            ></textarea>
                        </div>

                        <button type="button" className="btn-book" onClick={handleBook}>
                            Confirm Booking
                        </button>
                    </form>
                </div>

                {/* Right Panel: Your Appointments */}
                <div className="history-panel">
                    <div className="panel-header-simple">
                        <div className="header-icon-wrap">
                            <Clock size={24} className="text-blue-primary" />
                        </div>
                        <div>
                            <h2>Schedule Overview</h2>
                            <p>Manage your upcoming and past consultations</p>
                        </div>
                    </div>

                    <div className="appointments-table-wrapper">
                        <table className="appointments-table">
                            <thead>
                                <tr>
                                    <th>DATE & TIME</th>
                                    <th>DOCTOR</th>
                                    <th>STATUS</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(app => (
                                    <tr key={app.id}>
                                        <td className="datetime-col">
                                            <div className="app-date">{app.date}</div>
                                            <div className="app-time">{app.time}</div>
                                        </td>
                                        <td>
                                            <div className="doctor-info">
                                                <span className="doc-name">{app.doctor}</span>
                                                <span className="doc-spec">{app.specialty}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-pill status-${app.status.toLowerCase()}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="actions-col">
                                            <div className="action-buttons">
                                                {app.status === 'BOOKED' && (
                                                    <>
                                                        <button
                                                            className="btn-icon-success"
                                                            onClick={() => handleComplete(app.id)}
                                                            title="Mark as Completed"
                                                        >
                                                            <CheckCircle2 size={16} />
                                                        </button>
                                                        <button
                                                            className="btn-icon-danger"
                                                            onClick={() => handleCancel(app.id)}
                                                            title="Cancel Appointment"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {appointments.length === 0 && (
                            <div className="no-data-msg">
                                <CalendarIcon size={32} />
                                <p>No scheduled appointments found.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Appointments;
