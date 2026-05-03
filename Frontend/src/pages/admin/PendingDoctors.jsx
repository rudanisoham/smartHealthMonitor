import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { getPendingDoctors, approveDoctor, deleteAdminStaff } from '../../utils/api';
import { Check, X, Loader, User, Mail, Phone, Award } from 'lucide-react';

export default function PendingDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const res = await getPendingDoctors();
      setDoctors(res.data.data);
    } catch (err) {
      setError('Failed to fetch pending applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Are you sure you want to approve this doctor?')) return;
    try {
      setActionLoading(id);
      await approveDoctor(id);
      setDoctors(doctors.filter(d => d._id !== id));
      alert('Doctor approved successfully!');
    } catch (err) {
      alert('Failed to approve doctor.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject and delete this doctor application? This cannot be undone.')) return;
    try {
      setActionLoading(id);
      await deleteAdminStaff(id); 
      setDoctors(doctors.filter(d => d._id !== id));
      alert('Application rejected and account deleted.');
    } catch (err) {
      alert('Failed to reject application.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AdminLayout title="Pending Approvals" subtitle="Review doctors waiting to join the hospital">
      
      <div className="mb-6">
        <Link to="/admin/doctors" className="btn btn-outline btn-sm" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}>
          <span style={{fontWeight: '800'}}>←</span> Back to Doctors
        </Link>
      </div>

      <div className="card" style={{padding: '0', overflow: 'hidden'}}>
        <div style={{padding: '1.75rem 2.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>Applications Under Review</div>
            <div style={{fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Awaiting credential verification</div>
          </div>
          <div className="badge-soft info">{doctors.length} Pending</div>
        </div>

        {loading ? (
          <div style={{padding: '4rem', textAlign: 'center'}}>
            <Loader className="animate-spin" style={{margin: '0 auto', color: 'var(--primary)'}} />
            <p className="muted mt-2">Fetching applications...</p>
          </div>
        ) : error ? (
          <div style={{padding: '3rem', textAlign: 'center', color: '#ef4444'}}>{error}</div>
        ) : (
          <div style={{width: '100%', overflowX: 'auto'}}>
            <table className="premium-table" style={{width: '100%', minWidth: '900px', borderSpacing: 0}}>
              <thead>
                <tr>
                  <th style={{padding: '1.25rem 2.5rem', textAlign: 'left'}}>DOCTOR INFO</th>
                  <th style={{padding: '1.25rem 1.5rem', textAlign: 'center'}}>CONTACT</th>
                  <th style={{padding: '1.25rem 1.5rem', textAlign: 'center'}}>SPECIALTY</th>
                  <th style={{padding: '1.25rem 1.5rem', textAlign: 'center'}}>EXPERIENCE</th>
                  <th style={{padding: '1.25rem 1.5rem', textAlign: 'center'}}>LICENSE</th>
                  <th style={{padding: '1.25rem 2.5rem', textAlign: 'right'}}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {doctors.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{padding: '6rem 2rem', textAlign: 'center', background: '#FFFFFF'}}>
                      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem'}}>
                        <div style={{width: '56px', height: '56px', background: '#f0fdf4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <Check color="#22c55e" size={32} />
                        </div>
                        <div style={{color: '#64748B', fontSize: '0.95rem', fontWeight: '600'}}>No pending applications. All caught up!</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  doctors.map((doc) => (
                    <tr key={doc._id}>
                      <td style={{padding: '1.25rem 2.5rem'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                          <div style={{width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <User size={20} color="#64748B" />
                          </div>
                          <div>
                            <div style={{fontWeight: '700', color: '#1E293B'}}>{doc.name}</div>
                            <div className="muted" style={{fontSize: '0.8rem'}}>{doc.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{padding: '1.25rem 1.5rem', textAlign: 'center'}}>
                         <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem'}}>
                               <Phone size={14} className="muted" /> {doc.phone}
                            </div>
                         </div>
                      </td>
                      <td style={{padding: '1.25rem 1.5rem', textAlign: 'center'}}>
                        <span className="badge-soft primary">{doc.specialty}</span>
                      </td>
                      <td style={{padding: '1.25rem 1.5rem', textAlign: 'center'}}>
                        <div style={{fontWeight: '600'}}>{doc.experience} Years</div>
                      </td>
                      <td style={{padding: '1.25rem 1.5rem', textAlign: 'center'}}>
                        <div style={{fontFamily: 'monospace', fontSize: '0.85rem', color: '#0f172a', background: '#f8fafc', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'inline-block'}}>
                          {doc.licenseNumber}
                        </div>
                      </td>
                      <td style={{padding: '1.25rem 2.5rem', textAlign: 'right'}}>
                        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.75rem'}}>
                          <button onClick={() => handleApprove(doc._id)} className="btn btn-primary btn-sm" disabled={actionLoading === doc._id} style={{display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#10b981', borderColor: '#10b981'}}>
                            {actionLoading === doc._id ? <Loader size={14} className="animate-spin" /> : <Check size={14} />} Approve
                          </button>
                          <button onClick={() => handleReject(doc.userId || doc._id)} className="btn btn-outline btn-sm" disabled={actionLoading === doc._id} style={{display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', borderColor: '#ef4444'}}>
                             <X size={14} /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
