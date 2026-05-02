import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PatientLayout from './components/PatientLayout';
import DoctorLayout from './components/DoctorLayout';
import ReceptionLayout from './components/ReceptionLayout';
import MedicalLayout from './components/MedicalLayout';

// Public Pages
import Landing from './pages/Landing';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminDoctors from './pages/admin/Doctors';
import AdminPatients from './pages/admin/Patients';
import AdminDepartments from './pages/admin/Departments';
import AdminSystemLogs from './pages/admin/SystemLogs';
import AdminAnalytics from './pages/admin/Analytics';
import AdminConfigureDepartment from './pages/admin/ConfigureDepartment';
import AdminSettings from './pages/admin/Settings';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPendingDoctors from './pages/admin/PendingDoctors';
import AdminRegisterDoctor from './pages/admin/RegisterDoctor';
import AdminPatientProfile from './pages/admin/PatientProfile';
import AdminRegisterPatient from './pages/admin/RegisterPatient';
import AdminAddDepartment from './pages/admin/AddDepartment';
import AdminReports from './pages/admin/Reports';

// Doctor Pages
import DoctorLoginPage from './pages/Auth/Doctor/LoginPage';
import DoctorRegisterPage from './pages/Auth/Doctor/RegisterPage';
import DoctorDashboardPage from './pages/Doctor/DashboardPage';
import DoctorPatientsListPage from './pages/Doctor/PatientsListPage';
import DoctorPatientDetailsPage from './pages/Doctor/PatientDetailsPage';
import DoctorAppointmentsPage from './pages/Doctor/AppointmentsPage';
import DoctorPrescriptionsPage from './pages/Doctor/PrescriptionsPage';
import DoctorAlertsPage from './pages/Doctor/AlertsPage';
import DoctorProfilePage from './pages/Doctor/ProfilePage';
import DoctorSettingsPage from './pages/Doctor/SettingsPage';
import DoctorAddDiagnosisPage from './pages/Doctor/AddDiagnosisPage';
import DoctorReportViewPage from './pages/Doctor/ReportViewPage';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import PatientHealthData from './pages/patient/HealthData';
import PatientAnalytics from './pages/patient/Analytics';
import PatientAIChecker from './pages/patient/AIChecker';
import PatientAppointments from './pages/patient/Appointments';
import PatientPrescriptions from './pages/patient/Prescriptions';
import PatientReports from './pages/patient/Reports';
import PatientNotifications from './pages/patient/Notifications';
import PatientProfile from './pages/patient/Profile';
import PatientBilling from './pages/patient/Billing';
import PatientReminders from './pages/patient/Reminders';
import PatientSettings from './pages/patient/Settings';
import PatientDoctorProfile from './pages/patient/DoctorProfile';
import PatientWriteReview from './pages/patient/WriteReview';
import PatientPrescriptionDetail from './pages/patient/PrescriptionDetail';
import PatientReportDetail from './pages/patient/ReportDetail';
import PatientLogin from './pages/Auth/patient/Login';
import PatientRegister from './pages/Auth/patient/Register';
import PatientResetPassword from './pages/Auth/patient/ResetPassword';
import PatientVerifyOTP from './pages/Auth/patient/VerifyOTP';
import PatientSetNewPassword from './pages/Auth/patient/SetNewPassword';

// Reception Pages
import ReceptionDashboard from './pages/Reception/Dashboard';
import ReceptionPatients from './pages/Reception/Patients';
import ReceptionPatientEntry from './pages/Reception/PatientEntry';
import ReceptionAppointments from './pages/Reception/Appointments';
import ReceptionBeds from './pages/Reception/BedManagement';
import ReceptionBilling from './pages/Reception/Billing';
import ReceptionSettings from './pages/Reception/Settings';
import AssignAppointment from './pages/Reception/AssignAppointment';
import ReceptionLogin from './pages/Auth/reception/Login';
import MedicalDashboard from './pages/Medical/Dashboard';
import MedicalInventory from './pages/Medical/Inventory';
import MedicalAddMedicine from './pages/Medical/AddMedicine';
import MedicalPatientSearch from './pages/Medical/PatientSearch';
import MedicalUploadReport from './pages/Medical/UploadReport';
import MedicalReports from './pages/Medical/Reports';
import MedicalLogin from './pages/Auth/medical/Login';

