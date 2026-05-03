import React, { useState, useEffect } from 'react';
import { getVitals, createVital } from '../../utils/api';
import { Loader } from 'lucide-react';

const HealthData = () => {
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [newReading, setNewReading] = useState({
        heartRate: '',
        bpSystolic: '',
        bpDiastolic: '',
        spo2: '',
        temperature: '',
        weight: ''
    });

    useEffect(() => {
        fetchVitals();
    }, []);

    const fetchVitals = async () => {
        try {
            setLoading(true);
            const res = await getVitals();
            if (res.data.success) {
                setReadings(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching vitals:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e, field) => {
        setNewReading({ ...newReading, [field]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!newReading.heartRate && !newReading.bpSystolic && !newReading.spo2) return;

        setSaving(true);
        try {
            const vitalData = {};
            if (newReading.heartRate) vitalData.heartRate = Number(newReading.heartRate);
            if (newReading.bpSystolic) vitalData.bpSystolic = Number(newReading.bpSystolic);
            if (newReading.bpDiastolic) vitalData.bpDiastolic = Number(newReading.bpDiastolic);
            if (newReading.spo2) vitalData.spo2 = Number(newReading.spo2);
            if (newReading.temperature) vitalData.temperature = Number(newReading.temperature);
            if (newReading.weight) vitalData.weight = Number(newReading.weight);

            const res = await createVital(vitalData);
            if (res.data.success) {
                await fetchVitals();
                setNewReading({ heartRate: '', bpSystolic: '', bpDiastolic: '', spo2: '', temperature: '', weight: '' });
            }
        } catch (err) {
            console.error('Error saving vital:', err);
            const errorMsg = err.response?.data?.error || err.message || 'Failed to save reading.';
            alert(`Error: ${errorMsg}`);
        } finally {
            setSaving(false);
        }
    };

    const latest = readings[0] || {};

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
                .vitals-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
                .vital-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem 1.5rem; box-shadow: 0 1px 6px rgba(0,0,0,0.06); }
                .vital-card .label { font-size: 0.78rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem; font-weight: 600; }
                .vital-card .val { font-size: 2rem; font-weight: 700; color: #2563eb; line-height: 1; }
                .vital-card .val span { font-size: 0.95rem; font-weight: 400; color: #94a3b8; margin-left: 0.2rem; }
                .vital-card .empty-val { font-size: 1.5rem; color: #cbd5e1; }
                .add-form-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 6px rgba(0,0,0,0.06); }
                .add-form-card .section-title { color: #1e293b !important; }
                .add-form-card .section-subtitle { color: #64748b !important; }
                .add-form-card .history-badge { background: rgba(59,130,246,0.1); color: #2563eb; }
                .add-form-card label { color: #374151 !important; font-weight: 500; }
                .add-form-card .muted { color: #94a3b8 !important; }
                .add-form-card .text-xs { color: #94a3b8 !important; }
                .add-form-card .form-control { background: #f8fafc !important; border: 1.5px solid #e2e8f0 !important; color: #1e293b !important; border-radius: 8px; width: 100%; padding: 0.5rem 0.75rem; }
                .add-form-card .form-control::placeholder { color: #cbd5e1 !important; }
                .add-form-card .form-control:focus { border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.12) !important; outline: none !important; }
                .form-3col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
                .history-badge { display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(59,130,246,0.12); color: #60a5fa; border-radius: 6px; padding: 0.2rem 0.7rem; font-size: 0.78rem; font-weight: 600; }
                .status-ok { color: #34d399; }
                .status-warn { color: #fbbf24; }
                .status-bad { color: #f87171; }
                @media (max-width: 768px) { .vitals-grid { grid-template-columns: 1fr 1fr; } .form-3col { grid-template-columns: 1fr; } }
            `}</style>

            <div className="vitals-grid">
                <div className="vital-card">
                    <div className="label">❤ Heart Rate</div>
                    {latest.heartRate ? (
                        <div className="val">{latest.heartRate}<span>bpm</span></div>
                    ) : (
                        <div className="empty-val">—<span style={{ fontSize: '0.85rem' }}> bpm</span></div>
                    )}
                </div>
                <div className="vital-card">
                    <div className="label">🩺 Blood Pressure</div>
                    {latest.bpSystolic && latest.bpDiastolic ? (
                        <div className="val" style={{ fontSize: '1.6rem' }}>{latest.bpSystolic}/{latest.bpDiastolic}<span>mmHg</span></div>
                    ) : (
                        <div className="empty-val">—<span style={{ fontSize: '0.85rem' }}> mmHg</span></div>
                    )}
                </div>
                <div className="vital-card">
                    <div className="label">💧 SpO2</div>
                    {latest.spo2 ? (
                        <div className="val">{latest.spo2}<span>%</span></div>
                    ) : (
                        <div className="empty-val">—<span style={{ fontSize: '0.85rem' }}> %</span></div>
                    )}
                </div>
                <div className="vital-card" style={{ background: '#f0f9ff', borderColor: '#bae6fd', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.05)' }}>
                    <div className="label" style={{ color: '#0369a1', fontWeight: 800 }}>🤖 AI Insight</div>
                    <div style={{ fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5, marginTop: '0.6rem', fontWeight: 600 }}>
                        {latest.heartRate ? '"Your recent vitals indicate stable health. Keep it up!"' : <span style={{ color: '#64748b', fontWeight: 400 }}>Add a health reading to get your first AI analysis.</span>}
                    </div>
                </div>
            </div>

            <div className="add-form-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                        <div className="section-title">➕ Add Health Reading</div>
                        <div className="section-subtitle mt-1">Record your latest vitals — saved to your MongoDB health database</div>
                    </div>
                    <span className="history-badge">📊 {readings.length} readings in DB</span>
                </div>

                <form onSubmit={handleSave}>
                    <div className="form-3col">
                        <div className="form-group">
                            <label htmlFor="heartRate">Heart Rate <span className="muted">(bpm)</span></label>
                            <input id="heartRate" className="form-control" type="number" min="30" max="250" placeholder="e.g. 72" value={newReading.heartRate} onChange={(e) => handleInputChange(e, 'heartRate')} disabled={saving} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bloodPressureSys">BP Systolic <span className="muted">(mmHg)</span></label>
                            <input id="bloodPressureSys" className="form-control" type="number" min="60" max="250" placeholder="e.g. 120" value={newReading.bpSystolic} onChange={(e) => handleInputChange(e, 'bpSystolic')} disabled={saving} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bloodPressureDia">BP Diastolic <span className="muted">(mmHg)</span></label>
                            <input id="bloodPressureDia" className="form-control" type="number" min="40" max="150" placeholder="e.g. 80" value={newReading.bpDiastolic} onChange={(e) => handleInputChange(e, 'bpDiastolic')} disabled={saving} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="spo2">SpO2 <span className="muted">(%)</span></label>
                            <input id="spo2" className="form-control" type="number" step="0.1" min="80" max="100" placeholder="e.g. 98.5" value={newReading.spo2} onChange={(e) => handleInputChange(e, 'spo2')} disabled={saving} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="temperature">Temperature <span className="muted">(°C)</span></label>
                            <input id="temperature" className="form-control" type="number" step="0.1" min="35" max="42" placeholder="e.g. 37.0" value={newReading.temperature} onChange={(e) => handleInputChange(e, 'temperature')} disabled={saving} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weight">Weight <span className="muted">(kg)</span></label>
                            <input id="weight" className="form-control" type="number" step="0.1" min="1" max="300" placeholder="e.g. 70.5" value={newReading.weight} onChange={(e) => handleInputChange(e, 'weight')} disabled={saving} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem', marginTop: '0.75rem' }}>
                        <span className="text-xs text-muted">Fill at least one field · Data is saved to MongoDB</span>
                        <button className="btn btn-primary" type="submit" disabled={saving}>
                            {saving ? '💾 Saving...' : '💾 Save Reading'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="card">
                <div className="card-header">
                    <div>
                        <div className="section-title">📋 Readings History</div>
                        <div className="section-subtitle">All your saved vitals from the database — newest first</div>
                    </div>
                    <span className="chip-neutral">{readings.length} records</span>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date & Time</th>
                                <th>Heart Rate</th>
                                <th>Blood Pressure</th>
                                <th>SpO2</th>
                                <th>Temperature</th>
                                <th>Weight</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {readings.length > 0 ? readings.map((m, index) => {
                                const rowNum = index + 1;
                                let hrClass = 'status-ok';
                                if (m.heartRate > 100 || m.heartRate < 60) hrClass = 'status-warn';
                                if (m.heartRate > 120) hrClass = 'status-bad';

                                let bpClass = 'status-ok';
                                if (m.bpSystolic > 130 || m.bpSystolic < 90) bpClass = 'status-warn';
                                if (m.bpSystolic > 150) bpClass = 'status-bad';

                                let spo2Class = 'status-ok';
                                if (m.spo2 < 95) spo2Class = 'status-warn';
                                if (m.spo2 < 90) spo2Class = 'status-bad';

                                let tmpClass = 'status-ok';
                                if (m.temperature > 37.5) tmpClass = 'status-warn';
                                if (m.temperature > 38.5) tmpClass = 'status-bad';

                                return (
                                    <tr key={m._id}>
                                        <td className="muted">{rowNum}</td>
                                        <td style={{ whiteSpace: 'nowrap' }}>{new Date(m.createdAt).toLocaleString()}</td>
                                        <td>{m.heartRate ? <span className={hrClass}>{m.heartRate} bpm</span> : <span className="muted">—</span>}</td>
                                        <td>{m.bpSystolic && m.bpDiastolic ? <span className={bpClass}>{m.bpSystolic}/{m.bpDiastolic} mmHg</span> : <span className="muted">—</span>}</td>
                                        <td>{m.spo2 ? <span className={spo2Class}>{m.spo2}%</span> : <span className="muted">—</span>}</td>
                                        <td>{m.temperature ? <span className={tmpClass}>{m.temperature}°C</span> : <span className="muted">—</span>}</td>
                                        <td>{m.weight ? `${m.weight} kg` : '—'}</td>
                                        <td>
                                            {m.riskLevel === 'HIGH' && <span className="chip-danger">⚠ HIGH RISK</span>}
                                            {m.riskLevel === 'MEDIUM' && <span className="chip-warning">⚠ MEDIUM RISK</span>}
                                            {m.riskLevel === 'LOW' && <span className="chip">✓ LOW RISK</span>}
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '3rem' }} className="muted">
                                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                                        No readings yet — add your first one above!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default HealthData;
