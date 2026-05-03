import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Search, Calendar, User, Eye, Download, CheckCircle, AlertTriangle } from 'lucide-react';

const ReportListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    { id: 1, date: "2026-03-15", patient: "Soham Rudani", title: "Blood Test CBC", type: "BLOOD_TEST", status: "REVIEWED", uploadedBy: "Lab Tech #4" },
    { id: 2, date: "2026-03-18", patient: "Neha Sharma", title: "Chest X-Ray", type: "X_RAY", status: "PENDING", uploadedBy: "Radiology Dept" },
    { id: 3, date: "2026-03-20", patient: "Alice Baker", title: "MRI Brain Scan", type: "MRI", status: "ABNORMAL", uploadedBy: "Dr. Smith" },
    { id: 4, date: "2026-03-22", patient: "Mike Wilson", title: "ECG Summary", type: "ECG", status: "NORMAL", uploadedBy: "Cardio Unit" },
  ];

  const filteredReports = reports.filter(r => 
    r.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusChip = (status) => {
    switch (status) {
      case 'PENDING': return <span className="chip-warning" style={{ fontSize: '0.75rem' }}>Pending</span>;
      case 'REVIEWED': return <span className="chip-success" style={{ fontSize: '0.75rem' }}>Reviewed</span>;
      case 'NORMAL': return <span className="chip" style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#16a34a' }}>Normal</span>;
      case 'ABNORMAL': return <span className="chip-danger" style={{ fontSize: '0.75rem' }}>Abnormal</span>;
      default: return <span className="chip-neutral" style={{ fontSize: '0.75rem' }}>{status}</span>;
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Medical Reports</h2>
          <p className="muted" style={{ marginTop: '0.25rem' }}>View and manage patient clinical records</p>
        </div>
        <Link to="/doctor/reports/upload" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px' }}>
          <Plus size={18} /> Upload Report
        </Link>
      </div>

      <div className="card">
        <div className="card-header border-bottom pb-4 mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="section-title">All Reports</h3>
            <p className="muted" style={{ fontSize: '0.85rem' }}>{filteredReports.length} reports found</p>
          </div>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by patient or title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control" 
              style={{ paddingLeft: '2.75rem', borderRadius: '10px' }}
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Patient</th>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Uploaded By</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(r => (
                <tr key={r.id}>
                  <td className="muted" style={{ fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={14} /> {r.date}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{r.patient}</div>
                  </td>
                  <td>{r.title}</td>
                  <td>
                    <span className="chip-neutral" style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>
                      {r.type.toLowerCase().replace('_', ' ')}
                    </span>
                  </td>
                  <td>{getStatusChip(r.status)}</td>
                  <td className="muted" style={{ fontSize: '0.85rem' }}>{r.uploadedBy}</td>
                  <td className="text-right">
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <Link to={`/doctor/report-view?id=${r.id}`} className="btn btn-outline btn-sm" style={{ padding: '0.4rem 0.75rem' }}>
                        <Eye size={14} />
                      </Link>
                      <button className="btn btn-outline btn-sm" style={{ padding: '0.4rem 0.75rem' }}>
                        <Download size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#94a3b8' }}>
                      <FileText size={48} opacity={0.3} />
                      <p>No reports found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportListPage;
