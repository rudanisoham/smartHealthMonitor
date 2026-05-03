import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  MoreVertical, 
  Filter,
  User,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MedicalReports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const reports = [
    { id: 'REP-101', patient: 'Michael Johnson', type: 'Complete Blood Count', date: '2026-05-01', status: 'Final', doctor: 'Dr. Sarah Connor' },
    { id: 'REP-102', patient: 'Emma Watson', type: 'Chest X-Ray', date: '2026-05-01', status: 'Pending Review', doctor: 'Dr. James Wilson' },
    { id: 'REP-103', patient: 'Chris Evans', type: 'ECG Report', date: '2026-04-30', status: 'Final', doctor: 'Dr. Lisa Cuddy' },
    { id: 'REP-104', patient: 'Scarlett Johansson', type: 'Lipid Profile', date: '2026-04-28', status: 'Final', doctor: 'Dr. Sarah Connor' },
    { id: 'REP-105', patient: 'Robert Downey', type: 'Urine Analysis', date: '2026-04-25', status: 'Final', doctor: 'Dr. Eric Foreman' },
  ];

  return (
    <div className="medical-reports">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="section-title">Medical Reports Archive</h2>
          <p className="section-subtitle">Access and manage all diagnostic reports and lab results</p>
        </div>
        <Link to="/medical/upload-report" className="btn btn-primary">
          <FileText size={18} /> Upload New Report
        </Link>
      </div>

      <div className="card mb-6">
        <div className="flex justify-between items-center gap-4">
          <div className="search-bar flex-1">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search reports by patient or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm">
              <Filter size={16} /> Filter
            </button>
            <button className="btn btn-outline btn-sm">
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Patient</th>
              <th>Report Type</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((rep) => (
              <tr key={rep.id}>
                <td><strong>{rep.id}</strong></td>
                <td>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-muted" />
                    <span>{rep.patient}</span>
                  </div>
                </td>
                <td><span className="badge-soft">{rep.type}</span></td>
                <td>
                  <div className="flex items-center gap-2 muted" style={{ fontSize: '0.85rem' }}>
                    <Calendar size={14} />
                    {rep.date}
                  </div>
                </td>
                <td>
                  <span className={rep.status === 'Final' ? 'chip' : 'chip-warning'}>
                    {rep.status}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end gap-2">
                    <button className="btn-icon" title="View Report">
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
    </div>
  );
};

export default MedicalReports;
