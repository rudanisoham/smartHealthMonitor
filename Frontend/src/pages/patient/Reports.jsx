import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Reports = () => {
    // Mock data matching the Java project structure
    const groupedLabRequests = [
        {
            key: 'group1',
            value: [
                {
                    status: 'COMPLETED',
                    labTest: { name: 'Complete Blood Count (CBC)' },
                    doctor: { user: { fullName: 'Sarah Jenkins' } },
                    requestedAt: '2026-03-28T09:00:00',
                    completedAt: '2026-03-29T14:30:00',
                    resultFileUrl: '#'
                },
                {
                    status: 'COMPLETED',
                    labTest: { name: 'Lipid Panel' },
                    doctor: { user: { fullName: 'Sarah Jenkins' } },
                    requestedAt: '2026-03-28T09:00:00',
                    completedAt: '2026-03-29T14:30:00',
                    resultFileUrl: '#'
                }
            ]
        },
        {
            key: 'group2',
            value: [
                {
                    status: 'IN_PROGRESS',
                    labTest: { name: 'Thyroid Function Test' },
                    doctor: { user: { fullName: 'Michael Chen' } },
                    requestedAt: '2026-05-01T10:15:00',
                    completedAt: null,
                    resultFileUrl: null
                }
            ]
        }
    ];

    return (
        <>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Diagnostic History</h2>
                <p className="muted">Access your session-based laboratory findings and reports.</p>
            </div>

            {groupedLabRequests.length === 0 ? (
                <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🔬</div>
                    <h3 className="muted">No diagnostic history</h3>
                    <p className="muted mt-1">Your official hospital lab reports will appear here.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {groupedLabRequests.map((entry, idx) => {
                        const group = entry.value;
                        const first = group[0];

                        return (
                            <div key={idx} style={{ border: '2px solid #e2e8f0', borderRadius: '20px', padding: '1.75rem', background: 'white', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                                            {group.length > 1 ? 'Diagnostic Session' : first.labTest.name}
                                        </h3>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                                            Physician: <strong>Dr. {first.doctor.user.fullName}</strong>
                                        </div>
                                    </div>
                                    <span style={{ 
                                        padding: '0.35rem 0.75rem', 
                                        borderRadius: '20px', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 700, 
                                        textTransform: 'uppercase',
                                        background: first.status === 'COMPLETED' ? '#d1fae5' : (first.status === 'IN_PROGRESS' ? '#e0e7ff' : '#fef3c7'),
                                        color: first.status === 'COMPLETED' ? '#059669' : (first.status === 'IN_PROGRESS' ? '#4338ca' : '#d97706')
                                    }}>
                                        {first.status}
                                    </span>
                                </div>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    {group.map((req, i) => (
                                        <span key={i} style={{ background: '#f1f5f9', color: '#475569', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, marginRight: '0.5rem', marginTop: '0.5rem', display: 'inline-block' }}>
                                            🧪 {req.labTest.name}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ fontSize: '0.85rem', color: '#64748b', padding: '1rem', background: '#f8fafc', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                        <span>Requested On</span>
                                        <strong style={{ color: '#1e293b' }}>{first.requestedAt.replace('T', ' ').substring(0, 16)}</strong>
                                    </div>
                                    {first.status === 'COMPLETED' && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                            <span>Completed On</span>
                                            <strong style={{ color: '#1e293b' }}>{first.completedAt.replace('T', ' ').substring(0, 16)}</strong>
                                        </div>
                                    )}
                                </div>

                                {first.status === 'COMPLETED' ? (
                                    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        {first.resultFileUrl && (
                                            <a href={first.resultFileUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, minWidth: '150px', justifyContent: 'center', padding: '0.85rem' }}>
                                                📄 Download Report
                                            </a>
                                        )}
                                        <Link to={`/patient/report-detail/${entry.key}`} className="btn btn-outline" style={{ flex: 1, minWidth: '150px', justifyContent: 'center', padding: '0.85rem' }}>
                                            ℹ️ View Details
                                        </Link>
                                    </div>
                                ) : (
                                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff7ed', border: '1px solid #ffedd5', borderRadius: '12px', color: '#c2410c', fontSize: '0.85rem', textAlign: 'center' }}>
                                        ⏳ Testing in progress. Check back soon for results.
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default Reports;
