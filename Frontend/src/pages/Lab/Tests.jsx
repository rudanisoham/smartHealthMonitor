import React, { useState, useEffect } from 'react';
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
import { getLabTests } from '../../utils/api';

const LabTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState({ tests: [], categories: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await getLabTests();
        setData(res.data.data);
      } catch (err) {
        console.error("Failed to load tests", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const testCategories = data.categories.map(c => ({
    name: c.name,
    count: c.count,
    icon: <FlaskConical />
  }));

  const filteredTests = data.tests.filter(t => 
    t.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading tests...</div>;

  return (
    <div className="lab-tests">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="section-title">Diagnostic Test Directory</h2>
          <p className="section-subtitle">Catalog of available laboratory tests, pricing, and reference ranges</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Add New Test
        </button>
      </div>

      <div className="grid grid-4 mb-8">
        {testCategories.map((cat, idx) => (
          <div key={idx} className="card" style={{ cursor: 'pointer' }}>
            <div className="flex items-center gap-3">
              <div className="stat-icon">
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
            {filteredTests.map((test) => (
              <tr key={test._id}>
                <td><strong>{test._id.slice(-6).toUpperCase()}</strong></td>
                <td>{test.name}</td>
                <td><span className="badge-soft">{test.category}</span></td>
                <td>
                  <div className="flex items-center gap-1 font-bold">
                    <DollarSign size={14} /> {(test.price || 0).toFixed(2)}
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
