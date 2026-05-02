import React, { useState } from 'react';
import { Search, UserPlus, ArrowRight, CheckCircle2 } from 'lucide-react';
import '../../styles/Dashboard.css'; // Reusing base styles

const PatientEntry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDept, setSelectedDept] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const patients = [
    { id: 'PAT001', name: 'John Smith', email: 'john.smith@email.com' },
    { id: 'PAT002', name: 'Sarah Wilson', email: 'sarah.w@email.com' },
    { id: 'PAT003', name: 'Michael Brown', email: 'm.brown@email.com' },
  ];

  const departments = [
    { id: 'DEPT1', name: 'Cardiology', beds: 5 },
    { id: 'DEPT2', name: 'Neurology', beds: 2 },
    { id: 'DEPT3', name: 'Pediatrics', beds: 0 },
    { id: 'DEPT4', name: 'General Medicine', beds: 8 },
  ];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = (e) => {
    e.preventDefault();
    if (selectedPatient && selectedDept) {
      setSuccessMsg(`Patient ${selectedPatient.name} has been assigned to ${selectedDept} department successfully.`);
      setTimeout(() => setSuccessMsg(''), 5000);
      setSelectedPatient(null);
      setSelectedDept('');
      setSearchTerm('');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Patient Entry</h1>
          <p>Register or assign patients to departments</p>
        </div>
      </header>

      {successMsg && (
        <div className="alert-box success">
          <CheckCircle2 size={20} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="content-grid grid-2">
        <div className="dashboard-card">
          <div className="card-header">
            <div className="header-info">
              <h3>Assign Existing Patient</h3>
              <p>Search and allocate beds to registered patients</p>
            </div>
          </div>
          
          <form className="entry-form" onSubmit={handleAssign}>
            <div className="form-group">
              <label>Search Patient</label>
              <div className="search-input-wrapper">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Patient name or ID..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {searchTerm && !selectedPatient && (
                <div className="search-results">
                  {filteredPatients.map(p => (
                    <div key={p.id} className="result-item" onClick={() => {
                      setSelectedPatient(p);
                      setSearchTerm(p.name);
                    }}>
                      <span className="result-name">{p.name}</span>
                      <span className="result-id">{p.id}</span>
                    </div>
                  ))}
                  {filteredPatients.length === 0 && <div className="no-results">No patients found</div>}
                </div>
              )}
            </div>

            <div className="form-group mt-4">
              <label>Select Department</label>
              <select 
                className="form-select" 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                required
              >
                <option value="">Choose a department...</option>
                {departments.map(d => (
                  <option key={d.id} value={d.name} disabled={d.beds === 0}>
                    {d.name} ({d.beds} beds available)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-action mt-5">
              <button type="submit" className="btn-primary-full" disabled={!selectedPatient || !selectedDept}>
                Assign Patient <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div className="header-info">
              <h3>Register New Patient</h3>
              <p>Onboard new members to the system</p>
            </div>
          </div>
          <div className="registration-promo">
            <div className="promo-icon">
              <UserPlus size={48} />
            </div>
            <p>To register a completely new patient into the system, direct them to the self-registration portal or use the administrative patient creation tool.</p>
            <div className="promo-actions">
              <button className="btn-secondary-full" onClick={() => window.open('/auth/patient/register', '_blank')}>
                Open Registration Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientEntry;
