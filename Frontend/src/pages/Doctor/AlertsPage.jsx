import React from 'react';
import { AlertTriangle, Info, Bell, Trash2, CheckCircle2 } from 'lucide-react';

const mockAlerts = [
  { id: 1, type: "CRITICAL", title: "Abnormal Vitals Detected", description: "Patient bob has reported high blood pressure readings (160/100).", time: "10 mins ago", isRead: false },
  { id: 2, type: "WARNING", title: "Appointment Cancelled", description: "Patient Diana Prince cancelled their session.", time: "2 hours ago", isRead: false },
  { id: 3, type: "INFO", title: "System Update", description: "The health monitor AI engine was updated to v2.1.", time: "1 day ago", isRead: true },
];

const AlertsPage = () => {
  return (
    <>
      <div className="card-header-flex">
        <h2 className="section-title">Diagnostic & System Alerts</h2>
        <div className="filter-group">
          <button className="btn btn-outline btn-sm"><CheckCircle2 size={16}/> Mark all as read</button>
          <button className="btn btn-outline btn-sm" style={{color: 'var(--danger)', borderColor: 'var(--danger-light)'}}><Trash2 size={16}/> Clear read</button>
        </div>
      </div>

      <div className="grid grid-2">
        {mockAlerts.map(alert => (
          <div key={alert.id} className="card" style={{opacity: alert.isRead ? 0.7 : 1, borderLeft: !alert.isRead ? '3px solid var(--primary)' : ''}}>
            <div className="card-header" style={{margin: 0}}>
              <div style={{display: 'flex', gap: '0.75rem', alignItems: 'center'}}>
                {alert.type === 'CRITICAL' && <AlertTriangle className="feature-icon" style={{color: 'var(--danger)'}}/>}
                {alert.type === 'WARNING' && <Bell className="feature-icon" style={{color: 'var(--warning)'}}/>}
                {alert.type === 'INFO' && <Info className="feature-icon" style={{color: 'var(--primary)'}}/>}
                <div>
                  <div className="card-title">{alert.title}</div>
                  <div className="muted">{alert.time}</div>
                </div>
              </div>
              {!alert.isRead && <span className="chip-danger text-xs">New</span>}
            </div>
            <div className="mt-3 insight-text">
              {alert.description}
            </div>
            <div className="mt-3 flex" style={{justifyContent: 'flex-end'}}>
               {!alert.isRead && <button className="btn btn-outline btn-sm">Mark Read</button>}
            </div>
          </div>
        ))}
        {mockAlerts.length === 0 && (
          <div className="muted" style={{padding: '3rem', textAlign: 'center', gridColumn: 'span 2'}}>
             You're all caught up! No active alerts.
          </div>
        )}
      </div>
    </>
  );
};

export default AlertsPage;
