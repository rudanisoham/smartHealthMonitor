import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, Stethoscope, Droplets, Thermometer } from 'lucide-react';

const PatientDetailsPage = () => {
  const { id } = useParams();

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
                <div className="section-title" style={{fontSize: '1.3rem'}}>Soham Rudani</div>
                <div className="section-subtitle">Age/DOB details typically here</div>
              </div>
              <span className="muted" style={{fontWeight: 500}}>Patient</span>
           </div>
           
           <div className="mt-4">
              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Email</div>
                <div style={{fontWeight: 600, color: 'var(--text-main)'}}>rudanisoham1@gmail.com</div>
              </div>

              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Phone</div>
                <div style={{fontWeight: 600, color: 'var(--text-main)'}}>+919316202895</div>
              </div>

              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Biological Sex</div>
                <div style={{fontWeight: 600, color: 'var(--text-main)'}}>—</div>
              </div>

              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>Blood Group</div>
                <div style={{fontWeight: 600, color: '#ef4444', background: '#fee2e2', display: 'inline-block', padding: '0.1rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem'}}>A+</div>
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
              <span className="chip" style={{fontSize: '0.75rem'}}>✓ LOW RISK</span>
           </div>
           
           <div className="muted mt-2" style={{fontSize: '0.85rem', marginBottom: '1.5rem'}}>
             Recorded on: 2026-04-01 10:03
           </div>

           <div>
              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                   <Heart size={14}/> Heart Rate
                </div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem'}}>72 bpm</div>
              </div>
              
              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                   <Stethoscope size={14}/> Blood Pressure
                </div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem'}}>120/80 mmHg</div>
              </div>

              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                   <Droplets size={14}/> SpO2 (Oxygen)
                </div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem'}}>98.5%</div>
              </div>

              <div style={{background: '#f8fafc', padding: '1rem 1.25rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #f1f5f9'}}>
                <div className="muted" style={{fontSize: '0.85rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
                   <Thermometer size={14}/> Temperature
                </div>
                <div style={{fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem'}}>37.0°C</div>
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
                  <tr>
                     <td style={{padding: '1rem 0.5rem', fontWeight: 600}}>2026-04-01 02:55</td>
                     <td style={{padding: '1rem 0.5rem'}}>efe</td>
                     <td style={{padding: '1rem 0.5rem'}}>efSE</td>
                     <td style={{padding: '1rem 0.5rem', color: 'var(--text-muted)'}}>efsEF</td>
                  </tr>
                  <tr>
                     <td style={{padding: '1rem 0.5rem', fontWeight: 600}}>2026-04-01 01:28</td>
                     <td style={{padding: '1rem 0.5rem'}}>For fiver</td>
                     <td style={{padding: '1rem 0.5rem'}}>t1, t2, t3</td>
                     <td style={{padding: '1rem 0.5rem', color: 'var(--text-muted)'}}>take with food</td>
                  </tr>
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
                  <tr>
                     <td style={{padding: '1rem 0.5rem', fontWeight: 600}}>2026-04-01</td>
                     <td style={{padding: '1rem 0.5rem', fontWeight: 600}}>dsfd</td>
                     <td style={{padding: '1rem 0.5rem', color: 'var(--text-muted)'}}>dSF</td>
                     <td style={{padding: '1rem 0.5rem', textAlign: 'center'}}>
                        <Link to="/doctor/report-view" className="btn btn-outline btn-sm" style={{padding: '0.4rem 1rem'}}>Review Findings</Link>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

    </>
  );
};

export default PatientDetailsPage;
