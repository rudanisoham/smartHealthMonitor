import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  ChevronRight, 
  Calendar, 
  Phone, 
  Mail,
  History,
  Pill
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPatients } from '../../utils/api';

const PatientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getPatients();
        // Transform backend patient data if needed
        const mappedPatients = res.data.data.map(p => ({
          id: p._id.slice(-6).toUpperCase(),
          _id: p._id,
          name: p.user?.fullName || 'Unknown',
          age: p.age || 'N/A',
          gender: p.gender || 'N/A',
          phone: p.user?.phone || 'N/A',
          email: p.user?.email || 'N/A',
          lastVisit: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'
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

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="medical-patient-search">
      <div className="mb-8">
        <h2 className="section-title">Patient Lookup</h2>
        <p className="section-subtitle">Search for patients to manage prescriptions and medical records</p>
      </div>

      <div className="card mb-8 shadow-sm">
        <div className="search-bar w-full" style={{ padding: '0.85rem 1.5rem', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
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
        {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
          <div key={patient._id} className="card shadow-sm hover-card">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="header-avatar" style={{ width: '56px', height: '56px', fontSize: '1.25rem', background: '#3b82f6', color: 'white' }}>
                  {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="author-name" style={{ fontSize: '1.1rem', fontWeight: 700 }}>{patient.name}</h3>
                  <div className="muted">{patient.id} • {patient.age} years • {patient.gender}</div>
                </div>
              </div>
              <span className="badge-soft">Last Visit: {patient.lastVisit}</span>
            </div>

            <div className="grid grid-2 gap-4 mt-6 pt-6 border-top">
              <div className="flex items-center gap-2 muted" style={{ fontSize: '0.85rem' }}>
                <Phone size={14} className="text-primary" /> {patient.phone}
              </div>
              <div className="flex items-center gap-2 muted" style={{ fontSize: '0.85rem' }}>
                <Mail size={14} className="text-primary" /> {patient.email}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Link to={`/medical/patient/${patient._id}/history`} className="btn btn-outline flex-1 btn-sm">
                <History size={16} /> View History
              </Link>
              <Link to={`/medical/patient/${patient._id}/prescriptions`} className="btn btn-primary flex-1 btn-sm">
                <Pill size={16} /> View Prescriptions
              </Link>
            </div>
          </div>
        )) : (
          <div className="col-span-2 text-center py-8 muted">
            No patients found matching your search.
          </div>
        )}
      </div>
      <style>{`
        .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
      `}</style>
    </div>
  );
};

export default PatientSearch;

