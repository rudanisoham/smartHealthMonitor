import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  User, 
  Calendar, 
  Info,
  CheckCircle,
  X,
  Plus
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createReport, getDoctorPatients } from '../../utils/api';

const UploadReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [patients, setPatients] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientId: location.state?.patientId || '',
    title: '',
    type: 'BLOOD_TEST',
    description: '',
    results: '',
    reportDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getDoctorPatients();
        setPatients(res.data.data);
      } catch (err) {
        console.error("Failed to load patients", err);
      }
    };
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createReport(formData);
      alert('Medical report uploaded successfully!');
      navigate('/medical/reports');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to upload report');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="medical-upload" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="mb-6">
        <Link to="/medical/reports" className="btn btn-outline btn-sm mb-4">
          <ArrowLeft size={16} /> Back to Reports
        </Link>
        <h2 className="section-title">Upload New Report</h2>
        <p className="section-subtitle">Link a diagnostic report to a patient record</p>
      </div>

      <div className="card shadow-sm">
        <form onSubmit={handleSubmit}>
          <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="var(--primary)" /> Report Information
            </h3>
          </div>

          <div className="form-group mb-4">
            <label className="label-bold">Select Patient</label>
            <select 
              className="form-select" 
              required 
              value={formData.patientId}
              onChange={(e) => setFormData({...formData, patientId: e.target.value})}
            >
              <option value="">-- Choose Patient --</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>
                  {p.user?.fullName} (#{p._id.substring(0,8)}) — {p.user?.email}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-2 gap-4 mb-4">
            <div className="form-group">
              <label className="label-bold">Report Title</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Complete Blood Count"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="label-bold">Report Type</label>
              <select 
                className="form-select" 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="BLOOD_TEST">Blood Test</option>
                <option value="X_RAY">X-Ray</option>
                <option value="MRI">MRI</option>
                <option value="ECG">ECG</option>
                <option value="CT_SCAN">CT Scan</option>
                <option value="URINE_TEST">Urine Test</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="label-bold">Attach Report File (PDF/Image)</label>
            <div className="upload-box" style={{ border: '2px dashed #e2e8f0', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', background: '#f8fafc' }}>
              <input type="file" id="reportFile" hidden />
              <label htmlFor="reportFile" style={{ cursor: 'pointer' }}>
                <Upload size={32} className="muted mb-2" />
                <div style={{ fontWeight: 600 }}>Click to select file</div>
                <div className="muted" style={{ fontSize: '0.8rem' }}>Supported: PDF, JPG, PNG (Max 10MB)</div>
              </label>
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="label-bold">Findings / Observations</label>
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Enter detailed test results or observations..."
              value={formData.results}
              onChange={(e) => setFormData({...formData, results: e.target.value})}
            ></textarea>
          </div>

          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Uploading...' : 'Upload Report'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .label-bold { font-weight: 700; font-size: 0.85rem; color: #475569; margin-bottom: 0.4rem; display: block; text-transform: uppercase; }
      `}</style>
    </div>
  );
};

export default UploadReport;
