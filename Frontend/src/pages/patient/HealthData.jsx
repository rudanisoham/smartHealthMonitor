import React, { useState, useEffect } from 'react';
import { Menu, Heart, Activity, Droplets, Thermometer, Plus, Save, FileText } from 'lucide-react';
import '../../styles/HealthData.css';

const HealthData = () => {
    const [readings, setReadings] = useState([]);
    const [newReading, setNewReading] = useState({
        heartRate: '',
        bpSystolic: '',
        bpDiastolic: '',
        spo2: '',
        temperature: '',
        weight: ''
    });

    // Load data from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('vitals_history');
        if (stored) {
            setReadings(JSON.parse(stored));
        } else {
            // Initial mock data
            const initialData = [
                { id: 1, timestamp: '2026-04-01 04:10', heartRate: 35, bpSystolic: 92, bpDiastolic: 42, spo2: 86.0, temperature: 38.0, weight: 52.0, status: 'HIGH RISK' },
                { id: 2, timestamp: '2026-04-01 03:56', heartRate: 35, bpSystolic: 92, bpDiastolic: 40, spo2: 81.0, temperature: 42.0, weight: 52.0, status: 'HIGH RISK' }
            ];
            setReadings(initialData);
            localStorage.setItem('vitals_history', JSON.stringify(initialData));
        }
    }, []);

    const handleInputChange = (e, field) => {
        setNewReading({ ...newReading, [field]: e.target.value });
    };

    const handleSave = () => {
        if (!newReading.heartRate && !newReading.bpSystolic && !newReading.spo2) return;

        const timestamp = new Date().toLocaleString('en-CA', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', hour12: false
        }).replace(',', '');

        const readingToAdd = {
            id: readings.length + 1,
            timestamp,
            ...newReading,
            status: parseInt(newReading.heartRate) < 50 || parseInt(newReading.spo2) < 90 ? 'HIGH RISK' : 'NORMAL'
        };

        const updatedReadings = [readingToAdd, ...readings];
        setReadings(updatedReadings);
        localStorage.setItem('vitals_history', JSON.stringify(updatedReadings));
        setNewReading({ heartRate: '', bpSystolic: '', bpDiastolic: '', spo2: '', temperature: '', weight: '' });
    };

    const latest = readings[0] || {};

    return (
        <div className="health-data-container">
            {/* Header section is managed by PatientLayout/TopHeader */}

            {/* Top Stats Cards */}
            <div className="top-stats-grid">
                <div className="vital-stat-card">
                    <div className="vital-stat-header">
                        <Heart size={14} className="icon-gray" />
                        <span>HEART RATE</span>
                    </div>
                    <div className="vital-stat-value">
                        <span className="value">{latest.heartRate || '--'}</span>
                        <span className="unit">bpm</span>
                    </div>
                </div>

                <div className="vital-stat-card">
                    <div className="vital-stat-header">
                        <Activity size={14} className="icon-gray" />
                        <span>BLOOD PRESSURE</span>
                    </div>
                    <div className="vital-stat-value">
                        <span className="value">
                            {latest.bpSystolic && latest.bpDiastolic ? `${latest.bpSystolic}/${latest.bpDiastolic}` : '--'}
                        </span>
                        <span className="unit">mmHg</span>
                    </div>
                </div>

                <div className="vital-stat-card">
                    <div className="vital-stat-header">
                        <Droplets size={14} className="icon-gray" />
                        <span>SPO2</span>
                    </div>
                    <div className="vital-stat-value">
                        <span className="value">{latest.spo2 || '--'}</span>
                        <span className="unit">%</span>
                    </div>
                </div>

                <div className="vital-stat-card">
                    <div className="vital-stat-header">
                        <Thermometer size={14} className="icon-gray" />
                        <span>TEMPERATURE</span>
                    </div>
                    <div className="vital-stat-value">
                        <span className="value">{latest.temperature || '--'}</span>
                        <span className="unit">°C</span>
                    </div>
                </div>
            </div>

            {/* Add Health Reading Panel */}
            <div className="panel form-panel">
                <div className="panel-header">
                    <div className="panel-title-with-icon">
                        <Plus size={20} className="icon-purple" />
                        <div>
                            <h2>Add Health Reading</h2>
                            <p>Record your latest vitals — saved permanently to your health history</p>
                        </div>
                    </div>
                    <div className="badge badge-blue-light">{readings.length} readings saved</div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Heart Rate <span>(bpm)</span></label>
                        <input
                            type="text"
                            placeholder="e.g. 72"
                            value={newReading.heartRate}
                            onChange={(e) => handleInputChange(e, 'heartRate')}
                        />
                    </div>
                    <div className="form-group">
                        <label>BP Systolic <span>(mmHg)</span></label>
                        <input
                            type="text"
                            placeholder="e.g. 120"
                            value={newReading.bpSystolic}
                            onChange={(e) => handleInputChange(e, 'bpSystolic')}
                        />
                    </div>
                    <div className="form-group">
                        <label>BP Diastolic <span>(mmHg)</span></label>
                        <input
                            type="text"
                            placeholder="e.g. 80"
                            value={newReading.bpDiastolic}
                            onChange={(e) => handleInputChange(e, 'bpDiastolic')}
                        />
                    </div>

                    <div className="form-group">
                        <label>SpO2 <span>(%)</span></label>
                        <input
                            type="text"
                            placeholder="e.g. 98.5"
                            value={newReading.spo2}
                            onChange={(e) => handleInputChange(e, 'spo2')}
                        />
                    </div>
                    <div className="form-group">
                        <label>Temperature <span>(°C)</span></label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                placeholder="e.g. 37.0"
                                value={newReading.temperature}
                                onChange={(e) => handleInputChange(e, 'temperature')}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Weight <span>(kg)</span></label>
                        <input
                            type="text"
                            placeholder="e.g. 70.5"
                            value={newReading.weight}
                            onChange={(e) => handleInputChange(e, 'weight')}
                        />
                    </div>
                </div>

                <div className="form-footer">
                    <span className="footer-note">Fill at least one field &middot; Data is saved permanently</span>
                    <button className="btn-primary" onClick={handleSave}>
                        <Save size={16} />
                        Save Reading
                    </button>
                </div>
            </div>

            {/* Readings History Panel */}
            <div className="panel history-panel">
                <div className="panel-header">
                    <div className="panel-title-with-icon">
                        <FileText size={20} className="icon-brown" />
                        <div>
                            <h2>Readings History</h2>
                            <p>All your saved vitals — newest first</p>
                        </div>
                    </div>
                    <div className="badge badge-gray-light">{readings.length} records</div>
                </div>

                <div className="table-responsive">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>DATE & TIME</th>
                                <th>HEART RATE</th>
                                <th>BLOOD PRESSURE</th>
                                <th>SPO2</th>
                                <th>TEMPERATURE</th>
                                <th>WEIGHT</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {readings.map((r, index) => (
                                <tr key={r.id}>
                                    <td>{readings.length - index}</td>
                                    <td className="font-medium">{r.timestamp}</td>
                                    <td className={parseInt(r.heartRate) < 50 ? 'text-yellow' : ''}>{r.heartRate} bpm</td>
                                    <td className="text-green">{r.bpSystolic}/{r.bpDiastolic} mmHg</td>
                                    <td className={parseInt(r.spo2) < 90 ? 'text-red' : ''}>{r.spo2}%</td>
                                    <td className={parseFloat(r.temperature) > 37.5 ? 'text-orange' : ''}>{r.temperature}°C</td>
                                    <td>{r.weight} kg</td>
                                    <td>
                                        <span className={r.status === 'HIGH RISK' ? 'badge-alert' : 'badge-status-normal'}>
                                            {r.status}
                                        </span>
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

export default HealthData;
