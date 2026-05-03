import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getBillingData } from '../../utils/api';
import { Loader, CreditCard, Receipt, Clock, CheckCircle, Shield } from 'lucide-react';

const Billing = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        totalBedCost: 0,
        totalLabCost: 0,
        totalConsultCost: 0,
        totalPaid: 0,
        balance: 0,
        stayDays: 0,
        labReports: [],
        payments: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getBillingData();
            if (res.data.success) {
                setData(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching billing data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePay = () => {
        alert('Razorpay Gateway is being initialized. Secure payment will open shortly.');
    };

    if (loading) {
        return (
            <div className="admin-content flex justify-center items-center" style={{ minHeight: '400px' }}>
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="admin-content">
            <div className="grid grid-3">
                {/* Main Billing Summary */}
                <div style={{ gridColumn: 'span 2' }}>
                    <div className="card" style={{ 
                        background: '#ffffff', 
                        borderRadius: '24px', 
                        padding: '2.5rem', 
                        marginBottom: '2rem', 
                        position: 'relative', 
                        overflow: 'hidden', 
                        border: '1px solid #e2e8f0', 
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' 
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <div>
                                <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', opacity: 0.7, fontWeight: 700, color: 'var(--primary)' }}>Account Statement</div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '0.25rem', color: '#1e293b' }}>Unified Balance</h2>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Statement Date</div>
                                <div style={{ fontWeight: 700 }}>{new Date().toLocaleDateString()}</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-muted" />
                                    <span>Hospital Stay (Bed Charges · {data.stayDays} Days)</span>
                                </div>
                                <strong className="text-lg">₹{data.totalBedCost}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                <div className="flex items-center gap-3">
                                    <Receipt size={18} className="text-muted" />
                                    <span>Laboratory & Diagnostics ({data.labReports.length} tests)</span>
                                </div>
                                <strong className="text-lg">₹{data.totalLabCost}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                <div className="flex items-center gap-3">
                                    <CreditCard size={18} className="text-muted" />
                                    <span>Consultation Fees</span>
                                </div>
                                <strong className="text-lg">₹{data.totalConsultCost}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.25rem 0', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>
                                <div className="flex items-center gap-3 pl-7">
                                    <span>Total Payments Credited</span>
                                </div>
                                <strong className="text-lg text-success">- ₹{data.totalPaid}</strong>
                            </div>

                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                paddingTop: '2rem', 
                                marginTop: '1.5rem', 
                                borderTop: '2px dashed #e2e8f0', 
                                fontSize: '1.75rem', 
                                fontWeight: 800, 
                                color: '#0f172a' 
                            }}>
                                <span>Net Outstanding</span>
                                <span style={{ color: data.balance > 0 ? '#1d4ed8' : '#10b981' }}>₹{data.balance > 0 ? data.balance : 0}</span>
                            </div>

                            {data.balance > 0 ? (
                                <div style={{ marginTop: '3rem' }}>
                                    <button 
                                        onClick={handlePay} 
                                        className="btn btn-primary" 
                                        style={{ 
                                            width: '100%', 
                                            padding: '1.5rem', 
                                            borderRadius: '20px', 
                                            fontSize: '1.2rem', 
                                            fontWeight: 800,
                                            boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.4)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.75rem'
                                        }}
                                    >
                                        <Shield size={22} /> SETTLE OUTSTANDING DUES (₹{data.balance})
                                    </button>
                                    <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.6, marginTop: '1.25rem' }}>Secure encrypted payment powered by Razorpay</p>
                                </div>
                            ) : (
                                <div style={{ marginTop: '3rem', background: 'rgba(16, 185, 129, 0.08)', border: '1.5px solid #10b981', borderRadius: '20px', padding: '1.5rem', textAlign: 'center', color: '#047857', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                    <CheckCircle size={24} /> ALL DUES SETTLED. NO OUTSTANDING BALANCE.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lab Fees Table */}
                    <div className="card">
                        <div className="card-header">
                            <div className="section-title">Diagnostic Fee Breakdown</div>
                            <span className="chip-neutral">{data.labReports.length} investigations</span>
                        </div>
                        <div className="table-container mt-4">
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
                                    {data.labReports.length > 0 ? data.labReports.map(req => (
                                        <tr key={req._id}>
                                            <td style={{ fontWeight: 600, color: '#1e293b' }}>{req.title}</td>
                                            <td className="muted">{new Date(req.createdAt).toLocaleDateString()}</td>
                                            <td><span className="chip-success">{req.status}</span></td>
                                            <td style={{ fontWeight: 700 }}>₹350</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="4" className="muted text-center py-12">No diagnostic history found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div>
                    <div className="card mb-6">
                        <div className="card-header">
                            <div className="section-title">Payment Help</div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div className="mb-6">
                                <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Bed Charges</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>Calculated daily from time of admission. Current stay: {data.stayDays} days. Rates vary by ward type.</div>
                            </div>
                            <div className="mb-6">
                                <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Lab Reports</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>Charged per investigation ordered by your physician. Standard rate ₹350.</div>
                            </div>
                            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.25rem', fontSize: '0.8rem', color: '#64748b', border: '1px solid #e2e8f0', lineHeight: 1.4 }}>
                                <Shield size={16} className="text-primary mb-2" />
                                For corporate insurance or manual billing inquiries, please visit the main reception desk.
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="section-title">Security</div>
                        </div>
                        <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                            <div className="p-4 rounded-xl bg-soft-primary mb-4 flex justify-center">
                                <Shield size={40} className="text-primary" />
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Your transactions are protected with 256-bit SSL encryption.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="card mt-8">
                <div className="card-header">
                    <div>
                        <div className="section-title">Transaction History</div>
                        <div className="section-subtitle">Detailed log of all financial credits and debits</div>
                    </div>
                </div>
                <div className="table-container mt-4">
                    <table>
                        <thead>
                            <tr>
                                <th>Date & Time</th>
                                <th>Description</th>
                                <th>Method</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.payments.length > 0 ? data.payments.map(p => (
                                <tr key={p._id}>
                                    <td className="muted">{new Date(p.createdAt).toLocaleString()}</td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{p.razorpayPaymentId || 'HOSP-TXN'}</div>
                                        <div className="muted" style={{ fontSize: '0.75rem' }}>{p.description || 'Medical Dues Settlement'}</div>
                                    </td>
                                    <td><strong>{p.method}</strong></td>
                                    <td><span className={`chip-${p.type === 'CREDIT' ? 'success' : 'danger'}`} style={{ fontSize: '0.7rem' }}>{p.type}</span></td>
                                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>₹{p.amount}</td>
                                    <td><span className="chip">{p.status}</span></td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" className="muted text-center py-12">No transactions recorded yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Billing;
