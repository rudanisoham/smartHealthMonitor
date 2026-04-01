import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const mockPatients = [
  { id: 1, name: "Soham Rudani", email: "rudanisoham1@gmail.com", phone: "+919316202895", bg: "A+", sex: "—", date: "2026-04-01", initial: "S" },
  { id: 2, name: "soham", email: "rudanisoham9@gmail.com", phone: "9316202895", bg: "A+", sex: "—", date: "2026-04-01", initial: "s" },
  { id: 3, name: "neha", email: "neha@gmail.com", phone: "1234567890", bg: "—", sex: "—", date: "2026-04-01", initial: "n" },
  { id: 4, name: "Soham Rudani", email: "soham@gmail.com", phone: "+919316202895", bg: "—", sex: "—", date: "2026-04-01", initial: "S" }
];

export default function Patients() {
  const [search, setSearch] = useState('');

  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.email.toLowerCase().includes(search.toLowerCase()) || 
    p.phone.includes(search)
  );

  return (
    <AdminLayout title="Manage Patients" subtitle="View and manage all registered patients">
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
              placeholder="Search by name, email, or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', color: '#1E293B', outline: 'none', transition: 'border-color 0.2s'}}
              onFocus={(e) => e.target.style.borderColor = '#94A3B8'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>
          <Link to="/admin/patients/add" style={{padding: '0.65rem 1.25rem', background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(29, 78, 216, 0.2)', textDecoration: 'none'}} onMouseOver={(e) => e.currentTarget.style.background = '#1E40AF'} onMouseOut={(e) => e.currentTarget.style.background = '#1D4ED8'}>
            <span>+</span> Register Patient
          </Link>
        </div>

        {/* Table */}
        <div style={{width: '100%', overflowX: 'auto'}}>
          <table className="premium-table" style={{width: '100%', minWidth: '900px', borderSpacing: 0}}>
            <thead>
              <tr style={{background: '#FFFFFF'}}>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left'}}>PATIENT NAME</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left'}}>CONTACT</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'center'}}>BLOOD GROUP</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'center'}}>SEX</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'center'}}>REGISTERED ON</th>
                <th style={{padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'center'}}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((pat, i) => (
              <tr key={i} style={{background: '#FFFFFF', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}>
                <td style={{padding: '1.25rem 1.5rem', borderBottom: i === filteredPatients.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                  <div className="flex-author" style={{gap: '1rem', display: 'flex', alignItems: 'center'}}>
                    <div style={{width: '36px', height: '36px', borderRadius: '50%', background: '#0EA5E9', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '600'}}>{pat.initial}</div>
                    <span className="author-name" style={{fontSize: '0.85rem', fontWeight: '600', color: '#0F172A'}}>{pat.name}</span>
                  </div>
                </td>
                <td style={{padding: '1.25rem 1.5rem', borderBottom: i === filteredPatients.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                    <div style={{fontSize: '0.85rem', color: '#0F172A', fontWeight: '500'}}>{pat.email}</div>
                    <div style={{fontSize: '0.75rem', color: '#64748B', marginTop: '0.1rem'}}>{pat.phone}</div>
                </td>
                <td style={{padding: '1.25rem 1.5rem', textAlign: 'center', borderBottom: i === filteredPatients.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                  {pat.bg !== '—' ? 
                     <span style={{background: '#FEE2E2', color: '#EF4444', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700'}}>{pat.bg}</span>
                     : <span style={{color: '#94A3B8'}}>—</span>
                  }
                </td>
                <td style={{padding: '1.25rem 1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#0F172A', fontWeight: '600', borderBottom: i === filteredPatients.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                  {pat.sex}
                </td>
                <td style={{padding: '1.25rem 1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748B', borderBottom: i === filteredPatients.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                  {pat.date}
                </td>
                <td style={{padding: '1.25rem 1.5rem', borderBottom: i === filteredPatients.length - 1 ? 'none' : '1px solid #F1F5F9', textAlign: 'center'}}>
                  <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'center'}}>
                    <Link to={`/admin/patients/${pat.id}/view`} style={{padding: '0.4rem 1rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B', cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none'}} onMouseOver={(e) => {e.currentTarget.style.background = '#F8FAFC';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>Details</Link>
                    <button style={{padding: '0.4rem 1rem', background: '#FFFFFF', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#EF4444', cursor: 'pointer', transition: 'all 0.2s'}} onMouseOver={(e) => {e.currentTarget.style.background = '#FEF2F2';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>Delete</button>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
          {filteredPatients.length === 0 && (
            <div style={{padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.9rem'}}>No patients found matching "{search}"</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
