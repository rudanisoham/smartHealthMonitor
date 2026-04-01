import React, { useState, useEffect } from 'react';
import { ArrowDown, Check, X, ArrowUp, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import '../../styles/Analytics.css';

const Analytics = () => {
    const [vitals, setVitals] = useState([]);
    const [latest, setLatest] = useState({});

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('vitals_history') || '[]');
        setVitals(stored);
        if (stored.length > 0) {
            setLatest(stored[0]);
        }
    }, []);

    // Helper to calculate progress percent
    const getPercent = (val, min, max) => {
        if (!val) return 0;
        const v = parseFloat(val);
        const p = ((v - min) / (max - min)) * 100;
        return Math.min(Math.max(p, 5), 95); // clamp
    };

    return (
        <div className="analytics-container">
            {/* Header section is managed by TopHeader */}

            {/* Top Stats Cards */}
            <div className="analytics-stats-grid">
                <div className="stat-card">
                    <div className="stat-card-header">
                        <h3>Total Readings</h3>
                    </div>
                    <div className="stat-card-value text-blue-primary">{vitals.length}</div>
                    <p className="stat-subtitle">all time records</p>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <h3>Latest Heart Rate</h3>
                    </div>
                    <div className="stat-card-value text-blue-primary">
                        {latest.heartRate || '--'} <span className="unit">bpm</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <h3>Latest SpO2</h3>
                    </div>
                    <div className="stat-card-value text-blue-primary">
                        {latest.spo2 || '--'}<span className="unit">%</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <h3>Latest BP</h3>
                    </div>
                    <div className="stat-card-value text-blue-primary">
                        {latest.bpSystolic && latest.bpDiastolic ? `${latest.bpSystolic}/${latest.bpDiastolic}` : '--'}
                    </div>
                </div>
            </div>

            {/* Main Grid: Biometrics & Insights */}
            <div className="analytics-main-grid">

                {/* Left Panel: Current Biometrics */}
                <div className="panel biometrics-panel">
                    <div className="panel-header">
                        <div>
                            <h2>Current Biometrics</h2>
                            <p>{latest.timestamp ? `Based on reading from ${latest.timestamp}` : 'No readings available'}</p>
                        </div>
                    </div>

                    <div className="biometrics-list">

                        {/* HR Metric */}
                        <div className="metric-item">
                            <div className="metric-header">
                                <span className="metric-name">Heart Rate</span>
                                <div className={`metric-current ${parseInt(latest.heartRate) < 50 ? 'text-red' : 'text-blue-primary'}`}>
                                    {latest.heartRate || '--'} bpm {parseInt(latest.heartRate) < 50 ? <ArrowDown size={18} /> : <Check size={18} />}
                                </div>
                            </div>
                            <div className="progress-track">
                                <div className="progress-bar bg-blue" style={{ width: `${getPercent(latest.heartRate, 30, 200)}%` }}></div>
                            </div>
                            <div className="metric-footer">
                                <span>30</span>
                                <span className="metric-normal">Normal: 60-100</span>
                                <span>200+</span>
                            </div>
                        </div>

                        {/* BP Metric */}
                        <div className="metric-item">
                            <div className="metric-header">
                                <span className="metric-name">Blood Pressure (Systolic)</span>
                                <div className="metric-current text-green">
                                    {latest.bpSystolic || '--'} mmHg <Check size={18} />
                                </div>
                            </div>
                            <div className="progress-track">
                                <div className="progress-bar bg-green" style={{ width: `${getPercent(latest.bpSystolic, 60, 180)}%` }}></div>
                            </div>
                            <div className="metric-footer">
                                <span>60</span>
                                <span className="metric-normal">Normal: 90-120</span>
                                <span>180+</span>
                            </div>
                        </div>

                        {/* SpO2 Metric */}
                        <div className="metric-item">
                            <div className="metric-header">
                                <span className="metric-name">Blood Oxygen (SpO2)</span>
                                <div className={`metric-current ${parseInt(latest.spo2) < 90 ? 'text-red' : 'text-blue-primary'}`}>
                                    {latest.spo2 || '--'}% {parseInt(latest.spo2) < 90 ? <X size={18} /> : <Check size={18} />}
                                </div>
                            </div>
                            <div className="progress-track">
                                <div className="progress-bar bg-red" style={{ width: `${getPercent(latest.spo2, 80, 100)}%` }}></div>
                            </div>
                            <div className="metric-footer">
                                <span>80%</span>
                                <span className="metric-normal">Normal: 95-100%</span>
                                <span>100%</span>
                            </div>
                        </div>

                        {/* Temp Metric */}
                        <div className="metric-item">
                            <div className="metric-header">
                                <span className="metric-name">Body Temperature</span>
                                <div className={`metric-current ${parseFloat(latest.temperature) > 37.2 ? 'text-orange' : 'text-blue-primary'}`}>
                                    {latest.temperature || '--'}°C {parseFloat(latest.temperature) > 37.2 ? <ArrowUp size={18} /> : <Check size={18} />}
                                </div>
                            </div>
                            <div className="progress-track">
                                <div className="progress-bar bg-orange" style={{ width: `${getPercent(latest.temperature, 35, 42)}%` }}></div>
                            </div>
                            <div className="metric-footer">
                                <span>35°C</span>
                                <span className="metric-normal">Normal: 36.1-37.2°C</span>
                                <span>42°C</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Panel: AI Insights */}
                <div className="panel insights-panel">
                    <div className="panel-header">
                        <div className="panel-title-with-icon">
                            <span>  </span>
                            <div>
                                <h2>AI Health Insights</h2>
                                <p>Rule-based analysis of your {vitals.length} readings</p>
                            </div>
                        </div>
                    </div>

                    <div className="insights-list">
                        {vitals.length > 0 ? (
                            <>
                                {parseInt(latest.heartRate) < 60 && (
                                    <div className="insight-card insight-info">
                                        <div className="insight-header">
                                            <Info size={16} className="text-blue-primary" />
                                            <h4>Low Heart Rate noticed</h4>
                                        </div>
                                        <p>Your current heart rate ({latest.heartRate} bpm) is below the typical resting range. This is common in athletes but if you feel dizzy, consult a doctor.</p>
                                    </div>
                                )}

                                {parseInt(latest.spo2) < 95 && (
                                    <div className="insight-card insight-danger">
                                        <div className="insight-header">
                                            <AlertTriangle size={16} className="text-red" />
                                            <h4>Low Blood Oxygen</h4>
                                        </div>
                                        <p>A SpO2 level of {latest.spo2}% is below normal. Ensure you are in a well-ventilated area. Seek care if you have trouble breathing.</p>
                                    </div>
                                )}

                                {parseFloat(latest.temperature) > 37.2 && (
                                    <div className="insight-card insight-warning">
                                        <div className="insight-header">
                                            <AlertCircle size={16} className="text-orange" />
                                            <h4>Fever Detected</h4>
                                        </div>
                                        <p>Temperature of {latest.temperature}°C suggests a fever. Stay hydrated and get plenty of rest.</p>
                                    </div>
                                )}

                                <div className="insight-card insight-success">
                                    <div className="insight-header">
                                        <CheckCircle2 size={16} className="text-green" />
                                        <h4>Consistent Monitoring</h4>
                                    </div>
                                    <p>You have successfully logged {vitals.length} health readings. Regularly tracking your vitals is a great step for long-term health!</p>
                                </div>
                            </>
                        ) : (
                            <p className="no-data-msg">No data for analysis yet. Add some readings in 'Health Data'!</p>
                        )}
                    </div>

                    <div className="insights-disclaimer">
                        <i>ℹ</i> This is rule-based analysis only. Always consult a qualified doctor for medical advice.
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Analytics;
