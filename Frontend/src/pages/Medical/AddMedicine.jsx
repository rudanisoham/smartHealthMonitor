import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Pill, 
  Tag, 
  Box, 
  DollarSign, 
  Info,
  Calendar,
  Loader
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { addMedicine } from '../../utils/api';

const AddMedicine = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    stock: '',
    unit: 'Tablets',
    price: '',
    expiryDate: '',
    description: '',
    minThreshold: '50'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addMedicine(formData);
      alert('Medicine added successfully to inventory!');
      navigate('/medical/inventory');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add medicine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content" style={{ maxWidth: '800px', margin: '0 auto', padding: 0 }}>
      <div className="mb-6">
        <Link to="/medical/inventory" className="btn btn-outline mb-4" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> Back to Inventory
        </Link>
        <h2 className="section-title">Add New Medicine</h2>
        <p className="section-subtitle">Register new stock in the pharmacy inventory system</p>
      </div>

      <div className="card">
        {error && (
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2 gap-6 mb-6">
            <div className="form-group">
              <label>Medicine Name <span className="text-danger">*</span></label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <Pill size={18} className="text-muted me-2" />
                <input 
                  type="text" 
                  placeholder="e.g. Paracetamol" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Brand / Manufacturer</label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <Tag size={18} className="text-muted me-2" />
                <input 
                  type="text" 
                  placeholder="e.g. GSK, Pfizer" 
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-2 gap-6 mb-6">
            <div className="form-group">
              <label>Category <span className="text-danger">*</span></label>
              <select 
                className="form-select" 
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select Category</option>
                <option value="Analgesic">Analgesic</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Antidiabetic">Antidiabetic</option>
                <option value="Antihistamine">Antihistamine</option>
                <option value="Cardiovascular">Cardiovascular</option>
              </select>
            </div>

            <div className="form-group">
              <label>Expiry Date <span className="text-danger">*</span></label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <Calendar size={18} className="text-muted me-2" />
                <input 
                  type="date" 
                  required 
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-3 gap-6 mb-6">
            <div className="form-group">
              <label>Initial Stock Level</label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <Box size={18} className="text-muted me-2" />
                <input 
                  type="number" 
                  placeholder="0" 
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Unit Type</label>
              <select 
                className="form-select"
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
              >
                <option>Tablets</option>
                <option>Capsules</option>
                <option>Bottles</option>
                <option>Vials</option>
                <option>Ointment</option>
              </select>
            </div>

            <div className="form-group">
              <label>Unit Price (₹)</label>
              <div className="search-bar w-full" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <DollarSign size={18} className="text-muted me-2" />
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="form-group mb-6">
            <label>Medicine Description / Usage Notes</label>
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Enter indications, dosage info, or storage requirements..."
              style={{ resize: 'none' }}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="card mb-6" style={{ background: 'var(--primary-light)', border: '1px solid var(--accent)' }}>
            <div className="flex gap-4">
              <div className="stat-icon blue" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                <Info size={20} />
              </div>
              <div>
                <div className="author-name" style={{ fontSize: '0.9rem' }}>Inventory Tracking</div>
                <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  The system will automatically alert you when stock levels fall below <strong>{formData.minThreshold} units</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-top">
            <Link to="/medical/inventory" className="btn btn-outline">
              <X size={18} /> Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <Loader className="animate-spin" size={18} /> : <><Save size={18} /> Save Medicine</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
