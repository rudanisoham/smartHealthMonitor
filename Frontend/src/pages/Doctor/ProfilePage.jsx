import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getDoctorProfile, updateDoctorProfile } from '../../utils/api';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    bio: "",
    specialty: "",
    licenseNumber: "",
    experience: "",
    department: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getDoctorProfile();
        const doc = res.data.data;
        setFormData({
          fullName: doc.user?.fullName || "",
          phone: doc.user?.phone || doc.phone || "",
          email: doc.user?.email || "",
          bio: doc.bio || "",
          specialty: doc.specialty || "",
          licenseNumber: doc.licenseNumber || "",
          experience: doc.experience || "",
          department: doc.department || ""
        });
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoctorProfile({
        bio: formData.bio,
        specialty: formData.specialty,
        licenseNumber: formData.licenseNumber,
        experience: formData.experience,
        department: formData.department,
        phone: formData.phone
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading profile...</div>;

  return (
    <>
      {/* Optional page header if your layout doesn't automatically set the title */}
      <div className="card-header-flex" style={{marginBottom: '2rem'}}>
        <div>
          <h1 className="page-title" style={{fontSize: '1.5rem', marginBottom: '0.25rem'}}>My Profile</h1>
          <div className="muted" style={{fontSize: '1rem'}}>Manage your personal and professional details</div>
        </div>
      </div>

      <div className="card" style={{maxWidth: '850px', margin: '0 auto', padding: '2.5rem'}}>
        
        {/* Identity Header Area */}
        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem'}}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%', 
            background: 'var(--accent)', color: 'white', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem', fontWeight: 700
          }}>
            {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'D'}
          </div>
          <div>
            <h2 style={{fontSize: '1.4rem', fontWeight: 700, margin: 0, color: 'var(--text-main)'}}>Dr. {formData.fullName}</h2>
            <div className="muted" style={{fontSize: '0.95rem', margin: '0.25rem 0 0.5rem 0'}}>{formData.specialty || 'General'} - {formData.department || 'Not Assigned'}</div>
            <span className="chip" style={{fontSize: '0.75rem'}}>Verified Practitioner</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Section 1: Personal Info */}
          <div style={{marginBottom: '2.5rem'}}>
            <h3 style={{fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)'}}>
              Personal & Contact Info
            </h3>
            <div className="form-grid form-2">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleChange} required/>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required/>
                <span className="muted" style={{fontSize: '0.7rem'}}>Format: +1234567890</span>
              </div>
              
              <div className="form-group" style={{gridColumn: 'span 2'}}>
                <label>
                  Email Address <br/>
                  <span className="muted" style={{fontSize: '0.8rem', fontWeight: 400}}>(Login ID - cannot be changed)</span>
                </label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} disabled style={{opacity: 0.7, cursor: 'not-allowed', marginTop: '0.25rem'}}/>
              </div>

              <div className="form-group" style={{gridColumn: 'span 2'}}>
                <label>Professional Bio</label>
                <textarea name="bio" className="form-control" rows="4" value={formData.bio} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>

          {/* Section 2: Credentials */}
          <div style={{marginBottom: '2rem'}}>
            <h3 style={{fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)'}}>
              Verified Medical Credentials
            </h3>
            <div className="form-grid form-2">
              <div className="form-group">
                <label>Specialty</label>
                <input type="text" name="specialty" className="form-control" value={formData.specialty} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Medical License Number</label>
                <input type="text" name="licenseNumber" className="form-control" value={formData.licenseNumber} onChange={handleChange} />
              </div>
              
              <div className="form-group">
                <label>Years of Experience</label>
                <input type="number" name="experience" className="form-control" value={formData.experience} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input type="text" name="department" className="form-control" value={formData.department} onChange={handleChange} />
              </div>
            </div>
            
            <div className="muted" style={{fontSize: '0.85rem', marginTop: '1.5rem', lineHeight: '1.5'}}>
              Credentials are locked after registration. To modify your license or specialty, please contact the hospital administration.
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'flex-end', marginTop: '2rem'}}>
            <button type="submit" className="btn btn-primary" style={{gap: '0.4rem'}} disabled={saving}>
              <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default ProfilePage;
