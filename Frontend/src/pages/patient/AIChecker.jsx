import React, { useState, useEffect } from 'react';

const AIChecker = () => {
    const [notes, setNotes] = useState('');
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [latestMetric, setLatestMetric] = useState(null);

    const symptomOptions = [
        { id: 'chest_pain', label: '💔 Chest Pain' },
        { id: 'breathing', label: '🌬 Difficulty Breathing' },
        { id: 'dizziness', label: '💫 Dizziness' },
        { id: 'headache', label: '🤕 Headache' },
        { id: 'fever', label: '🌡 Fever' },
        { id: 'fatigue', label: '😴 Constant Tiredness' },
        { id: 'nausea', label: '🤢 Nausea' }
    ];

    useEffect(() => {
        const vitals = JSON.parse(localStorage.getItem('vitals_history') || '[]');
        if (vitals.length > 0) {
            setLatestMetric(vitals[0]);
        }
    }, []);

    const toggleSymptom = (id) => {
        if (selectedSymptoms.includes(id)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
        } else {
            setSelectedSymptoms([...selectedSymptoms, id]);
        }
    };

    const runAiCheck = () => {
        if (selectedSymptoms.length === 0 && notes.length < 10) {
            alert('Please describe your problem (at least 10 letters) or pick a symptom.');
            return;
        }

        setIsAnalyzing(true);
        setResult(null);

        // Simulate API call
        setTimeout(() => {
            setIsAnalyzing(false);
            setResult({
                riskLevel: selectedSymptoms.includes('chest_pain') || selectedSymptoms.includes('breathing') ? 'HIGH' : 'LOW',
                summary: 'Based on your symptoms, this appears to be a mild condition but should be monitored. Your vitals are generally stable.',
                recommendations: [
                    'Rest and hydrate well today.',
                    'Monitor your temperature every 4 hours.',
                    'If symptoms worsen, contact a doctor immediately.'
                ],
                disclaimer: 'This is an AI generated summary and not a medical diagnosis.'
            });
        }, 2000);
    };

    const clearAll = () => {
        setNotes('');
        setSelectedSymptoms([]);
        setResult(null);
        setIsAnalyzing(false);
    };

    return (
        <>
            <style>{`
                :root {
                    --ai-primary: #3b82f6;
                    --ai-bg-light: #f8fafc;
                    --ai-card-shadow: 0 4px 24px rgba(0,0,0,0.06);
                    --ai-text-dark: #1e293b;
                    --ai-text-muted: #64748b;
                }

                .symptom-chip {
                    display: inline-flex; align-items: center; gap: 0.5rem;
                    padding: 0.5rem 1.1rem; border-radius: 99px;
                    border: 1.5px solid #e2e8f0;
                    background: #ffffff; color: var(--ai-text-muted);
                    cursor: pointer; font-size: 0.88rem; transition: all 0.2s;
                    user-select: none; font-weight: 500;
                }
                .symptom-chip:hover { border-color: var(--ai-primary); color: var(--ai-primary); background: var(--ai-bg-light); }
                .symptom-chip.active {
                    border-color: var(--ai-primary); background: var(--ai-primary); color: #ffffff;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
                }
                
                .chips-wrap { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1rem; }
                .ai-result-box { border-radius: 16px; padding: 1.75rem; margin-top: 1.5rem; background: #ffffff; border: 1px solid #f1f5f9; box-shadow: var(--ai-card-shadow); animation: fadeIn 0.4s ease; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .risk-low    { border-left: 6px solid #22c55e; }
                .risk-medium { border-left: 6px solid #f59e0b; }
                .risk-high   { border-left: 6px solid #ef4444; }
                
                .risk-indicator { font-size: 2rem; margin-bottom: 0.5rem; }
                .risk-label  { font-size: 1.1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ai-text-muted); }
                .result-subtitle { font-size: 0.95rem; color: var(--ai-text-muted); font-weight: 500; }
                .summary-text { font-size: 1.1rem; line-height: 1.7; margin-top: 1.25rem; color: var(--ai-text-dark); font-weight: 500; }
                
                .vitals-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-top: 1.5rem; }
                .vital-row { background: var(--ai-bg-light); border: 1px solid #f1f5f9; border-radius: 12px; padding: 0.85rem 1.1rem; display: flex; justify-content: space-between; align-items: center; }
                .vital-row .vname { font-size: 0.8rem; color: var(--ai-text-muted); font-weight: 700; }
                .vital-row .vval  { font-weight: 800; font-size: 1.1rem; color: var(--ai-text-dark); }
                
                .result-card { min-height: 520px; }
                .next-steps { margin-top: 1.75rem; padding-top: 1.5rem; border-top: 1px dashed #e2e8f0; }
                .section-title-sm { font-size: 0.95rem; font-weight: 800; color: var(--ai-text-dark); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem; }
                .steps-list { list-style: none; padding: 0; margin: 0; }
                .steps-list li { display: flex; gap: 0.85rem; padding: 0.85rem 1rem; background: #f8fafc; border-radius: 12px; margin-bottom: 0.5rem; border: 1px solid #f1f5f9; font-size: 0.95rem; color: #334155; font-weight: 500; }
                
                .typing-indicator { display: flex; gap: 6px; justify-content: center; align-items: center; padding: 2.5rem; }
                .typing-indicator span { width: 10px; height: 10px; background: var(--ai-primary); border-radius: 50%; opacity: 0.3; animation: blink 1.4s infinite both; }
                .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
                .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
                @keyframes blink { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1.1); } }
            `}</style>

            <div className="grid grid-2" style={{ alignItems: 'stretch' }}>
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.75rem' }}>🩺</span>
                        <div className="section-title">Health Check-in</div>
                    </div>
                    <p className="section-subtitle">Describe how you feel in normal words, or select symptoms below.</p>

                    <div className="form-group mt-4">
                        <label htmlFor="aiNotes" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ai-text-dark)' }}>What is the problem?</label>
                        <textarea 
                            id="aiNotes" 
                            className="form-control" 
                            rows="6" 
                            placeholder="E.g., 'My stomach has been hurting since morning and I feel like throwing up...'"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            style={{ borderRadius: '12px', background: 'var(--ai-bg-light)', border: '1.5px solid #e2e8f0', width: '100%', padding: '0.75rem' }}
                        ></textarea>
                        <div className="muted mt-1" style={{ fontSize: '0.75rem' }}>Speak naturally, the AI understands normal language.</div>
                    </div>

                    <div className="mt-4">
                        <label style={{ fontSize: '0.75rem', color: 'var(--ai-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>Quick Symptom Tags</label>
                        <div className="chips-wrap">
                            {symptomOptions.map(sym => (
                                <span 
                                    key={sym.id} 
                                    className={`symptom-chip ${selectedSymptoms.includes(sym.id) ? 'active' : ''}`}
                                    onClick={() => toggleSymptom(sym.id)}
                                >
                                    {sym.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 pt-2">
                        <button className="btn btn-primary" style={{ width: '100%', borderRadius: '14px', padding: '0.9rem' }} onClick={runAiCheck} disabled={isAnalyzing}>
                            {isAnalyzing ? '✨ Processing...' : '✨ Analyze Health Problem'}
                        </button>
                        <button className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.85rem', border: 'none', color: 'var(--ai-text-muted)' }} onClick={clearAll}>
                            🔄 Click here to reset
                        </button>
                    </div>

                    {latestMetric && (
                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed #e2e8f0' }}>
                            <label style={{ fontSize: '0.7rem', color: 'var(--ai-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800 }}>Reference Health Data</label>
                            <div className="vitals-summary">
                                {latestMetric.heartRate && <div className="vital-row"><span className="vname">Heart Rate</span><span className="vval">{latestMetric.heartRate} bpm</span></div>}
                                {latestMetric.bpSystolic && <div className="vital-row"><span className="vname">Blood Pressure</span><span className="vval">{latestMetric.bpSystolic}/{latestMetric.bpDiastolic}</span></div>}
                                {latestMetric.spo2 && <div className="vital-row"><span className="vname">Oxygen (SpO2)</span><span className="vval">{latestMetric.spo2}%</span></div>}
                            </div>
                        </div>
                    )}
                </div>

                <div className="card result-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    {!isAnalyzing && !result && (
                        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤔</div>
                            <div className="muted" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Ready to help. Describe your problem on the left and click analyze.</div>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                            <div className="typing-indicator"><span></span><span></span><span></span></div>
                            <div style={{ fontWeight: 700, color: 'var(--ai-text-dark)' }}>AI is thinking...</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--ai-text-muted)', marginTop: '0.5rem' }}>Analyzing your problem in plain language.</div>
                        </div>
                    )}

                    {result && !isAnalyzing && (
                        <div className={`ai-result-box risk-${result.riskLevel.toLowerCase()}`}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                <div className="risk-indicator">{result.riskLevel === 'HIGH' ? '🔴' : result.riskLevel === 'MEDIUM' ? '🟡' : '🟢'}</div>
                                <div>
                                    <div className="risk-label">{result.riskLevel} RISK</div>
                                    <div className="result-subtitle">Analysis Complete</div>
                                </div>
                            </div>

                            <div className="summary-text">{result.summary}</div>

                            <div className="next-steps">
                                <div className="section-title-sm">Suggested Next Steps</div>
                                <ul className="steps-list">
                                    {result.recommendations.map((rec, i) => (
                                        <li key={i}><span className="icon">👉</span><span>{rec}</span></li>
                                    ))}
                                    <li style={{ background: 'none', border: 'none', marginTop: '1rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--ai-text-muted)', fontStyle: 'italic' }}>{result.disclaimer}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AIChecker;
