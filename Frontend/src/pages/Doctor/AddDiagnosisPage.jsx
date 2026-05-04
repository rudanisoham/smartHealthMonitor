import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Loader } from 'lucide-react';
import { getPatientDetails, createPrescription } from '../../utils/api';

const AddDiagnosisPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [patientName, setPatientName] = useState("...");
  const [formData, setFormData] = useState({
    title: "",
    condition: "",
    severity: "MEDIUM",
    notes: "",
    prescription: ""
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await getPatientDetails(id);
        setPatientName(res.data.data.patient.user?.fullName || "Patient");
      } catch (err) {
        console.error("Failed to fetch patient details", err);
      } finally {
        setFetching(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const diagnosisString = `${formData.title}${formData.condition ? ` (${formData.condition})` : ''} - Severity: ${formData.severity}`;
      
      const res = await createPrescription({
        patientId: id,
        diagnosis: diagnosisString,
        medicines: formData.prescription || "None",
        instructions: formData.notes
      });

      if (res.data.success) {
        alert('Diagnosis and prescription saved successfully!');
        navigate(`/doctor/patients/${id}`);
      }
    } catch (err) {
      console.error("Failed to save diagnosis", err);
      alert(err.response?.data?.error || 'Failed to save clinical finding');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading patient data...</div>;

  return (
    <>
      <div style={{marginBottom: '1rem'}}>
        <Link to={`/doctor/patients/${id}`} className="btn btn-outline btn-sm">
          <ChevronLeft size={16} /> Back to Patient
        </Link>
      </div>

      <div className="card" style={{maxWidth: '800px', margin: '0 auto'}}>
        <div className="card-header">
           <div>
             <div className="section-title">Log Clinical Finding</div>
             <div className="section-subtitle">Record a new diagnosis for <strong>{patientName}</strong></div>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="form-grid mt-4">
           <div className="form-group" style={{gridColumn: 'span 2'}}>
              <label>Diagnosis Title</label>
              <input type="text" name="title" className="form-control" placeholder="e.g. Acute Bronchitis" value={formData.title} onChange={handleChange} required disabled={loading}/>
           </div>
           
           <div className="form-2 form-group" style={{gridColumn: 'span 2'}}>
              <div className="form-group">
                <label>Primary Condition (Optional)</label>
                <input type="text" name="condition" className="form-control" placeholder="ICD-10 or description" value={formData.condition} onChange={handleChange} disabled={loading}/>
              </div>
              <div className="form-group">
                <label>Assessed Severity</label>
                <select name="severity" className="form-select" value={formData.severity} onChange={handleChange} disabled={loading}>
                   <option value="LOW">Low</option>
                   <option value="MEDIUM">Medium</option>
                   <option value="HIGH">High</option>
                   <option value="CRITICAL">Critical</option>
                 </select>
              </div>
           </div>

           <div className="form-group" style={{gridColumn: 'span 2'}}>
              <label>Clinical Notes</label>
              <textarea 
                name="notes" 
                className="form-control" 
                rows="4" 
                placeholder="Detailed clinical observation..." 
                value={formData.notes} 
                onChange={handleChange}
                disabled={loading}
              ></textarea>
           </div>

           <div className="form-group" style={{gridColumn: 'span 2'}}>
              <label>Recommended Prescription (Optional)</label>
              <input type="text" name="prescription" className="form-control" placeholder="e.g. Amoxicillin 500mg, 3x daily, 7 days" value={formData.prescription} onChange={handleChange} disabled={loading}/>
           </div>

           <div className="mt-4" style={{gridColumn: 'span 2', display:'flex', justifyContent:'flex-end'}}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                 {loading ? <Loader className="animate-spin" size={18} /> : <><Plus size={18} /> Save Record</>}
              </button>
           </div>
        </form>
      </div>
    </>
  );
};

export default AddDiagnosisPage;
