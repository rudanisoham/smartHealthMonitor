import React, { useState, useEffect } from 'react';
import { Heart, Activity, Droplets, Thermometer, Bot, Microscope, CheckCircle2, ChevronRight, AlertTriangle, Search, XCircle, Stethoscope, Brain, Wind, Info } from 'lucide-react';
import '../../styles/AIChecker.css';

const AIChecker = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [vitals, setVitals] = useState({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const symptomCategories = [
        {
            name: 'General',
            icon: <Stethoscope size={16} />,
            symptoms: [
                { id: 5, label: 'Fever' },
                { id: 6, label: 'Fatigue' },
                { id: 7, label: 'Nausea' },
                { id: 9, label: 'Excessive Sweating' },
            ]
        },
        {
            name: 'Cardiovascular',
            icon: <Heart size={16} />,
            symptoms: [
                { id: 1, label: 'Chest Pain' },
                { id: 8, label: 'Palpitations' },
                { id: 10, label: 'Swelling in Legs' },
            ]
        },
        {
            name: 'Respiratory',
            icon: <Wind size={16} />,
            symptoms: [
                { id: 2, label: 'Shortness of Breath' },
                { id: 13, label: 'Persistent Cough' },
                { id: 14, label: 'Wheezing' },
            ]
        },
        {
            name: 'Neurological',
            icon: <Brain size={16} />,
            symptoms: [
                { id: 3, label: 'Dizziness' },
                { id: 4, label: 'Headache' },
                { id: 11, label: 'Blurred Vision' },
                { id: 12, label: 'Muscle Weakness' },
            ]
        }
    ];

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('vitals_history') || '[]');
        if (stored.length > 0) {
            setVitals(stored[0]);
        }
    }, []);

    const toggleSymptom = (id) => {
        if (selectedSymptoms.includes(id)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
        } else {
            setSelectedSymptoms([...selectedSymptoms, id]);
        }
    };

    const handleRunCheck = () => {
        if (selectedSymptoms.length === 0) return;

        setIsAnalyzing(true);
        setResult(null);

        setTimeout(() => {
            const hasCritical = selectedSymptoms.some(id => [1, 2, 8].includes(id));
            const hasNeuro = selectedSymptoms.some(id => [3, 11, 12].includes(id));
            const isVitalsCritical = parseInt(vitals.heartRate) < 50 || parseInt(vitals.spo2) < 90 || parseInt(vitals.heartRate) > 120;

            let severity = 'stable';
            let specialist = 'General Practitioner';
            let confidence = 85;

            if (hasCritical || isVitalsCritical) {
                severity = 'critical';
                specialist = 'Cardiologist / Emergency';
                confidence = 92;
            } else if (hasNeuro) {
                severity = 'warning';
                specialist = 'Neurologist';
                confidence = 78;
            }

            const mockResults = {
                critical: {
                    status: 'Urgent Attention Required',
                    advice: 'Emergency protocols suggested. Your combination of symptoms and vitals indicates high risk.',
                    steps: ['Call emergency services if pain persists', 'Do not exert physically', 'Alert family member'],
                    specialist: 'Cardiologist'
                },
                warning: {
                    status: 'Potential Neurological Issue',
                    advice: 'Your symptoms suggest a need for neurological evaluation. Monitor for balance issues.',
                    steps: ['Avoid driving', 'Rest in a dark room', 'Schedule specialist visit'],
                    specialist: 'Neurologist'
                },
                stable: {
                    status: 'Symptoms Stable',
                    advice: 'No immediate emergency detected. Symptoms may be due to fatigue or minor infection.',
                    steps: ['Stay hydrated', 'Take OTC fever reducers if needed', 'Visit GP if symptoms persist > 48h'],
                    specialist: 'General Physician'
                }
            };

            setResult({
                ...mockResults[severity],
                severity,
                confidence,
                timestamp: new Date().toLocaleTimeString()
            });

            setIsAnalyzing(false);
        }, 2000);
    };

    const allSymptoms = symptomCategories.flatMap(c => c.symptoms);
    const filteredSymptoms = allSymptoms.filter(s =>
        s.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="ai-checker-container">
            <div className="ai-checker-grid">

                {/* Left Panel: Symptoms Form */}
                <div className="form-panel">
                    <div className="panel-title-with-icon">
                        <div className="icon-circle bg-blue-soft">
                            <Stethoscope size={20} className="text-blue-primary" />
                        </div>
                        <div>
                            <h2>Symptom Assessment</h2>
                            <p>Identify your symptoms for rule-based analysis</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="search-container">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search symptoms (e.g. Cough, Pain...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && <XCircle size={16} className="clear-search" onClick={() => setSearchTerm('')} />}
                    </div>

                    <div className="symptoms-scroll-area">
                        {searchTerm ? (
                            <div className="symptoms-section">
                                <h3 className="section-label">SEARCH RESULTS</h3>
                                <div className="symptoms-pills">
                                    {filteredSymptoms.map(s => (
                                        <button
                                            key={s.id}
                                            className={`symptom-pill ${selectedSymptoms.includes(s.id) ? 'active' : ''}`}
                                            onClick={() => toggleSymptom(s.id)}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                    {filteredSymptoms.length === 0 && <p className="no-results">No symptoms found.</p>}
                                </div>
                            </div>
                        ) : (
                            symptomCategories.map(cat => (
                                <div key={cat.name} className="symptoms-section">
                                    <h3 className="section-label">
                                        {cat.icon} {cat.name.toUpperCase()}
                                    </h3>
                                    <div className="symptoms-pills">
                                        {cat.symptoms.map(s => (
                                            <button
                                                key={s.id}
                                                className={`symptom-pill ${selectedSymptoms.includes(s.id) ? 'active' : ''}`}
                                                onClick={() => toggleSymptom(s.id)}
                                            >
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="vitals-summary-box">
                        <div className="vitals-box-header">
                            <h4>Analyzing with Vitals:</h4>
                            <span className="vitals-time">{vitals.timestamp || 'Latest'}</span>
                        </div>
                        <div className="vitals-mini-row">
                            <span title="HR"><Heart size={12} /> {vitals.heartRate || '--'}</span>
                            <span title="BP"><Activity size={12} /> {vitals.bpSystolic ? `${vitals.bpSystolic}/${vitals.bpDiastolic}` : '--'}</span>
                            <span title="SpO2"><Droplets size={12} /> {vitals.spo2 || '--'}%</span>
                            <span title="Temp"><Thermometer size={12} /> {vitals.temperature || '--'}°C</span>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            className="btn-ai-run"
                            disabled={selectedSymptoms.length === 0 || isAnalyzing}
                            onClick={handleRunCheck}
                        >
                            <Bot size={18} />
                            {isAnalyzing ? 'Analyzing System...' : 'Run Analysis'}
                        </button>
                        <button className="btn-clear" onClick={() => { setSelectedSymptoms([]); setResult(null); }}>
                            Reset
                        </button>
                    </div>
                </div>

                {/* Right Panel: AI Prediction */}
                <div className="prediction-panel">
                    {!result && !isAnalyzing && (
                        <div className="empty-state-v2">
                            <div className="pulse-icon">
                                <Microscope size={40} className="text-blue-primary" />
                            </div>
                            <h3>AI Health Analysis</h3>
                            <p>Select your symptoms and run the analysis to receive a rule-based health assessment.</p>
                            <div className="feature-list">
                                <div className="feature-item"><CheckCircle2 size={14} /> Rule-based clinical logic</div>
                                <div className="feature-item"><CheckCircle2 size={14} /> Vitals data integration</div>
                                <div className="feature-item"><CheckCircle2 size={14} /> Specialist recommendations</div>
                            </div>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="analyzing-state-v2">
                            <div className="ai-loader">
                                <div className="circle"></div>
                                <Bot size={32} className="bot-blink" />
                            </div>
                            <h4>AI Engine Analyzing</h4>
                            <p>Correlating symptoms with heart rate and blood pressure trends...</p>
                        </div>
                    )}

                    {result && !isAnalyzing && (
                        <div className={`result-card-v2 ${result.severity}`}>
                            <div className="result-badge">
                                <AlertTriangle size={14} /> {result.severity.toUpperCase()}
                            </div>

                            <div className="result-main-info">
                                <h3>{result.status}</h3>
                                <div className="confidence-meter">
                                    <div className="meter-label">AI Confidence</div>
                                    <div className="meter-bar">
                                        <div className="meter-fill" style={{ width: `${result.confidence}%` }}></div>
                                    </div>
                                    <div className="meter-value">{result.confidence}%</div>
                                </div>
                            </div>

                            <div className="result-details">
                                <div className="detail-item">
                                    <label>Analysis Outcome</label>
                                    <p>{result.advice}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Recommended Specialist</label>
                                    <div className="specialist-tag">
                                        <Stethoscope size={14} /> {result.specialist}
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <label>Recommended Next Steps</label>
                                    <ul className="steps-list">
                                        {result.steps.map((step, idx) => (
                                            <li key={idx}><ChevronRight size={14} /> {step}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="result-actions">
                                <button className="btn-action-primary" onClick={() => window.location.href = '/patient/appointments'}>
                                    Book {result.specialist}
                                </button>
                                <button className="btn-action-outline" onClick={() => setResult(null)}>
                                    New Analysis
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="prediction-disclaimer">
                        <Info size={14} />
                        <span>This tool provides rule-based information, not a medical diagnosis. In case of emergency, call 911 immediately.</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AIChecker;
