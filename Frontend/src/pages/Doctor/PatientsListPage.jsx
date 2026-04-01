import React from 'react';
import { Link } from 'react-router-dom';

const mockPatients = [
  { id: 1, name: "Soham Rudani", email: "rudanisoham1@gmail.com", bloodGroup: "A+", phone: "+919316202895", date: "2026-04-09 10:04", status: "CANCELLED" },
  { id: 2, name: "soham", email: "rudanisoham9@gmail.com", bloodGroup: "A+", phone: "9316202895", date: "2026-04-02 15:41", status: "Completed" },
  { id: 3, name: "neha", email: "neha@gmail.com", bloodGroup: null, phone: "1234567890", date: "2026-04-01 10:39", status: "Completed" },
  { id: 4, name: "Soham Rudani", email: "rudanisoham1@gmail.com", bloodGroup: "A+", phone: "+919316202895", date: "2026-04-01 10:00", status: "Completed" },
];

const PatientsListPage = () => {
  return (
    <>
      <div className="card-header-flex" style={{marginBottom: '2rem'}}>
        <div>
          <h1 className="page-title" style={{fontSize: '1.5rem', marginBottom: '0.25rem'}}>Patient List</h1>
          <div className="muted" style={{fontSize: '1rem'}}>All patients who have booked appointments with you</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{alignItems: 'center', marginBottom: '1.5rem'}}>
          <div>
            <div className="section-title" style={{fontSize: '1.2rem'}}>My Patients</div>
            <div className="section-subtitle">Patients who have booked appointments with you</div>
          </div>
          <span className="chip-neutral" style={{fontSize: '0.8rem', padding: '0.4rem 1rem'}}>
            {mockPatients.length} records
          </span>
        </div>
        
        <div className="table-container mt-0" style={{border: 'none', background: 'transparent'}}>
          <table style={{width: '100%'}}>
            <thead>
              <tr>
                <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>PATIENT NAME</th>
                <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>EMAIL</th>
                <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>BLOOD GROUP</th>
                <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>PHONE</th>
                <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>APPOINTMENT DATE</th>
                <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>STATUS</th>
                <th style={{background: 'transparent', padding: '1rem 0.5rem', textAlign: 'center'}}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {mockPatients.map((patient, index) => (
                <tr key={`${patient.id}-${index}`}>
                  <td style={{padding: '1.25rem 0.5rem', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 700}}>
                    {patient.name}
                  </td>
                  <td style={{padding: '1.25rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                    {patient.email}
                  </td>
                  <td style={{padding: '1.25rem 0.5rem'}}>
                    {patient.bloodGroup ? (
                      <span style={{color: '#10b981', background: '#d1fae5', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600}}>
                        {patient.bloodGroup}
                      </span>
                    ) : (
                      <span style={{color: 'var(--text-muted)'}}>—</span>
                    )}
                  </td>
                  <td style={{padding: '1.25rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                    {patient.phone}
                  </td>
                  <td style={{padding: '1.25rem 0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600}}>
                    {patient.date}
                  </td>
                  <td style={{padding: '1.25rem 0.5rem'}}>
                    {patient.status === 'CANCELLED' ? (
                      <span style={{color: '#ef4444', background: '#fee2e2', padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800}}>
                        CANCELLED
                      </span>
                    ) : (
                      <span className="chip-neutral" style={{fontSize: '0.75rem'}}>
                        {patient.status}
                      </span>
                    )}
                  </td>
                  <td style={{padding: '1.25rem 0.5rem', textAlign: 'center'}}>
                    <Link to={`/doctor/patients/${patient.id}`} className="btn btn-outline btn-sm" style={{padding: '0.4rem 1rem', fontSize: '0.85rem', fontWeight: 600}}>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientsListPage;
