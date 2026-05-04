import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PatientLayout from './components/PatientLayout';
import DoctorLayout from './components/DoctorLayout';
import ReceptionLayout from './components/ReceptionLayout';
import MedicalLayout from './components/MedicalLayout';

// Public Pages
import Landing from './pages/Landing';

import ReceptionBedManagement from './pages/Reception/BedManagement';
import ReceptionDepartmentBeds from './pages/Reception/DepartmentBeds';

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
import AdminReportView from './pages/admin/AdminReportView';
import FeedbackList from './pages/admin/FeedbackList';
import FeedbackReply from './pages/admin/FeedbackReply';
import Messaging from './pages/admin/Messaging';
import Reviews from './pages/admin/Reviews';
import SiteContent from './pages/admin/SiteContent';
import StaffManagement from './pages/admin/StaffManagement';
import ViewDepartment from './pages/admin/ViewDepartment';
import AddStaff from './pages/admin/AddStaff';

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
import LabRequestsPage from './pages/Doctor/LabRequestsPage';
import PendingApprovalPage from './pages/Doctor/PendingApprovalPage';
import ReportListPage from './pages/Doctor/ReportListPage';
import UploadReportPage from './pages/Doctor/UploadReportPage';
import PrescriptionDetailPage from './pages/Doctor/PrescriptionDetailPage';

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
import ForgotPassword from './pages/Auth/Common/ForgotPassword';
import VerifyOTP from './pages/Auth/Common/VerifyOTP';
import ResetPassword from './pages/Auth/Common/ResetPassword';

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
import MedicalPrescriptions from './pages/Medical/Prescriptions';
import MedicalPrescriptionDetail from './pages/Medical/PrescriptionDetail';
import MedicalLogin from './pages/Auth/medical/Login';

// Lab Panel Components
import LabLayout from './components/LabLayout';
import LabDashboard from './pages/Lab/Dashboard';
import LabUploadReport from './pages/Lab/UploadReport';
import LabHistory from './pages/Lab/History';
import LabTests from './pages/Lab/Tests';
import AddTest from './pages/Lab/AddTest';
import LabSettings from './pages/Lab/Settings';
import LabLogin from './pages/Auth/lab/Login';

// Styles
import './styles/admin.css';
import './styles/patient.css';
import './styles/doctor.css';

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
        <Route path="/admin/reports/:id" element={<AdminReportView />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/departments/configure" element={<AdminConfigureDepartment />} />
        <Route path="/admin/departments/:id" element={<ViewDepartment />} />
        <Route path="/admin/staff" element={<StaffManagement />} />
        <Route path="/admin/staff/add" element={<AddStaff />} />
        <Route path="/admin/receptionists" element={<StaffManagement role="RECEPTIONIST" />} />
        <Route path="/admin/medical-staff" element={<StaffManagement role="MEDICAL_STAFF" />} />
        <Route path="/admin/lab-staff" element={<StaffManagement role="LAB_STAFF" />} />
        <Route path="/admin/feedback" element={<FeedbackList />} />
        <Route path="/admin/feedback/:id/reply" element={<FeedbackReply />} />
        <Route path="/admin/messaging" element={<Messaging />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        <Route path="/admin/site-content" element={<SiteContent />} />
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
          <Route path="reports" element={<ReportListPage />} />
          <Route path="reports/upload" element={<UploadReportPage />} />
          <Route path="lab-requests" element={<LabRequestsPage />} />
          <Route path="pending-approval" element={<PendingApprovalPage />} />
          <Route path="prescriptions/:id" element={<PrescriptionDetailPage />} />
        </Route>

        {/* Patient Routes */}
        <Route path="/auth/patient/login" element={<PatientLogin />} />
        <Route path="/auth/patient/register" element={<PatientRegister />} />
        
        {/* Common Auth Routes for Password Reset */}
        <Route path="/auth/forgot" element={<ForgotPassword />} />
        <Route path="/auth/verify-otp" element={<VerifyOTP />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
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
          <Route path="beds" element={<ReceptionBedManagement />} />
          <Route path="beds/department/:id" element={<ReceptionDepartmentBeds />} />
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
          <Route path="prescriptions" element={<MedicalPrescriptions />} />
          <Route path="prescriptions/:id" element={<MedicalPrescriptionDetail />} />
        </Route>

        {/* Lab Panel Routes */}
        <Route path="/auth/lab/login" element={<LabLogin />} />
        <Route path="/lab" element={<LabLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<LabDashboard />} />
          <Route path="upload-report" element={<LabUploadReport />} />
          <Route path="history" element={<LabHistory />} />
          <Route path="tests" element={<LabTests />} />
          <Route path="tests/add" element={<AddTest />} />
          <Route path="settings" element={<LabSettings />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
