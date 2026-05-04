import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, Stethoscope, Droplets, Thermometer } from 'lucide-react';
import { getPatientDetails, getLabTests, createReport } from '../../utils/api';

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [labTests, setLabTests] = useState([]);
  const [showLabModal, setShowLabModal] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState('');

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
    const fetchTests = async () => {
      try {
        const res = await getLabTests();
        setLabTests(res.data.data.tests);
      } catch (err) {
        console.error("Failed to load lab tests", err);
      }
    };
    fetchData();
    fetchTests();
  }, [id]);

  const handleRequestLabTest = async () => {
    if (!selectedTestId) return alert('Please select a test');
    const test = labTests.find(t => t._id === selectedTestId);
    
    try {
      await createReport({
        patientId: patient._id,
        title: test.name,
        reportType: test.category || 'OTHER',
        status: 'PENDING'
      });
      alert('Lab request created successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Error creating lab request');
    }
  };

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
               <div className="section-title" style={{fontSize: '1.2rem'}}>Lab Reports</div>
               <div className="section-subtitle">Requested and uploaded reports for this patient</div>
            </div>
            <button 
              className="btn btn-primary btn-sm" 
              style={{fontWeight: 600}}
              onClick={() => setShowLabModal(true)}
            >
              Request Lab Test
            </button>
         </div>
         
         <div className="table-container mt-4" style={{border: 'none', background: 'transparent'}}>
            <table style={{width: '100%'}}>
               <thead>
                  <tr>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>SUBMISSION DATE</th>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>REPORT TITLE</th>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>STATUS</th>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>DESCRIPTION</th>
                     <th style={{background: 'transparent', padding: '1rem 0.5rem', textAlign: 'center'}}>ACTIONS</th>
                  </tr>
               </thead>
               <tbody>
                  {labReports.length === 0 ? (
                    <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>No reports found.</td></tr>
                  ) : (
                    labReports.map(r => (
                      <tr key={r._id}>
                        <td style={{padding: '1rem 0.5rem', fontWeight: 600}}>{new Date(r.createdAt).toLocaleDateString()}</td>
                        <td style={{padding: '1rem 0.5rem', fontWeight: 600}}>{r.title}</td>
                        <td style={{padding: '1rem 0.5rem'}}><span className={`chip ${r.status === 'PENDING' ? 'chip-warning' : 'chip-success'}`}>{r.status}</span></td>
                        <td style={{padding: '1rem 0.5rem', color: 'var(--text-muted)'}}>{r.description || r.results || '—'}</td>
                        <td style={{padding: '1rem 0.5rem', textAlign: 'center'}}>
                          {r.status === 'PENDING' ? (
                            <span className="muted">Waiting for Lab</span>
                          ) : (
                            <Link to={`/doctor/reports/${r._id}`} className="btn btn-outline btn-sm" style={{padding: '0.4rem 1rem'}}>Review Findings</Link>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
               </tbody>
            </table>
         </div>
      </div>

      {/* Lab Request Modal */}
      {showLabModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Request Lab Test</h3>
            <div className="form-group mb-4">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Select Test from Catalog</label>
              <select 
                className="form-select" 
                value={selectedTestId} 
                onChange={(e) => setSelectedTestId(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              >
                <option value="">-- Select a test --</option>
                {labTests.map(test => (
                  <option key={test._id} value={test._id}>
                    {test.name} (${test.price}) - {test.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button className="btn btn-outline" onClick={() => setShowLabModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleRequestLabTest}>Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientDetailsPage;
