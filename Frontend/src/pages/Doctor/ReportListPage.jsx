import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Search, Calendar, User, Eye, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { getLabReports } from '../../utils/api';

const ReportListPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getLabReports();
        setReports(res.data.data);
      } catch (err) {
        console.error('Failed to load reports', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredReports = reports.filter(r => 
    (r.patient?.user?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
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

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading reports...</div>;

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
                <tr key={r._id}>
                  <td className="muted" style={{ fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Calendar size={14} /> {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{r.patient?.user?.fullName}</div>
                  </td>
                  <td>{r.title}</td>
                  <td>
                    <span className="chip-neutral" style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>
                      {(r.reportType || 'OTHER').toLowerCase().replace('_', ' ')}
                    </span>
                  </td>
                  <td>{getStatusChip(r.status)}</td>
                  <td className="muted" style={{ fontSize: '0.85rem' }}>{r.uploadedBy || 'N/A'}</td>
                  <td className="text-right">
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <Link to={`/doctor/report-view?id=${r._id}`} className="btn btn-outline btn-sm" style={{ padding: '0.4rem 0.75rem' }}>
                        <Eye size={14} />
                      </Link>
                      {r.filePath && (
                        <a href={`http://localhost:5000/${r.filePath}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" style={{ padding: '0.4rem 0.75rem' }}>
                          <Download size={14} />
                        </a>
                      )}
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
