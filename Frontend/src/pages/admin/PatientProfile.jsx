import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader, User, Calendar, Mail, Phone, ShieldAlert, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminPatientById, deleteAdminPatient } from '../../utils/api';

export default function PatientProfile() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await getAdminPatientById(id);
        setPatient(res.data.data);
      } catch (err) {
        console.error("Failed to fetch patient details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this patient record? This action cannot be undone.')) {
      try {
        await deleteAdminPatient(id);
        window.location.href = '/admin/patients';
      } catch (err) {
        alert('Failed to delete patient');
      }
    }
  };

  if (loading) return (
    <AdminLayout>
      <div style={{ padding: '5rem', textAlign: 'center' }}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
  );

  if (!patient) return (
    <AdminLayout>
      <div style={{ padding: '5rem', textAlign: 'center' }}>Patient record not found.</div>
    </AdminLayout>
  );

  return (
    <AdminLayout title="Patient Record Profile" subtitle="View system data for a registered patient">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/admin/patients" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#F8FAFC';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>
          <span style={{fontWeight: '800'}}>←</span> Back to Patient List
        </Link>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        {/* Top Cards Row */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
          
          {/* Left Card: Account details */}
          <div className="card" style={{padding: '2rem'}}>
            <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem'}}>
              <div style={{width: '72px', height: '72px', borderRadius: '50%', background: '#0EA5E9', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700'}}>
                {patient.user?.fullName ? patient.user.fullName.charAt(0) : 'P'}
              </div>
              <div>
                <div style={{fontSize: '1.4rem', fontWeight: '800', color: '#0F172A'}}>{patient.user?.fullName}</div>
                <div style={{fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>
                  Joined: {new Date(patient.user?.createdAt || patient._id.getTimestamp()).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <div style={{background: '#F8FAFC', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
                <div style={{fontSize: '0.75rem', fontWeight: '700', color: '#64748B'}}>System Account ID</div>
                <div style={{fontSize: '0.95rem', fontWeight: '700', color: '#0F172A'}}>{patient._id}</div>
              </div>
              <div style={{background: '#F8FAFC', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
                <div style={{fontSize: '0.75rem', fontWeight: '700', color: '#64748B'}}>Email</div>
                <div style={{fontSize: '0.95rem', fontWeight: '700', color: '#0F172A'}}>{patient.user?.email}</div>
              </div>
              <div style={{background: '#F8FAFC', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
                <div style={{fontSize: '0.75rem', fontWeight: '700', color: '#64748B'}}>Account Role</div>
                <div style={{display: 'flex'}}><span style={{background: '#DCFCE7', color: '#16A34A', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700'}}>{patient.user?.role}</span></div>
              </div>
            </div>
          </div>

          {/* Right Card: Demographics */}
          <div className="card" style={{padding: '2rem', borderTop: '4px solid #0EA5E9', borderRadius: '12px'}}>
            <div style={{marginBottom: '2rem'}}>
              <div style={{fontSize: '1.2rem', fontWeight: '800', color: '#0F172A'}}>Health Demographics</div>
              <div style={{fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Basic medical metadata</div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <div style={{background: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <div style={{fontSize: '0.8rem', fontWeight: '600', color: '#475569'}}>Blood Group</div>
                <div style={{display: 'flex'}}><span style={{background: '#FEE2E2', color: '#EF4444', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700'}}>{patient.bloodGroup || '—'}</span></div>
              </div>
              <div style={{background: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <div style={{fontSize: '0.8rem', fontWeight: '600', color: '#475569'}}>Biological Sex</div>
                <div style={{fontSize: '0.95rem', fontWeight: '800', color: '#0F172A'}}>{patient.gender || '—'}</div>
              </div>
              <div style={{background: '#F8FAFC', padding: '1.25rem 1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <div style={{fontSize: '0.8rem', fontWeight: '600', color: '#475569'}}>Registered Phone</div>
                <div style={{fontSize: '0.95rem', fontWeight: '700', color: '#0F172A'}}>{patient.phone || patient.user?.phone || '—'}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Info Alert Box */}
        <div style={{background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <ShieldAlert size={24} color="#F59E0B" />
          <div style={{fontSize: '0.85rem', color: '#1E3A8A', lineHeight: '1.5'}}>
            <span style={{fontWeight: '700'}}>HIPAA Privacy Lock:</span> As a system administrator, you cannot view the clinical diagnostic records, issued prescriptions, or detailed vital metrics for this patient. Only assigned registered doctors can view specific Personal Health Information (PHI).
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{border: '1px solid #FECACA', background: '#FEF2F2', borderRadius: '12px', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <div style={{fontSize: '1.1rem', fontWeight: '800', color: '#DC2626'}}>Danger Zone</div>
          <div style={{fontSize: '0.85rem', color: '#EF4444', marginTop: '0.1rem', marginBottom: '1.5rem', fontWeight: '500'}}>Administrative overrides</div>
          
          <button onClick={handleDelete} style={{padding: '0.6rem 1.25rem', background: 'transparent', border: '1px solid #EF4444', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700', color: '#EF4444', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem'}} onMouseOver={(e) => {e.currentTarget.style.background = '#EF4444'; e.currentTarget.style.color = '#FFFFFF';}} onMouseOut={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#EF4444';}}>
            <Trash2 size={16} /> Hard Delete Patient Record
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
