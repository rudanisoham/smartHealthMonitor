import React, { useState } from 'react';
import { Search, UserPlus, ArrowRight, CheckCircle2, User, UserCheck, LayoutPanelLeft } from 'lucide-react';

const PatientEntry = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDept, setSelectedDept] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const patients = [
    { id: 'PAT001', name: 'John Smith', email: 'john.smith@email.com', phone: '+1 234 567 8901' },
    { id: 'PAT002', name: 'Sarah Wilson', email: 'sarah.w@email.com', phone: '+1 234 567 8902' },
    { id: 'PAT003', name: 'Michael Brown', email: 'm.brown@email.com', phone: '+1 234 567 8903' },
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
      setSuccessMsg(`Patient ${selectedPatient.name} has been assigned to ${selectedDept} successfully.`);
      setTimeout(() => setSuccessMsg(''), 5000);
      setSelectedPatient(null);
      setSelectedDept('');
      setSearchTerm('');
    }
  };

  return (
    <div className="admin-content">
      <div className="mb-6">
        <h2 className="section-title">Patient Intake & Entry</h2>
        <p className="section-subtitle">Search for registered patients or initiate new registration</p>
      </div>

      {successMsg && (
        <div style={{
          background: 'var(--success-light)', 
          color: 'var(--success)', 
          padding: '1rem', 
          borderRadius: '12px', 
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: '600'
        }}>
          <CheckCircle2 size={20} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Assign Registered Patient</h3>
          </div>
          
          <form className="mt-4" onSubmit={handleAssign}>
            <div className="form-group">
              <label>Search Patient (ID or Name)</label>
              <div className="search-bar w-full">
                <Search className="search-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="e.g. PAT001 or John..." 
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (selectedPatient) setSelectedPatient(null);
                  }}
                />
              </div>
              
              {searchTerm && !selectedPatient && (
                <div className="card mt-2" style={{ padding: '0.5rem', position: 'absolute', width: '90%', zIndex: 10, boxShadow: 'var(--shadow-lg)' }}>
                  {filteredPatients.map(p => (
                    <div 
                      key={p.id} 
                      style={{ 
                        padding: '0.75rem', 
                        cursor: 'pointer', 
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      onClick={() => {
                        setSelectedPatient(p);
                        setSearchTerm(p.name);
                      }}
                    >
                      <div>
                        <div className="author-name">{p.name}</div>
                        <div className="muted" style={{ fontSize: '0.75rem' }}>{p.email}</div>
                      </div>
                      <span className="badge-soft">{p.id}</span>
                    </div>
                  ))}
                  {filteredPatients.length === 0 && <div className="muted p-2">No patients found</div>}
                </div>
              )}
            </div>

            {selectedPatient && (
              <div className="card mt-4" style={{ background: '#f8fafc', border: '1px dashed var(--primary)' }}>
                <div className="flex items-center gap-3">
                  <div className="header-avatar">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <div className="author-name">{selectedPatient.name}</div>
                    <div className="muted">{selectedPatient.phone}</div>
                  </div>
                  <UserCheck className="ms-auto" style={{ color: 'var(--success)' }} />
                </div>
              </div>
            )}

            <div className="form-group mt-4">
              <label>Assign to Department</label>
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

            <button type="submit" className="btn btn-primary w-full mt-6" disabled={!selectedPatient || !selectedDept}>
              Confirm Admission <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">New Patient Registration</h3>
          </div>
          
          <div className="mt-6 text-center py-8">
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'var(--primary-light)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.5rem',
              color: 'var(--primary)'
            }}>
              <UserPlus size={40} />
            </div>
            <h4 className="author-name" style={{ fontSize: '1.25rem' }}>Register New Patient</h4>
            <p className="muted px-8 mt-2 mb-8">
              If the patient is not yet in our system, you can either guide them to the self-registration kiosk or open the registration portal.
            </p>
            
            <div className="grid grid-2 px-4 gap-3">
              <button className="btn btn-outline" onClick={() => window.open('/auth/patient/register', '_blank')}>
                Public Portal
              </button>
              <button className="btn btn-primary" onClick={() => alert('Opening internal registration form...')}>
                Internal Form
              </button>
            </div>
          </div>

          <div className="card mt-4" style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
            <div className="flex gap-3">
              <LayoutPanelLeft className="text-accent" size={20} />
              <div>
                <div className="author-name" style={{ fontSize: '0.9rem' }}>Kiosk Assistance</div>
                <div className="muted" style={{ fontSize: '0.8rem' }}>Help patients scan QR codes for rapid check-in at the desk.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientEntry;
