import React from 'react';
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
import { Link } from 'react-router-dom';

const MedicalPrescriptions = () => {
  const prescriptions = [
    { id: 'PRX-901', patient: 'Michael Johnson', doctor: 'Dr. Sarah Connor', date: '2026-05-02', status: 'Pending', items: 3 },
    { id: 'PRX-902', patient: 'Emma Watson', doctor: 'Dr. James Wilson', date: '2026-05-02', status: 'In Progress', items: 1 },
    { id: 'PRX-903', patient: 'Chris Evans', doctor: 'Dr. Lisa Cuddy', date: '2026-05-01', status: 'Pending', items: 4 },
    { id: 'PRX-899', patient: 'Scarlett Johansson', doctor: 'Dr. Sarah Connor', date: '2026-04-30', status: 'Dispensed', items: 2 },
  ];

  return (
    <div className="medical-prescriptions">
      <div className="mb-8">
        <h2 className="section-title">Prescription Management</h2>
        <p className="section-subtitle">Review and fulfill medication requests from doctors</p>
      </div>

      <div className="card mb-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button className="filter-chip active">All Requests</button>
            <button className="filter-chip">Pending</button>
            <button className="filter-chip">Dispensed</button>
          </div>
          <div className="search-bar" style={{ minWidth: '300px' }}>
            <FileText size={18} className="text-muted" />
            <input type="text" placeholder="Search by PRX ID..." />
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
            {prescriptions.map((prx) => (
              <tr key={prx.id}>
                <td><strong>{prx.id}</strong></td>
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
                    <button className="btn-icon" title="View Details">
                      <ChevronRight size={16} />
                    </button>
                    {prx.status !== 'Dispensed' && (
                      <button className="btn btn-primary btn-sm" style={{ padding: '0.4rem 0.8rem' }}>
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
