import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Edit, Trash2, X, Save, Loader, BedDouble, User } from 'lucide-react';
import { getReceptionPatients, updateReceptionPatient, deleteReceptionPatient } from '../../utils/api';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssignedOnly, setShowAssignedOnly] = useState(false);

  // Edit modal
  const [editingPatient, setEditingPatient] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getReceptionPatients();
      if (res.data.success) setPatients(res.data.data);
    } catch (err) {
      console.error('getPatients error:', err);
      setError('Failed to load patients. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPatients(); }, []);

  const filtered = patients.filter(p => {
    const matchSearch =
      (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = showAssignedOnly ? !!p.department : true;
    return matchSearch && matchFilter;
  });

  const openEdit = (p) => {
    setEditingPatient(p);
    setEditForm({ fullName: p.name, email: p.email, phone: p.phone });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateReceptionPatient(editingPatient._id, {
        fullName: editForm.fullName,
        email: editForm.email,
        phone: editForm.phone
      });
      await fetchPatients();
      setEditingPatient(null);
      showToast('Patient updated successfully');
    } catch (err) {
      showToast('Failed to update patient', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete patient "${p.name}"? This will also remove their login account. This cannot be undone.`)) return;
    try {
      await deleteReceptionPatient(p._id);
      setPatients(prev => prev.filter(x => x._id !== p._id));
      showToast('Patient record deleted');
    } catch (err) {
      showToast('Failed to delete patient', 'error');
    }
  };

  if (loading) return (
    <div className="admin-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <div style={{ textAlign: 'center' }}>
        <Loader className="animate-spin text-primary" size={40} style={{ margin: '0 auto 1rem' }} />
        <p className="muted">Loading patient directory…</p>
      </div>
    </div>
  );

  return (
    <div className="admin-content">
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 9999,
          padding: '1rem 1.5rem', borderRadius: '12px', fontWeight: 600,
          background: toast.type === 'error' ? '#fee2e2' : '#dcfce7',
          color: toast.type === 'error' ? '#b91c1c' : '#166534',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
        }}>
          {toast.msg}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Patient Directory</h2>
          <p className="section-subtitle">
            View and manage all registered patients · {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search name, email or ID…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className={`btn ${showAssignedOnly ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setShowAssignedOnly(v => !v)}
            title="Show only patients with department assignment"
          >
            <BedDouble size={16} /> Assigned Only
          </button>
          <button className="btn btn-outline" onClick={fetchPatients}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ margin: 0 }}>
          <table className="premium-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Department / Bed</th>
                <th>Blood Group</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(p => (
                <tr key={p._id}>
                  <td><span className="badge-soft">{p.id}</span></td>
                  <td>
                    <div className="flex-author">
                      <div className="header-avatar" style={{ width: '34px', height: '34px', fontSize: '0.9rem', flexShrink: 0 }}>
                        {(p.name || 'P').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="author-name">{p.name || 'N/A'}</div>
                        {p.gender && <div className="muted" style={{ fontSize: '0.75rem' }}>{p.gender}</div>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.875rem' }}>{p.email || '—'}</div>
                    <div className="muted" style={{ fontSize: '0.8rem' }}>{p.phone || '—'}</div>
                  </td>
                  <td>
                    {p.department
                      ? <span className="chip">{p.department}</span>
                      : <span className="muted">Not Assigned</span>}
                  </td>
                  <td>
                    {p.bloodGroup
                      ? <span className="chip-neutral">{p.bloodGroup}</span>
                      : <span className="muted">—</span>}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="flex gap-2" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="btn-icon"
                        title="Edit Patient"
                        onClick={() => openEdit(p)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-icon"
                        title="Delete Patient"
                        style={{ color: '#ef4444' }}
                        onClick={() => handleDelete(p)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <User size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
                    <div>No patients found{searchTerm ? ` matching "${searchTerm}"` : ''}.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPatient && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{ width: '460px', padding: '2rem', position: 'relative' }}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="section-title" style={{ margin: 0 }}>Edit Patient</h3>
                <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>ID: {editingPatient.id}</p>
              </div>
              <button className="btn-icon" onClick={() => setEditingPatient(null)}><X size={20} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={editForm.fullName}
                  onChange={e => setEditForm(f => ({ ...f, fullName: e.target.value }))} required />
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" value={editForm.email}
                  onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} required />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-control" value={editForm.phone}
                  onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="flex gap-3">
                <button type="button" className="btn btn-outline" style={{ flex: 1 }}
                  onClick={() => setEditingPatient(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={submitting}>
                  {submitting ? <Loader className="animate-spin" size={16} /> : <><Save size={16} /> Save Changes</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
