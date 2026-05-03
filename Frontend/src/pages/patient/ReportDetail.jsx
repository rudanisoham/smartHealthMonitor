import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReport } from '../../utils/api';
import { Loader, ArrowLeft, Download, FileText } from 'lucide-react';

const ReportDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReport();
    }, [id]);

    const fetchReport = async () => {
        try {
            setLoading(true);
            const res = await getReport(id);
            if (res.data.success) {
                setReport(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching report:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-content flex justify-center items-center" style={{ minHeight: '400px' }}>
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (!report) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p className="muted">Report not found.</p>
                <button onClick={() => navigate(-1)} className="btn btn-outline mt-4">← Back</button>
            </div>
        );
    }

    const statusColors = {
        'NORMAL': { bg: '#d1fae5', color: '#059669' },
        'ABNORMAL': { bg: '#fee2e2', color: '#dc2626' },
        'REVIEWED': { bg: '#e0e7ff', color: '#4338ca' },
        'PENDING': { bg: '#fef3c7', color: '#d97706' },
    };
    const sc = statusColors[report.status] || statusColors['PENDING'];

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">
                    <ArrowLeft size={16} /> Back to Records
                </button>
            </div>

            <div className="card">
                <div className="card-header border-bottom pb-4 mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="section-title" style={{ fontSize: '1.75rem' }}>{report.title}</h1>
                        <div className="muted mt-1">Recorded on: {new Date(report.createdAt).toLocaleString()}</div>
                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, background: sc.bg, color: sc.color }}>{report.status}</span>
                            <span className="chip-neutral" style={{ fontSize: '0.7rem' }}>{report.reportType?.replace('_', ' ')}</span>
                        </div>
                    </div>
                    {report.filePath && (
                        <button className="btn btn-primary" onClick={() => window.open(report.filePath, '_blank')}>
                            <Download size={16} /> Download Report
                        </button>
                    )}
                </div>

                <div className="grid grid-2 mt-4" style={{ gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#1e293b' }}>Clinical Context</h3>
                        <p className="muted" style={{ lineHeight: 1.7, fontSize: '1rem' }}>
                            {report.description || 'No description provided.'}
                        </p>
                        {report.uploadedBy && (
                            <p className="muted" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                                Uploaded by: <strong style={{ color: '#1e293b' }}>{report.uploadedBy}</strong>
                            </p>
                        )}
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#1e293b' }}>Summary Findings</h3>
                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontSize: '0.95rem', color: '#1e293b' }}>
                            {report.results || 'Results pending...'}
                        </div>
                    </div>
                </div>

                {report.doctorComments && (
                    <div style={{ marginTop: '2rem', padding: '1.25rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px' }}>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#1e40af' }}>Doctor's Comments</h3>
                        <p style={{ color: '#1e3a5f', lineHeight: 1.6 }}>{report.doctorComments}</p>
                    </div>
                )}

                <div className="mt-8 pt-6 border-top" style={{ borderTop: '1px solid #e2e8f0', marginTop: '2rem', paddingTop: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Document Preview</h3>
                    <div style={{ textAlign: 'center', background: '#f1f5f9', padding: '2rem', borderRadius: '12px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        <div>
                            <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                            <p>{report.filePath ? 'Document preview would appear here.' : 'No document attached to this report.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetail;
