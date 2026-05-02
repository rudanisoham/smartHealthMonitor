import React, { useState, useEffect } from 'react';

const Reminders = () => {
    const [preferences, setPreferences] = useState({
        enabled: true,
        morning: '08:00',
        afternoon: '13:00',
        night: '21:00'
    });

    const [customReminders, setCustomReminders] = useState([
        { id: 1, title: 'Drink Water', type: 'DAILY', time: '10:00' },
        { id: 2, title: 'Evening Walk', type: 'DAILY', time: '18:00' }
    ]);

    const activeMedicines = [
        { id: 1, name: 'Paracetamol', dosage: '500mg', timing: '1-0-1', doctor: 'John Doe', endDate: '2023-11-05' },
        { id: 2, name: 'Amoxicillin', dosage: '250mg', timing: '1-1-1', doctor: 'Jane Smith', endDate: '2023-10-30' }
    ];

    const handleSavePreferences = (e) => {
        e.preventDefault();
        alert('Preferences saved successfully!');
    };

    const handleAddReminder = (e) => {
        e.preventDefault();
        alert('Reminder added successfully!');
    };

    const deleteReminder = (id) => {
        setCustomReminders(customReminders.filter(r => r.id !== id));
    };

    const renderTimingBadges = (timing) => {
        const parts = timing.split('-');
        return (
            <div style={{ display: 'flex', gap: '4px' }}>
                {parts[0] === '1' && <span className="chip-warning" style={{ fontSize: '0.7rem' }}>☀ Morning</span>}
                {parts[1] === '1' && <span className="chip-primary" style={{ fontSize: '0.7rem' }}>🌤 Afternoon</span>}
                {parts[2] === '1' && <span className="chip-neutral" style={{ fontSize: '0.7rem' }}>🌙 Night</span>}
            </div>
        );
    };

    return (
        <div className="grid grid-2">
            {/* Medicine Preferences */}
            <div className="card">
                <div className="card-header">
                    <div>
                        <div className="section-title">Medicine Timings</div>
                        <div className="section-subtitle">Set your preferred times for automated medicine reminders</div>
                    </div>
                </div>
                <form onSubmit={handleSavePreferences} className="mt-2">
                    <div className="form-group mb-3">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={preferences.enabled} onChange={(e) => setPreferences({...preferences, enabled: e.target.checked})} />
                            <strong>Enable automated medicine reminders</strong>
                        </label>
                        <div className="muted" style={{ marginLeft: '1.5rem', fontSize: '0.85rem' }}>
                            Automatically pulls medicines prescribed by your doctors and alerts you at the correct times.
                        </div>
                    </div>
                    
                    <div className="grid grid-3" style={{ gap: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Morning</label>
                            <input type="time" className="form-control" value={preferences.morning} onChange={(e) => setPreferences({...preferences, morning: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Afternoon</label>
                            <input type="time" className="form-control" value={preferences.afternoon} onChange={(e) => setPreferences({...preferences, afternoon: e.target.value})} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Night</label>
                            <input type="time" className="form-control" value={preferences.night} onChange={(e) => setPreferences({...preferences, night: e.target.value})} />
                        </div>
                    </div>
                    
                    <div className="mt-3" style={{ textAlign: 'right' }}>
                        <button type="submit" className="btn btn-primary">Save Preferences</button>
                    </div>
                </form>
            </div>

            {/* Active Medicines Detected */}
            <div className="card">
                <div className="card-header">
                    <div>
                        <div className="section-title">Active Prescribed Medicines</div>
                        <div className="section-subtitle">Medicines automatically synced from your doctor</div>
                    </div>
                </div>
                <div className="table-container mt-2">
                    <table>
                        <thead>
                            <tr>
                                <th>Medicine</th>
                                <th>Timing</th>
                                <th>Doctor</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeMedicines.map(med => (
                                <tr key={med.id}>
                                    <td><strong>{med.name}</strong><br/><small className="muted">{med.dosage}</small></td>
                                    <td>{renderTimingBadges(med.timing)}</td>
                                    <td>Dr. {med.doctor}</td>
                                    <td>{med.endDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Custom Reminder */}
            <div className="card mt-4">
                <div className="card-header">
                    <div>
                        <div className="section-title">Add Custom Reminder</div>
                        <div className="section-subtitle">Water, exercise, or custom health notes</div>
                    </div>
                </div>
                <form onSubmit={handleAddReminder} className="mt-2">
                    <div className="form-group mb-3">
                        <label className="form-label">Reminder Title</label>
                        <input type="text" className="form-control" placeholder="e.g., Drink Water" required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Description (Optional)</label>
                        <textarea className="form-control" rows="2" placeholder="Any extra notes..."></textarea>
                    </div>
                    <div className="grid grid-2" style={{ gap: '1rem' }}>
                        <div className="form-group mb-3">
                            <label className="form-label">Type</label>
                            <select className="form-control" required>
                                <option value="DAILY">Every Day</option>
                                <option value="ONE_TIME">One Time</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Time</label>
                            <input type="time" className="form-control" required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Reminder</button>
                </form>
            </div>

            {/* Custom Reminders List */}
            <div className="card mt-4">
                <div className="card-header">
                    <div>
                        <div className="section-title">Your Custom Reminders</div>
                        <div className="section-subtitle">Active manual reminders</div>
                    </div>
                </div>
                <div className="table-container mt-2">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customReminders.map(rem => (
                                <tr key={rem.id}>
                                    <td><strong>{rem.title}</strong></td>
                                    <td><span className="chip-neutral">{rem.type}</span></td>
                                    <td><strong>{rem.time}</strong></td>
                                    <td>
                                        <button onClick={() => deleteReminder(rem.id)} className="btn btn-danger btn-sm" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: '#ef4444', color: 'white' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reminders;
