import React from 'react';

const LoginLayout = ({ children, kpi, features, title, appName }) => {
  return (
    <div className="login-page">
      <div className="login-card">
        {/* Left Side: Form Area */}
        <div className="login-main">
          <div className="login-badge">{appName}</div>
          {children}
        </div>

        {/* Right Side: Marketing/KPI Area */}
        <div className="login-extra">
          <div className="login-features">
             <div className="login-kpi">
               <h3 style={{color: 'white', marginBottom: '0.5rem', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '0.05em'}}>{title}</h3>
             </div>
            {features.map((feature, idx) => (
              <div key={idx} className="login-feature">
                <span className="feature-icon">{feature.icon}</span>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
          
           <div className="login-badge-secondary">
             <span className="icon" style={{marginRight: '8px', display: 'flex'}}>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
             </span>
             <span>Session encrypted</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
