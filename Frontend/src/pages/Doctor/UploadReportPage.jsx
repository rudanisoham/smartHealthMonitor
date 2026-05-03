import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, User, Info, FileText, CheckCircle } from 'lucide-react';

const UploadReportPage = () => {
  const navigate = useNavigate();

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

        <form>
          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} color="var(--primary)" /> Select Patient <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select className="form-select" required style={{ marginTop: '0.5rem' }}>
                <option value="">-- Choose Patient --</option>
                <option value="1">Soham Rudani (#1) — rudanisoham1@gmail.com</option>
                <option value="2">Neha Sharma (#2) — neha@example.com</option>
                <option value="3">Alice Baker (#3) — alice@example.com</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Info size={16} color="var(--primary)" /> Report Title <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input 
                type="text" 
                className="form-control" 
                required 
                placeholder="e.g. Complete Blood Count, Chest X-Ray" 
                style={{ marginTop: '0.5rem' }}
              />
            </div>

            <div className="form-group">
              <label>Report Type</label>
              <select className="form-select" style={{ marginTop: '0.5rem' }}>
                <option value="">-- Select Type --</option>
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
                className="form-control" 
                rows="2" 
                placeholder="Brief description of the report..."
                style={{ marginTop: '0.5rem' }}
              ></textarea>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} color="var(--primary)" /> Results / Findings
              </label>
              <textarea 
                className="form-control" 
                rows="4" 
                placeholder="Enter test results, findings, or observations..."
                style={{ marginTop: '0.5rem' }}
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
