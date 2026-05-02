import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  User, 
  Calendar, 
  FlaskConical,
  CheckCircle,
  X,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LabUploadReport = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    testType: '',
    reportDate: new Date().toISOString().split('T')[0],
    technician: 'Sarah Jenkins',
    priority: 'Normal',
    notes: ''
  });

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Laboratory report uploaded and verified successfully!');
    navigate('/lab/history');
  };

  return (
    <div className="admin-content" style={{ maxWidth: '800px', margin: '0 auto', padding: 0 }}>
      <div className="mb-6">
        <Link to="/lab/dashboard" className="btn btn-outline mb-4" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h2 className="section-title">Upload Diagnostic Results</h2>
        <p className="section-subtitle">Digitize and verify laboratory findings for patient records</p>
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
              <label>Collection Date <span className="text-danger">*</span></label>
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

          <div className="grid grid-2 gap-6 mb-6">
            <div className="form-group">
              <label>Test Category <span className="text-danger">*</span></label>
              <select 
                className="form-select" 
                required
                value={formData.testType}
                onChange={(e) => setFormData({...formData, testType: e.target.value})}
              >
                <option value="">Select Test Type</option>
                <option value="CBC">Complete Blood Count (CBC)</option>
                <option value="Lipid">Lipid Profile</option>
                <option value="Glucose">Blood Glucose / HbA1c</option>
                <option value="Thyroid">Thyroid Function (T3, T4, TSH)</option>
                <option value="Urine">Urinalysis</option>
                <option value="ECG">Electrocardiogram (ECG)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority Level</label>
              <select 
                className="form-select"
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent (STAT)</option>
                <option value="Critical">Critical Path</option>
              </select>
            </div>
          </div>

          <div className="form-group mb-6">
            <label>Upload Result File (PDF, High-Res Image)</label>
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
              onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#10b981'; }}
              onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--border)'; }}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <input type="file" id="fileInput" hidden onChange={handleFileChange} />
              <div className="flex-col items-center gap-3">
                <div className="stat-icon" style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <Upload size={32} />
                </div>
                {selectedFile ? (
                  <div>
                    <div className="author-name">{selectedFile.name}</div>
                    <div className="muted">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                ) : (
                  <div>
                    <div className="author-name">Click or drag test results to upload</div>
                    <div className="muted">Supports PDF, JPG, PNG (Max 10MB)</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group mb-6">
            <label>Findings & Observations</label>
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Enter laboratory observations, clinical findings, or reference range alerts..."
              style={{ resize: 'none' }}
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            ></textarea>
          </div>

          <div className="card mb-6" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid #10b981' }}>
            <div className="flex gap-4">
              <div className="stat-icon" style={{ width: '40px', height: '40px', background: 'white', color: '#10b981', flexShrink: 0 }}>
                <CheckCircle size={20} />
              </div>
              <div>
                <div className="author-name" style={{ fontSize: '0.9rem', color: '#059669' }}>Laboratory Verification</div>
                <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: '#059669' }}>
                  By uploading, you confirm that these results have been double-checked and verified by a senior lab technician.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-top">
            <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
              <X size={18} /> Discard
            </button>
            <button type="submit" className="btn btn-primary" style={{ background: '#10b981', borderColor: '#10b981' }}>
              <Upload size={18} /> Submit Results
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LabUploadReport;
