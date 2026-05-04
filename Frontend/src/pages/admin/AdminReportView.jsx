import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, FileText, User, Calendar, ExternalLink, Activity, Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminReportById } from '../../utils/api';

const AdminReportView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getAdminReportById(id);
        setReport(res.data.data);
      } catch (err) {
        console.error("Failed to fetch report", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  if (loading) return (
    <AdminLayout>
      <div style={{padding: '5rem', textAlign: 'center'}}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
  );

  if (!report) return (
    <AdminLayout>
      <div style={{padding: '5rem', textAlign: 'center'}}>Report not found.</div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div style={{ marginBottom: '1.5rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      <div className="card">
        <div className="card-header border-bottom pb-4 mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>{report.testName || 'Diagnostic Report'}</h2>
            <div className="muted" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><User size={14} /> Patient: {report.patient?.user?.fullName || 'N/A'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={14} /> Date: {new Date(report.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <span className="chip-success" style={{ padding: '0.5rem 1rem' }}>{report.status}</span>
        </div>

        <div className="mt-4">
          <div className="grid grid-2" style={{ gap: '2.5rem' }}>
            <div>
              <h4 className="section-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} color="var(--primary)" /> Doctor
              </h4>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>{report.doctor?.fullName || 'Unassigned'}</p>
            </div>
            <div>
              <h4 className="section-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} color="var(--primary)" /> Lab Findings
              </h4>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>{report.result || 'Pending'}</p>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="section-subtitle">Detailed Observations</h4>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '0.75rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
              {report.comments || "No detailed observations provided for this report."}
            </div>
          </div>

          {report.attachments && report.attachments.length > 0 && (
            <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              <a href={report.attachments[0].url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem', textDecoration: 'none' }}>
                <ExternalLink size={18} /> View Attached Document
              </a>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReportView;
