import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, FileText, Download, Filter, Search, CheckCircle, Clock, Loader } from 'lucide-react';
import { getReceptionBilling } from '../../utils/api';

const Billing = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({ dailyCollection: 0, pendingCount: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBilling();
  }, []);

  const fetchBilling = async () => {
    try {
      setLoading(true);
      const res = await getReceptionBilling();
      if (res.data.success) {
        setPayments(res.data.data.payments);
        setStats(res.data.data.stats);
      }
    } catch (err) {
      console.error("Failed to load billing", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(p => 
    p.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="admin-content flex justify-center items-center py-20">
      <Loader className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <div className="admin-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Billing & Collections</h2>
          <p className="section-subtitle">Manage patient invoices, payments, and financial records</p>
        </div>
        <button className="btn btn-primary" onClick={fetchBilling}>
          <Filter size={18} /> Refresh Data
        </button>
      </div>

      <div className="grid grid-3 mb-6">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Daily Collection</span>
            <DollarSign className="text-success" size={20} />
          </div>
          <div className="card-value">₹{stats.dailyCollection.toLocaleString()}</div>
          <span className="muted">Total collected today</span>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Pending Invoices</span>
            <Clock className="text-warning" size={20} />
          </div>
          <div className="card-value">{stats.pendingCount}</div>
          <span className="muted">Awaiting payment verification</span>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Active Insurances</span>
            <CheckCircle className="text-primary" size={20} />
          </div>
          <div className="card-value">182</div>
          <span className="muted">Verified providers in system</span>
        </div>
      </div>

      <div className="card mb-6">
        <div className="flex justify-between items-center">
          <div className="search-bar" style={{ minWidth: '400px' }}>
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search by Invoice ID or Patient Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Patient</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p) => (
              <tr key={p._id}>
                <td><span className="author-name" style={{ fontSize: '0.85rem' }}>{p.id}</span></td>
                <td><span className="author-name">{p.patient}</span></td>
                <td><span className="author-name">₹{p.amount.toLocaleString()}</span></td>
                <td><span className="muted">{p.date}</span></td>
                <td><span className="chip-neutral">{p.method}</span></td>
                <td>
                  <span className={`chip ${p.status === 'COMPLETED' ? 'chip' : 'chip-warning'}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn-icon" title="Download PDF"><Download size={16} /></button>
                    <button className="btn-icon" title="View Details"><FileText size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 muted">No financial records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;
