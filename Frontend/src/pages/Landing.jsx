import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-family)', background: '#F8FAFC', overflowX: 'hidden'}}>
      
      {/* Header */}
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 5rem', background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, boxShadow: '0 1px 0 rgba(0,0,0,0.06)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
          <div style={{background: '#0ea5e9', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '1.1rem'}}>
            SH
          </div>
          <div style={{fontWeight: '800', fontSize: '1.25rem', color: '#0f766e'}}>
            SmartHealth
          </div>
        </div>
        <div>
          <Link to="/auth/patient/login" style={{padding: '0.6rem 1.5rem', borderRadius: '999px', border: '1px solid #0f766e', color: '#0f766e', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none'}}>
            Patient Portal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{padding: '9rem 2rem 4rem', textAlign: 'center', position: 'relative'}}>
        {/* Glow effect */}
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.15) 0%, rgba(248, 250, 252, 0) 70%)', zIndex: 0, pointerEvents: 'none'}}></div>
        
        <div style={{position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto'}}>
          <h1 style={{fontSize: '3.5rem', fontWeight: '800', color: '#0f766e', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em'}}>
            Transforming Care<br />With Real-Time Precision
          </h1>
          <p style={{fontSize: '1.15rem', color: '#64748b', lineHeight: '1.6', maxWidth: '640px', margin: '0 auto', fontWeight: '500'}}>
            Experience a seamless, unified hospital management ecosystem designed to streamline workflows, empower clinicians, and elevate patient care.
          </p>
        </div>
      </section>

      {/* Portal Cards Section */}
      <section style={{padding: '2rem 5rem 6rem', display: 'flex', gap: '2rem', justifyContent: 'center', zIndex: 1, flexWrap: 'wrap'}}>
        
        <div style={{background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', flex: '1', minWidth: '300px', maxWidth: '380px', display: 'flex', flexDirection: 'column'}}>
          <div style={{width: '56px', height: '56px', borderRadius: '16px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h3 style={{fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem'}}>Patient Portal</h3>
          <p style={{color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', flex: 1}}>
            Access your health records, schedule appointments, and view real-time AI diagnostic insights securely.
          </p>
          <Link to="/auth/patient/login" style={{color: '#10b981', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem'}}>
            Sign In <span>→</span>
          </Link>
        </div>

        <div style={{background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', flex: '1', minWidth: '300px', maxWidth: '380px', display: 'flex', flexDirection: 'column'}}>
          <div style={{width: '56px', height: '56px', borderRadius: '16px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
          </div>
          <h3 style={{fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem'}}>Doctor Dashboard</h3>
          <p style={{color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', flex: 1}}>
            Manage clinical workflows, write prescriptions, and receive immediate alerts for high-risk patient conditions.
          </p>
          <Link to="/auth/doctor/login" style={{color: '#3b82f6', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem'}}>
            Sign In <span>→</span>
          </Link>
        </div>

        <div style={{background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', flex: '1', minWidth: '300px', maxWidth: '380px', display: 'flex', flexDirection: 'column'}}>
          <div style={{width: '56px', height: '56px', borderRadius: '16px', background: '#f5f3ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem'}}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>
          </div>
          <h3 style={{fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem'}}>Admin Console</h3>
          <p style={{color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', flex: 1}}>
            Oversee hospital operations, monitor ward capacity, and control role-based access across facilities.
          </p>
          <Link to="/auth/admin/login" style={{color: '#8b5cf6', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem'}}>
            Sign In <span>→</span>
          </Link>
        </div>

      </section>

      {/* Features Section */}
      <section style={{padding: '6rem 5rem', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{textAlign: 'center', marginBottom: '4rem', maxWidth: '600px'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem'}}>Why Choose SmartHealth</h2>
          <p style={{fontSize: '1.1rem', color: '#64748b', lineHeight: '1.6'}}>A modern approach to clinical software that removes friction from daily operations.</p>
        </div>

        <div style={{display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px'}}>
          <div style={{flex: 1, minWidth: '280px', display: 'flex', gap: '1rem'}}>
            <div style={{width: '48px', height: '48px', minWidth: '48px', borderRadius: '12px', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div>
              <h4 style={{fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem'}}>Live Vitals & Alerts</h4>
              <p style={{color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6'}}>Integrates directly with hospital hardware to stream real-time patient vitals globally, automatically triggering high-risk alerts.</p>
            </div>
          </div>

          <div style={{flex: 1, minWidth: '280px', display: 'flex', gap: '1rem'}}>
            <div style={{width: '48px', height: '48px', minWidth: '48px', borderRadius: '12px', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <div>
              <h4 style={{fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem'}}>Digital Prescriptions</h4>
              <p style={{color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6'}}>Fast, secure electronic prescribing with automated pharmacy routing and immediate patient notification.</p>
            </div>
          </div>

          <div style={{flex: 1, minWidth: '280px', display: 'flex', gap: '1rem'}}>
            <div style={{width: '48px', height: '48px', minWidth: '48px', borderRadius: '12px', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
            </div>
            <div>
              <h4 style={{fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem'}}>Predictive Analytics</h4>
              <p style={{color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6'}}>Advanced ward capacity modeling and resource tracking helps prevent operational bottlenecks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{marginTop: 'auto', background: '#0f172a', padding: '2.5rem', textAlign: 'center'}}>
        <p style={{color: '#64748b', fontSize: '0.85rem', margin: 0}}>
          © 2026 SmartHealth Monitor Systems. Secured access only.
        </p>
      </footer>
    </div>
  );
}
