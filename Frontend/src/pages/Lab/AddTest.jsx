import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createLabTest } from '../../utils/api';

const AddTest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: 'BLOOD_TEST',
    price: '',
    turnaroundTime: '24 Hours',
    availability: 'AVAILABLE',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createLabTest({
        ...formData,
        price: parseFloat(formData.price) || 0
      });
      navigate('/lab/tests');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create test');
      setLoading(false);
    }
  };

  return (
    <div className="admin-content" style={{ maxWidth: '800px', margin: '0 auto', padding: 0 }}>
      <div className="mb-6">
        <Link to="/lab/tests" className="btn btn-outline mb-4" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> Back to Directory
        </Link>
        <h2 className="section-title">Add Diagnostic Test</h2>
        <p className="section-subtitle">Add a new test to the laboratory catalog</p>
      </div>

      <div className="card">
        {error && <div className="alert alert-danger mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-2 gap-6 mb-6">
            <div className="form-group">
              <label>Test Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Complete Blood Count" />
            </div>

            <div className="form-group">
              <label>Category <span className="text-danger">*</span></label>
              <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                <option value="BLOOD_TEST">Blood Test</option>
                <option value="URINE_TEST">Urine Test</option>
                <option value="X_RAY">X-Ray</option>
                <option value="MRI">MRI</option>
                <option value="ECG">ECG</option>
                <option value="CT_SCAN">CT Scan</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Base Price ($)</label>
              <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" min="0" step="0.01" />
            </div>

            <div className="form-group">
              <label>Turnaround Time</label>
              <input type="text" className="form-control" name="turnaroundTime" value={formData.turnaroundTime} onChange={handleChange} placeholder="e.g. 24 Hours, 2 Days" />
            </div>
            
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Availability</label>
              <select className="form-select" name="availability" value={formData.availability} onChange={handleChange}>
                <option value="AVAILABLE">Available</option>
                <option value="LIMITED">Limited</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Description & Reference Ranges</label>
              <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Enter description or standard reference ranges..."></textarea>
            </div>
          </div>

          <div className="border-top pt-6 flex justify-end gap-3">
            <Link to="/lab/tests" className="btn btn-outline">Cancel</Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={18} /> {loading ? 'Saving...' : 'Save Test'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
