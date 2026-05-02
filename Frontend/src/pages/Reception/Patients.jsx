import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, Edit, UserX } from 'lucide-react';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    { id: 'PAT001', name: 'John Smith', age: 45, gender: 'Male', phone: '+1 234 567 8901', status: 'Active', bloodGroup: 'O+' },
    { id: 'PAT002', name: 'Sarah Wilson', age: 32, gender: 'Female', phone: '+1 234 567 8902', status: 'Inpatient', bloodGroup: 'A-' },
    { id: 'PAT003', name: 'Michael Brown', age: 28, gender: 'Male', phone: '+1 234 567 8903', status: 'Active', bloodGroup: 'B+' },
    { id: 'PAT004', name: 'Emily Davis', age: 19, gender: 'Female', phone: '+1 234 567 8904', status: 'Outpatient', bloodGroup: 'O-' },
    { id: 'PAT005', name: 'Robert Johnson', age: 62, gender: 'Male', phone: '+1 234 567 8905', status: 'Critical', bloodGroup: 'AB+' },
  ];

  return (
    <div className="admin-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Patient Directory</h2>
          <p className="section-subtitle">Manage and view all registered patient records</p>
        </div>
        <div className="flex gap-3">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline">
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Full Name</th>
              <th>Age/Gender</th>
              <th>Blood Group</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td><span className="badge-soft">{patient.id}</span></td>
                <td>
                  <div className="flex-author">
                    <div className="header-avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                      {patient.name.charAt(0)}
                    </div>
                    <span className="author-name">{patient.name}</span>
                  </div>
                </td>
                <td><span className="author-name">{patient.age}Y</span> <span className="muted">/ {patient.gender}</span></td>
                <td><span className="chip-neutral">{patient.bloodGroup}</span></td>
                <td><span className="muted">{patient.phone}</span></td>
                <td>
                  <span className={`chip ${
                    patient.status === 'Critical' ? 'chip-danger' : 
                    patient.status === 'Inpatient' ? 'chip-warning' : 
                    'chip'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn-icon" title="View Profile"><Eye size={16} /></button>
                    <button className="btn-icon" title="Edit Record"><Edit size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className="muted">Showing {patients.length} patients</span>
        <div className="flex gap-2">
          <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem' }}>Previous</button>
          <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem' }}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Patients;
