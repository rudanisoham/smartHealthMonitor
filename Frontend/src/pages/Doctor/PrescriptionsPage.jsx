import React, { useState, useEffect, useRef } from 'react';
import { getDoctorPrescriptions, createPrescription, getDoctorPatients, getMedicalInventory } from '../../utils/api';
import { Loader, Search, Plus, Trash2, Clock, Calendar, FileText, User, X, ChevronDown, Download, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrescriptionsPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [patients, setPatients] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedPresc, setSelectedPresc] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        diagnosis: '',
        items: [{ medicineId: '', name: '', dosage: '', frequency: '0-0-0', duration: '' }],
        instructions: '',
        notes: '',
        validUntil: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prescRes, patientRes, invRes] = await Promise.all([
                    getDoctorPrescriptions(),
                    getDoctorPatients(),
                    getMedicalInventory()
                ]);
                setPrescriptions(prescRes.data.data);
                setPatients(patientRes.data.data);
                setInventory(invRes.data.data);
            } catch (err) {
                console.error('Failed to load data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const addMedicineRow = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { medicineId: '', name: '', dosage: '', frequency: '0-0-0', duration: '' }]
        });
    };

    const removeMedicineRow = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const updateItem = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.patientId) {
            alert('Please select a patient');
            return;
        }

        setIsSaving(true);
        try {
            // Prepare data for backend
            const payload = {
                ...formData,
                items: formData.items.map(item => ({
                    medicine: item.medicineId || null,
                    name: item.name,
                    dosage: item.dosage,
                    frequency: item.frequency,
                    duration: item.duration
                }))
            };

            await createPrescription(payload);
            alert('Prescription issued successfully');
            
            // Refresh and Reset
            const prescRes = await getDoctorPrescriptions();
            setPrescriptions(prescRes.data.data);
            setFormData({
                patientId: '',
                patientName: '',
                diagnosis: '',
                items: [{ medicineId: '', name: '', dosage: '', frequency: '0-0-0', duration: '' }],
                instructions: '',
                notes: '',
                validUntil: ''
            });
        } catch (err) {
            alert('Failed to issue prescription');
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <Loader className="animate-spin" size={40} color="var(--primary)" />
        </div>
    );

    return (
        <div className="grid grid-2" style={{ alignItems: 'start', gap: '1.5rem' }}>
            {/* Issue Prescription Section */}
            <div className="card shadow-sm">
                <div className="card-header" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                    <div>
                        <div className="section-title" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={20} color="var(--primary)" /> Issue New Prescription
                        </div>
                        <div className="section-subtitle">Create a structured medication plan</div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                    {/* Patient Selector */}
                    <div className="form-group mb-4">
                        <label className="label-bold">Select Patient</label>
                        <PatientPicker 
                            patients={patients} 
                            selectedId={formData.patientId}
                            onSelect={(p) => setFormData({ ...formData, patientId: p._id, patientName: p.user?.fullName })}
                            onClear={() => setFormData({ ...formData, patientId: '', patientName: '' })}
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label className="label-bold">Diagnosis</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="e.g. Hypertension, Viral Fever"
                            value={formData.diagnosis}
                            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                            required
                        />
                    </div>

                    {/* Medicines List */}
                    <div className="form-group mb-4">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <label className="label-bold">Medications</label>
                            <button type="button" className="btn btn-outline btn-sm" onClick={addMedicineRow} style={{ padding: '0.25rem 0.75rem', borderRadius: '6px' }}>
                                <Plus size={14} /> Add row
                            </button>
                        </div>
                        
                        <div className="medicine-table-header" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr 40px', gap: '0.5rem', marginBottom: '0.5rem', padding: '0 0.5rem' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Medicine</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Dosage</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Duration</span>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Timing</span>
                            <span></span>
                        </div>

                        <div className="medicine-rows">
                            {formData.items.map((item, index) => (
                                <MedicineRow 
                                    key={index}
                                    item={item}
                                    index={index}
                                    inventory={inventory}
                                    onUpdate={updateItem}
                                    onRemove={() => removeMedicineRow(index)}
                                    showRemove={formData.items.length > 1}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-2" style={{ gap: '1rem' }}>
                        <div className="form-group">
                            <label className="label-bold">Instructions (to patient)</label>
                            <textarea 
                                className="form-control" 
                                rows="2" 
                                placeholder="Take after food, avoid cold water..."
                                value={formData.instructions}
                                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className="label-bold">Doctor Notes (private)</label>
                            <textarea 
                                className="form-control" 
                                rows="2" 
                                placeholder="Observations or follow-up notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-group mt-3">
                        <label className="label-bold">Valid Until</label>
                        <div style={{ position: 'relative' }}>
                            <Calendar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input 
                                type="date" 
                                className="form-control" 
                                style={{ paddingLeft: '40px' }}
                                value={formData.validUntil}
                                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                    </div>

                    <div className="mt-4 pt-3" style={{ borderTop: '1px solid #f1f5f9' }}>
                        <button type="submit" className="btn btn-primary w-100" disabled={isSaving}>
                            {isSaving ? 'Issuing...' : 'Save & Issue Prescription'}
                        </button>
                    </div>
                </form>
            </div>

            {/* History Section */}
            <div className="card shadow-sm">
                <div className="card-header" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                    <div>
                        <div className="section-title" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={20} color="var(--primary)" /> Recent Prescriptions
                        </div>
                        <div className="section-subtitle">Manage history and statuses</div>
                    </div>
                </div>

                <div className="table-container mt-2" style={{ border: 'none' }}>
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th style={{ background: 'transparent' }}>Date</th>
                                <th style={{ background: 'transparent' }}>Patient</th>
                                <th style={{ background: 'transparent' }}>Diagnosis</th>
                                <th style={{ background: 'transparent', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.length > 0 ? (
                                prescriptions.map(presc => (
                                    <tr key={presc._id} className="hover-row">
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{new Date(presc.createdAt).toLocaleDateString()}</div>
                                            <div className="muted" style={{ fontSize: '0.7rem' }}>{new Date(presc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{presc.patient?.user?.fullName}</div>
                                            <div className="muted" style={{ fontSize: '0.7rem' }}>ID: #{presc.patient?._id?.substring(0, 8)}</div>
                                        </td>
                                        <td>
                                            <span style={{ fontSize: '0.9rem' }}>{presc.diagnosis || 'General Checkup'}</span>
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-outline btn-sm" onClick={() => setSelectedPresc(presc)}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 muted">No prescriptions issued yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Prescription Detail Modal */}
            {selectedPresc && (
                <PrescriptionDetailModal 
                    prescription={selectedPresc} 
                    onClose={() => setSelectedPresc(null)} 
                />
            )}

            <style>{`
                .label-bold { font-weight: 700; font-size: 0.85rem; color: #475569; margin-bottom: 0.4rem; display: block; text-transform: uppercase; letter-spacing: 0.025em; }
                .hover-row:hover { background-color: #f8fafc; }
                .timing-btn { padding: 0.35rem 0.6rem; border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 4px; font-size: 0.7rem; font-weight: 700; cursor: pointer; transition: 0.2s; color: #94a3b8; }
                .timing-btn.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .badge-soft { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
                .medicine-row-input { border-radius: 6px !important; border: 1px solid #e2e8f0 !important; font-size: 0.9rem !important; }
            `}</style>
        </div>
    );
};

// ── Internal Components ──────────────────────────────────────────────────

const PatientPicker = ({ patients, selectedId, onSelect, onClear }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filtered = query.trim() === '' 
        ? patients.slice(0, 10) 
        : patients.filter(p => p.user?.fullName?.toLowerCase().includes(query.toLowerCase()) || p.user?.email?.toLowerCase().includes(query.toLowerCase()));

    const selectedPatient = patients.find(p => p._id === selectedId);

    if (selectedPatient) {
        return (
            <div className="form-control" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#eff6ff', borderColor: '#bfdbfe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ background: 'white', borderRadius: '50%', padding: '4px' }}><User size={14} color="#3b82f6" /></div>
                    <span style={{ fontWeight: 600, color: '#1d4ed8' }}>{selectedPatient.user?.fullName}</span>
                    <span className="muted" style={{ fontSize: '0.75rem' }}>· {selectedPatient.user?.email}</span>
                </div>
                <X size={16} style={{ cursor: 'pointer', color: '#64748b' }} onClick={onClear} />
            </div>
        );
    }

    return (
        <div ref={wrapperRef} style={{ position: 'relative' }}>
            <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                    type="text" 
                    className="form-control" 
                    style={{ paddingLeft: '40px' }}
                    placeholder="Search by name, email or ID..."
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
                    onFocus={() => setIsOpen(true)}
                />
            </div>
            {isOpen && (
                <div className="shadow-lg" style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', marginTop: '4px', maxHeight: '200px', overflowY: 'auto' }}>
                    {filtered.length > 0 ? filtered.map(p => (
                        <div key={p._id} className="p-2 px-3 hover-row" style={{ cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }} onClick={() => { onSelect(p); setIsOpen(false); }}>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.user?.fullName}</div>
                            <div className="muted" style={{ fontSize: '0.75rem' }}>{p.user?.email} · ID: {p._id.substring(0, 8)}</div>
                        </div>
                    )) : <div className="p-3 text-center muted" style={{ fontSize: '0.85rem' }}>No patients found</div>}
                </div>
            )}
        </div>
    );
};

const MedicineRow = ({ item, index, inventory, onUpdate, onRemove, showRemove }) => {
    const [query, setQuery] = useState(item.name || '');
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const timingParts = item.frequency.split('-'); // M-A-N

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filtered = query.trim() === '' 
        ? inventory.slice(0, 10) 
        : inventory.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || m.brand?.toLowerCase().includes(query.toLowerCase()));

    const toggleTiming = (pIdx) => {
        const newParts = [...timingParts];
        newParts[pIdx] = newParts[pIdx] === '1' ? '0' : '1';
        onUpdate(index, 'frequency', newParts.join('-'));
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr 40px', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'start' }}>
            {/* Medicine Name Picker */}
            <div ref={wrapperRef} style={{ position: 'relative' }}>
                <input 
                    type="text" 
                    className="form-control medicine-row-input" 
                    placeholder="Medicine name..." 
                    value={query}
                    onChange={(e) => { 
                        setQuery(e.target.value); 
                        onUpdate(index, 'name', e.target.value);
                        onUpdate(index, 'medicineId', ''); // Clear ID if typing
                        setIsOpen(true); 
                    }}
                    onFocus={() => setIsOpen(true)}
                    required
                />
                {isOpen && (
                    <div className="shadow-lg" style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20, background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', marginTop: '4px', maxHeight: '180px', overflowY: 'auto' }}>
                        {filtered.length > 0 ? filtered.map(m => (
                            <div key={m._id} className="p-2 px-3 hover-row" style={{ cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }} 
                                onClick={() => { 
                                    setQuery(m.name);
                                    onUpdate(index, 'name', m.name);
                                    onUpdate(index, 'medicineId', m._id);
                                    setIsOpen(false); 
                                }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{m.name}</span>
                                    <span style={{ fontSize: '0.7rem', color: m.stock < 10 ? '#ef4444' : '#10b981' }}>Stock: {m.stock}</span>
                                </div>
                                <div className="muted" style={{ fontSize: '0.7rem' }}>{m.unit} · {m.category}</div>
                            </div>
                        )) : (
                            <div className="p-2 text-center muted" style={{ fontSize: '0.75rem' }} onClick={() => setIsOpen(false)}>
                                Use "{query}" as custom
                            </div>
                        )}
                    </div>
                )}
            </div>

            <input 
                type="text" 
                className="form-control medicine-row-input" 
                placeholder="e.g. 500mg" 
                value={item.dosage}
                onChange={(e) => onUpdate(index, 'dosage', e.target.value)}
                required
            />

            <input 
                type="text" 
                className="form-control medicine-row-input" 
                placeholder="e.g. 5 days" 
                value={item.duration}
                onChange={(e) => onUpdate(index, 'duration', e.target.value)}
                required
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                    <button type="button" className={`timing-btn ${timingParts[0] === '1' ? 'active' : ''}`} onClick={() => toggleTiming(0)} title="Morning">M</button>
                    <button type="button" className={`timing-btn ${timingParts[1] === '1' ? 'active' : ''}`} onClick={() => toggleTiming(1)} title="Afternoon">A</button>
                    <button type="button" className={`timing-btn ${timingParts[2] === '1' ? 'active' : ''}`} onClick={() => toggleTiming(2)} title="Night">N</button>
                </div>
                <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#94a3b8', marginTop: '2px', fontFamily: 'monospace' }}>{item.frequency}</div>
            </div>

            <button type="button" className="btn-icon" style={{ height: '38px', color: '#ef4444', background: '#fef2f2', border: '1px solid #fee2e2' }} onClick={onRemove} disabled={!showRemove}>
                <Trash2 size={16} />
            </button>
        </div>
    );
};

const PrescriptionDetailModal = ({ prescription, onClose }) => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card shadow-2xl" style={{ width: '100%', maxWidth: '600px', background: 'white', overflow: 'hidden' }}>
                <div style={{ background: 'var(--primary)', padding: '1.5rem', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Prescription Details</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>ID: #{prescription._id.substring(18)}</div>
                        </div>
                        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <div style={{ padding: '1.5rem' }}>
                    <div className="grid grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                            <div className="muted" style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Patient</div>
                            <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem' }}>{prescription.patient?.user?.fullName}</div>
                            <div className="muted" style={{ fontSize: '0.8rem' }}>Patient ID: {prescription.patient?._id}</div>
                        </div>
                        <div className="text-right">
                            <div className="muted" style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>Date Issued</div>
                            <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem' }}>{new Date(prescription.createdAt).toLocaleDateString()}</div>
                            <div className="muted" style={{ fontSize: '0.8rem' }}>Valid Until: {prescription.validUntil ? new Date(prescription.validUntil).toLocaleDateString() : 'N/A'}</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <div className="muted" style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Diagnosis</div>
                        <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontWeight: 600 }}>
                            {prescription.diagnosis || 'General Checkup'}
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <div className="muted" style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.6rem' }}>Medications</div>
                        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                            <table className="w-100" style={{ fontSize: '0.85rem' }}>
                                <thead style={{ background: '#f1f5f9' }}>
                                    <tr>
                                        <th style={{ padding: '0.5rem 0.75rem' }}>Medicine</th>
                                        <th style={{ padding: '0.5rem 0.75rem' }}>Dosage</th>
                                        <th style={{ padding: '0.5rem 0.75rem' }}>Frequency</th>
                                        <th style={{ padding: '0.5rem 0.75rem' }}>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescription.items && prescription.items.length > 0 ? prescription.items.map((it, i) => (
                                        <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '0.75rem', fontWeight: 600 }}>{it.name || it.medicine?.name}</td>
                                            <td style={{ padding: '0.75rem' }}>{it.dosage}</td>
                                            <td style={{ padding: '0.75rem' }}>
                                                <div style={{ display: 'flex', gap: '3px' }}>
                                                    {it.frequency.split('-').map((val, idx) => (
                                                        <span key={idx} style={{ 
                                                            fontSize: '0.65rem', padding: '2px 4px', borderRadius: '3px',
                                                            background: val === '1' ? '#dbeafe' : '#f1f5f9',
                                                            color: val === '1' ? '#1d4ed8' : '#94a3b8',
                                                            fontWeight: 800
                                                        }}>{['M', 'A', 'N'][idx]}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td style={{ padding: '0.75rem' }}>{it.duration}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '1rem', whiteSpace: 'pre-wrap' }}>{prescription.medicinesText}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {prescription.notes && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div className="muted" style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Instructions</div>
                            <div style={{ padding: '0.75rem', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fef3c7', color: '#92400e', fontSize: '0.9rem' }}>
                                {prescription.notes}
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => window.print()}>
                        <Printer size={16} /> Print
                    </button>
                    <button className="btn btn-primary" onClick={onClose}>Done</button>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionsPage;
