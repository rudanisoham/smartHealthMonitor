import React, { useState, useEffect } from 'react';
import { Menu, FileText, Search, Trash2, Plus, CheckCircle2, AlertCircle, FileUp } from 'lucide-react';
import '../../styles/Reports.css';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newReport, setNewReport] = useState({
        title: '',
        description: '',
        findings: ''
    });
    const [statusMessage, setStatusMessage] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('medical_reports');
        if (stored) {
            setReports(JSON.parse(stored));
        } else {
            const initial = [
                { id: 1, date: '2026-03-28', title: 'Annual Physical Results', description: 'Routine checkup', findings: 'All vitals within normal range.' },
                { id: 2, date: '2026-04-01', title: 'Blood Glucose Test', description: 'Fasting test', findings: 'Glucose level: 95 mg/dL (Normal).' }
            ];
            setReports(initial);
            localStorage.setItem('medical_reports', JSON.stringify(initial));
        }
    }, []);

    const handleSave = () => {
        if (!newReport.title.trim()) {
            setStatusMessage({ type: 'error', text: 'Please provide a report title.' });
            return;
        }

        const reportToAdd = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            ...newReport
        };

        const updated = [reportToAdd, ...reports];
        setReports(updated);
        localStorage.setItem('medical_reports', JSON.stringify(updated));

        setNewReport({ title: '', description: '', findings: '' });
        setStatusMessage({ type: 'success', text: 'Report saved successfully!' });
        setTimeout(() => setStatusMessage(null), 3000);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this report?')) {
            const updated = reports.filter(r => r.id !== id);
            setReports(updated);
            localStorage.setItem('medical_reports', JSON.stringify(updated));
        }
    };

    const filteredReports = reports.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="reports-container">
            {/* Top Stat Card */}
            <div className="top-stat-section">
                <div className="stat-card-wide">
                    <div className="stat-icon-bg">
                        <FileText size={24} className="text-blue-primary" />
                    </div>
                    <div className="stat-info">
                        <h3 className="stat-card-title">Total Medical Reports</h3>
                        <div className="stat-card-value text-blue-primary">{reports.length}</div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="reports-grid">

                {/* Left Panel: Add New Report */}
                <div className="report-form-panel">
                    <div className="panel-header-simple">
                        <div className="header-icon-wrap">
                            <Plus size={20} className="text-blue-primary" />
                        </div>
                        <div>
                            <h2>Add New Report</h2>
                            <p>Manually record results from your medical tests</p>
                        </div>
                    </div>

                    {statusMessage && (
                        <div className={`status-banner ${statusMessage.type}`}>
                            {statusMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            {statusMessage.text}
                        </div>
                    )}

                    <form className="report-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>Report Title / Test Name*</label>
                            <input
                                type="text"
                                className="standard-input"
                                placeholder="e.g. Blood Test, Chest X-Ray"
                                value={newReport.title}
                                onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Summary / Description</label>
                            <textarea
                                className="standard-textarea"
                                placeholder="Brief reason or context..."
                                rows="2"
                                value={newReport.description}
                                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>Findings & Observations</label>
                            <textarea
                                className="standard-textarea"
                                placeholder="Enter detailed results or conclusions..."
                                rows="4"
                                value={newReport.findings}
                                onChange={(e) => setNewReport({ ...newReport, findings: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="form-group pt-2">
                            <label>Attach PDF/Image (Optional)</label>
                            <div className="file-upload-zone">
                                <FileUp size={24} className="upload-icon" />
                                <span>Choose files or drag & drop</span>
                                <input type="file" className="hidden-file-input" />
                            </div>
                        </div>

                        <button type="button" className="btn-save-report" onClick={handleSave}>
                            Save Report to History
                        </button>
                    </form>
                </div>

                {/* Right Panel: Reports History */}
                <div className="reports-history-panel">
                    <div className="panel-header-simple history-header">
                        <div className="header-icon-wrap">
                            <FileText size={20} className="text-blue-primary" />
                        </div>
                        <div className="flex-grow">
                            <h2>Reports History</h2>
                            <p>Search and manage your medical records</p>
                        </div>
                    </div>

                    <div className="search-bar-reports">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Filter by title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="reports-table-wrapper">
                        <table className="reports-table">
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>TITLE</th>
                                    <th className="actions-header">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReports.map(report => (
                                    <tr key={report.id}>
                                        <td className="report-date">{report.date}</td>
                                        <td>
                                            <div className="report-info-cell">
                                                <span className="report-title">{report.title}</span>
                                                <span className="report-desc-preview">{report.description}</span>
                                            </div>
                                        </td>
                                        <td className="actions-cell">
                                            <div className="report-actions">
                                                <button
                                                    className="btn-report-view"
                                                    onClick={() => alert(`Findings for ${report.title}:\n\n${report.findings}`)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="btn-report-delete"
                                                    onClick={() => handleDelete(report.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredReports.length === 0 && (
                                    <tr className="empty-row">
                                        <td colSpan="3">
                                            <div className="empty-state-reports">
                                                <Search size={32} />
                                                <p>No reports found matching your search.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Reports;
