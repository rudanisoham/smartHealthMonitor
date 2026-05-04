import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getMe, getAdminSettings, updateAdminSettings } from '../../utils/api';
import { Loader, Settings as SettingsIcon, Hospital, Globe, Shield } from 'lucide-react';

export default function Settings() {
  const [admin, setAdmin] = useState({ fullName: '', email: '', phone: '' });
  const [settings, setSettings] = useState({
    hospitalName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    maintenanceMode: false,
    allowRegistration: true
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meRes, settingsRes] = await Promise.all([
          getMe(),
          getAdminSettings()
        ]);
        setAdmin(meRes.data.data);
        setSettings(settingsRes.data.data);
      } catch (err) {
        console.error("Failed to fetch settings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAdminSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <AdminLayout title="Admin Settings">
      <div style={{padding: '5rem', textAlign: 'center'}}><Loader className="animate-spin" size={32} /></div>
    </AdminLayout>
  );

  return (
    <AdminLayout title="Admin Settings" subtitle="System configurations and profile">
      
      <div style={{display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '1.5rem', alignItems: 'start'}}>
        
        {/* Left Card: Hospital Configuration */}
        <div className="card" style={{padding: '2rem'}}>
          <div style={{marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div className="stat-icon" style={{background: 'var(--primary-light)', color: 'var(--primary)'}}>
              <Hospital size={20} />
            </div>
            <div>
              <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>Hospital Configuration</div>
              <div style={{fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Update global hospital information</div>
            </div>
          </div>

          <form style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}} onSubmit={handleUpdateSettings}>
            <div className="grid grid-2 gap-4">
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Hospital Name</label>
                <input type="text" name="hospitalName" value={settings.hospitalName} onChange={(e) => setSettings({...settings, hospitalName: e.target.value})} style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Contact Email</label>
                <input type="email" name="contactEmail" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} />
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
              <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Address</label>
              <textarea rows="2" name="address" value={settings.address} onChange={(e) => setSettings({...settings, address: e.target.value})} style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} />
            </div>

            <div style={{display: 'flex', gap: '2rem', marginTop: '0.5rem'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})} />
                <span style={{fontSize: '0.85rem', fontWeight: '600'}}>Maintenance Mode</span>
              </label>
              <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                <input type="checkbox" checked={settings.allowRegistration} onChange={(e) => setSettings({...settings, allowRegistration: e.target.checked})} />
                <span style={{fontSize: '0.85rem', fontWeight: '600'}}>Allow Self Registration</span>
              </label>
            </div>

            <div style={{marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <button type="submit" disabled={saving} style={{padding: '0.75rem 1.5rem', background: 'var(--primary)', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer'}}>
                {saving ? 'Saving...' : 'Update System Config'}
              </button>
              {success && <span style={{fontSize: '0.85rem', color: '#10B981', fontWeight: '600'}}>Updated successfully!</span>}
            </div>
          </form>
        </div>

        {/* Right Column: Admin Profile */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div className="card" style={{padding: '2rem'}}>
            <div style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div className="stat-icon" style={{background: 'var(--success-light)', color: 'var(--success)'}}>
                <Globe size={20} />
              </div>
              <div>
                <div style={{fontSize: '1.1rem', fontWeight: '800', color: '#0F172A'}}>My Account</div>
              </div>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div>
                <div className="muted" style={{fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase'}}>Full Name</div>
                <div style={{fontWeight: '600'}}>{admin.fullName}</div>
              </div>
              <div>
                <div className="muted" style={{fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase'}}>Email Address</div>
                <div style={{fontWeight: '600'}}>{admin.email}</div>
              </div>
              <div>
                <div className="muted" style={{fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase'}}>Primary Phone</div>
                <div style={{fontWeight: '600'}}>{admin.phone || 'Not Set'}</div>
              </div>
            </div>
          </div>

          <div className="card" style={{padding: '2rem'}}>
            <div style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div className="stat-icon" style={{background: 'var(--danger-light)', color: 'var(--danger)'}}>
                <Shield size={20} />
              </div>
              <div>
                <div style={{fontSize: '1.1rem', fontWeight: '800', color: '#0F172A'}}>System Integrity</div>
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span className="muted text-sm">App Version</span>
                <span style={{fontWeight: '700', fontSize: '0.85rem'}}>v2.1.0-stable</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span className="muted text-sm">Environment</span>
                <span style={{fontWeight: '700', fontSize: '0.85rem', color: 'var(--success)'}}>Production</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

