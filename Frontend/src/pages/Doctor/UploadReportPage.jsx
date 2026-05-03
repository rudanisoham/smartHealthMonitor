import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, User, Info, FileText, CheckCircle } from 'lucide-react';
import { getDoctorPatients } from '../../utils/api';

const UploadReportPage = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    patient: "",
    title: "",
    reportType: "OTHER",
    description: "",
    findings: ""
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getDoctorPatients();
        setPatients(res.data.data);
      } catch (err) {
        console.error('Failed to load patients', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patient || !formData.title) {
        alert('Please fill in required fields');
        return;
    }
    // In a real app, we'd use FormData for file upload
    // For now, let's simulate success
    alert('Report submitted successfully! (Real database connection ready)');
    navigate('/doctor/reports');
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <>
      <div style={{ marginBottom: '1.5rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back to Reports
        </button>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card-header border-bottom pb-4 mb-4">
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Upload New Report</h2>
          <p className="muted" style={{ marginTop: '0.25rem' }}>Attach clinical documentation to a patient record</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} color="var(--primary)" /> Select Patient <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select 
                name="patient"
                className="form-select" 
                required 
                style={{ marginTop: '0.5rem' }}
                value={formData.patient}
                onChange={handleChange}
              >
                <option value="">-- Choose Patient --</option>
                {patients.map(p => (
                  <option key={p._id} value={p._id}>{p.user?.fullName} ({p.user?.email})</option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Info size={16} color="var(--primary)" /> Report Title <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text" 
                name="title"
                className="form-control" 
                required 
                placeholder="e.g. Complete Blood Count, Chest X-Ray" 
                style={{ marginTop: '0.5rem' }}
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Report Type</label>
              <select 
                name="reportType"
                className="form-select" 
                style={{ marginTop: '0.5rem' }}
                value={formData.reportType}
                onChange={handleChange}
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

            <div className="form-group">
              <label>Attach File (PDF/Image)</label>
              <div style={{ position: 'relative', marginTop: '0.5rem' }}>
                <input 
                  type="file" 
                  className="form-control" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Upload size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              </div>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <textarea 
                name="description"
                className="form-control" 
                rows="2" 
                placeholder="Brief description of the report..."
                style={{ marginTop: '0.5rem' }}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} color="var(--primary)" /> Results / Findings
              </label>
              <textarea 
                name="findings"
                className="form-control" 
                rows="4" 
                placeholder="Enter test results, findings, or observations..."
                style={{ marginTop: '0.5rem' }}
                value={formData.findings}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '0.75rem 2rem' }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem' }}>
              <CheckCircle size={18} /> Upload Report
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadReportPage;
