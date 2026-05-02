import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';
import GuestHeader from '../components/GuestHeader';
import GuestFooter from '../components/GuestFooter';

const Landing = () => {
  const features = [
    { icon: 'bi-heart-pulse', title: 'Cardiology', description: 'Advanced heart care with leading specialists.' },
    { icon: 'bi-brain', title: 'Neurology', description: 'Comprehensive neurological treatments.' },
    { icon: 'bi-bandaid', title: 'Pediatrics', description: 'Specialized care for infants and children.' },
    { icon: 'bi-lungs', title: 'Pulmonology', description: 'Expert respiratory and lung treatments.' },
    { icon: 'bi-eye', title: 'Ophthalmology', description: 'State-of-the-art eye care services.' },
    { icon: 'bi-capsule', title: 'Pharmacy', description: 'In-house pharmacy available 24/7.' }
  ];

  return (
    <div className="landing-page">
      <GuestHeader />
      {/* Hero Section */}
      <section id="home" className="min-vh-100 d-flex align-items-center position-relative overflow-hidden pt-15 pb-10" style={{ background: "linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 51, 102, 0.6)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop') center/cover no-repeat fixed" }}>
        <div className="container position-relative z-1">
          <div className="row align-items-center gy-5 pt-5">
            <div className="col-lg-8 text-center text-lg-start animate__animated animate__fadeInLeft">
              <span className="badge bg-light text-primary px-3 py-2 rounded-pill mb-4 fw-bold letter-spacing-1 shadow-sm">
                <i className="bi bi-hospital me-2"></i>PREMIER HEALTHCARE FACILITY
              </span>
              <h1 className="display-2 fw-bolder text-white mb-4 lh-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                Exceptional Care,<br />Close to <span className="text-info">Home.</span>
              </h1>
              <p className="lead text-white-50 mb-5 fs-4 pr-lg-5">
                Welcome to Smart Health Hospital, where advanced medical technology meets compassionate patient care. Experience world-class healthcare tailored to your needs.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                <Link to="/auth/patient/register" className="btn btn-info btn-lg rounded-pill px-5 py-3 shadow-lg hover-up text-white fw-bold border-0">
                  <i className="bi bi-calendar-plus me-2"></i>Book Appointment
                </Link>
                <a href="#about" className="btn btn-outline-light btn-lg rounded-pill px-5 py-3 hover-up fw-bold border-2">
                  Learn More <i className="bi bi-arrow-down-circle ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Wave Shape Divider */}
        <div className="position-absolute bottom-0 w-100" style={{ lineHeight: 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '60px', width: '100%', fill: '#f8fafc' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C89.71,67.6,211.2,74.32,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Quick Actions Box */}
      <div className="container position-relative z-2" style={{ marginTop: '-80px' }}>
        <div className="row bg-white rounded-4 shadow-xl p-4 g-4 text-center mx-2 mx-md-0">
          <div className="col-md-3 border-end-md border-light-subtle action-item">
            <div className="text-primary mb-3"><i className="bi bi-telephone text-primary fs-1"></i></div>
            <h5 className="fw-bold text-dark">Emergency Cases</h5>
            <p className="text-muted mb-0 small">1-800-SMART-HEALTH</p>
          </div>
          <div className="col-md-3 border-end-md border-light-subtle action-item">
            <div className="text-info mb-3"><i className="bi bi-clock text-info fs-1"></i></div>
            <h5 className="fw-bold text-dark">Working Hours</h5>
            <p className="text-muted mb-0 small">24/7 Available Hours</p>
          </div>
          <div className="col-md-3 border-end-md border-light-subtle action-item">
            <div className="text-success mb-3"><i className="bi bi-geo-alt text-success fs-1"></i></div>
            <h5 className="fw-bold text-dark">Clinic Location</h5>
            <p className="text-muted mb-0 small">123 MedCity Avenue</p>
          </div>
          <div className="col-md-3 action-item">
            <div className="text-danger mb-3"><i className="bi bi-heart-pulse text-danger fs-1"></i></div>
            <h5 className="fw-bold text-dark">Blood Bank</h5>
            <p className="text-muted mb-0 small">Available 24/7</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-light">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6 position-relative px-4 mb-5 mb-lg-0">
              <div className="position-absolute top-0 start-0 translate-middle bg-info rounded-circle opacity-25" style={{ width: '250px', height: '250px', filter: 'blur(50px)' }}></div>
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop" alt="Hospital Care Team" className="img-fluid rounded-4 shadow-lg position-relative z-1 w-100" style={{ objectFit: 'cover', height: '500px' }} />
              <div className="position-absolute bottom-0 end-0 bg-white p-4 rounded-4 shadow-lg z-2 m-4 m-md-5 animate__animated animate__bounceIn d-flex align-items-center gap-3 border border-light" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-primary fw-bolder mb-0 display-4">25<span className="text-info">+</span></h3>
                <div className="border-start border-2 border-light ps-3">
                  <p className="text-muted mb-0 fw-bold small text-uppercase tracking-wider">Years of</p>
                  <p className="text-dark mb-0 fw-bold fs-6 tracking-wider">Excellence</p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 ps-lg-5 z-2">
              <h6 className="text-info fw-bold text-uppercase tracking-wider mb-2">About Our Hospital</h6>
              <h2 className="display-5 fw-bolder mb-4 text-dark">Dedicated to Providing the <span className="text-primary">Best Healthcare</span></h2>
              <p className="text-secondary fs-5 mb-5 lh-relaxed">
                Smart Health Hospital is a premier medical institution committed to delivering exceptional patient care. Our state-of-the-art facilities and dedicated team of specialists ensure you receive the highest standard of medical treatment in a compassionate environment.
              </p>
              
              <div className="d-flex align-items-center gap-4 mb-3 p-3 px-4 bg-white rounded-4 shadow-sm transition hover-up hover-shadow-xl border-0" style={{ borderLeft: '4px solid var(--bs-info) !important' }}>
                <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-check-lg fs-4"></i>
                </div>
                <span className="fs-5 fw-bold text-dark">Advanced Medical Technologies</span>
              </div>
              
              <div className="d-flex align-items-center gap-4 mb-3 p-3 px-4 bg-white rounded-4 shadow-sm transition hover-up hover-shadow-xl border-0" style={{ borderLeft: '4px solid var(--bs-info) !important' }}>
                <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-check-lg fs-4"></i>
                </div>
                <span className="fs-5 fw-bold text-dark">Highly Qualified Medical Professionals</span>
              </div>
              
              <div className="d-flex align-items-center gap-4 mb-5 p-3 px-4 bg-white rounded-4 shadow-sm transition hover-up hover-shadow-xl border-0" style={{ borderLeft: '4px solid var(--bs-info) !important' }}>
                <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                  <i className="bi bi-check-lg fs-4"></i>
                </div>
                <span className="fs-5 fw-bold text-dark">Comprehensive Emergency Care 24/7</span>
              </div>
              
              <Link to="/auth/patient/register" className="btn btn-primary btn-lg rounded-pill px-5 py-3 hover-up shadow-sm">Meet Our Specialists</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-15">
            <h6 className="text-info fw-bold text-uppercase tracking-wider mb-2">Our Specialties</h6>
            <h2 className="display-5 fw-bolder mb-3 text-dark">Centers of <span className="text-primary">Excellence</span></h2>
            <p className="text-secondary fs-5 w-75 mx-auto">We offer a wide range of specialized medical services powered by advanced technology and leading experts.</p>
          </div>
          
          <div className="row gy-4">
            {features.map((feature, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 animate__animated animate__fadeInUp">
                <div className="card h-100 border-0 shadow-sm p-4 transition hover-up hover-shadow-xl rounded-4 text-center service-card" style={{ borderBottom: '4px solid transparent !important' }}>
                  <div className="rounded-circle bg-light d-inline-flex p-4 mb-4 text-primary mx-auto icon-wrapper transition">
                    <i className={`bi ${feature.icon} fs-1`}></i>
                  </div>
                  <h4 className="fw-bold text-dark mb-3">{feature.title}</h4>
                  <p className="text-secondary mb-0 lh-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Portals Section */}
      <section id="panels" className="py-20 bg-light position-relative">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)', opacity: 0.4 }}></div>
        <div className="container position-relative z-1">
          <div className="text-center mb-12">
            <h6 className="text-info fw-bold text-uppercase tracking-wider mb-2">Hospital Network</h6>
            <h2 className="display-5 fw-bolder mb-3 text-dark">Access Your <span className="text-primary">Medical Portals</span></h2>
            <p className="text-secondary fs-5">Secure access points for our patients and dedicated healthcare providers.</p>
          </div>
          
          <div className="row g-4 justify-content-center">
            {/* Patient Module */}
            <div className="col-xl-4 col-md-6 animate__animated animate__fadeInUp">
              <Link to="/auth/patient/login" className="text-decoration-none">
                <div className="card border-0 shadow-sm rounded-4 h-100 hover-up portal-mini-card p-4 d-flex flex-row align-items-center bg-white border-start border-4 border-info">
                  <div className="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-person fs-3"></i>
                  </div>
                  <div className="ms-4">
                    <h5 className="fw-bold text-dark mb-1">Patient Portal</h5>
                    <p className="text-muted small mb-0 lh-tight">Lab results, appointments, & history.</p>
                  </div>
                  <div className="ms-auto text-info opacity-50 icon-arrow transition">
                    <i className="bi bi-chevron-right fs-4"></i>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Doctor Module */}
            <div className="col-xl-4 col-md-6 animate__animated animate__fadeInUp" style={{ animationDelay: '0.1s' }}>
              <Link to="/auth/doctor/login" className="text-decoration-none">
                <div className="card border-0 shadow-sm rounded-4 h-100 hover-up portal-mini-card p-4 d-flex flex-row align-items-center bg-white border-start border-4 border-primary">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-person-badge fs-3"></i>
                  </div>
                  <div className="ms-4">
                    <h5 className="fw-bold text-dark mb-1">Doctor Portal</h5>
                    <p className="text-muted small mb-0 lh-tight">Manage schedules, charts, & Rx.</p>
                  </div>
                  <div className="ms-auto text-primary opacity-50 icon-arrow transition">
                    <i className="bi bi-chevron-right fs-4"></i>
                  </div>
                </div>
              </Link>
            </div>

            {/* Reception Module */}
            <div className="col-xl-4 col-md-6 animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
              <Link to="/auth/reception/login" className="text-decoration-none">
                <div className="card border-0 shadow-sm rounded-4 h-100 hover-up portal-mini-card p-4 d-flex flex-row align-items-center bg-white border-start border-4 border-warning">
                  <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-person-video2 fs-3"></i>
                  </div>
                  <div className="ms-4">
                    <h5 className="fw-bold text-dark mb-1">Reception Desk</h5>
                    <p className="text-muted small mb-0 lh-tight">Patient intake & bed admissions.</p>
                  </div>
                  <div className="ms-auto text-warning opacity-50 icon-arrow transition">
                    <i className="bi bi-chevron-right fs-4"></i>
                  </div>
                </div>
              </Link>
            </div>

             {/* Medical Staff Module */}
            <div className="col-xl-4 col-md-6 animate__animated animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
              <Link to="/auth/medical/login" className="text-decoration-none">
                <div className="card border-0 shadow-sm rounded-4 h-100 hover-up portal-mini-card p-4 d-flex flex-row align-items-center bg-white border-start border-4 border-success">
                  <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-capsule fs-3"></i>
                  </div>
                  <div className="ms-4">
                    <h5 className="fw-bold text-dark mb-1">Medical Services</h5>
                    <p className="text-muted small mb-0 lh-tight">Lab controls & hospital pharmacy.</p>
                  </div>
                  <div className="ms-auto text-success opacity-50 icon-arrow transition">
                    <i className="bi bi-chevron-right fs-4"></i>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Lab Staff Module */}
            <div className="col-xl-4 col-md-6 animate__animated animate__fadeInUp" style={{ animationDelay: '0.35s' }}>
              <Link to="/auth/lab/login" className="text-decoration-none">
                <div className="card border-0 shadow-sm rounded-4 h-100 hover-up portal-mini-card p-4 d-flex flex-row align-items-center bg-white border-start border-4 border-danger">
                  <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-droplet-half fs-3"></i>
                  </div>
                  <div className="ms-4">
                    <h5 className="fw-bold text-dark mb-1">Lab Portal</h5>
                    <p className="text-muted small mb-0 lh-tight">Diagnostics, tests & lab reports.</p>
                  </div>
                  <div className="ms-auto text-danger opacity-50 icon-arrow transition">
                    <i className="bi bi-chevron-right fs-4"></i>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Admin Module */}
            <div className="col-xl-4 col-md-6 animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link to="/auth/admin/login" className="text-decoration-none">
                <div className="card border-0 shadow-sm rounded-4 h-100 hover-up portal-mini-card p-4 d-flex flex-row align-items-center bg-white border-start border-4 border-dark">
                  <div className="bg-dark bg-opacity-10 text-dark rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-shield-check fs-3"></i>
                  </div>
                  <div className="ms-4">
                    <h5 className="fw-bold text-dark mb-1">IT & Admin</h5>
                    <p className="text-muted small mb-0 lh-tight">Infrastructure & security roles.</p>
                  </div>
                  <div className="ms-auto text-dark opacity-50 icon-arrow transition">
                    <i className="bi bi-chevron-right fs-4"></i>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <GuestFooter />
    </div>
  );
};

export default Landing;
