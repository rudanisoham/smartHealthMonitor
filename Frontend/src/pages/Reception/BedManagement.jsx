import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Hotel, 
  ChevronRight, 
  Settings2, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import API from '../../utils/api';

const BedManagement = () => {
  const [depts, setDepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState({ normal: 800, icu: 2500 });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/reception/beds');
      setDepts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRates = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await API.put('/reception/beds/charges', {
        normalCharge: rates.normal,
        icuCharge: rates.icu
      });
      alert('Rates updated successfully!');
    } catch (err) {
      alert('Failed to update rates');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-8 text-center"><div className="loader"></div></div>;

  return (
    <div className="bed-management">
      <div className="mb-8">
        <h2 className="section-title">Bed Management</h2>
        <p className="section-subtitle">Select a department to manage bed assignments and occupancy</p>
      </div>

      {/* Pricing Config Card */}
      <div className="card mb-8" style={{ borderLeft: '4px solid var(--primary)' }}>
        <div className="card-header border-none pb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Settings2 size={18} className="text-primary" />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Bed Pricing Configuration</h3>
            </div>
            <p className="muted text-sm">Update global daily charges for normal and ICU beds</p>
          </div>
        </div>
        <form onSubmit={handleUpdateRates} className="p-6 pt-0">
          <div className="grid grid-3 gap-6 items-end">
            <div className="form-group mb-0">
              <label className="text-xs font-bold uppercase muted mb-2 block">Normal Bed (₹/Day)</label>
              <input 
                type="number" 
                className="form-control" 
                value={rates.normal}
                onChange={(e) => setRates({...rates, normal: e.target.value})}
                required 
              />
            </div>
            <div className="form-group mb-0">
              <label className="text-xs font-bold uppercase muted mb-2 block">ICU Bed (₹/Day)</label>
              <input 
                type="number" 
                className="form-control" 
                value={rates.icu}
                onChange={(e) => setRates({...rates, icu: e.target.value})}
                required 
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary h-11" 
              disabled={updating}
            >
              {updating ? 'Updating...' : 'Update Global Rates'}
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-3 gap-6">
        {depts.map((dept) => (
          <Link 
            to={`/reception/beds/department/${dept._id}`} 
            key={dept._id}
            className="card p-6 dept-card-hover no-underline text-inherit"
            style={{ transition: 'all 0.3s' }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
                <Hotel size={24} />
              </div>
              <ChevronRight size={20} className="muted" />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{dept.name}</h3>
            
            <div className="flex gap-2 mb-6">
              <span className="chip text-xs">{dept.available} Available</span>
              <span className="chip-danger text-xs">{dept.occupied} Occupied</span>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="muted uppercase tracking-wider">{dept.occupied} / {dept.total} Beds Filled</span>
                <span className={dept.pct > 90 ? 'text-danger' : (dept.pct > 70 ? 'text-warning' : 'text-success')}>
                  {dept.pct}%
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    dept.pct > 90 ? 'bg-danger' : (dept.pct > 70 ? 'bg-warning' : 'bg-success')
                  }`}
                  style={{ width: `${dept.pct}%` }}
                ></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BedManagement;
