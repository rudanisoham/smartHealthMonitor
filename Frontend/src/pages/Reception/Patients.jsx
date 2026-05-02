import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import '../../styles/Dashboard.css';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patientList = [
    { id: 'PAT001', name: 'John Smith', email: 'john.smith@email.com', gender: 'Male', age: 45, status: 'Admitted' },
    { id: 'PAT002', name: 'Sarah Wilson', email: 'sarah.w@email.com', gender: 'Female', age: 32, status: 'Outpatient' },
    { id: 'PAT003', name: 'Michael Brown', email: 'm.brown@email.com', gender: 'Male', age: 58, status: 'Admitted' },
    { id: 'PAT004', name: 'Emily Davis', email: 'emily.d@email.com', gender: 'Female', age: 24, status: 'Outpatient' },
    { id: 'PAT005', name: 'Robert Johnson', email: 'robt.j@email.com', gender: 'Male', age: 39, status: 'Discharged' },
    { id: 'PAT006', name: 'Emma Wilson', email: 'emma.w@email.com', gender: 'Female', age: 29, status: 'Outpatient' },
    { id: 'PAT007', name: 'David Lee', email: 'd.lee@email.com', gender: 'Male', age: 52, status: 'Admitted' },
  ];

  const filteredPatients = patientList.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Patient Records</h1>
          <p>Manage and view all registered patients</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-filter">
            <Filter size={18} /> Filter
          </button>
        </div>
      </header>

      <div className="dashboard-card no-padding overflow-hidden">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Full Name</th>
                <th>Gender/Age</th>
                <th>Contact info</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="fw-bold">{patient.id}</td>
                  <td>{patient.name}</td>
                  <td className="text-muted">{patient.gender}, {patient.age}y</td>
                  <td>{patient.email}</td>
                  <td>
                    <span className={`status-pill ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="action-icons">
                      <button className="icon-btn" title="View Detail"><Eye size={16} /></button>
                      <button className="icon-btn" title="Edit Record"><Edit size={16} /></button>
                      <button className="icon-btn danger" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colspan="6" className="text-center py-5 text-muted">
                    No matching patient records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;
