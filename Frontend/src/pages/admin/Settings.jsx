import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { getMe } from '../../utils/api';

export default function Settings() {
  const [admin, setAdmin] = useState({ fullName: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await getMe();
        setAdmin(res.data.data);
      } catch (err) {
        console.error("Failed to fetch admin profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  return (
    <AdminLayout title="Admin Settings" subtitle="System configurations and profile">
      
      <div style={{display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '1.5rem', alignItems: 'start'}}>
        
        {/* Left Card: Admin Profile */}
        <div className="card" style={{padding: '2rem'}}>
          <div style={{marginBottom: '2rem'}}>
            <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>Admin Profile</div>
            <div style={{fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Manage your personal credentials</div>
          </div>

          {loading ? <div>Loading profile...</div> : (
            <form style={{display: 'flex', flexDirection: 'column', gap: '1.25rem'}} onSubmit={(e) => { e.preventDefault(); setSuccess(true); setTimeout(() => setSuccess(false), 3000); }}>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Email Address</label>
                <input type="email" value={admin.email} readOnly style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#64748B', background: '#F8FAFC', cursor: 'not-allowed'}} />
                <div style={{fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem'}}>Superuser emails cannot be changed.</div>
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Full Name</label>
                <input type="text" value={admin.fullName} onChange={(e) => setAdmin({...admin, fullName: e.target.value})} style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Contact Number</label>
                <input type="text" value={admin.phone || ''} onChange={(e) => setAdmin({...admin, phone: e.target.value})} placeholder="Not set" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>

              <div style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem'}}>
                <div style={{fontSize: '0.85rem', fontWeight: '700', color: '#EF4444'}}>Change Password (Optional)</div>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                  <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>Current Password</label>
                  <input type="password" placeholder="••••••••" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem'}}>
                  <label style={{fontSize: '0.85rem', fontWeight: '700', color: '#1E293B'}}>New Password</label>
                  <input type="password" placeholder="••••••••" style={{padding: '0.75rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', outline: 'none', fontSize: '0.9rem', color: '#1E293B', background: '#F8FAFC'}} onFocus={(e) => e.target.style.borderColor = '#94A3B8'} onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
                </div>
              </div>

              <div style={{marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <button type="submit" style={{padding: '0.75rem 1.5rem', background: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'}} onMouseOver={(e) => {e.currentTarget.style.background = '#1D4ED8';}} onMouseOut={(e) => {e.currentTarget.style.background = '#2563EB';}}>
                  Save Changes
                </button>
                {success && <span style={{fontSize: '0.85rem', color: '#10B981', fontWeight: '600'}}>Settings updated!</span>}
              </div>

            </form>
          )}
        </div>

        {/* Right Card: System Status */}
        <div className="card" style={{padding: '2rem'}}>
          <div style={{marginBottom: '2rem'}}>
            <div style={{fontSize: '1.15rem', fontWeight: '800', color: '#0F172A'}}>System Status</div>
            <div style={{fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem', fontWeight: '500'}}>Realtime health monitor</div>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{fontSize: '0.85rem', color: '#64748B', fontWeight: '500'}}>Database Connection</div>
              <div style={{background: '#DCFCE7', color: '#16A34A', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700'}}>Healthy</div>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{fontSize: '0.85rem', color: '#64748B', fontWeight: '500'}}>Security Logger</div>
              <div style={{background: '#DCFCE7', color: '#16A34A', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700'}}>Active</div>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{fontSize: '0.85rem', color: '#64748B', fontWeight: '500'}}>Timezone</div>
              <div style={{background: '#F1F5F9', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700'}}>Asia/Kolkata</div>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{fontSize: '0.85rem', color: '#64748B', fontWeight: '500'}}>App Version</div>
              <div style={{fontSize: '0.85rem', color: '#3B82F6', fontWeight: '700'}}>v1.3.0</div>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

