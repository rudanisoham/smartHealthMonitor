import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  ClipboardList, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  FileText,
  UserPlus,
  Upload,
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { getMedicalPrescriptions, fulfillPrescription } from '../../utils/api';

const MedicalPrescriptions = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await getMedicalPrescriptions();
        setPrescriptions(res.data.data);
      } catch (err) {
        console.error("Failed to load prescriptions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, []);

  const filteredPrx = prescriptions.filter(p => {
    if (filter !== 'All' && p.status !== filter) return false;
    if (search && 
       !p._id.toLowerCase().includes(search.toLowerCase()) && 
       !(p.patient || '').toLowerCase().includes(search.toLowerCase())
    ) return false;
    return true;
  });

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading prescriptions...</div>;

  return (
    <div className="medical-prescriptions">
      <div className="mb-8">
        <h2 className="section-title">Prescription Management</h2>
        <p className="section-subtitle">Review and fulfill medication requests from doctors</p>
      </div>

      <div className="card mb-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button className={`filter-chip ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All Requests</button>
            <button className={`filter-chip ${filter === 'Pending' ? 'active' : ''}`} onClick={() => setFilter('Pending')}>Pending</button>
            <button className={`filter-chip ${filter === 'Dispensed' ? 'active' : ''}`} onClick={() => setFilter('Dispensed')}>Dispensed</button>
          </div>
          <div className="search-bar" style={{ minWidth: '300px' }}>
            <FileText size={18} className="text-muted" />
            <input type="text" placeholder="Search by PRX ID or Patient..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Prescription ID</th>
              <th>Patient Name</th>
              <th>Prescribing Doctor</th>
              <th>Items</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrx.map((prx) => (
              <tr key={prx._id}>
                <td><strong>{prx._id.slice(-6).toUpperCase()}</strong></td>
                <td>{prx.patient}</td>
                <td>{prx.doctor}</td>
                <td><span className="badge-soft">{prx.items} Medicines</span></td>
                <td>
                  <span className={`chip-${prx.status === 'Dispensed' ? 'success' : prx.status === 'In Progress' ? 'warning' : 'neutral'}`}>
                    {prx.status}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end gap-2">
                    <Link to={`/medical/prescriptions/${prx._id}`} className="btn-icon" title="View Details">
                      <ChevronRight size={16} />
                    </Link>
                    {prx.status !== 'Dispensed' && (
                      <button 
                        className="btn btn-primary btn-sm" 
                        style={{ padding: '0.4rem 0.8rem' }}
                        onClick={async () => {
                          try {
                            await fulfillPrescription(prx._id);
                            alert('Prescription fulfilled!');
                            window.location.reload();
                          } catch (err) {
                            alert(err.response?.data?.error || 'Failed to fulfill');
                          }
                        }}
                      >
                        Fulfill
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalPrescriptions;
