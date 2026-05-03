import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  MoreVertical, 
  Filter,
  User,
  Calendar,
  FlaskConical,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLabHistory } from '../../utils/api';

const LabHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getLabHistory();
        setHistory(res.data.data);
      } catch (err) {
        console.error("Failed to load lab history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(h => 
    h.patient?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading history...</div>;

  return (
    <div className="lab-history">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="section-title">Diagnostic History Archive</h2>
          <p className="section-subtitle">Review and manage past laboratory reports and test results</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline">
            <Download size={18} /> Export History
          </button>
          <Link to="/lab/upload-report" className="btn btn-primary">
            <FileText size={18} /> New Report
          </Link>
        </div>
      </div>

      <div className="card mb-6">
        <div className="flex justify-between items-center gap-4">
          <div className="search-bar flex-1">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search history by patient, ID or test type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm">
              <Filter size={16} /> Filter
            </button>
            <select className="form-select" style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 1rem', fontSize: '0.85rem' }}>
              <option>All Technicians</option>
              <option>Sarah Jenkins</option>
              <option>Robert Smith</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Lab ID</th>
              <th>Patient</th>
              <th>Test Type</th>
              <th>Date</th>
              <th>Technician</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((item) => (
              <tr key={item._id}>
                <td><strong>{item._id.slice(-6).toUpperCase()}</strong></td>
                <td>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-muted" />
                    <span>{item.patient}</span>
                  </div>
                </td>
                <td><span className="badge-soft">{item.type}</span></td>
                <td>
                  <div className="flex items-center gap-2 muted" style={{ fontSize: '0.85rem' }}>
                    <Calendar size={14} />
                    {item.date}
                  </div>
                </td>
                <td>System Admin</td>
                <td>
                  <span className={item.status === 'REVIEWED' ? 'chip' : (item.status === 'NORMAL' ? 'chip-success' : (item.status === 'ABNORMAL' ? 'chip-danger' : 'chip-warning'))}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end gap-2">
                    <button className="btn-icon" title="View Results">
                      <Eye size={14} />
                    </button>
                    <button className="btn-icon" title="Download PDF">
                      <Download size={14} />
                    </button>
                    <button className="btn-icon">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="muted">Showing {filteredHistory.length} of {history.length} records</p>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm" disabled>Previous</button>
          <button className="btn btn-primary btn-sm">1</button>
          <button className="btn btn-outline btn-sm">2</button>
          <button className="btn btn-outline btn-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default LabHistory;
