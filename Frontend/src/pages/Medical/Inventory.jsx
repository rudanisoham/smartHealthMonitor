import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Pill,
  ChevronRight,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMedicalInventory } from '../../utils/api';

const MedicalInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await getMedicalInventory();
        setMedicines(res.data.data);
      } catch (err) {
        console.error("Failed to load inventory", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const filteredMedicines = medicines.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.brand?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading inventory...</div>;

  const getStatusChip = (status) => {
    switch (status) {
      case 'In Stock': return <span className="chip">In Stock</span>;
      case 'Low Stock': return <span className="chip-warning">Low Stock</span>;
      case 'Out of Stock': return <span className="chip-danger">Out of Stock</span>;
      default: return <span className="chip-neutral">{status}</span>;
    }
  };

  return (
    <div className="medical-inventory">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="section-title">Medicine Inventory</h2>
          <p className="section-subtitle">Manage pharmacy stock, pricing, and availability</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-outline">
            <Download size={18} /> Export List
          </button>
          <Link to="/medical/inventory/add" className="btn btn-primary">
            <Plus size={18} /> Add New Medicine
          </Link>
        </div>
      </div>

      <div className="card mb-6">
        <div className="flex justify-between items-center gap-4">
          <div className="search-bar flex-1" style={{ minWidth: '400px' }}>
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, brand, or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-sm">
              <Filter size={16} /> Filter
            </button>
            <select className="form-select" style={{ width: 'auto', padding: '0.4rem 2rem 0.4rem 1rem', fontSize: '0.85rem' }}>
              <option>All Categories</option>
              <option>Analgesic</option>
              <option>Antibiotic</option>
              <option>Antidiabetic</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Category</th>
              <th>Stock Level</th>
              <th>Unit Price</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((med) => (
              <tr key={med._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="header-avatar" style={{ width: '36px', height: '36px', background: 'var(--primary-light)', color: 'var(--primary)' }}>
                      <Pill size={16} />
                    </div>
                    <div>
                      <div className="author-name">{med.name}</div>
                      <div className="muted" style={{ fontSize: '0.75rem' }}>{med.brand}</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge-soft">{med.category}</span></td>
                <td>
                  <div className="font-bold">{med.stock}</div>
                  <div className="muted" style={{ fontSize: '0.75rem' }}>{med.unit}</div>
                </td>
                <td>{med.price}</td>
                <td>{getStatusChip(med.status)}</td>
                <td>
                  <div className="flex justify-end gap-2">
                    <button className="btn-icon" title="Edit">
                      <Edit2 size={14} />
                    </button>
                    <button className="btn-icon text-danger" title="Delete">
                      <Trash2 size={14} />
                    </button>
                    <button className="btn-icon" title="View Details">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="muted">Showing {filteredMedicines.length} of {medicines.length} medicines</p>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm" disabled>Previous</button>
          <button className="btn btn-primary btn-sm">1</button>
          <button className="btn btn-outline btn-sm">2</button>
          <button className="btn btn-outline btn-sm">3</button>
          <button className="btn btn-outline btn-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MedicalInventory;
