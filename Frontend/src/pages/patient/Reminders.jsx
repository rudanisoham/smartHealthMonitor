import React, { useState, useEffect } from 'react';
import { getPatientMe, updatePatientMe } from '../../utils/api';
import { Loader, Bell, Clock, Plus, CheckCircle } from 'lucide-react';

const Reminders = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [preferences, setPreferences] = useState({
        enabled: true,
        morning: '08:00',
        afternoon: '13:00',
        night: '21:00'
    });

    const [customReminders, setCustomReminders] = useState([]);
    const [newReminder, setNewReminder] = useState({ title: '', time: '' });

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            setLoading(true);
            const res = await getPatientMe();
            if (res.data.success) {
                const patient = res.data.data;
                // Load reminders from patient profile if they exist
                if (patient.reminderPreferences) {
                    setPreferences(patient.reminderPreferences);
                }
                if (patient.customReminders) {
                    setCustomReminders(patient.customReminders);
                }
            }
        } catch (err) {
            console.error('Error fetching reminders:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSavePreferences = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updatePatientMe({
                reminderPreferences: preferences,
                customReminders: customReminders
            });
            setSuccessMsg('Preferences saved to database!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error('Error saving preferences:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleAddReminder = (e) => {
        e.preventDefault();
        if (!newReminder.title || !newReminder.time) return;
        const updated = [...customReminders, { id: Date.now(), ...newReminder, type: 'DAILY' }];
        setCustomReminders(updated);
        setNewReminder({ title: '', time: '' });
    };

    const handleDeleteReminder = (id) => {
        setCustomReminders(customReminders.filter(r => r.id !== id));
    };

    if (loading) {
        return (
            <div className="admin-content flex justify-center items-center" style={{ minHeight: '400px' }}>
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <>
            {successMsg && (
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(52,211,153,0.15)', border: '1px solid #34d399', borderRadius: '8px', color: '#10b981', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={18} /> {successMsg}
                </div>
            )}

            <div className="grid grid-2">
                {/* Medicine Reminder Preferences */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="section-title"><Bell size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Reminder Settings</div>
                            <div className="section-subtitle">Configure your daily medicine reminder times — saved to database</div>
                        </div>
                    </div>

                    <form onSubmit={handleSavePreferences} className="mt-4">
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={preferences.enabled}
                                    onChange={(e) => setPreferences({ ...preferences, enabled: e.target.checked })}
                                />
                                <span style={{ fontWeight: 600 }}>Enable Medicine Reminders</span>
                            </label>
                        </div>

                        <div className="form-grid form-2">
                            <div className="form-group">
                                <label>Morning Time</label>
                                <input type="time" className="form-control" value={preferences.morning} onChange={(e) => setPreferences({ ...preferences, morning: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Afternoon Time</label>
                                <input type="time" className="form-control" value={preferences.afternoon} onChange={(e) => setPreferences({ ...preferences, afternoon: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Night Time</label>
                                <input type="time" className="form-control" value={preferences.night} onChange={(e) => setPreferences({ ...preferences, night: e.target.value })} />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mt-4" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Preferences'}
                        </button>
                    </form>
                </div>

                {/* Custom Reminders */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <div className="section-title"><Clock size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />Custom Reminders</div>
                            <div className="section-subtitle">Add personal health reminders</div>
                        </div>
                        <span className="chip-neutral">{customReminders.length} active</span>
                    </div>

                    <form onSubmit={handleAddReminder} className="mt-4" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Reminder Title</label>
                            <input type="text" className="form-control" placeholder="e.g. Drink Water" value={newReminder.title} onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })} required />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Time</label>
                            <input type="time" className="form-control" value={newReminder.time} onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })} required />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ height: '42px' }}>
                            <Plus size={16} />
                        </button>
                    </form>

                    <div className="mt-4">
                        {customReminders.length > 0 ? customReminders.map(r => (
                            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                <div>
                                    <strong>{r.title}</strong>
                                    <div className="muted" style={{ fontSize: '0.8rem' }}>{r.type} at {r.time}</div>
                                </div>
                                <button className="btn btn-outline btn-sm" onClick={() => handleDeleteReminder(r.id)} style={{ color: '#ef4444', borderColor: '#fecaca' }}>Remove</button>
                            </div>
                        )) : (
                            <p className="muted text-center py-4">No custom reminders yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reminders;
