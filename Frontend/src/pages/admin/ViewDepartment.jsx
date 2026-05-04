import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Edit3, MapPin, Phone, Users, Shield, User, Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminDepartmentById } from '../../utils/api';

const ViewDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminDepartmentById(id);
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch department", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return (
    <AdminLayout>
      <div style={{padding: '5rem', textAlign: 'center'}}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
  );

  const { department, doctors, beds } = data;
  const occupancyRate = department.capacity > 0 ? (department.currentOccupancy * 100) / department.capacity : 0;

  return (
    <AdminLayout>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={16} /> Back to List
        </button>
        <Link to={`/admin/departments/configure?id=${department._id}`} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Edit3 size={16} /> Edit Department
        </Link>
      </div>

      <div className="grid grid-3" style={{ gap: '2rem', marginBottom: '2rem' }}>
        <div className="card col-span-2">
          <div className="card-header border-bottom pb-4 mb-4">
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>{department.name}</h2>
            <p className="muted" style={{ marginTop: '0.25rem' }}>{department.description || 'No description available.'}</p>
          </div>
          
          <div className="grid grid-2 mt-4" style={{ gap: '1.5rem' }}>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <Shield size={14} /> Department Head
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{department.head || 'Dr. Not Assigned'}</div>
            </div>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <MapPin size={14} /> Physical Location
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{department.location || 'Main Block'}</div>
            </div>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <Phone size={14} /> Emergency Contact
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{department.phone || 'N/A'}</div>
            </div>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <Users size={14} /> Capacity Status
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{department.currentOccupancy} / {department.capacity}</div>
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
            {doctors.length === 0 ? (
              <div className="muted text-sm py-4">No doctors assigned to this department.</div>
            ) : doctors.map(doc => (
              <div key={doc._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                    {doc.user?.fullName?.charAt(0) || 'D'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{doc.user?.fullName}</div>
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
              {beds.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-4">No beds registered in this department.</td></tr>
              ) : beds.map(bed => (
                <tr key={bed._id}>
                  <td><strong style={{ fontSize: '1rem' }}>{bed.bedNumber}</strong></td>
                  <td>
                    <span className={bed.type === 'ICU' ? 'chip-danger' : 'chip-neutral'} style={{ fontSize: '0.7rem' }}>{bed.type}</span>
                  </td>
                  <td>
                    {bed.isOccupied ? (
                      <span className="chip-danger" style={{ fontSize: '0.7rem' }}>Occupied</span>
                    ) : (
                      <span className="chip-success" style={{ fontSize: '0.7rem' }}>Available</span>
                    )}
                  </td>
                  <td>
                    {bed.patient ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={14} className="muted" /> {bed.patient.user?.fullName}
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
