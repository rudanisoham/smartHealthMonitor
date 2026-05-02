import React, { useState } from 'react';
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

const LabHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const history = [
    { id: 'LAB-501', patient: 'Sarah Miller', test: 'Complete Blood Count', date: '2026-05-02', status: 'Finalized', technician: 'S. Jenkins' },
    { id: 'LAB-500', patient: 'John Doe', test: 'Thyroid Panel', date: '2026-05-01', status: 'Finalized', technician: 'S. Jenkins' },
    { id: 'LAB-498', patient: 'Emma Watson', test: 'Blood Glucose', date: '2026-04-30', status: 'Finalized', technician: 'R. Smith' },
    { id: 'LAB-495', patient: 'Michael Johnson', test: 'Chest X-Ray (Diag)', date: '2026-04-28', status: 'Finalized', technician: 'S. Jenkins' },
    { id: 'LAB-492', patient: 'Chris Evans', test: 'Lipid Profile', date: '2026-04-25', status: 'Needs Review', technician: 'R. Smith' },
  ];

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
            {history.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.id}</strong></td>
                <td>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-muted" />
                    <span>{item.patient}</span>
                  </div>
                </td>
                <td><span className="badge-soft">{item.test}</span></td>
                <td>
                  <div className="flex items-center gap-2 muted" style={{ fontSize: '0.85rem' }}>
                    <Calendar size={14} />
                    {item.date}
                  </div>
                </td>
                <td>{item.technician}</td>
                <td>
                  <span className={item.status === 'Finalized' ? 'chip' : 'chip-warning'}>
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
        <p className="muted">Showing 5 of 2,450 records</p>
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
