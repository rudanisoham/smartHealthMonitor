import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Clock, 
  Calendar, 
  User, 
  CheckCircle, 
  AlertCircle, 
  ChevronDown,
  Info
} from 'lucide-react';

const AssignAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [scheduledAt, setScheduledAt] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [showReschedule, setShowReschedule] = useState(false);

  // Demo data
  const appointment = {
    id: id || 'APP002',
    patient: { name: 'Emma Watson', email: 'emma.w@email.com', phone: '+1 555-0123', bloodGroup: 'A-' },
    preferredDate: '2026-05-10',
    reason: 'Frequent headaches and blurry vision',
    createdAt: '2026-05-01 10:30'
  };

  const doctors = [
    { id: '1', name: 'Dr. Sarah Connor', specialty: 'Cardiology', dept: 'Cardiology', availableDays: 'Monday, Wednesday, Friday' },
    { id: '2', name: 'Dr. James Wilson', specialty: 'Neurology', dept: 'Neurology', availableDays: 'Tuesday, Thursday' },
    { id: '3', name: 'Dr. Lisa Cuddy', specialty: 'Pediatrics', dept: 'Pediatrics', availableDays: 'Monday, Tuesday, Wednesday, Thursday, Friday' },
    { id: '4', name: 'Dr. Eric Foreman', specialty: 'General Medicine', dept: 'General Medicine', availableDays: 'Saturday, Sunday' },
  ];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpec = !selectedSpec || doc.specialty === selectedSpec;
    const matchesDept = !selectedDept || doc.dept === selectedDept;
    return matchesSearch && matchesSpec && matchesDept;
  });

  const handleAssign = (e) => {
    e.preventDefault();
    alert(`Appointment ${appointment.id} assigned to ${selectedDoctor.name} at ${scheduledAt}`);
    navigate('/reception/appointments');
  };

  return (
    <div className="admin-content">
      <div className="mb-6">
        <Link to="/reception/appointments" className="btn btn-outline mb-4" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> Back to Queue
        </Link>
        <h2 className="section-title">Assign Doctor & Schedule</h2>
        <p className="section-subtitle">Finalize appointment details and generate patient token</p>
      </div>

      <div className="grid grid-2">
        {/* Patient Details */}
        <div className="card">
          <div className="card-header border-bottom mb-4 pb-2">
            <h3 className="card-title">Patient Details</h3>
          </div>
          
          <div className="flex-col gap-1">
            <div className="stat-item">
              <div className="stat-info">
                <span className="stat-label">Full Name</span>
                <span className="author-name" style={{ fontSize: '1rem' }}>{appointment.patient.name}</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-info">
                <span className="stat-label">Email / Contact</span>
                <span className="muted">{appointment.patient.email}</span>
                <span className="muted">{appointment.patient.phone}</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-info">
                <span className="stat-label">Preferred Date</span>
                <span className="author-name text-primary" style={{ fontWeight: '700' }}>{appointment.preferredDate}</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-info">
                <span className="stat-label">Reason / Symptoms</span>
                <p className="muted" style={{ margin: '0.25rem 0' }}>{appointment.reason}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assignment Form */}
        <div className="card">
          <div className="card-header border-bottom mb-4 pb-2">
            <h3 className="card-title">Assignment & Schedule</h3>
          </div>

          <form onSubmit={handleAssign}>
            <div className="form-group mb-4">
              <label>Quick Filters</label>
              <div className="grid grid-2 gap-2">
                <select 
                  className="form-select" 
                  value={selectedSpec} 
                  onChange={(e) => setSelectedSpec(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
                <select 
                  className="form-select" 
                  value={selectedDept} 
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option value="">All Departments</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
              </div>
            </div>

            <div className="form-group mb-4" style={{ position: 'relative' }}>
              <label>Confirm / Select Doctor</label>
              <div className="search-bar w-full">
                <Search className="search-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="Search doctor..." 
                  value={searchTerm}
                  onFocus={() => setIsDropdownOpen(true)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                />
              </div>

              {isDropdownOpen && (
                <div className="card mt-2" style={{ 
                  position: 'absolute', 
                  top: '100%', 
                  left: 0, 
                  right: 0, 
                  zIndex: 100, 
                  padding: '0.5rem',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  {filteredDoctors.map(doc => (
                    <div 
                      key={doc.id}
                      className="p-3"
                      style={{ cursor: 'pointer', borderRadius: '8px' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      onClick={() => {
                        setSelectedDoctor(doc);
                        setSearchTerm(doc.name);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="author-name">{doc.name}</div>
                      <div className="muted" style={{ fontSize: '0.75rem' }}>{doc.specialty} • {doc.dept}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-group mb-6">
              <label>Appointment Date & Time</label>
              <input 
                type="datetime-local" 
                className="form-control" 
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                required
              />
            </div>

            {selectedDoctor && scheduledAt && (
              <div className="card mb-6" style={{ background: 'var(--primary-light)', border: '1px solid var(--accent)' }}>
                <div className="flex items-center gap-3">
                  <div className="header-avatar" style={{ width: '40px', height: '40px' }}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <div className="author-name">Token #14 (Estimated)</div>
                    <div className="muted" style={{ fontSize: '0.8rem' }}>Assigned to {selectedDoctor.name}</div>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full" disabled={!selectedDoctor || !scheduledAt}>
              Confirm & Assign Appointment
            </button>
          </form>

          <div className="mt-8 pt-4 border-top">
            <button 
              className="btn btn-outline w-full flex justify-between"
              onClick={() => setShowReschedule(!showReschedule)}
              style={{ color: 'var(--warning)', borderColor: 'var(--warning)' }}
            >
              <span>⚠️ Doctor Unavailable? Notify Patient</span>
              <ChevronDown size={18} style={{ transform: showReschedule ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {showReschedule && (
              <div className="mt-4 p-4 rounded-lg" style={{ background: '#fffbeb', border: '1px solid #fef3c7' }}>
                <p className="muted mb-4" style={{ fontSize: '0.85rem' }}>
                  Send a notification to the patient if the doctor is not available on the requested date.
                </p>
                <div className="form-group mb-3">
                  <label style={{ fontSize: '0.85rem' }}>Next Available From</label>
                  <input type="date" className="form-control" />
                </div>
                <button className="btn btn-outline btn-sm w-full" style={{ fontSize: '0.85rem' }}>
                  Send Reschedule Notice
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignAppointment;
