import React, { useState, useEffect } from 'react';
import { getPatientMe, updatePatientMe, getMe } from '../../utils/api';
import { Loader, CheckCircle } from 'lucide-react';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        bloodGroup: '',
        emergencyEmail: '',
        address: '',
        allergies: ''
    });

    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const [patientRes, userRes] = await Promise.all([
                getPatientMe(),
                getMe()
            ]);

            const patient = patientRes.data.data;
            const user = userRes.data.data;

            setProfileData({
                fullName: user.fullName || '',
                email: user.email || '',
                phone: user.phone || patient?.user?.phone || '',
                gender: patient?.gender || '',
                bloodGroup: patient?.bloodGroup || '',
                emergencyEmail: patient?.emergencyEmail || '',
                address: patient?.address || '',
                allergies: patient?.allergies || ''
            });
        } catch (err) {
            console.error('Error fetching profile:', err);
            setErrorMsg('Failed to load profile. Make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccessMsg('');
        setErrorMsg('');

        try {
            await updatePatientMe({
                gender: profileData.gender,
                bloodGroup: profileData.bloodGroup,
                emergencyEmail: profileData.emergencyEmail,
                address: profileData.address,
                allergies: profileData.allergies,
                phone: profileData.phone
            });

            setSuccessMsg('Profile updated successfully and saved to database!');
            setTimeout(() => setSuccessMsg(''), 4000);
        } catch (err) {
            console.error('Error saving profile:', err);
            setErrorMsg('Failed to save profile. Please try again.');
            setTimeout(() => setErrorMsg(''), 4000);
        } finally {
            setIsSaving(false);
        }
    };

    const handleTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    if (loading) {
        return (
            <div className="admin-content flex justify-center items-center" style={{ minHeight: '400px' }}>
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <>
            {successMsg && (
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(52,211,153,0.15)', border: '1px solid #34d399', borderRadius: '8px', color: '#10b981', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={18} /> {successMsg}
                </div>
            )}

            {errorMsg && (
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1rem' }}>
                    {errorMsg}
                </div>
            )}

            <div className="grid grid-2">
                {/* Personal Information Form */}
                <div className="card">
                    <div className="section-title">Personal Information</div>
                    <p className="section-subtitle mt-1">Update your basic details — changes save directly to the database</p>

                    <form className="form-grid form-2 mt-3" onSubmit={handleSave}>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input id="fullName" name="fullName" className="form-control" type="text" value={profileData.fullName} onChange={handleChange} required minLength="2" disabled style={{ opacity: 0.6 }} />
                            <span className="muted" style={{ fontSize: '0.7rem' }}>Name cannot be changed here</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input id="phone" name="phone" className="form-control" type="tel" value={profileData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" name="gender" className="form-control" value={profileData.gender} onChange={handleChange}>
                                <option value="">-- Select --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bloodGroup">Blood Group</label>
                            <select id="bloodGroup" name="bloodGroup" className="form-control" value={profileData.bloodGroup} onChange={handleChange}>
                                <option value="">-- Select --</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="emergencyEmail">Emergency Email</label>
                            <input id="emergencyEmail" name="emergencyEmail" className="form-control" type="email" value={profileData.emergencyEmail} onChange={handleChange} placeholder="emergency@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="allergies">Allergies</label>
                            <input id="allergies" name="allergies" className="form-control" type="text" value={profileData.allergies} onChange={handleChange} placeholder="e.g. Peanuts, Penicillin" />
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label htmlFor="address">Address</label>
                            <textarea id="address" name="address" className="form-control" rows="2" value={profileData.address} onChange={handleChange} placeholder="Your current address"></textarea>
                        </div>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email: <strong style={{ color: 'var(--text-color)' }}>{profileData.email}</strong><br/>(cannot be changed)</span>
                                <button className="btn btn-primary" type="submit" disabled={isSaving}>
                                    {isSaving ? 'Saving to DB...' : 'Save Profile'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Profile Info Summary */}
                <div className="card">
                    <div className="section-title">Health Profile</div>
                    <p className="section-subtitle mt-1">Your medical identity card — live from database</p>
                    <div className="mt-3">
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Full Name</span>
                                <span className="stat-value" style={{ fontSize: '1rem' }}>{profileData.fullName || '—'}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Email</span>
                                <span className="stat-value" style={{ fontSize: '1rem' }}>{profileData.email || '—'}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Gender</span>
                                <span className="stat-value" style={{ fontSize: '1rem' }}>{profileData.gender || 'Not set'}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Blood Group</span>
                                <span className="stat-value" style={{ fontSize: '1rem' }}>
                                    {profileData.bloodGroup ? <span className="chip">{profileData.bloodGroup}</span> : 'Not set'}
                                </span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Allergies</span>
                                <span className="stat-value text-danger" style={{ fontSize: '1rem' }}>{profileData.allergies || 'None reported'}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Phone</span>
                                <span className="stat-value" style={{ fontSize: '1rem' }}>{profileData.phone || '—'}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Emergency Email</span>
                                <span className="stat-value" style={{ fontSize: '1rem' }}>{profileData.emergencyEmail || '—'}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-info">
                                <span className="stat-label">Address</span>
                                <span className="stat-value" style={{ fontSize: '1rem' }}>{profileData.address || '—'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Appearance */}
            <div className="card mt-4">
                <div className="section-title">Appearance</div>
                <p className="section-subtitle mt-1">Choose your preferred theme</p>
                <div className="mt-3 filter-group" style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => handleTheme('dark')}>Dark theme</button>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => handleTheme('light')}>Light theme</button>
                </div>
                <div className="mt-2 text-xs text-muted" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Saved on this device for future visits.</div>
            </div>
        </>
    );
};

export default Profile;
