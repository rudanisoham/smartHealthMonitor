import React from 'react';
import { Save, Info, Mail, Phone, MapPin, Globe } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const SiteContent = () => {
  return (
    <AdminLayout>
      <div className="section-header mb-4">
        <h1 className="section-title">Site Configuration</h1>
        <p className="section-subtitle">Manage project metadata, contact details and branding</p>
      </div>

      <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="card-header border-bottom pb-4 mb-4">
          <div>
            <h3 className="card-title">Site Branding & Content</h3>
            <p className="muted text-sm">Information displayed on landing page and patient portal</p>
          </div>
        </div>

        <form className="mt-4">
          <div className="form-group mb-4">
            <label className="form-label">Project Title</label>
            <input type="text" className="form-control" defaultValue="Smart Health Monitor" required />
          </div>
          
          <div className="form-group mb-4">
            <label className="form-label">Marketing Tagline</label>
            <input type="text" className="form-control" defaultValue="Advanced Digital Healthcare Management System" required />
          </div>

          <div className="form-group mb-4">
            <label className="form-label">About Description</label>
            <textarea className="form-control" rows="5" defaultValue="Smart Health Monitor is a comprehensive healthcare platform designed to bridge the gap between patients, doctors, and hospital administration. Our system provides real-time health tracking, automated reporting, and seamless communication." required></textarea>
            <small className="muted" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
              <Info size={12} /> A brief overview of the system for the landing page.
            </small>
          </div>

          <div className="grid grid-2 mb-4" style={{ gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Public Contact Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="email" className="form-control" style={{ paddingLeft: '40px' }} defaultValue="contact@smarthealth.com" required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Public Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" className="form-control" style={{ paddingLeft: '40px' }} defaultValue="+1 234 567 890" required />
              </div>
            </div>
          </div>

          <div className="form-group mb-5">
            <label className="form-label">Hospital Address</label>
            <div style={{ position: 'relative' }}>
              <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
              <textarea className="form-control" style={{ paddingLeft: '40px' }} rows="2" defaultValue="123 Healthcare Blvd, Medical District, NY 10001"></textarea>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem' }}>
              <Save size={18} /> Save System Changes
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SiteContent;
