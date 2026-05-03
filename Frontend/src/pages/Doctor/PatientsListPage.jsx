import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoctorPatients } from '../../utils/api';

const PatientsListPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getDoctorPatients();
        setPatients(res.data.data);
      } catch (err) {
        setError('Failed to load patients');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading patients...</div>;
  if (error) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error}</div>;
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
            {patients.length} records
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
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{textAlign: 'center', padding: '2rem'}}>No patients found.</td>
                </tr>
              ) : (
                patients.map((patient, index) => (
                  <tr key={`${patient._id}-${index}`}>
                    <td style={{padding: '1.25rem 0.5rem', color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 700}}>
                      {patient.user?.fullName}
                    </td>
                    <td style={{padding: '1.25rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                      {patient.user?.email}
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
                      {patient.phone || patient.user?.phone || '—'}
                    </td>
                    <td style={{padding: '1.25rem 0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600}}>
                      {patient.createdAt ? new Date(patient.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td style={{padding: '1.25rem 0.5rem'}}>
                      <span className="chip-neutral" style={{fontSize: '0.75rem'}}>
                        Registered
                      </span>
                    </td>
                    <td style={{padding: '1.25rem 0.5rem', textAlign: 'center'}}>
                      <Link to={`/doctor/patients/${patient._id}`} className="btn btn-outline btn-sm" style={{padding: '0.4rem 1rem', fontSize: '0.85rem', fontWeight: 600}}>
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientsListPage;
