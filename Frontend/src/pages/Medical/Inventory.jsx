import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Pill,
  ChevronRight,
  Download,
  AlertCircle
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

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
      <div className="loader"></div>
    </div>
  );

  return (
    <div className="medical-inventory">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="section-title">Medicine Inventory</h2>
          <p className="section-subtitle">Manage all medicines and stock levels</p>
        </div>
        <div className="flex gap-2">
          <Link to="/medical/inventory/add" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Add Medicine
          </Link>
        </div>
      </div>

      <div className="card shadow-sm mb-6">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="search-bar" style={{ flex: 1, position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
            <input 
              type="text" 
              className="form-control"
              style={{ paddingLeft: '40px' }}
              placeholder="Search by name, brand, or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      <div className="card shadow-sm" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ margin: 0, border: 'none' }}>
          <table className="w-100">
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '1rem' }}>Medicine</th>
                <th>Category</th>
                <th>Form</th>
                <th>Stock</th>
                <th>Price</th>
                <th className="text-right" style={{ paddingRight: '1.5rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.length > 0 ? filteredMedicines.map((med) => (
                <tr key={med._id} className="hover-row" style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{med.name}</div>
                    <div className="muted" style={{ fontSize: '0.75rem' }}>{med.brand || 'Generic'}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: '#f1f5f9', color: '#64748b', fontWeight: 600 }}>
                      {med.category}
                    </span>
                  </td>
                  <td className="muted" style={{ fontSize: '0.85rem' }}>{med.unit || 'Tablet'}</td>
                  <td>
                    {med.stock <= 10 ? (
                      <span style={{ color: '#ef4444', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {med.stock} <AlertCircle size={14} />
                      </span>
                    ) : med.stock <= 50 ? (
                      <span style={{ color: '#f59e0b', fontWeight: 700 }}>{med.stock}</span>
                    ) : (
                      <span style={{ color: '#10b981', fontWeight: 700 }}>{med.stock}</span>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{med.price}</td>
                  <td className="text-right" style={{ paddingRight: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline btn-sm" style={{ color: '#3b82f6', borderColor: '#3b82f6' }}>Edit</button>
                      <button className="btn btn-outline btn-sm" style={{ color: '#ef4444', borderColor: '#ef4444' }}>Remove</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 muted">
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💊</div>
                    No medicines found in inventory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
        <p className="muted" style={{ fontSize: '0.85rem' }}>Showing {filteredMedicines.length} items</p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline btn-sm" disabled>Previous</button>
          <button className="btn btn-primary btn-sm">1</button>
          <button className="btn btn-outline btn-sm">Next</button>
        </div>
      </div>

      <style>{`
        .hover-row:hover { background-color: #f8fafc; }
        .loader { border: 3px solid #f3f3f3; border-radius: 50%; border-top: 3px solid var(--primary); width: 24px; height: 24px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default MedicalInventory;
