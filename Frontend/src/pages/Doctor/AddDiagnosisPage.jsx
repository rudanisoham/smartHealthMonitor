import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus } from 'lucide-react';

const AddDiagnosisPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patientId = id || "101";

  const [formData, setFormData] = useState({
    title: "",
    condition: "",
    severity: "MEDIUM",
    notes: "",
    prescription: ""
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Diagnosis saved successfully! (mock)');
    navigate(`/doctor/patients/${patientId}`);
  };

  return (
    <>
      <div style={{marginBottom: '1rem'}}>
        <Link to={`/doctor/patients/${patientId}`} className="btn btn-outline btn-sm">
          <ChevronLeft size={16} /> Back to Patient
        </Link>
      </div>

      <div className="card" style={{maxWidth: '800px', margin: '0 auto'}}>
        <div className="card-header">
           <div>
             <div className="section-title">Log Clinical Finding</div>
             <div className="section-subtitle">Record a new diagnosis for Patient #{patientId}</div>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="form-grid mt-4">
           <div className="form-group" style={{gridColumn: 'span 2'}}>
              <label>Diagnosis Title</label>
              <input type="text" name="title" className="form-control" placeholder="e.g. Acute Bronchitis" value={formData.title} onChange={handleChange} required/>
           </div>
           
           <div className="form-2 form-group" style={{gridColumn: 'span 2'}}>
              <div className="form-group">
                <label>Primary Condition</label>
                <input type="text" name="condition" className="form-control" placeholder="ICD-10 or description" value={formData.condition} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Assessed Severity</label>
                <select name="severity" className="form-select" value={formData.severity} onChange={handleChange}>
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
              ></textarea>
           </div>

           <div className="form-group" style={{gridColumn: 'span 2'}}>
              <label>Recommended Prescription (Optional)</label>
              <input type="text" name="prescription" className="form-control" placeholder="e.g. Amoxicillin 500mg, 3x daily, 7 days" value={formData.prescription} onChange={handleChange} />
           </div>

           <div className="mt-4" style={{gridColumn: 'span 2', display:'flex', justifyContent:'flex-end'}}>
              <button type="submit" className="btn btn-primary">
                 <Plus size={18} /> Save Record
              </button>
           </div>
        </form>
      </div>
    </>
  );
};

export default AddDiagnosisPage;
