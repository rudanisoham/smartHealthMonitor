import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Edit3, MapPin, Phone, Users, Shield, User } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const ViewDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const department = {
    id: id || 1,
    name: "Cardiology Unit",
    head: "Dr. John Smith",
    location: "Block A, 3rd Floor",
    phone: "+1 234 567 891",
    capacity: 25,
    occupancy: 18,
    availableBeds: 7,
    occupiedBeds: 18,
    description: "Specialized unit for heart and cardiovascular health management."
  };

  const doctors = [
    { id: 1, name: "Dr. John Smith", specialty: "Cardiologist", status: "Active" },
    { id: 2, name: "Dr. Alice Baker", specialty: "Cardiac Surgeon", status: "Active" },
    { id: 3, name: "Dr. Mike Wilson", specialty: "Pediatric Cardiologist", status: "Active" },
  ];

  const beds = [
    { id: 1, number: "C-101", type: "Normal", status: "Occupied", patient: "Soham Rudani" },
    { id: 2, number: "C-102", type: "ICU", status: "Occupied", patient: "Neha Sharma" },
    { id: 3, number: "C-103", type: "Normal", status: "Available", patient: null },
    { id: 4, number: "C-104", type: "Normal", status: "Available", patient: null },
    { id: 5, number: "C-105", type: "ICU", status: "Maintenance", patient: null },
  ];

  const occupancyRate = (department.occupancy * 100) / department.capacity;

  return (
    <AdminLayout>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back to List
        </button>
        <Link to={`/admin/departments/configure?id=${department.id}`} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Edit3 size={16} /> Edit Department
        </Link>
      </div>

      <div className="grid grid-3" style={{ gap: '2rem', marginBottom: '2rem' }}>
        <div className="card col-span-2">
          <div className="card-header border-bottom pb-4 mb-4">
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>{department.name}</h2>
            <p className="muted" style={{ marginTop: '0.25rem' }}>{department.description}</p>
          </div>
          
          <div className="grid grid-2 mt-4" style={{ gap: '1.5rem' }}>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <Shield size={14} /> Department Head
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{department.head}</div>
            </div>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <MapPin size={14} /> Physical Location
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{department.location}</div>
            </div>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <Phone size={14} /> Emergency Contact
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{department.phone}</div>
            </div>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <Users size={14} /> Capacity Status
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{department.occupancy} / {department.capacity}</div>
                <div className="muted" style={{ fontSize: '0.85rem' }}>{Math.round(occupancyRate)}% Occupied</div>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'var(--border)', borderRadius: '10px', marginTop: '0.75rem', overflow: 'hidden' }}>
                <div style={{ width: `${occupancyRate}%`, height: '100%', background: occupancyRate > 90 ? '#ef4444' : (occupancyRate > 70 ? '#f59e0b' : '#10b981') }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="section-title mb-4">Assigned Doctors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {doctors.map(doc => (
              <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                    {doc.name.split(' ')[1].charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{doc.name}</div>
                    <div className="muted" style={{ fontSize: '0.75rem' }}>{doc.specialty}</div>
                  </div>
                </div>
                <span className="chip" style={{ fontSize: '0.7rem' }}>Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom pb-4 mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="section-title">Bed Inventory</h3>
            <p className="muted" style={{ fontSize: '0.85rem' }}>All beds currently configured in this department</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span className="chip-success">{department.availableBeds} Available</span>
            <span className="chip-danger">{department.occupiedBeds} Occupied</span>
          </div>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Bed Number</th>
                <th>Type</th>
                <th>Status</th>
                <th>Assigned Patient</th>
              </tr>
            </thead>
            <tbody>
              {beds.map(bed => (
                <tr key={bed.id}>
                  <td><strong style={{ fontSize: '1rem' }}>{bed.number}</strong></td>
                  <td>
                    <span className={bed.type === 'ICU' ? 'chip-danger' : 'chip-neutral'} style={{ fontSize: '0.7rem' }}>{bed.type}</span>
                  </td>
                  <td>
                    {bed.status === 'Occupied' ? (
                      <span className="chip-danger" style={{ fontSize: '0.7rem' }}>Occupied</span>
                    ) : bed.status === 'Available' ? (
                      <span className="chip-success" style={{ fontSize: '0.7rem' }}>Available</span>
                    ) : (
                      <span className="chip-warning" style={{ fontSize: '0.7rem' }}>Maintenance</span>
                    )}
                  </td>
                  <td>
                    {bed.patient ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={14} className="muted" /> {bed.patient}
                      </div>
                    ) : (
                      <span className="muted">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewDepartment;
