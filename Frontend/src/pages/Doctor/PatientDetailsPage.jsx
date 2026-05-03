import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, Stethoscope, Droplets, Thermometer } from 'lucide-react';
import { getPatientDetails } from '../../utils/api';

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPatientDetails(id);
        setData(res.data.data);
      } catch (err) {
        setError('Failed to load patient details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading details...</div>;
  if (error || !data) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>{error || 'Not found'}</div>;

  const { patient, latestVitals, prescriptions, labReports } = data;

  return (
    <>
      <div className="card-header-flex" style={{marginBottom: '2rem'}}>
        <div>
          <h1 className="page-title" style={{fontSize: '1.5rem', marginBottom: '0.25rem'}}>Patient Profile</h1>
          <div className="muted" style={{fontSize: '1rem'}}>Clinical history and health records</div>
        </div>
      </div>

      <div style={{marginBottom: '1.5rem'}}>
        <Link to="/doctor/patients" className="btn btn-outline btn-sm" style={{fontWeight: 600}}>
          <ChevronLeft size={16} /> Back to Patient List
        </Link>
      </div>

      {/* Top Section: Identity and Vitals */}
      <div className="grid grid-2" style={{alignItems: 'start'}}>
        
        {/* Patient Info Card */}
        <div className="card">
           <div className="card-header" style={{alignItems: 'center'}}>
              <div>
                <div className="section-title" style={{fontSize: '1.3rem'}}>{patient.user?.fullName}</div>
                <div className="section-subtitle">ID: {patient._id}</div>
              </div>
              <span className="muted" style={{fontWeight: 500}}>Patient</span>
           </div>
           
           <div className="mt-4">
              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Email</div>
                <div style={{fontWeight: 600, color: 'var(--text-main)'}}>{patient.user?.email}</div>
              </div>

              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Phone</div>
                <div style={{fontWeight: 600, color: 'var(--text-main)'}}>{patient.phone || patient.user?.phone || '—'}</div>
              </div>

              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Gender</div>
                <div style={{fontWeight: 600, color: 'var(--text-main)'}}>{patient.gender || '—'}</div>
              </div>

              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Blood Group</div>
                <div style={{fontWeight: 600, color: '#ef4444', background: '#fee2e2', display: 'inline-block', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem'}}>{patient.bloodGroup || '—'}</div>
              </div>
           </div>
        </div>

        {/* Latest Recorded Vitals Card */}
        <div className="card" style={{borderTop: '3px solid var(--primary)'}}>
           <div className="card-header" style={{alignItems: 'center'}}>
              <div>
                 <div className="section-title" style={{fontSize: '1.2rem'}}>Latest Recorded Vitals</div>
                 <div className="section-subtitle">Real-time health telemetry</div>
              </div>
              {latestVitals ? (
                <span className="chip" style={{fontSize: '0.75rem'}}>✓ UPDATED</span>
              ) : (
                <span className="chip-neutral" style={{fontSize: '0.75rem'}}>NO DATA</span>
              )}
           </div>
           
           <div className="muted mt-2" style={{fontSize: '0.85rem', marginBottom: '1.5rem'}}>
             {latestVitals ? `Recorded on: ${new Date(latestVitals.createdAt).toLocaleString()}` : 'No vitals recorded yet.'}
           </div>

           <div>
              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                   <Heart size={14}/> Heart Rate
                </div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem'}}>{latestVitals?.heartRate || '—'} bpm</div>
              </div>
              
              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                   <Stethoscope size={14}/> Blood Pressure
                </div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem'}}>{latestVitals?.bloodPressure || '—'} mmHg</div>
              </div>

              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                   <Droplets size={14}/> SpO2 (Oxygen)
                </div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem'}}>{latestVitals?.spo2 || '—'}%</div>
              </div>

              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                   <Thermometer size={14}/> Temperature
                </div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem'}}>{latestVitals?.temperature || '—'}°C</div>
              </div>
           </div>
        </div>

      </div>

      {/* Clinical History Section */}
      <div className="card mt-4">
         <div className="card-header" style={{alignItems: 'center', margin: 0}}>
            <div>
               <div className="section-title" style={{fontSize: '1.2rem'}}>Clinical History</div>
               <div className="section-subtitle">Past prescriptions and diagnosis</div>
            </div>
            <Link to="/doctor/prescriptions" className="btn btn-outline btn-sm" style={{fontWeight: 600}}>
              Issue New Prescription
            </Link>
         </div>
         
         <div className="table-container mt-4" style={{border: 'none', background: 'transparent'}}>
            <table style={{width: '100%'}}>
               <thead>
                  <tr>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>DATE ISSUED</th>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>DIAGNOSIS</th>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>MEDICINES</th>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>INSTRUCTIONS</th>
                  </tr>
               </thead>
               <tbody>
                  {prescriptions.length === 0 ? (
                    <tr><td colSpan="4" style={{textAlign: 'center', padding: '2rem'}}>No prescriptions found.</td></tr>
                  ) : (
                    prescriptions.map(p => (
                      <tr key={p._id}>
                        <td style={{padding: '1rem 0.5rem', fontWeight: 600}}>{new Date(p.createdAt).toLocaleString()}</td>
                        <td style={{padding: '1rem 0.5rem'}}>{p.diagnosis || 'General'}</td>
                        <td style={{padding: '1rem 0.5rem'}}>{p.medicinesText}</td>
                        <td style={{padding: '1rem 0.5rem', color: 'var(--text-muted)'}}>{p.notes || '—'}</td>
                      </tr>
                    ))
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Patient Uploaded Reports Section */}
      <div className="card mt-4" style={{borderTop: '3px solid var(--primary)'}}>
         <div className="card-header" style={{margin: 0}}>
            <div>
               <div className="section-title" style={{fontSize: '1.2rem'}}>Patient Uploaded Reports</div>
               <div className="section-subtitle">Documentation provided by the patient for review</div>
            </div>
         </div>
         
         <div className="table-container mt-4" style={{border: 'none', background: 'transparent'}}>
            <table style={{width: '100%'}}>
               <thead>
                  <tr>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>SUBMISSION DATE</th>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>REPORT TITLE</th>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>DESCRIPTION</th>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem', textAlign: 'center'}}>ACTIONS</th>
                  </tr>
               </thead>
               <tbody>
                  {labReports.length === 0 ? (
                    <tr><td colSpan="4" style={{textAlign: 'center', padding: '2rem'}}>No reports found.</td></tr>
                  ) : (
                    labReports.map(r => (
                      <tr key={r._id}>
                        <td style={{padding: '1rem 0.5rem', fontWeight: 600}}>{new Date(r.createdAt).toLocaleDateString()}</td>
                        <td style={{padding: '1rem 0.5rem', fontWeight: 600}}>{r.title}</td>
                        <td style={{padding: '1rem 0.5rem', color: 'var(--text-muted)'}}>{r.description || '—'}</td>
                        <td style={{padding: '1rem 0.5rem', textAlign: 'center'}}>
                          <Link to={`/doctor/reports/${r._id}`} className="btn btn-outline btn-sm" style={{padding: '0.4rem 1rem'}}>Review Findings</Link>
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

export default PatientDetailsPage;
