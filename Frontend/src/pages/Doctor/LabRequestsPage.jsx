import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Trash2, CheckCircle, Clock, X, Beaker } from 'lucide-react';
import { getDoctorPatients, getLabReports } from '../../utils/api';

const LabRequestsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTests, setSelectedTests] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const labTests = [
    { id: 1, name: "Complete Blood Count (CBC)", price: 300 },
    { id: 2, name: "MRI Brain Scan", price: 5000 },
    { id: 3, name: "Thyroid Profile", price: 450 },
    { id: 4, name: "Liver Function Test", price: 600 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientRes, reportRes] = await Promise.all([
          getDoctorPatients(),
          getLabReports()
        ]);
        setPatients(patientRes.data.data);
        setReports(reportRes.data.data);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addTest = (testId) => {
    const test = labTests.find(t => t.id === parseInt(testId));
    if (test && !selectedTests.find(t => t.id === test.id)) {
      setSelectedTests([...selectedTests, test]);
      setTotalCost(totalCost + test.price);
    }
  };

  const removeTest = (testId) => {
    const test = selectedTests.find(t => t.id === testId);
    if (test) {
      setSelectedTests(selectedTests.filter(t => t.id !== testId));
      setTotalCost(totalCost - test.price);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div>
            <div className="section-title">Lab Diagnostic Requests</div>
            <div className="section-subtitle">Manage and track laboratory investigation orders</div>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} style={{ marginRight: '0.5rem' }} /> New Lab Order
          </button>
        </div>

        <div className="table-container mt-4">
          <table>
            <thead>
              <tr>
                <th>Date Ordered</th>
                <th>Patient</th>
                <th>Investigations</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((req) => (
                <tr key={req._id}>
                  <td style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{new Date(req.createdAt).toLocaleString()}</td>
                  <td style={{ fontWeight: 600 }}>{req.patient?.user?.fullName}</td>
                  <td style={{ fontSize: '0.85rem' }}>{req.title}</td>
                  <td>
                    {req.status === 'REVIEWED' ? (
                      <span className="badge badge-success">REVIEWED</span>
                    ) : (
                      <span className="badge badge-warning">{req.status}</span>
                    )}
                  </td>
                  <td className="text-right">
                    <Link to={`/doctor/report-view?id=${req._id}`} className="btn btn-outline btn-sm">Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Request Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ maxWidth: '600px', width: '100%', background: 'white' }}>
            <div className="card-header">
              <div>
                <div className="section-title">New Lab Investigation Order</div>
                <div className="section-subtitle">Select patient and required tests</div>
              </div>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20}/></button>
            </div>
            <form className="mt-4">
              <div className="form-group">
                <label className="form-label">Select Patient</label>
                <select className="form-select">
                  <option value="">-- Choose Patient --</option>
                  {patients.map(p => (
                    <option key={p._id} value={p._id}>{p.user?.fullName}</option>
                  ))}
                </select>
              </div>

              <div className="form-group mt-4">
                <label className="form-label">Select Lab Investigation</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select className="form-control" onChange={(e) => addTest(e.target.value)} defaultValue="">
                    <option value="" disabled>-- Choose Test --</option>
                    {labTests.map(t => (
                      <option key={t.id} value={t.id}>{t.name} (₹{t.price})</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedTests.length > 0 && (
                <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <label style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Selected Investigations</label>
                  <div className="mt-2">
                    {selectedTests.map(t => (
                      <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                          <div className="muted" style={{ fontSize: '0.75rem' }}>₹{t.price}</div>
                        </div>
                        <button type="button" className="btn-icon" style={{ color: '#ef4444' }} onClick={() => removeTest(t.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '1rem', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                    Total Cost: ₹{totalCost}
                  </div>
                </div>
              )}

              <div className="form-group mt-4">
                <label className="form-label">Clinical Notes (Optional)</label>
                <textarea className="form-control" rows="3" placeholder="Provide clinical context..."></textarea>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-primary" style={{ flex: 1, padding: '0.8rem' }} onClick={() => { alert('Order submitted successfully!'); setShowModal(false); }}>
                  Submit Order
                </button>
                <button type="button" className="btn btn-outline" style={{ flex: 1, padding: '0.8rem' }} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LabRequestsPage;
