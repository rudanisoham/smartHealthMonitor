import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PatientLayout from './components/PatientLayout';
import Dashboard from './pages/patient/Dashboard';
import HealthData from './pages/patient/HealthData';
import Analytics from './pages/patient/Analytics';
import AIChecker from './pages/patient/AIChecker';
import Appointments from './pages/patient/Appointments';
import Prescriptions from './pages/patient/Prescriptions';
import Reports from './pages/patient/Reports';
import Notifications from './pages/patient/Notifications';
import Profile from './pages/patient/Profile';
import Login from './pages/auth/patient/Login';
import Register from './pages/auth/patient/Register';
import ResetPassword from './pages/auth/patient/ResetPassword';
import VerifyOTP from './pages/auth/patient/VerifyOTP';
import SetNewPassword from './pages/auth/patient/SetNewPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/patient/dashboard" replace />} />

        {/* Auth Routes */}
        <Route path="/auth/patient/login" element={<Login />} />
        <Route path="/auth/patient/register" element={<Register />} />
        <Route path="/auth/patient/reset-password" element={<ResetPassword />} />
        <Route path="/auth/patient/verify-otp" element={<VerifyOTP />} />
        <Route path="/auth/patient/set-new-password" element={<SetNewPassword />} />

        {/* Patient Panel Routes */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="health-data" element={<HealthData />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai-checker" element={<AIChecker />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
