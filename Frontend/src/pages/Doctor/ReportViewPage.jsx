import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Download, Printer, Activity, Heart, Thermometer } from 'lucide-react';

const ReportViewPage = () => {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId') || "101";

  return (
    <>
      <div style={{marginBottom: '1rem', display: 'flex', justifyContent: 'space-between'}}>
        <Link to={`/doctor/patients/${patientId}`} className="btn btn-outline btn-sm">
          <ChevronLeft size={16} /> Back to File
        </Link>
        
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button className="btn btn-outline btn-sm" onClick={() => window.print()}><Printer size={16}/> Print</button>
          <button className="btn btn-primary btn-sm"><Download size={16}/> Export PDF</button>
        </div>
      </div>

      <div className="card" id="report-printable" style={{maxWidth: '900px', margin: '0 auto', background: 'white'}}>
        {/* Report Header */}
        <div style={{textAlign: 'center', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '2px solid var(--border)'}}>
           <h1 style={{color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '-0.03em'}}>Smart Health Monitor</h1>
           <div className="muted" style={{textTransform: 'uppercase', letterSpacing: '0.1em'}}>Comprehensive Medical Report</div>
           <div className="mt-3">
             <span className="badge-soft" style={{fontSize: '1rem'}}>Generated: {new Date().toLocaleDateString()}</span>
           </div>
        </div>

        {/* Patient Block */}
        <div className="grid grid-2" style={{marginBottom: '3rem'}}>
           <div>
             <div className="section-title" style={{fontSize: '1.5rem'}}>Patient Information</div>
             <table style={{marginTop: '1rem'}}>
               <tbody>
                  <tr><td className="muted" style={{padding: '0.5rem 0', width: '120px', border: 'none'}}>Name</td><td style={{fontWeight: 600, border: 'none'}}>Alice Cooper</td></tr>
                  <tr><td className="muted" style={{padding: '0.5rem 0', border: 'none'}}>Patient ID</td><td style={{fontWeight: 600, border: 'none'}}>#{patientId}</td></tr>
                  <tr><td className="muted" style={{padding: '0.5rem 0', border: 'none'}}>DOB</td><td style={{fontWeight: 600, border: 'none'}}>1985-04-12 (41 yrs)</td></tr>
               </tbody>
             </table>
           </div>
           
           <div>
             <div className="section-title" style={{fontSize: '1.5rem'}}>Attending Physician</div>
             <table style={{marginTop: '1rem'}}>
               <tbody>
                  <tr><td className="muted" style={{padding: '0.5rem 0', width: '120px', border: 'none'}}>Doctor</td><td style={{fontWeight: 600, border: 'none'}}>Dr. Smith</td></tr>
                  <tr><td className="muted" style={{padding: '0.5rem 0', border: 'none'}}>Department</td><td style={{fontWeight: 600, border: 'none'}}>Cardiology</td></tr>
                  <tr><td className="muted" style={{padding: '0.5rem 0', border: 'none'}}>License</td><td style={{fontWeight: 600, border: 'none'}}>MED-90082-C</td></tr>
               </tbody>
             </table>
           </div>
        </div>

        {/* AI Analysis Block */}
        <div style={{background: 'var(--bg-main)', padding: '2rem', borderRadius: '12px', marginBottom: '3rem'}}>
           <div className="section-title" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)'}}>
             <Activity /> AI Risk Analysis
           </div>
           <p className="mt-2" style={{lineHeight: 1.6, fontSize: '1.05rem', color: 'var(--text-main)'}}>
              Patient shows stable vital signs over the past 30 days. No significant deviations from baseline.
              Cardiovascular risk profile is currently assessed as <strong>LOW</strong>. Continued routine monitoring is advised.
           </p>
        </div>

        {/* Telemetry Snapshot */}
        <div className="section-title" style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Telemetry Snapshot</div>
        <div className="grid grid-3" style={{marginBottom: '3rem'}}>
           <div className="stat-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <div style={{color: 'var(--danger)', marginBottom: '0.5rem'}}><Heart size={24}/></div>
              <div className="stat-value">120/80</div>
              <div className="muted mt-1">Blood Pressure (mmHg)</div>
           </div>
           <div className="stat-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <div style={{color: 'var(--warning)', marginBottom: '0.5rem'}}><Activity size={24}/></div>
              <div className="stat-value">72</div>
              <div className="muted mt-1">Heart Rate (BPM)</div>
           </div>
           <div className="stat-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <div style={{color: 'var(--secondary)', marginBottom: '0.5rem'}}><Thermometer size={24}/></div>
              <div className="stat-value">98.6</div>
              <div className="muted mt-1">Temperature (°F)</div>
           </div>
        </div>

        {/* Digital Signature */}
        <div style={{marginTop: '4rem', display: 'flex', justifyContent: 'flex-end'}}>
           <div style={{textAlign: 'center', width: '250px'}}>
              <div style={{borderBottom: '1px solid var(--text-muted)', marginBottom: '0.5rem', height: '40px'}}>
                {/* Space for signature */}
                <span style={{fontFamily: 'cursive', fontSize: '1.5rem', opacity: 0.5}}>Dr. Smith</span>
              </div>
              <div className="muted">Electronically Signed By</div>
              <div style={{fontWeight: 600}}>Dr. Smith, M.D.</div>
           </div>
        </div>

      </div>
    </>
  );
};

export default ReportViewPage;
