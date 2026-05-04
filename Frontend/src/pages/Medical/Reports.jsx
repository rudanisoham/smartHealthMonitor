import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Download,
  Calendar,
  User,
  Clock,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getReports } from '../../utils/api';

const MedicalReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getReports();
        setReports(res.data.data);
      } catch (err) {
        console.error("Failed to load reports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = reports.filter(r => 
    (r.patient && r.patient.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (r.title && r.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="medical-reports">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="section-title">Diagnostic Reports</h2>
          <p className="section-subtitle">Manage and view all patient medical reports</p>
        </div>
        <Link to="/medical/upload-report" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Upload Report
        </Link>
      </div>

      <div className="card shadow-sm mb-6">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="search-bar" style={{ flex: 1, position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
            <input 
              type="text" 
              className="form-control"
              style={{ paddingLeft: '40px' }}
              placeholder="Search reports by patient or title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card shadow-sm" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ margin: 0, border: 'none' }}>
          <table className="w-100">
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '1rem' }}>Patient Name</th>
                <th>Report Title</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right" style={{ paddingRight: '1.5rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? filteredReports.map((report) => (
                <tr key={report._id} className="hover-row" style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={14} className="muted" /> {report.patient}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{report.title}</div>
                  </td>
                  <td className="muted" style={{ fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={12} /> {report.date}
                    </div>
                  </td>
                  <td>
                    <span className={`chip-${report.status === 'PENDING' ? 'warning' : 'neutral'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="text-right" style={{ paddingRight: '1.5rem' }}>
                    <button className="btn btn-outline btn-sm">View Report</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 muted">
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📁</div>
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .hover-row:hover { background-color: #f8fafc; }
        .loader { border: 3px solid #f3f3f3; border-radius: 50%; border-top: 3px solid var(--primary); width: 24px; height: 24px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default MedicalReports;
