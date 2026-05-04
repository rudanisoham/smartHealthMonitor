import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReports } from '../../utils/api';
import { Loader, FileText, Download, Eye, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const res = await getReports();
            if (res.data.success) {
                setReports(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching reports:', err);
            setError('Failed to load reports.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'NORMAL': return { bg: '#d1fae5', color: '#059669' };
            case 'ABNORMAL': return { bg: '#fee2e2', color: '#dc2626' };
            case 'REVIEWED': return { bg: '#e0e7ff', color: '#4338ca' };
            case 'COMPLETED': return { bg: '#dcfce7', color: '#166534' };
            case 'PENDING':
            default: return { bg: '#fef3c7', color: '#d97706' };
        }
    };

    const getTypeLabel = (type) => {
        const labels = {
            'BLOOD_TEST': '🩸 Blood Test',
            'X_RAY': '📷 X-Ray',
            'MRI': '🧲 MRI',
            'ECG': '💓 ECG',
            'CT_SCAN': '🔬 CT Scan',
            'URINE_TEST': '🧪 Urine Test',
            'OTHER': '📋 Other',
        };
        return labels[type] || '📋 Test';
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
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Diagnostic History</h2>
                <p className="muted">Access your laboratory findings and reports from the database.</p>
            </div>

            {error && (
                <div className="card mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '1rem' }}>
                    <p className="text-danger" style={{ margin: 0 }}>{error}</p>
                </div>
            )}

            {reports.length === 0 ? (
                <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🔬</div>
                    <h3 className="muted">No diagnostic history</h3>
                    <p className="muted mt-1">Your official hospital lab reports will appear here once uploaded by laboratory staff.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {reports.map((report) => {
                        const statusStyle = getStatusStyle(report.status);

                        return (
                            <div key={report._id} style={{ border: '2px solid #e2e8f0', borderRadius: '20px', padding: '1.75rem', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                                            {report.title}
                                        </h3>
                                        {report.uploadedBy && (
                                            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                                                Uploaded by: <strong>{report.uploadedBy}</strong>
                                            </div>
                                        )}
                                    </div>
                                    <span style={{ 
                                        padding: '0.35rem 0.75rem', 
                                        borderRadius: '20px', 
                                        fontSize: '0.75rem', 
                                        fontWeight: 700, 
                                        textTransform: 'uppercase',
                                        background: statusStyle.bg,
                                        color: statusStyle.color
                                    }}>
                                        {report.status}
                                    </span>
                                </div>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <span style={{ background: '#f1f5f9', color: '#475569', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, marginRight: '0.5rem', display: 'inline-block' }}>
                                        {getTypeLabel(report.reportType)}
                                    </span>
                                </div>

                                {report.description && (
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem', lineHeight: 1.5 }}>
                                        {report.description}
                                    </p>
                                )}

                                <div style={{ fontSize: '0.85rem', color: '#64748b', padding: '1rem', background: '#f8fafc', borderRadius: '12px', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                        <span>Uploaded On</span>
                                        <strong style={{ color: '#1e293b' }}>{new Date(report.createdAt).toLocaleDateString()} {new Date(report.createdAt).toLocaleTimeString()}</strong>
                                    </div>
                                    {report.results && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                            <span>Result Summary</span>
                                            <strong style={{ color: '#1e293b' }}>{report.results}</strong>
                                        </div>
                                    )}
                                </div>

                                {report.doctorComments && (
                                    <div style={{ padding: '1rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                                        <strong style={{ color: '#1e40af' }}>Doctor's Comment:</strong>
                                        <p style={{ margin: '0.5rem 0 0', color: '#1e3a5f' }}>{report.doctorComments}</p>
                                    </div>
                                )}

                                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    {report.filePath && (
                                        <a href={report.filePath} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, minWidth: '150px', justifyContent: 'center', padding: '0.85rem' }}>
                                            <Download size={16} /> Download Report
                                        </a>
                                    )}
                                    <Link to={`/patient/report-detail/${report._id}`} className="btn btn-outline" style={{ flex: 1, minWidth: '150px', justifyContent: 'center', padding: '0.85rem' }}>
                                        <Eye size={16} /> View Details
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default Reports;
