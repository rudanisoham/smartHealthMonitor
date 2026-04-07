import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/admin/Dashboard';
import Doctors from './pages/admin/Doctors';
import Patients from './pages/admin/Patients';
import Departments from './pages/admin/Departments';
import SystemLogs from './pages/admin/SystemLogs';
import Analytics from './pages/admin/Analytics';
import ConfigureDepartment from './pages/admin/ConfigureDepartment';
import Settings from './pages/admin/Settings';
import AdminLogin from './pages/admin/AdminLogin';
import PendingDoctors from './pages/admin/PendingDoctors';
import RegisterDoctor from './pages/admin/RegisterDoctor';
import PatientProfile from './pages/admin/PatientProfile';
import RegisterPatient from './pages/admin/RegisterPatient';
import AddDepartment from './pages/admin/AddDepartment';
import Reports from './pages/admin/Reports';
import './styles/admin.css';
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
        <Route path="/" element={<Landing />} />
        <Route path="/auth/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/doctors" element={<Doctors />} />
        <Route path="/admin/doctors/requests" element={<PendingDoctors />} />
        <Route path="/admin/doctors/add" element={<RegisterDoctor />} />
        <Route path="/admin/patients" element={<Patients />} />
        <Route path="/admin/patients/add" element={<RegisterPatient />} />
        <Route path="/admin/patients/:id/view" element={<PatientProfile />} />
        <Route path="/admin/departments" element={<Departments />} />
        <Route path="/admin/departments/add" element={<AddDepartment />} />
        <Route path="/admin/logs" element={<SystemLogs />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/departments/configure" element={<ConfigureDepartment />} />
        <Route path="/admin/settings" element={<Settings />} />

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
