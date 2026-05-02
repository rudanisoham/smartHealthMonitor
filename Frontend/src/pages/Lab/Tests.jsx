import React, { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  Plus, 
  MoreVertical, 
  Info,
  Activity,
  DollarSign,
  Clock,
  Filter
} from 'lucide-react';

const LabTests = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const testCategories = [
    { name: 'Hematology', count: 12, icon: <Activity /> },
    { name: 'Biochemistry', count: 24, icon: <FlaskConical /> },
    { name: 'Immunology', count: 8, icon: <Activity /> },
    { name: 'Microbiology', count: 15, icon: <FlaskConical /> },
  ];

  const tests = [
    { id: 'T-101', name: 'Complete Blood Count (CBC)', category: 'Hematology', price: 45.00, turnaround: '24h', stock: 'In Stock' },
    { id: 'T-102', name: 'Lipid Profile', category: 'Biochemistry', price: 65.00, turnaround: '12h', stock: 'In Stock' },
    { id: 'T-103', name: 'HbA1c (Glycated Hemoglobin)', category: 'Biochemistry', price: 55.00, turnaround: '48h', stock: 'Limited' },
    { id: 'T-104', name: 'TSH (Thyroid Stimulating Hormone)', category: 'Immunology', price: 75.00, turnaround: '24h', stock: 'In Stock' },
    { id: 'T-105', name: 'Liver Function Test (LFT)', category: 'Biochemistry', price: 80.00, turnaround: '24h', stock: 'In Stock' },
    { id: 'T-106', name: 'Kidney Function Test (KFT)', category: 'Biochemistry', price: 80.00, turnaround: '24h', stock: 'In Stock' },
  ];

  return (
    <div className="lab-tests">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="section-title">Diagnostic Test Directory</h2>
          <p className="section-subtitle">Catalog of available laboratory tests, pricing, and reference ranges</p>
        </div>
        <button className="btn btn-primary" style={{ background: '#10b981', borderColor: '#10b981' }}>
          <Plus size={18} /> Add New Test
        </button>
      </div>

      <div className="grid grid-4 mb-8">
        {testCategories.map((cat, idx) => (
          <div key={idx} className="card" style={{ cursor: 'pointer' }}>
            <div className="flex items-center gap-3">
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                {cat.icon}
              </div>
              <div>
                <div className="author-name">{cat.name}</div>
                <div className="muted" style={{ fontSize: '0.8rem' }}>{cat.count} Tests Available</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <div className="flex justify-between items-center gap-4">
          <div className="search-bar flex-1">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search test catalog by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm">
              <Filter size={16} /> Category
            </button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Test ID</th>
              <th>Test Name</th>
              <th>Category</th>
              <th>Base Price</th>
              <th>TAT</th>
              <th>Availability</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.id}>
                <td><strong>{test.id}</strong></td>
                <td>{test.name}</td>
                <td><span className="badge-soft">{test.category}</span></td>
                <td>
                  <div className="flex items-center gap-1 font-bold">
                    <DollarSign size={14} /> {test.price.toFixed(2)}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1 muted">
                    <Clock size={14} /> {test.turnaround}
                  </div>
                </td>
                <td>
                  <span className={test.stock === 'In Stock' ? 'chip' : 'chip-warning'}>
                    {test.stock}
                  </span>
                </td>
                <td>
                  <div className="flex justify-end gap-2">
                    <button className="btn-icon">
                      <Info size={14} />
                    </button>
                    <button className="btn-icon">
                      <MoreVertical size={14} />
                    </button>
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

export default LabTests;
