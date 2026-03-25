import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const mockDepartments = [
  { id: 1, name: 'Cardiology', code: 'CARD-01', status: 'Active', occupancy: 12, beds: 40, head: 'Dr. Emily Chen', location: 'Block A, Floor 2' },
  { id: 2, name: 'Neurology', code: 'NEUR-02', status: 'Active', occupancy: 8, beds: 30, head: 'Dr. Robert Smith', location: 'Block B, Floor 3' },
  { id: 3, name: 'Pediatrics', code: 'PEDI-03', status: 'Active', occupancy: 20, beds: 50, head: 'Dr. Sarah Lee', location: 'Block C, Floor 1' },
  { id: 4, name: 'Orthopedics', code: 'ORTH-04', status: 'Inactive', occupancy: 0, beds: 25, head: 'Dr. James Park', location: 'Block A, Floor 4' },
  { id: 5, name: 'Oncology', code: 'ONCO-05', status: 'Active', occupancy: 17, beds: 35, head: 'Dr. Maria Gonzalez', location: 'Block D, Floor 2' },
];

export default function Departments() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All availability');

  const filtered = mockDepartments.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.code.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All availability' || d.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout title="Departments" subtitle="Capacity, staffing and patient distribution">

      {/* Search + Filter Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search departments by name or code"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '0.75rem 1.25rem', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '0.95rem', color: '#374151', outline: 'none', background: 'white' }}
          onFocus={(e) => e.target.style.borderColor = '#2563EB'}
          onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '0.75rem 1.25rem', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '0.95rem', color: '#374151', appearance: 'auto', background: 'white', cursor: 'pointer', outline: 'none', minWidth: '180px' }}
        >
          <option>All availability</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Add Button */}
      <div style={{ marginBottom: '2rem' }}>
        <button style={{ padding: '0.7rem 1.5rem', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer' }}
          onMouseOver={(e) => e.target.style.background = '#1D4ED8'}
          onMouseOut={(e) => e.target.style.background = '#2563EB'}>
          Add new department
        </button>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filtered.map(dept => (
          <div key={dept.id} style={{ background: 'white', borderRadius: '16px', border: '1px solid #F1F5F9', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'}>

            {/* Card Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#0F172A' }}>{dept.name}</div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '0.2rem' }}>{dept.code}</div>
              </div>
              <span style={{ padding: '0.3rem 0.9rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700', background: dept.status === 'Active' ? '#DCFCE7' : '#F1F5F9', color: dept.status === 'Active' ? '#16A34A' : '#94A3B8' }}>
                {dept.status}
              </span>
            </div>

            {/* Occupancy */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.9rem', color: '#475569' }}>Occupancy limit</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0F172A' }}>{dept.occupancy} / {dept.beds} Beds</span>
            </div>

            {/* Head + Location */}
            <div style={{ fontSize: '0.9rem', color: '#64748B', paddingBottom: '1rem' }}>
              Department Head<strong style={{ color: '#0F172A' }}> Dr. {dept.head}</strong><span style={{ marginLeft: '0.5rem' }}>Location</span><span style={{ color: '#64748B' }}> {dept.location}</span>
            </div>

            {/* Configure Button */}
            <Link to="/admin/departments/configure" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', border: '1px solid #E5E7EB', borderRadius: '8px', color: '#374151', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none', marginTop: 'auto', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.color = '#2563EB'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#374151'; }}>
              Configure department
            </Link>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'right', marginTop: '4rem', fontSize: '0.78rem', color: '#94A3B8' }}>
        © 2026 Smart Health Monitor Admin · Crafted for modern hospital workflows.
      </div>

    </AdminLayout>
  );
}
