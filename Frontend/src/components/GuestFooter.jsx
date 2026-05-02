import React from 'react';
import { Link } from 'react-router-dom';

const GuestFooter = () => {
    return (
        <footer className="bg-dark text-white py-5 mt-auto" style={{ backgroundColor: '#002b49' }}>
            <div className="container text-center text-md-start">
                <div className="row gy-4 mb-4">
                    <div className="col-lg-4 col-md-6 pe-lg-5">
                        <h4 className="fw-bold text-white mb-3 d-flex align-items-center justify-content-center justify-content-md-start">
                            <i className="bi bi-hospital fs-3 text-info me-2"></i> Smart Health
                        </h4>
                        <p className="text-white-50 lh-relaxed mb-4">
                            Delivering excellence in healthcare with advanced medical monitoring and compassionate care across our integrated network.
                        </p>
                        <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                            <a href="#" className="btn btn-outline-light btn-sm fs-5 rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-facebook"></i></a>
                            <a href="#" className="btn btn-outline-light btn-sm fs-5 rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-twitter-x"></i></a>
                            <a href="#" className="btn btn-outline-light btn-sm fs-5 rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-linkedin"></i></a>
                            <a href="#" className="btn btn-outline-light btn-sm fs-5 rounded-circle" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-instagram"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 mt-4 mt-lg-0">
                        <h5 className="fw-bold text-white mb-3 text-uppercase tracking-wider" style={{ fontSize: '0.9rem' }}>Quick Links</h5>
                        <ul className="list-unstyled text-white-50">
                            <li className="mb-2"><Link to="/" className="text-decoration-none text-white-50 hover-text-info transition">Home</Link></li>
                            <li className="mb-2"><a href="#about" className="text-decoration-none text-white-50 hover-text-info transition">About Us</a></li>
                            <li className="mb-2"><a href="#features" className="text-decoration-none text-white-50 hover-text-info transition">Departments</a></li>
                            <li className="mb-2"><a href="#panels" className="text-decoration-none text-white-50 hover-text-info transition">Network Portals</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
                        <h5 className="fw-bold text-white mb-3 text-uppercase tracking-wider" style={{ fontSize: '0.9rem' }}>Our Services</h5>
                        <ul className="list-unstyled text-white-50">
                            <li className="mb-2"><Link to="/auth/patient/login" className="text-decoration-none text-white-50 hover-text-info transition">Patient Portal Login</Link></li>
                            <li className="mb-2"><Link to="/auth/doctor/login" className="text-decoration-none text-white-50 hover-text-info transition">Doctor Console</Link></li>
                            <li className="mb-2"><Link to="/auth/patient/register" className="text-decoration-none text-white-50 hover-text-info transition">Book Appointment</Link></li>
                            <li className="mb-2"><a href="#" className="text-decoration-none text-white-50 hover-text-info transition">Emergency Care</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
                        <h5 className="fw-bold text-white mb-3 text-uppercase tracking-wider" style={{ fontSize: '0.9rem' }}>Contact Us</h5>
                        <ul className="list-unstyled text-white-50">
                            <li className="mb-3 d-flex align-items-start justify-content-center justify-content-md-start">
                                <i className="bi bi-geo-alt-fill me-3 text-info mt-1 fs-5"></i> 
                                <span className="text-start">123 MedCity Avenue, Health Tech Park, Mumbai, India</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center justify-content-center justify-content-md-start">
                                <i className="bi bi-telephone-fill me-3 text-info fs-5"></i> 
                                <span>+91-1800-SMART-HEALTH</span>
                            </li>
                            <li className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start">
                                <i className="bi bi-envelope-fill me-3 text-info fs-5"></i> 
                                <span>support@smarthealth.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="border-secondary opacity-25 my-4" />
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <small className="text-white-50 mb-2 mb-md-0">&copy; {new Date().getFullYear()} Smart Health Monitor. All Rights Reserved.</small>
                    <div className="text-white-50 small">
                        <a href="#" className="text-white-50 text-decoration-none me-3 hover-text-info">Privacy Policy</a>
                        <a href="#" className="text-white-50 text-decoration-none hover-text-info">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default GuestFooter;
