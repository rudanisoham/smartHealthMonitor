import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, FileText, User, Calendar, ExternalLink, Activity } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const AdminReportView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const report = {
    id: id || 1,
    title: "Annual Cardiovascular Screening",
    patient: "Soham Rudani",
    submittedDate: "2026-03-15",
    status: "REVIEWED",
    type: "Diagnostic Lab Test",
    results: "Normal Sinus Rhythm, Slight Vitamin D Deficiency",
    description: "Full blood work and stress test conducted. All major cardiac markers are within normal range. Patient advised to increase daily activity.",
    doctorComments: "Patient shows good progress. Stress test results were optimal. Maintain current diet and follow-up in 6 months.",
    filePath: "#"
  };

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
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>{report.title}</h2>
            <div className="muted" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><User size={14} /> Patient: {report.patient}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={14} /> Submitted: {report.submittedDate}</span>
            </div>
          </div>
          <span className="chip-success" style={{ padding: '0.5rem 1rem' }}>{report.status}</span>
        </div>

        <div className="mt-4">
          <div className="grid grid-2" style={{ gap: '2.5rem' }}>
            <div>
              <h4 className="section-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} color="var(--primary)" /> Report Type
              </h4>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>{report.type}</p>
            </div>
            <div>
              <h4 className="section-subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} color="var(--primary)" /> Diagnosis/Results
              </h4>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '0.5rem' }}>{report.results}</p>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="section-subtitle">Detailed Description</h4>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '0.75rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
              {report.description}
            </div>
          </div>

          {report.doctorComments && (
            <div className="mt-5 p-4" style={{ background: 'rgba(59, 130, 246, 0.05)', borderLeft: '4px solid #3b82f6', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} color="#3b82f6" /> Doctor's Findings:
              </h4>
              <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.6 }}>{report.doctorComments}</p>
            </div>
          )}
          
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem' }}>
              <ExternalLink size={18} /> View Attached Document
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReportView;
