import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

export default function DoctorProfile() {
  const { id } = useParams();

  // In a real application, fetch the doctor document by 'id' here.
  // Using static mock data based on our Doctors.jsx for preview:
  const profile = {
    name: "Dr. Soham Rudani",
    lic: "ASDASD",
    email: "rudanisoham@gmail.com",
    phone: "+919316202895",
    specialty: "Cardiology",
    dept: "Cardiology",
    status: "Active",
    joined: "Aug 15, 2025",
    initial: "S",
    bg: "#1E293B"
  };

  return (
    <AdminLayout title="Doctor Profile" subtitle="Review complete physician record & credentials">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/admin/doctors" style={{display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#F8FAFC';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>
          <span style={{fontWeight: '800'}}>—</span> Back to Doctors
        </Link>
      </div>

      <div className="grid grid-2" style={{gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)'}}>
        
        {/* Left Side: Summary Card */}
        <div className="card" style={{padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <div style={{width: '96px', height: '96px', borderRadius: '50%', background: profile.bg, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem', boxShadow: '0 4px 14px rgba(0,0,0,0.1)'}}>
            {profile.initial}
          </div>
          
          <h2 style={{fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', margin: '0 0 0.25rem 0'}}>{profile.name}</h2>
          <div style={{color: '#64748B', fontSize: '0.95rem', fontWeight: '500', marginBottom: '1rem'}}>{profile.specialty} Specialist</div>
          
          <div style={{background: profile.status === 'Active' ? '#DCFCE7' : '#FEE2E2', color: profile.status === 'Active' ? '#10B981' : '#EF4444', padding: '0.35rem 1rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '2rem'}}>
            {profile.status}
          </div>

          <div style={{width: '100%', borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left'}}>
            <div>
              <div style={{fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Phone</div>
              <div style={{fontSize: '0.95rem', color: '#1E293B', fontWeight: '500', marginTop: '0.2rem'}}>{profile.phone}</div>
            </div>
            <div>
              <div style={{fontSize: '0.75rem', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Email Address</div>
              <div style={{fontSize: '0.95rem', color: '#1E293B', fontWeight: '500', marginTop: '0.2rem'}}>{profile.email}</div>
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Details */}
        <div className="card" style={{padding: '0', display: 'flex', flexDirection: 'column'}}>
          <div style={{padding: '1.5rem 2rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC'}}>
            <h3 style={{fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', margin: 0}}>Professional Details</h3>
          </div>
          
          <div style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            
            <div className="grid grid-2">
              <div>
                <div style={{fontSize: '0.8rem', color: '#64748B', fontWeight: '600', marginBottom: '0.3rem'}}>Medical License Number</div>
                <div style={{fontSize: '1.05rem', color: '#1E293B', fontWeight: '700', background: '#F1F5F9', display: 'inline-block', padding: '0.35rem 0.85rem', borderRadius: '6px'}}>{profile.lic}</div>
              </div>
              <div>
                 <div style={{fontSize: '0.8rem', color: '#64748B', fontWeight: '600', marginBottom: '0.3rem'}}>Department Unit</div>
                 <div style={{fontSize: '1rem', color: '#1E293B', fontWeight: '600'}}>{profile.dept}</div>
              </div>
            </div>

            <div style={{borderTop: '1px dashed #E2E8F0', paddingTop: '2rem'}} className="grid grid-2">
               <div>
                 <div style={{fontSize: '0.8rem', color: '#64748B', fontWeight: '600', marginBottom: '0.3rem'}}>Joined Date</div>
                 <div style={{fontSize: '1rem', color: '#1E293B', fontWeight: '500'}}>{profile.joined}</div>
              </div>
              <div>
                 <div style={{fontSize: '0.8rem', color: '#64748B', fontWeight: '600', marginBottom: '0.3rem'}}>System Identifier</div>
                 <div style={{fontSize: '1rem', color: '#1E293B', fontWeight: '500'}} className="muted">DOC-{id.padStart(4, '0')}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
