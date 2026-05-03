import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { getAdminDepartments, deleteAdminDepartment } from '../../utils/api';

export default function Departments() {
  const [search, setSearch] = useState('');
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await getAdminDepartments();
      setDepartments(res.data.data);
    } catch (err) {
      console.error('Failed to load departments', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;
    try {
      await deleteAdminDepartment(id);
      setDepartments(departments.filter(d => d._id !== id));
    } catch (err) {
      alert('Failed to delete department');
    }
  };

  const filteredDepts = departments.filter(dept => 
    dept.title.toLowerCase().includes(search.toLowerCase()) ||
    dept.status.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <AdminLayout title="Departments" subtitle="Manage hospital units and capacities">
      <div style={{padding: '2rem', textAlign: 'center'}}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
  );

  return (
    <AdminLayout title="Departments" subtitle="Manage hospital units and capacities">
      {/* Main Container */}
      <div className="card" style={{padding: '0', overflow: 'hidden'}}>
        
        {/* Toolbar */}
        <div style={{padding: '1.5rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '1rem'}}>
          <div>
            <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>All Departments</div>
            <div style={{fontSize: '0.9rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Operational metrics by hospital wing</div>
          </div>
          
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <div style={{position: 'relative', width: '280px'}}>
               <svg style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
               <input 
                  type="text" 
                  placeholder="Search departments..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', color: '#1E293B', outline: 'none', transition: 'border-color 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
            </div>
            <Link to="/admin/departments/add" style={{padding: '0.65rem 1.25rem', background: '#1D4ED8', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(29, 78, 216, 0.2)', textDecoration: 'none'}} onMouseOver={(e) => e.currentTarget.style.background = '#1E40AF'} onMouseOut={(e) => e.currentTarget.style.background = '#1D4ED8'}>
              <span>+</span> Add Department
            </Link>
          </div>
        </div>

        {/* Table */}
        <div style={{width: '100%', overflowX: 'auto'}}>
          <table className="premium-table" style={{width: '100%', minWidth: '900px', borderSpacing: 0}}>
            <thead>
              <tr style={{background: '#FFFFFF'}}>
                <th style={{padding: '1.25rem 2.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left', width: '20%'}}>UNIT NAME</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'left', width: '30%'}}>DESCRIPTION</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'center', width: '15%'}}>OCCUPANCY</th>
                <th style={{padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'center', width: '15%'}}>STATUS/ACCOUNT</th>
                <th style={{padding: '1.25rem 2.5rem', fontSize: '0.75rem', fontWeight: '800', color: '#64748B', letterSpacing: '0.05em', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', textAlign: 'right', width: '20%'}}>ACTION</th>
              </tr>
            </thead>
            <tbody>
                {filteredDepts.map((dept, index) => (
                  <tr key={dept._id} style={{background: '#FFFFFF', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.background = '#FFFFFF'}>
                    <td style={{padding: '1.5rem 2.5rem', borderBottom: index === filteredDepts.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                      <div style={{fontSize: '0.95rem', fontWeight: '700', color: '#0F172A'}}>{dept.title}</div>
                    </td>
                    <td style={{padding: '1.5rem 1.5rem', borderBottom: index === filteredDepts.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                       <span style={{color: '#94A3B8', fontSize: '0.85rem'}}>{dept.description}</span>
                    </td>
                    <td style={{padding: '1.5rem 1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#1E293B', fontWeight: '600', borderBottom: index === filteredDepts.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                      {dept.occ}
                    </td>
                    <td style={{padding: '1.5rem 1.5rem', textAlign: 'center', borderBottom: index === filteredDepts.length - 1 ? 'none' : '1px solid #F1F5F9'}}>
                      <span style={{background: dept.status === 'Active' ? '#DCFCE7' : '#F1F5F9', color: dept.status === 'Active' ? '#16A34A' : '#64748B', padding: '0.2rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700'}}>{dept.status}</span>
                    </td>
                    <td style={{padding: '1.5rem 2.5rem', borderBottom: index === filteredDepts.length - 1 ? 'none' : '1px solid #F1F5F9', textAlign: 'right'}}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button onClick={() => handleDelete(dept._id)} style={{padding: '0.45rem 1.25rem', background: '#FFFFFF', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#EF4444', cursor: 'pointer', transition: 'all 0.2s'}} onMouseOver={(e) => {e.currentTarget.style.background = '#FEF2F2';}} onMouseOut={(e) => {e.currentTarget.style.background = '#FFFFFF';}}>Delete</button>
                        </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {filteredDepts.length === 0 && (
            <div style={{padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.9rem'}}>
              {search ? `No departments found matching "${search}"` : 'No departments yet. Click "Add Department" to create one.'}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
