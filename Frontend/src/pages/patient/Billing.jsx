import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
    const navigate = useNavigate();
    const [billingData, setBillingData] = useState({
        totalBedCost: 4500,
        totalLabCost: 1250,
        totalPaid: 2000,
        balance: 3750,
        stayDays: 3,
        labRequests: [
            { id: 1, labTest: { name: 'Complete Blood Count', price: 450 }, requestedAt: '2023-10-25', status: 'COMPLETED' },
            { id: 2, labTest: { name: 'Lipid Profile', price: 800 }, requestedAt: '2023-10-26', status: 'PENDING' }
        ],
        payments: [
            { id: 1, createdAt: '2023-10-20 10:30', razorpayPaymentId: 'pay_N1abc123', description: 'Advance Deposit', type: 'CREDIT', method: 'UPI', amount: 2000, status: 'COMPLETED' }
        ]
    });

    const handlePay = () => {
        alert('Integrating with Razorpay... In a real app, this would open the payment gateway.');
    };

    return (
        <div className="grid grid-3">
            <div style={{ gridColumn: 'span 2' }}>
                <div className="card" style={{ background: '#ffffff', borderRadius: '24px', padding: '2.5rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', opacity: 0.7, fontWeight: 700 }}>Account Statement</div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, marginTop: '0.25rem' }}>Unified Balance</h2>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Patient ID</div>
                            <div style={{ fontWeight: 700 }}>#PT-12345</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span>Hospital Stay (Bed Charges)</span>
                        <strong>₹{billingData.totalBedCost}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span>Laboratory & Diagnostics Total</span>
                        <strong>₹{billingData.totalLabCost}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>
                        <span>Total Payments Credited</span>
                        <strong>- ₹{billingData.totalPaid}</strong>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1.5rem', marginTop: '1rem', borderTop: '2px dashed #e2e8f0', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                        <span>Net Outstanding</span>
                        <span style={{ color: billingData.balance > 0 ? '#1d4ed8' : '#10b981' }}>₹{billingData.balance > 0 ? billingData.balance : 0}</span>
                    </div>

                    {billingData.balance > 0 && (
                        <div style={{ marginTop: '2.5rem' }}>
                            <button onClick={handlePay} className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 800 }}>
                                <i className="fas fa-lock" style={{ marginRight: '0.5rem' }}></i> SETTLE OUTSTANDING DUES (₹{billingData.balance})
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '0.75rem', opacity: 0.5, marginTop: '1rem' }}>Secure encrypted payment via Razorpay</p>
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="section-title">Diagnostic Fee Breakdown</div>
                    </div>
                    <div className="table-container mt-2">
                        <table>
                            <thead>
                                <tr>
                                    <th>Investigation</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Charge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billingData.labRequests.map(req => (
                                    <tr key={req.id}>
                                        <td style={{ fontWeight: 600 }}>{req.labTest.name}</td>
                                        <td className="muted">{req.requestedAt}</td>
                                        <td>
                                            <span className={`chip ${req.status === 'COMPLETED' ? 'chip-success' : 'chip-warning'}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 700 }}>₹{req.labTest.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div>
                <div className="card">
                    <div className="card-header"><div className="section-title">Payment Help</div></div>
                    <div style={{ padding: '1.5rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Bed Charges</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Calculated daily from time of admission. Current stay: {billingData.stayDays} days.</div>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Lab Reports</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Charged per investigation ordered by your physician.</div>
                        </div>
                        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem', fontSize: '0.8rem', color: '#64748b', border: '1px solid #e2e8f0' }}>
                            <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i> For corporate insurance or manual billing inquiries, please visit the reception desk.
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ gridColumn: 'span 3', marginTop: '2rem' }}>
                <div className="card-header">
                    <div>
                        <div className="section-title">Transaction History</div>
                        <div className="section-subtitle">Detailed log of all credits and debits</div>
                    </div>
                </div>
                <div className="table-container mt-2">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingData.payments.map(p => (
                                <tr key={p.id}>
                                    <td className="muted" style={{ fontSize: '0.85rem' }}>{p.createdAt}</td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{p.razorpayPaymentId}</div>
                                        <div className="muted" style={{ fontSize: '0.75rem' }}>{p.description}</div>
                                    </td>
                                    <td><span className="chip-neutral">{p.type}</span></td>
                                    <td><strong>{p.method}</strong></td>
                                    <td style={{ fontWeight: 700, color: '#1d4ed8' }}>₹{p.amount}</td>
                                    <td>
                                        <span className={`chip ${p.status === 'COMPLETED' ? 'chip-success' : 'chip-danger'}`}>
                                            {p.status === 'COMPLETED' ? 'Success' : p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Billing;
