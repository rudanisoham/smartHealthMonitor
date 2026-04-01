import React, { useState, useEffect } from 'react';
import { ChevronDown, Save, Check } from 'lucide-react';
import '../../styles/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState({
        fullName: 'soham',
        phone: '9316202895',
        bloodGroup: 'A+',
        emergencyContact: '9316202895',
        address: 'Bhujapur Vadivistar',
        email: 'rudanisoham9@gmail.com'
    });

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('user_profile');
        if (stored) {
            setProfile(JSON.parse(stored));
        } else {
            localStorage.setItem('user_profile', JSON.stringify(profile));
        }
    }, []);

    const handleInputChange = (e, field) => {
        setProfile({ ...profile, [field]: e.target.value });
        setIsSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem('user_profile', JSON.stringify(profile));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="profile-container">
            {/* Header section is managed by TopHeader */}

            {/* Main Content */}
            <div className="profile-content">

                {/* Top Grid */}
                <div className="profile-grid">

                    {/* Left Panel: Personal Information Form */}
                    <div className="personal-info-panel">
                        <div className="panel-header-simple">
                            <h2>Personal Information</h2>
                            <p>Update your basic details</p>
                        </div>

                        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>

                            <div className="form-row-2">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        className="standard-input"
                                        value={profile.fullName}
                                        onChange={(e) => handleInputChange(e, 'fullName')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        className="standard-input"
                                        value={profile.phone}
                                        onChange={(e) => handleInputChange(e, 'phone')}
                                    />
                                </div>
                            </div>

                            <div className="form-row-2">
                                <div className="form-group">
                                    <label>Blood Group</label>
                                    <div className="custom-select-wrapper">
                                        <select
                                            className="custom-select"
                                            value={profile.bloodGroup}
                                            onChange={(e) => handleInputChange(e, 'bloodGroup')}
                                        >
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="O+">O+</option>
                                        </select>
                                        <ChevronDown size={16} className="select-icon" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Emergency Contact</label>
                                    <input
                                        type="text"
                                        className="standard-input"
                                        value={profile.emergencyContact}
                                        onChange={(e) => handleInputChange(e, 'emergencyContact')}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <textarea
                                    className="standard-textarea"
                                    rows="3"
                                    value={profile.address}
                                    onChange={(e) => handleInputChange(e, 'address')}
                                ></textarea>
                            </div>

                            <div className="form-footer">
                                <div className="email-static">
                                    Email: <strong>{profile.email}</strong> (cannot be changed)
                                </div>
                                <button type="button" className={`btn-save-profile ${isSaved ? 'success' : ''}`} onClick={handleSave}>
                                    {isSaved ? <Check size={16} /> : <Save size={16} />}
                                    {isSaved ? 'Profile Saved' : 'Save Profile'}
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Right Panel: Health Profile */}
                    <div className="health-profile-panel">
                        <div className="panel-header-simple">
                            <h2>Health Profile</h2>
                            <p>Your medical identity card</p>
                        </div>

                        <div className="health-profile-list">

                            <div className="read-only-box">
                                <div className="ro-label">Full Name</div>
                                <div className="ro-value font-semibold">{profile.fullName}</div>
                            </div>

                            <div className="read-only-box">
                                <div className="ro-label">Email</div>
                                <div className="ro-value font-semibold">{profile.email}</div>
                            </div>

                            <div className="read-only-box">
                                <div className="ro-label">Blood Group</div>
                                <div className="ro-value">
                                    <span className="blood-group-badge">{profile.bloodGroup}</span>
                                </div>
                            </div>

                            <div className="read-only-box">
                                <div className="ro-label">Phone</div>
                                <div className="ro-value font-semibold">{profile.phone}</div>
                            </div>

                            <div className="read-only-box">
                                <div className="ro-label">Emergency Contact</div>
                                <div className="ro-value font-semibold">{profile.emergencyContact}</div>
                            </div>

                            <div className="read-only-box">
                                <div className="ro-label">Address</div>
                                <div className="ro-value font-semibold">{profile.address}</div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Bottom Panel: Appearance */}
                <div className="appearance-panel">
                    <div className="panel-header-simple">
                        <h2>Appearance</h2>
                        <p>Choose your preferred theme</p>
                    </div>

                    <div className="theme-buttons">
                        <button className="theme-btn">Dark theme</button>
                        <button className="theme-btn active">Light theme</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
