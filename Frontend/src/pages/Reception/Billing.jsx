import React, { useState } from 'react';
import { Search, CreditCard, Download, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import '../../styles/Dashboard.css';

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const invoices = [
    { id: 'INV-2026-001', patient: 'John Smith', amount: 1250.00, date: '2026-05-01', status: 'Paid', type: 'Surgery' },
    { id: 'INV-2026-002', patient: 'Sarah Wilson', amount: 350.00, date: '2026-05-02', status: 'Unpaid', type: 'Consultation' },
    { id: 'INV-2026-003', patient: 'Michael Brown', amount: 5200.00, date: '2026-05-02', status: 'Partial', type: 'Inpatient' },
    { id: 'INV-2026-004', patient: 'Emily Davis', amount: 150.00, date: '2026-05-03', status: 'Paid', type: 'Lab Test' },
    { id: 'INV-2026-005', patient: 'Robert Johnson', amount: 890.00, date: '2026-05-03', status: 'Unpaid', type: 'Treatment' },
    { id: 'INV-2026-006', patient: 'Emma Wilson', amount: 120.00, date: '2026-05-04', status: 'Paid', type: 'Medicine' },
  ];

  const filteredInvoices = invoices.filter(inv => 
    inv.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Billing & Invoices</h1>
          <p>Track payments, generate invoices, and manage patient billing</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by invoice or patient..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary">
            <CreditCard size={18} /> New Invoice
          </button>
        </div>
      </header>

      <div className="grid grid-3 mb-5">
        <div className="card stat-card-simple highlight-green">
          <div className="card-body">
            <span className="stat-label">Total Collected</span>
            <h2 className="stat-value">$14,250</h2>
            <p className="stat-desc">Month-to-date</p>
          </div>
        </div>
        <div className="card stat-card-simple highlight-yellow">
          <div className="card-body">
            <span className="stat-label">Pending Payments</span>
            <h2 className="stat-value">$3,840</h2>
            <p className="stat-desc">24 invoices outstanding</p>
          </div>
        </div>
        <div className="card stat-card-simple highlight-blue">
          <div className="card-body">
            <span className="stat-label">Recent Invoices</span>
            <h2 className="stat-value">156</h2>
            <p className="stat-desc">Generated this week</p>
          </div>
        </div>
      </div>

      <div className="dashboard-card no-padding">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Patient</th>
                <th>Service Type</th>
                <th>Amount</th>
                <th>Issue Date</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="fw-bold">{inv.id}</td>
                  <td>{inv.patient}</td>
                  <td>{inv.type}</td>
                  <td className="fw-bold">${inv.amount.toFixed(2)}</td>
                  <td>{inv.date}</td>
                  <td>
                    <span className={`status-pill ${inv.status.toLowerCase()}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="action-icons">
                      <button className="icon-btn" title="View Detail"><Eye size={16} /></button>
                      <button className="icon-btn" title="Download PDF"><Download size={16} /></button>
                      <button className="icon-btn" title="Process Payment"><CreditCard size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colspan="7" className="text-center py-5 text-muted">
                    No matching invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
