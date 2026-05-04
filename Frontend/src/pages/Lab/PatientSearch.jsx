import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  ChevronRight, 
  Calendar, 
  Phone, 
  Mail,
  History,
  FlaskConical,
  Activity
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getPatients } from '../../utils/api';

const LabPatientSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getPatients();
        const mappedPatients = res.data.data.map(p => ({
          id: p._id.slice(-6).toUpperCase(),
          _id: p._id,
          name: p.user?.fullName || 'Unknown',
          age: p.age || 'N/A',
          gender: p.gender || 'N/A',
          phone: p.user?.phone || 'N/A',
          email: p.user?.email || 'N/A',
          lastVisit: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A',
          pendingTests: 0 // Mock for now, could be added via aggregation
        }));
        setPatients(mappedPatients);
      } catch (err) {
        console.error('Failed to load patients', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading patients...</div>;

  return (
    <div className="lab-patient-search">
      <div className="mb-8">
        <h2 className="section-title">Laboratory Patient Lookup</h2>
        <p className="section-subtitle">Search for patients to manage diagnostic tests and specimens</p>
      </div>

      <div className="card mb-8">
        <div className="search-bar w-full" style={{ padding: '0.85rem 1.5rem' }}>
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search by Patient Name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-2">
        {filteredPatients.map((patient) => (
          <div key={patient._id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="header-avatar" style={{ width: '56px', height: '56px', fontSize: '1.25rem' }}>
                  {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="author-name" style={{ fontSize: '1.1rem' }}>{patient.name}</h3>
                  <div className="muted">{patient.id} • {patient.age} years • {patient.gender}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="badge-soft">Last Visit: {patient.lastVisit}</span>
                {patient.pendingTests > 0 && (
                  <span className="chip-warning" style={{ fontSize: '0.7rem' }}>{patient.pendingTests} Pending Tests</span>
                )}
              </div>
            </div>

            <div className="grid grid-2 gap-4 mt-6 pt-6 border-top">
              <div className="flex items-center gap-2 muted" style={{ fontSize: '0.85rem' }}>
                <Phone size={14} /> {patient.phone}
              </div>
              <div className="flex items-center gap-2 muted" style={{ fontSize: '0.85rem' }}>
                <Mail size={14} /> {patient.email}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="btn btn-outline flex-1 btn-sm">
                <History size={16} /> History
              </button>
              <button 
                className="btn btn-primary flex-1 btn-sm" 
                onClick={() => navigate('/lab/upload-report', { state: { patientId: patient._id } })}
              >
                <FlaskConical size={16} /> Add Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabPatientSearch;
