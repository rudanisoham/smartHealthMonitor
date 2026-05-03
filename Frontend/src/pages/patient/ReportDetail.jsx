import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReportDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const report = {
        id: id || 'REP-9021',
        title: 'Full Blood Count & Lipid Profile',
        createdAt: '2023-10-25 09:15',
        description: 'Routine quarterly check-up for cardiovascular monitoring. Patient was fasting for 12 hours prior to the draw.',
        results: 'Hemoglobin: 14.2 g/dL (Normal)\nTotal Cholesterol: 185 mg/dL (Desirable)\nLDL: 110 mg/dL (Near Optimal)\nHDL: 55 mg/dL (Good)\nTriglycerides: 120 mg/dL (Normal)',
        filePath: '/assets/sample-report.pdf' // Placeholder
    };

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">
                    ← Back to Records
                </button>
            </div>

            <div className="card">
                <div className="card-header border-bottom pb-4 mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="section-title" style={{ fontSize: '1.75rem' }}>{report.title}</h1>
                        <div className="muted mt-1">Recorded on: {report.createdAt}</div>
                    </div>
                    {report.filePath && (
                        <button className="btn btn-primary" onClick={() => window.open(report.filePath, '_blank')}>
                            <i className="fas fa-download" style={{ marginRight: '0.5rem' }}></i> Review Document
                        </button>
                    )}
                </div>

                <div className="grid grid-2 mt-4" style={{ gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#1e293b' }}>Clinical Context</h3>
                        <p className="muted" style={{ lineHeight: 1.7, fontSize: '1rem' }}>
                            {report.description}
                        </p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#1e293b' }}>Summary Findings</h3>
                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontSize: '0.95rem', color: '#1e293b' }}>
                            {report.results}
                        </div>
                    </div>
                </div>

                {report.filePath && (
                    <div className="mt-8 pt-6 border-top" style={{ borderTop: '1px solid #e2e8f0', marginTop: '2rem', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Document Preview</h3>
                        <div style={{ textAlign: 'center', background: '#f1f5f9', padding: '2rem', borderRadius: '12px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                            <div>
                                <i className="fas fa-file-pdf" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                                <p>Document preview would appear here. (PDF/Image)</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportDetail;
