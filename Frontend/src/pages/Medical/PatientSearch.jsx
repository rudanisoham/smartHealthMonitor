import React, { useState } from 'react';
import { 
  Search, 
  User, 
  ChevronRight, 
  Calendar, 
  Phone, 
  Mail,
  History,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const patients = [
    { id: 'PAT-001', name: 'Michael Johnson', age: 42, gender: 'Male', phone: '+1 555-0101', email: 'michael.j@email.com', lastVisit: '2026-04-20' },
    { id: 'PAT-002', name: 'Emma Watson', age: 29, gender: 'Female', phone: '+1 555-0102', email: 'emma.w@email.com', lastVisit: '2026-05-01' },
    { id: 'PAT-003', name: 'Chris Evans', age: 35, gender: 'Male', phone: '+1 555-0103', email: 'chris.e@email.com', lastVisit: '2026-03-15' },
    { id: 'PAT-004', name: 'Scarlett Johansson', age: 31, gender: 'Female', phone: '+1 555-0104', email: 'scarlett.j@email.com', lastVisit: '2026-04-12' },
  ];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="medical-patient-search">
      <div className="mb-8">
        <h2 className="section-title">Patient Lookup</h2>
        <p className="section-subtitle">Search for patients to view medical history or upload reports</p>
      </div>

      <div className="card mb-8">
        <div className="search-bar w-full" style={{ padding: '0.85rem 1.5rem' }}>
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search by Patient Name or ID (e.g. PAT-001)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-2">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="header-avatar" style={{ width: '56px', height: '56px', fontSize: '1.25rem' }}>
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="author-name" style={{ fontSize: '1.1rem' }}>{patient.name}</h3>
                  <div className="muted">{patient.id} • {patient.age} years • {patient.gender}</div>
                </div>
              </div>
              <span className="badge-soft">Last Visit: {patient.lastVisit}</span>
            </div>

            <div className="grid grid-2 gap-4 mt-6 pt-6 border-top">
              <div className="flex items-center gap-2 muted" style={{ fontSize: '0.85rem' }}>
                <Phone size={14} /> {patient.phone}
              </div>
              <div className="flex items-center gap-2 muted" style={{ fontSize: '0.85rem' }}>
                <Mail size={14} /> {patient.email}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="btn btn-outline flex-1 btn-sm">
                <History size={16} /> View History
              </button>
              <button className="btn btn-primary flex-1 btn-sm">
                <FileText size={16} /> Upload Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientSearch;
