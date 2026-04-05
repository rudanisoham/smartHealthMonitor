import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DoctorLayout from './components/DoctorLayout';
import LoginPage from './pages/Auth/Doctor/LoginPage';
import RegisterPage from './pages/Auth/Doctor/RegisterPage';
import DashboardPage from './pages/Doctor/DashboardPage';
import PatientsListPage from './pages/Doctor/PatientsListPage';
import PatientDetailsPage from './pages/Doctor/PatientDetailsPage';
import AppointmentsPage from './pages/Doctor/AppointmentsPage';
import PrescriptionsPage from './pages/Doctor/PrescriptionsPage';
import AlertsPage from './pages/Doctor/AlertsPage';
import ProfilePage from './pages/Doctor/ProfilePage';
import SettingsPage from './pages/Doctor/SettingsPage';
import AddDiagnosisPage from './pages/Doctor/AddDiagnosisPage';
import ReportViewPage from './pages/Doctor/ReportViewPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route path="/auth/doctor/login" element={<LoginPage />} />
        <Route path="/auth/doctor/register" element={<RegisterPage />} />

        {/* Doctor Panel Routes wrapped in Layout */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="patients" element={<PatientsListPage />} />
          <Route path="patients/:id" element={<PatientDetailsPage />} />
          <Route path="patients/:id/add-diagnosis" element={<AddDiagnosisPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="prescriptions" element={<PrescriptionsPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="report-view" element={<ReportViewPage />} />
        </Route>

        {/* Catch-all route to login page */}
        <Route path="*" element={<Navigate to="/auth/doctor/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
