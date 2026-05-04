import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLabDashboard, updateReport } from '../../utils/api';
import { FlaskConical, History, Save } from 'lucide-react';

const RequestCard = ({ req, fetchDashboard, setSuccess, setError }) => {
  const [status, setStatus] = useState(req.status);
  const [file, setFile] = useState(null);

  const getStatusStyle = (s) => {
    switch(s) {
      case 'PENDING': return 'status-PENDING';
      case 'IN_PROGRESS': return 'status-IN_PROGRESS';
      case 'COMPLETED': return 'status-COMPLETED';
      default: return 'status-PENDING';
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const results = formData.get('resultNotes');
    
    // Simulate file upload by creating a fake path or base64
    let uploadedFilePath = req.filePath;
    if (file) {
      uploadedFilePath = `/uploads/reports/${file.name}`;
    }

    try {
      await updateReport(req._id, { 
        results, 
        status, 
        filePath: uploadedFilePath 
      });
      setSuccess('Diagnostic session finalized successfully.');
      setTimeout(() => setSuccess(''), 3000);
      fetchDashboard();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update report');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="group-card">
      <div className="group-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{req.patient}</h3>
            <span className={`status-badge ${getStatusStyle(req.status)}`}>{req.status}</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
            <strong>Doctor:</strong> Dr. {req.doctorName} | 
            <strong> Requested:</strong> {new Date(req.createdAt).toLocaleString()}
          </div>
          <div className="test-list-pill">
            <span className="test-pill">
              <FlaskConical size={14} /> {req.testTitle || req.test}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Request ID</div>
          <code style={{ color: '#3b82f6' }}>{req._id.substring(0, 13)}...</code>
        </div>
      </div>

      <form onSubmit={submitUpdate}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div className="form-group">
              <label style={{ fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '0.5rem' }}>Overall Diagnostic Notes</label>
              <textarea 
                name="resultNotes" 
                className="form-control" 
                rows="4" 
                defaultValue={req.results}
                placeholder="Enter findings for this test..."
                style={{ width: '100%', resize: 'none' }}
              ></textarea>
            </div>
          </div>
          <div>
            <div className="form-group">
              <label style={{ fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '0.5rem' }}>Update Status</label>
              <select 
                name="status" 
                className="form-select" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
            
            {status === 'COMPLETED' && (
              <div className="form-group mt-3" style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                <label style={{ fontWeight: 700, color: '#1e293b', display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Upload Final Report (PDF/Doc)</label>
                <input type="file" className="form-control" onChange={handleFileChange} accept=".pdf,.doc,.docx,.jpg,.png" required />
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '1rem' }}>
              <Save size={18} /> Finalize Session
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const LabDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const fetchDashboard = async () => {
    try {
      const res = await getLabDashboard();
      setData(res.data.data);
    } catch (err) {
      console.error("Failed to fetch lab dashboard", err);
      setError("Failed to fetch lab dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading diagnostic queue...</div>;

  const recentRequests = data?.recentRequests || [];

  return (
    <div className="lab-dashboard">
      <style>{`
        .group-card { border: 2px solid #e2e8f0; border-radius: 20px; padding: 2rem; background: white; margin-bottom: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .group-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #f1f5f9; }
        .test-list-pill { display: inline-flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem; }
        .test-pill { background: #f1f5f9; color: #475569; padding: 0.25rem 0.75rem; border-radius: 100px; font-size: 0.75rem; font-weight: 600; border: 1px solid #e2e8f0; display:flex; align-items:center; gap:0.25rem; }
        .status-badge { padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
        .status-PENDING { background: #fef3c7; color: #d97706; }
        .status-IN_PROGRESS { background: #e0e7ff; color: #4338ca; }
        .status-COMPLETED { background: #d1fae5; color: #059669; }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Diagnostic Queue</h2>
          <p className="muted">Finalize diagnostic sessions and upload consolidated reports.</p>
        </div>
        <Link to="/lab/history" className="btn btn-outline btn-sm">
          <History size={16} /> View Completed History
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ padding: '1.5rem', border: 'none', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Investigations</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1e3a8a', marginTop: '0.5rem' }}>{data?.stats?.pendingTests || 0}</div>
        </div>
        <div className="card" style={{ padding: '1.5rem', border: 'none', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reports Ready</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#14532d', marginTop: '0.5rem' }}>{data?.stats?.reportsReady || 0}</div>
        </div>
        <div className="card" style={{ padding: '1.5rem', border: 'none', background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9d174d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg. Turnaround</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#831843', marginTop: '0.5rem' }}>{data?.stats?.turnaroundTime || '4.2h'}</div>
        </div>
      </div>

      {success && <div style={{ padding: '1rem', background: '#d1fae5', color: '#059669', borderRadius: '8px', marginBottom: '1.5rem' }}>{success}</div>}
      {error && <div style={{ padding: '1rem', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</div>}

      {recentRequests.length === 0 ? (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🧪</div>
          <h3 className="muted">All clear!</h3>
          <p className="muted mt-1">No pending diagnostic sessions.</p>
        </div>
      ) : (
        recentRequests.map(req => (
          <RequestCard key={req._id} req={req} fetchDashboard={fetchDashboard} setSuccess={setSuccess} setError={setError} />
        ))
      )}
    </div>
  );
};

export default LabDashboard;
