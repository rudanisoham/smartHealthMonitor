import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Eye, Edit, UserX, Loader, Trash2, X, Save } from 'lucide-react';
import { getReceptionPatients, updateReceptionPatient, deleteReceptionPatient } from '../../utils/api';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Edit Modal State
  const [editingPatient, setEditingPatient] = useState(null);
  const [editFormData, setEditFormData] = useState({ fullName: '', phone: '', email: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await getReceptionPatients();
      if (res.data.success) {
        setPatients(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Failed to load patients. Please check if backend is running.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient and their associated user account? This action is IRREVERSIBLE.')) {
      try {
        await deleteReceptionPatient(id);
        setPatients(patients.filter(p => p._id !== id));
        alert('Patient deleted successfully');
      } catch (err) {
        alert('Failed to delete patient');
      }
    }
  };

  const openEditModal = (patient) => {
    setEditingPatient(patient);
    setEditFormData({
      fullName: patient.name,
      phone: patient.phone,
      email: patient.email
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // In our backend, we update the user fields through the patient update endpoint
      await updateReceptionPatient(editingPatient._id, {
        // We'll need to handle the user nested updates in the controller if needed, 
        // for now let's assume we pass what the controller expects
        user: { fullName: editFormData.fullName, phone: editFormData.phone, email: editFormData.email }
      });
      await fetchPatients();
      setEditingPatient(null);
      alert('Patient updated successfully');
    } catch (err) {
      alert('Failed to update patient');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPatients = patients.filter(patient => 
    (patient.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.id || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-content flex justify-center items-center py-20">
        <Loader className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="admin-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Patient Directory</h2>
          <p className="section-subtitle">Manage and view all registered patient records</p>
        </div>
        <div className="flex gap-3">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline" onClick={fetchPatients}>
            <Filter size={18} /> Refresh
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger mb-6">{error}</div>}

      <div className="table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
              <tr key={patient._id}>
                <td><span className="badge-soft">{patient.id}</span></td>
                <td>
                  <div className="flex-author">
                    <div className="header-avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                      {patient.name?.charAt(0) || 'P'}
                    </div>
                    <span className="author-name">{patient.name || 'N/A'}</span>
                  </div>
                </td>
                <td><span className="muted">{patient.email || 'N/A'}</span></td>
                <td><span className="muted">{patient.phone || 'N/A'}</span></td>
                <td className="text-right">
                  <div className="flex gap-2 justify-end">
                    <button className="btn-icon" title="Edit Record" onClick={() => openEditModal(patient)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-icon text-danger" title="Delete Record" onClick={() => handleDelete(patient._id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center py-8 muted">No patients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingPatient && (
        <div className="modal-overlay" style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '450px', padding: '2rem' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="section-title" style={{ margin: 0 }}>Edit Patient Profile</h3>
              <button onClick={() => setEditingPatient(null)} className="btn-icon"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleEditSubmit}>
              <div className="form-group mb-4">
                <label>Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={editFormData.fullName}
                  onChange={(e) => setEditFormData({...editFormData, fullName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group mb-6">
                <label>Phone Number</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex gap-3">
                <button type="button" onClick={() => setEditingPatient(null)} className="btn btn-outline flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1" disabled={submitting}>
                  {submitting ? <Loader className="animate-spin inline mr-2" size={16} /> : <><Save size={16} className="inline mr-2" /> Save Changes</>}
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
