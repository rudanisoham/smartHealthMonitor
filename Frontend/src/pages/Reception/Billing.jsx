import React from 'react';
import { CreditCard, DollarSign, FileText, Download, Filter, Search, CheckCircle, Clock } from 'lucide-react';

const Billing = () => {
  const invoices = [
    { id: 'INV-2026-001', patient: 'John Smith', amount: 1250.00, date: '2026-05-01', status: 'Paid', method: 'Credit Card' },
    { id: 'INV-2026-002', patient: 'Sarah Wilson', amount: 450.00, date: '2026-05-02', status: 'Pending', method: 'Insurance' },
    { id: 'INV-2026-003', patient: 'Michael Brown', amount: 3200.00, date: '2026-05-02', status: 'Paid', method: 'Cash' },
    { id: 'INV-2026-004', patient: 'Emily Davis', amount: 125.00, date: '2026-05-03', status: 'Pending', method: 'UPI' },
    { id: 'INV-2026-005', patient: 'Robert Johnson', amount: 890.00, date: '2026-05-03', status: 'Paid', method: 'Credit Card' },
  ];

  return (
    <div className="admin-content">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Billing & Collections</h2>
          <p className="section-subtitle">Manage patient invoices, payments, and financial records</p>
        </div>
        <button className="btn btn-primary">
          <FileText size={18} /> Generate Invoice
        </button>
      </div>

      <div className="grid grid-3 mb-6">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Daily Collection</span>
            <DollarSign className="text-success" size={20} />
          </div>
          <div className="card-value">$5,915.00</div>
          <span className="muted">Total collected today</span>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Pending Invoices</span>
            <Clock className="text-warning" size={20} />
          </div>
          <div className="card-value">14</div>
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
            <input type="text" placeholder="Search by Invoice ID or Patient Name..." />
          </div>
          <button className="btn btn-outline">
            <Filter size={18} /> Filter Records
          </button>
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
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td><span className="author-name" style={{ fontSize: '0.85rem' }}>{inv.id}</span></td>
                <td><span className="author-name">{inv.patient}</span></td>
                <td><span className="author-name">${inv.amount.toFixed(2)}</span></td>
                <td><span className="muted">{inv.date}</span></td>
                <td><span className="chip-neutral">{inv.method}</span></td>
                <td>
                  <span className={`chip ${inv.status === 'Paid' ? 'chip' : 'chip-warning'}`}>
                    {inv.status}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;
