import React from 'react';
import { Menu } from 'lucide-react';
import '../../styles/Prescriptions.css';

const Prescriptions = () => {
    return (
        <div className="prescriptions-container">
            {/* Header */}
            <header className="page-header">
                <div className="header-title">
                    <button className="mobile-menu-btn">
                        <Menu size={20} />
                    </button>
                    <div>
                        <h1>Prescriptions</h1>
                        <p>View all your medicines and doctor instructions</p>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="status-badge">
                        <span className="dot"></span>
                        Signed in
                    </div>
                    <div className="profile-avatar">P</div>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="prescriptions-content">

                <div className="full-panel">
                    <div className="panel-header-flex">
                        <div>
                            <h2>Your Prescriptions</h2>
                            <p>All prescriptions issued by your doctors</p>
                        </div>
                        <div className="badge badge-gray-light">1 Total</div>
                    </div>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>DIAGNOSIS</th>
                                    <th>DOCTOR</th>
                                    <th>MEDICINES</th>
                                    <th>INSTRUCTIONS</th>
                                    <th>VALID UNTIL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium">2026-04-01</td>
                                    <td className="font-semibold">For fiver</td>
                                    <td>
                                        <div className="doctor-info-stack">
                                            <span className="doc-name">Dr. Renish</span>
                                            <span className="doc-spec">Neurology</span>
                                        </div>
                                    </td>
                                    <td>sfdsf,rdgf,fx,y</td>
                                    <td></td>
                                    <td>
                                        <span className="status-pill status-valid">2026-04-04</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Prescriptions;
