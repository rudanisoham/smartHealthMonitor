import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css'; // Shared CSS

const GuestHeader = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollTo = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar navbar-expand-lg fixed-top navbar-glass ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <i className="bi bi-heart-pulse-fill me-2"></i>Smart Health
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="#home" onClick={(e) => handleScrollTo(e, 'home')}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about" onClick={(e) => handleScrollTo(e, 'about')}>About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#features" onClick={(e) => handleScrollTo(e, 'features')}>Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#panels" onClick={(e) => handleScrollTo(e, 'panels')}>Panels</a>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <div className="dropdown me-3">
                            <button className="btn btn-glass dropdown-toggle" type="button" id="loginDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-box-arrow-in-right me-1"></i>Login
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end glass-card border-0 p-2" aria-labelledby="loginDropdown">
                                <li><Link className="dropdown-item rounded" to="/auth/patient/login"><i className="bi bi-person me-2"></i>Patient Login</Link></li>
                                <li><Link className="dropdown-item rounded" to="/auth/doctor/login"><i className="bi bi-person-badge me-2"></i>Doctor Login</Link></li>
                                <li><Link className="dropdown-item rounded" to="/auth/admin/login"><i className="bi bi-shield-lock me-2"></i>Admin Login</Link></li>
                            </ul>
                        </div>
                        <Link to="/auth/patient/register" className="btn btn-primary rounded-pill px-4 shadow-sm">
                            <i className="bi bi-person-plus me-1"></i>Register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default GuestHeader;
