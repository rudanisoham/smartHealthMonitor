import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PatientLayout from './components/PatientLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Patient/Dashboard';
import HealthData from './pages/Patient/HealthData';
import Analytics from './pages/Patient/Analytics';
import AIChecker from './pages/Patient/AIChecker';
import Appointments from './pages/Patient/Appointments';
import Prescriptions from './pages/Patient/Prescriptions';
import Reports from './pages/Patient/Reports';
import Notifications from './pages/Patient/Notifications';
import Profile from './pages/Patient/Profile';
import Billing from './pages/Patient/Billing';
import Reminders from './pages/Patient/Reminders';
import Settings from './pages/Patient/Settings';
import DoctorProfile from './pages/Patient/DoctorProfile';
import WriteReview from './pages/Patient/WriteReview';
import PrescriptionDetail from './pages/Patient/PrescriptionDetail';
import ReportDetail from './pages/Patient/ReportDetail';
import Login from './pages/auth/patient/Login';
import Register from './pages/auth/patient/Register';
import ResetPassword from './pages/auth/patient/ResetPassword';
import VerifyOTP from './pages/auth/patient/VerifyOTP';
import SetNewPassword from './pages/auth/patient/SetNewPassword';
import './App.css';
import './styles/patient.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Auth Routes */}
        <Route path="/auth/patient/login" element={<Login />} />
        <Route path="/auth/patient/register" element={<Register />} />
        <Route path="/auth/patient/reset-password" element={<ResetPassword />} />
        <Route path="/auth/patient/verify-otp" element={<VerifyOTP />} />
        <Route path="/auth/patient/set-new-password" element={<SetNewPassword />} />

        {/* Patient Panel Routes */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="health-data" element={<HealthData />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai-checker" element={<AIChecker />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="billing" element={<Billing />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="settings" element={<Settings />} />
          <Route path="doctor-profile/:id" element={<DoctorProfile />} />
          <Route path="write-review/:appointmentId" element={<WriteReview />} />
          <Route path="prescription-detail/:id" element={<PrescriptionDetail />} />
          <Route path="report-detail/:id" element={<ReportDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
