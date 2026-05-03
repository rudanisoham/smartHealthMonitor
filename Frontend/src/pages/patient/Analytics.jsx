import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVitals } from '../../utils/api';
import { Loader } from 'lucide-react';

const Analytics = () => {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVitals();
    }, []);

    const fetchVitals = async () => {
        try {
            setLoading(true);
            const res = await getVitals();
            if (res.data.success) {
                setMetrics(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching vitals:', err);
        } finally {
            setLoading(false);
        }
    };

    const latestMetric = metrics[0] || null;

    // Computed values
    const hr = latestMetric ? parseInt(latestMetric.heartRate) : null;
    const bps = latestMetric ? parseInt(latestMetric.bpSystolic) : null;
    const spo2 = latestMetric ? parseFloat(latestMetric.spo2) : null;
    const tmp = latestMetric ? parseFloat(latestMetric.temperature) : null;

    // Compute averages
    const avgHR = metrics.length > 0 ? Math.round(metrics.filter(m => m.heartRate).reduce((sum, m) => sum + m.heartRate, 0) / metrics.filter(m => m.heartRate).length) : null;
    const avgSpO2 = metrics.length > 0 ? (metrics.filter(m => m.spo2).reduce((sum, m) => sum + m.spo2, 0) / metrics.filter(m => m.spo2).length).toFixed(1) : null;
    const highRiskCount = metrics.filter(m => m.riskLevel === 'HIGH').length;

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
                .trend-up   { color: #f87171; }
                .trend-down { color: #34d399; }
                .trend-ok   { color: #60a5fa; }
                .progress-bar-wrap { background: rgba(255,255,255,0.08); border-radius: 99px; height: 8px; width: 100%; margin-top: 0.4rem; overflow: hidden; }
                .progress-bar-fill { height: 8px; border-radius: 99px; background: linear-gradient(90deg, #3b82f6, #06b6d4); transition: width 0.8s ease; }
                .progress-bar-fill.warn { background: linear-gradient(90deg, #f59e0b, #f97316); }
                .progress-bar-fill.danger { background: linear-gradient(90deg, #ef4444, #dc2626); }
                .insight-card { border-left: 3px solid #3b82f6; padding: 0.75rem 1rem; background: rgba(59,130,246,0.07); border-radius: 0 8px 8px 0; margin-bottom: 0.75rem; }
                .insight-card.warn { border-left-color: #f59e0b; background: rgba(245,158,11,0.07); }
                .insight-card.danger { border-left-color: #ef4444; background: rgba(239,68,68,0.07); }
            `}</style>

            {metrics.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                    <div className="section-title">No Data to Analyze Yet</div>
                    <p className="section-subtitle mt-2">Start tracking your vitals on the Health Data page to see trends and AI insights here.</p>
                    <div className="mt-4">
                        <Link to="/patient/health-data" className="btn btn-primary">➕ Add Health Data</Link>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-4" style={{ marginBottom: '1.5rem' }}>
                        <div className="card">
                            <div className="card-title">Total Readings</div>
                            <div className="card-value">{metrics.length}</div>
                            <div className="muted" style={{ fontSize: '0.8rem' }}>from MongoDB database</div>
                        </div>
                        <div className="card">
                            <div className="card-title">Avg Heart Rate</div>
                            <div className="card-value">
                                {avgHR ? <>{avgHR} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>bpm</span></> : '—'}
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title">Avg SpO2</div>
                            <div className="card-value">
                                {avgSpO2 ? <>{avgSpO2}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>%</span></> : '—'}
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-title">High Risk Readings</div>
                            <div className="card-value" style={{ color: highRiskCount > 0 ? '#ef4444' : '#10b981' }}>
                                {highRiskCount}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-2">
                        <div className="card">
                            <div className="card-header">
                                <div>
                                    <div className="section-title">Current Biometrics</div>
                                    <div className="section-subtitle">Based on your latest reading from DB</div>
                                </div>
                            </div>
                            <div className="mt-3">
                                {/* Heart Rate */}
                                {hr && (
                                    <div className="stat-item">
                                        <div className="stat-info" style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span className="stat-label">Heart Rate</span>
                                                <span className="stat-value">
                                                    {hr >= 60 && hr <= 100 ? <span style={{ color: '#34d399' }}>{hr} bpm ✓</span> : 
                                                     hr > 100 ? <span style={{ color: '#f59e0b' }}>{hr} bpm ↑</span> : 
                                                     <span style={{ color: '#60a5fa' }}>{hr} bpm ↓</span>}
                                                </span>
                                            </div>
                                            <div className="progress-bar-wrap">
                                                <div className={`progress-bar-fill ${hr > 100 ? 'warn' : ''}`} style={{ width: `${hr > 200 ? 100 : hr / 2}%` }}></div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                                <span>30</span><span>Normal: 60–100</span><span>200+</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Blood Pressure */}
                                {bps && (
                                    <div className="stat-item">
                                        <div className="stat-info" style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span className="stat-label">Blood Pressure (Systolic)</span>
                                                <span className="stat-value">
                                                    {bps >= 90 && bps <= 120 ? <span style={{ color: '#34d399' }}>{bps} mmHg ✓</span> : 
                                                     bps > 120 ? <span style={{ color: '#f59e0b' }}>{bps} mmHg ↑</span> : 
                                                     <span style={{ color: '#60a5fa' }}>{bps} mmHg ↓</span>}
                                                </span>
                                            </div>
                                            <div className="progress-bar-wrap">
                                                <div className={`progress-bar-fill ${bps > 130 ? 'warn' : ''} ${bps > 150 ? 'danger' : ''}`} style={{ width: `${bps > 180 ? 100 : (bps - 60) * 100 / 120}%` }}></div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                                <span>60</span><span>Normal: 90–120</span><span>180+</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SpO2 */}
                                {spo2 && (
                                    <div className="stat-item">
                                        <div className="stat-info" style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span className="stat-label">Blood Oxygen (SpO2)</span>
                                                <span className="stat-value">
                                                    {spo2 >= 95 ? <span style={{ color: '#34d399' }}>{spo2}% ✓</span> : 
                                                     spo2 >= 90 ? <span style={{ color: '#f59e0b' }}>{spo2}% ⚠</span> : 
                                                     <span style={{ color: '#f87171' }}>{spo2}% ✗</span>}
                                                </span>
                                            </div>
                                            <div className="progress-bar-wrap">
                                                <div className={`progress-bar-fill ${spo2 < 95 ? 'warn' : ''} ${spo2 < 90 ? 'danger' : ''}`} style={{ width: `${spo2}%` }}></div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                                <span>80%</span><span>Normal: 95–100%</span><span>100%</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Temperature */}
                                {tmp && (
                                    <div className="stat-item">
                                        <div className="stat-info" style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span className="stat-label">Body Temperature</span>
                                                <span className="stat-value">
                                                    {tmp >= 36.1 && tmp <= 37.2 ? <span style={{ color: '#34d399' }}>{tmp}°C ✓</span> : 
                                                     tmp > 37.2 ? <span style={{ color: '#f59e0b' }}>{tmp}°C ↑ Fever</span> : 
                                                     <span style={{ color: '#60a5fa' }}>{tmp}°C ↓</span>}
                                                </span>
                                            </div>
                                            <div className="progress-bar-wrap">
                                                <div className={`progress-bar-fill ${tmp > 37.5 ? 'warn' : ''} ${tmp > 38.5 ? 'danger' : ''}`} style={{ width: `${((tmp - 35) * 100 / 7) > 100 ? 100 : ((tmp - 35) * 100 / 7)}%` }}></div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                                <span>35°C</span><span>Normal: 36.1–37.2°C</span><span>42°C</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!hr && !bps && !spo2 && !tmp && (
                                    <div className="muted" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                        No vitals data available. <Link to="/patient/health-data">Add a reading</Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card" style={{ background: '#ffffff', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderRadius: '20px' }}>
                            <div className="card-header" style={{ borderBottom: '1px dashed #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📊</div>
                                    <h3 className="card-title" style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1e293b' }}>AI Trend Intelligence</h3>
                                </div>
                                <span className="chip" style={{ background: '#f0fdf4', color: '#16a34a', fontWeight: 700 }}>LIVE</span>
                            </div>

                            <div className="mt-3">
                                {latestMetric ? (
                                    <>
                                        <div style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#334155', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9', fontWeight: 500 }}>
                                            {highRiskCount > 0 
                                                ? `"You have ${highRiskCount} high-risk reading(s) in your history. Please consult your doctor for a review."`
                                                : '"Your vitals are mostly within normal ranges. Keep maintaining your healthy lifestyle!"'
                                            }
                                        </div>
                                        <div className="mt-4" style={{ display: 'flex', gap: '0.75rem', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                                                <span style={{ fontSize: '1rem' }}>✅</span>
                                                <span>Based on {metrics.length} readings from your MongoDB health database.</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                                                <span style={{ fontSize: '1rem' }}>⚡</span>
                                                <span>Updated every time you add a reading.</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="muted" style={{ padding: '2rem', textAlign: 'center', background: '#f8fafc', borderRadius: '12px' }}>
                                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🔍</span>
                                        Not enough data for AI analysis.
                                    </div>
                                )}

                                <div className="mt-4" style={{ background: '#fefce8', borderRadius: '12px', padding: '1rem', fontSize: '0.8rem', color: '#854d0e', border: '1px solid #fef08a' }}>
                                    ℹ This report is generated by AI. It provides general wellness info and is <u>not</u> a medical diagnosis.
                                </div>
                                <div className="mt-3">
                                    <Link to="/patient/ai-checker" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '48px', borderRadius: '14px' }}>🤖 Run AI Checker</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-4">
                        <div className="card-header">
                            <div>
                                <div className="section-title">📈 All Readings Trend</div>
                                <div className="section-subtitle">Your complete health log from database — newest first</div>
                            </div>
                            <Link to="/patient/health-data" className="btn btn-outline btn-sm">+ Add Reading</Link>
                        </div>
                        <div className="table-container mt-2">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Heart Rate</th>
                                        <th>Blood Pressure</th>
                                        <th>SpO2</th>
                                        <th>Temperature</th>
                                        <th>Weight</th>
                                        <th>Risk</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {metrics.map((m) => (
                                        <tr key={m._id}>
                                            <td>{new Date(m.createdAt).toLocaleString()}</td>
                                            <td>{m.heartRate ? `${m.heartRate} bpm` : '—'}</td>
                                            <td>{m.bpSystolic ? `${m.bpSystolic}/${m.bpDiastolic} mmHg` : '—'}</td>
                                            <td>{m.spo2 ? `${m.spo2}%` : '—'}</td>
                                            <td>{m.temperature ? `${m.temperature}°C` : '—'}</td>
                                            <td>{m.weight ? `${m.weight} kg` : '—'}</td>
                                            <td>
                                                {m.riskLevel === 'HIGH' && <span className="chip-danger">HIGH</span>}
                                                {m.riskLevel === 'MEDIUM' && <span className="chip-warning">MEDIUM</span>}
                                                {m.riskLevel === 'LOW' && <span className="chip">LOW</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Analytics;
