import React, { useState, useEffect } from 'react';
import { getDoctorPrescriptions, createPrescription, getDoctorPatients } from '../../utils/api';

const PrescriptionsPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    patientId: '',
    diagnosis: '',
    medicines: '',
    instructions: '',
    validUntil: ''
  });
  const [selectedPresc, setSelectedPresc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prescRes, patientRes] = await Promise.all([
          getDoctorPrescriptions(),
          getDoctorPatients()
        ]);
        setPrescriptions(prescRes.data.data);
        setPatients(patientRes.data.data);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPrescription(formData);
      alert('Prescription issued successfully');
      // Refresh list
      const prescRes = await getDoctorPrescriptions();
      setPrescriptions(prescRes.data.data);
      setFormData({
        patientId: '',
        diagnosis: '',
        medicines: '',
        instructions: '',
        validUntil: ''
      });
    } catch (err) {
      alert('Failed to issue prescription');
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="grid grid-2" style={{alignItems: 'start'}}>
      
      {/* Issue Prescription Form */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title" style={{fontSize: '1.1rem'}}>Issue Prescription</div>
            <div className="section-subtitle">Add a new record for a patient</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="form-grid mt-3">
          <div className="form-group">
            <label>Select Patient</label>
            <select name="patientId" className="form-select" value={formData.patientId} onChange={handleChange} required>
              <option value="" disabled>Choose patient...</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.user?.fullName}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Diagnosis</label>
            <input type="text" name="diagnosis" className="form-control" placeholder="e.g. Acute Bronchitis" value={formData.diagnosis} onChange={handleChange} required/>
          </div>
          
          <div className="form-group">
            <label>Medicines</label>
            <textarea name="medicines" className="form-control" rows="3" placeholder="List medicines and dosages..." value={formData.medicines} onChange={handleChange} required></textarea>
          </div>
          
          <div className="form-group">
            <label>Special Instructions (Optional)</label>
            <textarea name="instructions" className="form-control" rows="2" placeholder="Take with food, avoid alcohol, etc." value={formData.instructions} onChange={handleChange}></textarea>
          </div>
          
          <div className="form-group">
            <label>Valid Until (Optional)</label>
            <input type="date" name="validUntil" className="form-control" value={formData.validUntil} onChange={handleChange}/>
            <span className="muted" style={{fontSize: '0.75rem'}}>Set an expiration date for this prescription.</span>
          </div>
          
          <div className="mt-2">
            <button type="submit" className="btn btn-primary">Save & Issue Prescription</button>
          </div>
        </form>
      </div>

      {/* Recent Prescriptions Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title" style={{fontSize: '1.1rem'}}>Recent Prescriptions</div>
            <div className="section-subtitle">Last prescriptions issued by you</div>
          </div>
        </div>
        
        <div className="table-container mt-3" style={{border: 'none', backgroundColor: 'transparent'}}>
          <table style={{width: '100%'}}>
            <thead>
              <tr>
                <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>DATE</th>
                <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>PATIENT</th>
                <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>DIAGNOSIS</th>
                <th style={{background: 'transparent', padding: '1rem 0.5rem'}}>STATUS</th>
                <th style={{background: 'transparent', padding: '1rem 0.5rem', textAlign: 'center'}}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map(presc => (
                <tr key={presc._id}>
                  <td style={{padding: '1rem 0.5rem', color: 'var(--text-main)', fontSize: '0.9rem'}}><strong>{new Date(presc.createdAt).toLocaleDateString()}</strong></td>
                  <td style={{padding: '1rem 0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600}}>{presc.patient?.user?.fullName}</td>
                  <td style={{padding: '1rem 0.5rem', color: 'var(--text-main)', fontSize: '0.9rem'}}>{presc.diagnosis || 'General'}</td>
                  <td style={{padding: '1rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                    <span className="chip-neutral" style={{fontSize: '0.7rem'}}>{presc.status}</span>
                  </td>
                  <td style={{padding: '1rem 0.5rem', textAlign: 'center'}}>
                    <button className="btn btn-outline btn-sm" style={{padding: '0.4rem 1rem', fontSize: '0.8rem'}} onClick={() => setSelectedPresc(presc)}>Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Detail Modal */}
      {selectedPresc && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex',
          alignItems: 'center', justifyItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '550px', background: 'white' }}>
            <div className="card-header" style={{ marginBottom: 0 }}>
              <div>
                <div className="section-title" style={{ fontSize: '1.25rem' }}>Prescription Details</div>
                <div className="section-subtitle">Issued on {new Date(selectedPresc.createdAt).toLocaleDateString()}</div>
              </div>
              <button className="btn-icon" onClick={() => setSelectedPresc(null)} style={{ border: 'none', background: '#f1f5f9' }}>✕</button>
            </div>
            
            <div className="form-grid mt-3">
              <div>
                <span className="muted" style={{fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600}}>Patient</span>
                <div style={{fontWeight: 600, color: 'var(--text-main)', marginTop: '0.3rem', fontSize: '1.1rem'}}>{selectedPresc.patient?.user?.fullName}</div>
              </div>
              <div>
                <span className="muted" style={{fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600}}>Diagnosis</span>
                <div style={{fontWeight: 600, color: 'var(--text-main)', marginTop: '0.3rem', fontSize: '1.1rem'}}>{selectedPresc.diagnosis || 'N/A'}</div>
              </div>
              
              <div style={{gridColumn: '1 / -1'}}>
                <span className="muted" style={{fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600}}>Medicines prescribed</span>
                <div style={{
                   backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', 
                   border: '1px solid #e2e8f0', marginTop: '0.5rem',
                   whiteSpace: 'pre-wrap', color: 'var(--primary)', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5
                }}>
                  {selectedPresc.medicinesText}
                </div>
              </div>

              <div style={{gridColumn: '1 / -1'}}>
                <span className="muted" style={{fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600}}>Special Instructions</span>
                <div style={{
                   backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '8px', 
                   border: '1px solid #fecaca', marginTop: '0.5rem',
                   color: '#b91c1c', fontSize: '0.95rem', fontWeight: 500
                }}>
                  {selectedPresc.notes || "None provided."}
                </div>
              </div>
              
              <div>
                <span className="muted" style={{fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600}}>Status</span>
                <div style={{fontWeight: 600, color: 'var(--text-main)', marginTop: '0.3rem', fontSize: '1.1rem'}}>{selectedPresc.status}</div>
              </div>
            </div>
            
            <div style={{marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem'}}>
               <button type="button" className="btn btn-outline" onClick={() => setSelectedPresc(null)}>Close</button>
               <button type="button" className="btn btn-primary" onClick={() => { setSelectedPresc(null); window.print(); }}>Print Prescription</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PrescriptionsPage;
