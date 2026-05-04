import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  UserPlus, 
  UserMinus, 
  Search, 
  AlertCircle,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';
import API from '../../utils/api';

const DepartmentBeds = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchBeds();
    fetchPatients();
  }, [id]);

  const fetchBeds = async () => {
    try {
      const res = await API.get(`/reception/beds/department/${id}`);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await API.get('/reception/patients');
      setPatients(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssign = async (patientId) => {
    console.log('Assigning Patient:', patientId);
    console.log('Selected Bed:', selectedBed);
    
    if (!patientId || !selectedBed) {
      alert('Missing patient or bed selection');
      return;
    }

    setAssigning(true);
    try {
      const res = await API.post(`/reception/beds/${selectedBed._id}/assign`, { patientId });
      console.log('Assignment Success:', res.data);
      alert('Patient assigned to bed successfully!');
      setShowModal(false);
      fetchBeds();
    } catch (err) {
      console.error('Assignment Error Details:', err.response?.data);
      alert(err.response?.data?.error || 'Failed to assign patient');
    } finally {
      setAssigning(false);
    }
  };

  const handleRelease = async (bedId, bedNumber) => {
    if (!window.confirm(`Are you sure you want to release bed #${bedNumber}?`)) return;
    try {
      const res = await API.post(`/reception/beds/${bedId}/release`);
      const { bill, days } = res.data.data;
      alert(`Bed #${bedNumber} released successfully!\n\nStay Duration: ${days} day(s)\nTotal Bill: ₹${bill}\n\nA pending billing record has been created.`);
      fetchBeds();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to release bed');
    }
  };

  if (loading) return <div className="p-8 text-center"><div className="loader"></div></div>;
  if (!data) return <div className="p-8 text-center text-danger">Department not found</div>;

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="department-beds">
      <div className="flex justify-between items-end mb-8">
        <div>
          <Link to="/reception/beds" className="btn btn-outline btn-sm mb-4 inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
          <h2 className="section-title">{data.department.name}</h2>
          <p className="muted">{data.beds.filter(b => b.status === 'AVAILABLE').length} Available · {data.beds.filter(b => b.status === 'OCCUPIED').length} Occupied</p>
        </div>
      </div>

      <div className="grid grid-3 gap-6">
        {data.beds.map((bed) => (
          <div key={bed._id} className="card p-6 flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-2xl font-black text-slate-800">#{bed.bedNumber}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{bed.type} BED</div>
              </div>
              <span className={`chip-${bed.status === 'AVAILABLE' ? 'success' : (bed.status === 'OCCUPIED' ? 'danger' : 'warning')} text-xs`}>
                {bed.status}
              </span>
            </div>

            <div className="mt-4 pt-6 border-t border-slate-50 flex-1">
              {bed.status === 'OCCUPIED' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {bed.patient?.user?.fullName?.substring(0, 1) || 'P'}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{bed.patient?.user?.fullName || 'Unknown Patient'}</div>
                      <div className="text-xs muted flex items-center gap-1">
                        <Calendar size={12} /> Since {new Date(bed.assignedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-2 gap-2 mt-4">
                    <button 
                      onClick={() => handleRelease(bed._id, bed.bedNumber)}
                      className="btn bg-rose-50 text-rose-500 border border-rose-100 btn-sm hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <UserMinus size={14} /> Release
                    </button>
                    <Link to={`/reception/billing`} className="btn btn-outline btn-sm flex items-center justify-center gap-2">
                      Billing
                    </Link>
                  </div>
                </div>
              ) : bed.status === 'AVAILABLE' ? (
                <div className="flex flex-col h-full justify-between">
                  <p className="muted text-sm mb-6">Ready for new assignment. Standard rate: ₹{bed.dailyCharge}/day</p>
                  <button 
                    onClick={() => { setSelectedBed(bed); setShowModal(true); }}
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <UserPlus size={18} /> Assign Patient
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <AlertCircle size={32} className="mx-auto text-warning opacity-30 mb-2" />
                  <p className="muted text-sm italic">Under Maintenance</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Assignment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-800">Assign Patient</h3>
                <p className="muted text-sm">Assigning Bed #{selectedBed?.bedNumber} ({selectedBed?.type})</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="muted" />
              </button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 muted" />
                <input 
                  type="text" 
                  placeholder="Search patient by name or ID..."
                  className="form-control pl-12 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto pr-2 space-y-2 mb-8 custom-scrollbar">
              {filteredPatients.length > 0 ? (
                filteredPatients.map(patient => (
                  <div 
                    key={patient._id}
                    onClick={() => handleAssign(patient._id)}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-primary hover:bg-blue-50 cursor-pointer transition-all group"
                  >
                    <div className="font-bold text-slate-800 group-hover:text-primary transition-colors">{patient.name}</div>
                    <div className="text-xs muted">{patient.email} • ID: {patient.id}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 muted italic text-sm">No patients found matching "{searchTerm}"</div>
              )}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowModal(false)} 
                className="btn btn-outline flex-1 h-12 justify-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentBeds;
