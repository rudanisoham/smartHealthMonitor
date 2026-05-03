import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  User, 
  Calendar, 
  Info,
  CheckCircle,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const UploadReport = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    reportType: '',
    reportDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Medical report uploaded successfully!');
    navigate('/medical/reports');
  };

  return (
    <div className="admin-content" style={{ maxWidth: '800px', margin: '0 auto', padding: 0 }}>
      <div className="mb-6">
        <Link to="/medical/patient-search" className="btn btn-outline mb-4" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> Back to Search
        </Link>
        <h2 className="section-title">Upload Medical Report</h2>
        <p className="section-subtitle">Add laboratory or diagnostic results to patient record</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2 gap-6 mb-6">
            <div className="form-group">
              <label>Patient ID / Name <span className="text-danger">*</span></label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <User size={18} className="text-muted me-2" />
                <input 
                  type="text" 
                  placeholder="e.g. PAT-001" 
                  required 
                  value={formData.patientId}
                  onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Report Date <span className="text-danger">*</span></label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <Calendar size={18} className="text-muted me-2" />
                <input 
                  type="date" 
                  required 
                  value={formData.reportDate}
                  onChange={(e) => setFormData({...formData, reportDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="form-group mb-6">
            <label>Report Category / Type <span className="text-danger">*</span></label>
            <select 
              className="form-select" 
              required
              value={formData.reportType}
              onChange={(e) => setFormData({...formData, reportType: e.target.value})}
            >
              <option value="">Select Report Type</option>
              <option value="Blood Test">Blood Test (CBC, Glucose, etc.)</option>
              <option value="Radiology">Radiology (X-Ray, MRI, CT Scan)</option>
              <option value="Cardiology">Cardiology (ECG, Stress Test)</option>
              <option value="Urine Analysis">Urine Analysis</option>
              <option value="Pathology">Pathology / Biopsy</option>
              <option value="Other">Other Diagnostic Report</option>
            </select>
          </div>

          <div className="form-group mb-6">
            <label>Upload Document (PDF, JPG, PNG)</label>
            <div 
              className="upload-zone" 
              style={{ 
                border: '2px dashed var(--border)', 
                borderRadius: '12px', 
                padding: '3rem', 
                textAlign: 'center',
                background: '#f8fafc',
                cursor: 'pointer',
                transition: '0.2s'
              }}
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--primary)'; }}
              onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--border)'; }}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <input type="file" id="fileInput" hidden onChange={handleFileChange} />
              <div className="flex-col items-center gap-3">
                <div className="stat-icon blue" style={{ width: '64px', height: '64px' }}>
                  <Upload size={32} />
                </div>
                {selectedFile ? (
                  <div>
                    <div className="author-name">{selectedFile.name}</div>
                    <div className="muted">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                ) : (
                  <div>
                    <div className="author-name">Click or drag report file to upload</div>
                    <div className="muted">Max file size: 10MB</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group mb-6">
            <label>Findings / Remarks</label>
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Enter brief summary of findings or lab technician notes..."
              style={{ resize: 'none' }}
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            ></textarea>
          </div>

          <div className="card mb-6" style={{ background: 'var(--success-light)', border: '1px solid var(--success)' }}>
            <div className="flex gap-4">
              <div className="stat-icon blue" style={{ width: '40px', height: '40px', background: 'white', color: 'var(--success)', flexShrink: 0 }}>
                <CheckCircle size={20} />
              </div>
              <div>
                <div className="author-name" style={{ fontSize: '0.9rem', color: 'var(--success)' }}>Ready for Submission</div>
                <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: 'var(--success)' }}>
                  This report will be instantly available to the patient and their primary physician.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-top">
            <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
              <X size={18} /> Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Upload size={18} /> Complete Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadReport;
