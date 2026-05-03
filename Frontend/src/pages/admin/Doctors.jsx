import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { getAdminDoctors } from '../../utils/api';

export default function Doctors() {
  const [search, setSearch] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAdminDoctors();
        setDoctors(res.data.data);
      } catch (err) {
        console.error("Failed to load doctors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(d => 
    d.name?.toLowerCase().includes(search.toLowerCase()) || 
    d.specialty?.toLowerCase().includes(search.toLowerCase()) || 
    d.department?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading doctors...</div>;

  return (
    <AdminLayout title="Manage Doctors" subtitle="View and filter all registered medical professionals">
      
      {/* Top Cards Section */}
      <div className="grid grid-2 mb-6">
        <div className="card" style={{padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <div style={{fontWeight: '700', fontSize: '0.95rem', color: '#1E293B', marginBottom: '0.5rem'}}>Total Doctors</div>
          <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#1D4ED8', lineHeight: '1.2'}}>{doctors.length}</div>
        </div>
        
        <div className="card" style={{padding: '1.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontWeight: '700', fontSize: '0.95rem', color: '#F59E0B', marginBottom: '0.5rem'}}>Pending Approvals</div>
            <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#F59E0B', lineHeight: '1.2'}}>
              {doctors.filter(d => !d.isApproved).length}
            </div>
          </div>
          <div>
            <Link to="/admin/doctors/requests" style={{padding: '0.6rem 1.25rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)', textDecoration: 'none'}} onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}>Review All</Link>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="card" style={{padding: '0', overflow: 'hidden'}}>
        
        {/* Toolbar */}
        <div style={{padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0'}}>
          <div style={{position: 'relative', width: '380px'}}>
            <svg style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#94A3B8'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by name, specialty, or department..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', color: '#1E293B', outline: 'none', transition: 'border-color 0.2s'}}
              onFocus={(e) => e.currentTarget.style.borderColor = '#94A3B8'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
            />
          </div>
          <Link to="/admin/doctors/add" style={{padding: '0.65rem 1.25rem', background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(29, 78, 216, 0.2)', textDecoration: 'none'}} onMouseOver={(e) => e.currentTarget.style.background = '#1E40AF'} onMouseOut={(e) => e.currentTarget.style.background = '#1D4ED8'}>
            <span>+</span> Register Doctor
          </Link>
        </div>

        {/* Table */}
        <div style={{width: '100%', overflowX: 'auto'}}>
          <table className="premium-table" style={{width: '100%', minWidth: '900px', borderSpacing: 0}}>
            <thead>
              <tr style={{background: '#FFFFFF'}}>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left'}}>NAME</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left'}}>CONTACT</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left'}}>SPECIALTY</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left'}}>DEPARTMENT</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left'}}>STATUS/ACCOUNT</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left'}}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              
              {filteredDoctors.map((doc, i) => (
              <tr key={doc._id} style={{background: '#FFFFFF', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}>
                <td style={{padding: '1.25rem 1.5rem', borderBottom: i === filteredDoctors.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                  <div className="flex-author" style={{gap: '1rem', display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '36px', height: '36px', borderRadius: '50%', background: '#0F172A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '600'}}>
                      {doc.name ? doc.name.charAt(0).toUpperCase() : 'D'}
                    </div>
                    <div className="author-info" style={{display: 'flex', flexDirection: 'column'}}>
                      <span className="author-name" style={{fontSize: '0.9rem', fontWeight: '700', color: '#0F172A'}}>{doc.name}</span>
                      <span className="author-sub" style={{fontSize: '0.8rem', color: '#64748B', marginTop: '0.1rem'}}>Lic: {doc.licenseNumber}</span>
                    </div>
                  </div>
                </td>
                <td style={{padding: '1.25rem 1.5rem', borderBottom: i === filteredDoctors.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                    <div style={{fontSize: '0.9rem', color: '#0F172A', fontWeight: '500'}}>{doc.email}</div>
                    <div style={{fontSize: '0.8rem', color: '#64748B', marginTop: '0.1rem'}}>{doc.phone}</div>
                </td>
                <td style={{padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: '#0F172A', fontWeight: '600', borderBottom: i === filteredDoctors.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                  {doc.specialty}
                </td>
                <td style={{padding: '1.25rem 1.5rem', borderBottom: i === filteredDoctors.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                  <span style={{background: '#F1F5F9', color: '#64748B', padding: '0.35rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700'}}>{doc.department}</span>
                </td>
                <td style={{padding: '1.25rem 1.5rem', borderBottom: i === filteredDoctors.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                  {!doc.isApproved ? (
                    <span style={{background: '#FEF3C7', color: '#92400E', padding: '0.35rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase'}}>Pending Approval</span>
                  ) : (
                    <span style={{background: doc.isActive ? '#DCFCE7' : '#FEE2E2', color: doc.isActive ? '#10B981' : '#EF4444', padding: '0.35rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase'}}>{doc.isActive ? 'Active' : 'Inactive'}</span>
                  )}
                </td>
                <td style={{padding: '1.25rem 1.5rem', borderBottom: i === filteredDoctors.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <button style={{padding: '0.45rem 0.9rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', color: '#1E293B', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onMouseOver={(e) => {e.currentTarget.style.borderColor = '#CBD5E1';}} onMouseOut={(e) => {e.currentTarget.style.borderColor = '#E2E8F0';}}>View</button>
                    <button style={{padding: '0.45rem 0.9rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', color: '#1E293B', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onMouseOver={(e) => {e.currentTarget.style.borderColor = '#CBD5E1';}} onMouseOut={(e) => {e.currentTarget.style.borderColor = '#E2E8F0';}}>Toggle Status</button>
                  </div>
                </td>
              </tr>
              ))}
              
            </tbody>
          </table>
          {filteredDoctors.length === 0 && (
            <div style={{padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.9rem'}}>No doctors found matching "{search}"</div>
          )}
        </div>
      </div>
      
    </AdminLayout>
  );
}