// Styles
import './styles/admin.css';
import './styles/patient.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Admin Routes */}
        <Route path="/auth/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/doctors" element={<AdminDoctors />} />
        <Route path="/admin/doctors/requests" element={<AdminPendingDoctors />} />
        <Route path="/admin/doctors/add" element={<AdminRegisterDoctor />} />
        <Route path="/admin/patients" element={<AdminPatients />} />
        <Route path="/admin/patients/add" element={<AdminRegisterPatient />} />
        <Route path="/admin/patients/:id/view" element={<AdminPatientProfile />} />
        <Route path="/admin/departments" element={<AdminDepartments />} />
        <Route path="/admin/departments/add" element={<AdminAddDepartment />} />
        <Route path="/admin/logs" element={<AdminSystemLogs />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/departments/configure" element={<AdminConfigureDepartment />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        {/* Doctor Routes */}
        <Route path="/auth/doctor/login" element={<DoctorLoginPage />} />
        <Route path="/auth/doctor/register" element={<DoctorRegisterPage />} />
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboardPage />} />
          <Route path="patients" element={<DoctorPatientsListPage />} />
          <Route path="patients/:id" element={<DoctorPatientDetailsPage />} />
          <Route path="patients/:id/add-diagnosis" element={<DoctorAddDiagnosisPage />} />
          <Route path="appointments" element={<DoctorAppointmentsPage />} />
          <Route path="prescriptions" element={<DoctorPrescriptionsPage />} />
          <Route path="alerts" element={<DoctorAlertsPage />} />
          <Route path="profile" element={<DoctorProfilePage />} />
          <Route path="settings" element={<DoctorSettingsPage />} />
          <Route path="report-view" element={<DoctorReportViewPage />} />
        </Route>

        {/* Patient Routes */}
        <Route path="/auth/patient/login" element={<PatientLogin />} />
        <Route path="/auth/patient/register" element={<PatientRegister />} />
        <Route path="/auth/patient/reset-password" element={<PatientResetPassword />} />
        <Route path="/auth/patient/verify-otp" element={<PatientVerifyOTP />} />
        <Route path="/auth/patient/set-new-password" element={<PatientSetNewPassword />} />
        <Route path="/patient" element={<PatientLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="health-data" element={<PatientHealthData />} />
          <Route path="analytics" element={<PatientAnalytics />} />
          <Route path="ai-checker" element={<PatientAIChecker />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
          <Route path="reports" element={<PatientReports />} />
          <Route path="notifications" element={<PatientNotifications />} />
          <Route path="profile" element={<PatientProfile />} />
          <Route path="billing" element={<PatientBilling />} />
          <Route path="reminders" element={<PatientReminders />} />
          <Route path="settings" element={<PatientSettings />} />
          <Route path="doctor-profile/:id" element={<PatientDoctorProfile />} />
          <Route path="write-review/:appointmentId" element={<PatientWriteReview />} />
          <Route path="prescription-detail/:id" element={<PatientPrescriptionDetail />} />
          <Route path="report-detail/:id" element={<PatientReportDetail />} />
        </Route>

        {/* Reception Routes */}
        <Route path="/auth/reception/login" element={<ReceptionLogin />} />
        <Route path="/reception" element={<ReceptionLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ReceptionDashboard />} />
          <Route path="patients" element={<ReceptionPatients />} />
          <Route path="patient-entry" element={<ReceptionPatientEntry />} />
          <Route path="appointments" element={<ReceptionAppointments />} />
          <Route path="appointments/:id/assign" element={<AssignAppointment />} />
          <Route path="beds" element={<ReceptionBeds />} />
          <Route path="billing" element={<ReceptionBilling />} />
          <Route path="settings" element={<ReceptionSettings />} />
        </Route>

        {/* Medical Routes */}
        <Route path="/auth/medical/login" element={<MedicalLogin />} />
        <Route path="/medical" element={<MedicalLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<MedicalDashboard />} />
          <Route path="inventory" element={<MedicalInventory />} />
          <Route path="inventory/add" element={<MedicalAddMedicine />} />
          <Route path="patient-search" element={<MedicalPatientSearch />} />
          <Route path="upload-report" element={<MedicalUploadReport />} />
          <Route path="reports" element={<MedicalReports />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
