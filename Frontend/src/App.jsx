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
import './styles/admin.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/doctors" element={<Doctors />} />
        <Route path="/admin/patients" element={<Patients />} />
        <Route path="/admin/departments" element={<Departments />} />
        <Route path="/admin/logs" element={<SystemLogs />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/departments/configure" element={<ConfigureDepartment />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App;
