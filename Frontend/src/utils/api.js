import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const getMe = () => API.get('/auth/me');
export const updateDetails = (userData) => API.put('/auth/updatedetails', userData);
export const forgotPassword = (data) => API.post('/auth/forgotpassword', data);
export const verifyOtp = (data) => API.post('/auth/verifyotp', data);
export const resetPassword = (data) => API.put('/auth/resetpassword', data);

// Patient API
export const getPatients = () => API.get('/patients');
export const getPatient = (id) => API.get(`/patients/${id}`);
export const createPatient = (patientData) => API.post('/patients', patientData);
export const getPatientMe = () => API.get('/patients/me');
export const updatePatientMe = (data) => API.put('/patients/me', data);
export const getAvailableDoctors = () => API.get('/patients/doctors');
export const getDoctorById = (id) => API.get(`/patients/doctors/${id}`);
export const getMyPrescriptions = () => API.get('/patients/prescriptions');
export const getBillingData = () => API.get('/patients/billing');

// Appointment API
export const getAppointments = () => API.get('/appointments');
export const createAppointment = (data) => API.post('/appointments', data);

// Reports API
export const getReports = () => API.get('/reports');
export const getReport = (id) => API.get(`/reports/${id}`);
export const createReport = (data) => API.post('/reports', data);
export const updateReport = (id, data) => API.put(`/reports/${id}`, data);

// Vitals API
export const getVitals = () => API.get('/vitals');
export const createVital = (data) => API.post('/vitals', data);

// Doctor API
export const getDoctorDashboard = () => API.get('/doctors/dashboard');
export const getDoctorProfile = () => API.get('/doctors/profile');
export const updateDoctorProfile = (data) => API.put('/doctors/profile', data);
export const createDoctorProfile = (data) => API.post('/doctors', data);
export const getDoctorAppointments = () => API.get('/doctors/appointments');
export const getDoctorPatients = () => API.get('/doctors/patients');
export const getPatientDetails = (id) => API.get(`/doctors/patients/${id}`);
export const getDoctorPrescriptions = () => API.get('/doctors/prescriptions');
export const getPrescriptionById = (id) => API.get(`/doctors/prescriptions/${id}`);
export const createPrescription = (data) => API.post('/doctors/prescriptions', data);
export const getLabReports = () => API.get('/doctors/lab-reports');
export const updateLabReport = (id, data) => API.put(`/doctors/lab-reports/${id}`, data);

// Admin API
export const getAdminDashboard = () => API.get('/admin/dashboard');
export const getAdminDoctors = () => API.get('/admin/doctors');
export const getAdminPatients = () => API.get('/admin/patients');
export const getAdminPatientById = (id) => API.get(`/admin/patients/${id}`);
export const createAdminPatient = (data) => API.post('/admin/patients', data);
export const deleteAdminPatient = (id) => API.delete(`/admin/patients/${id}`);
export const addAdminStaff = (data) => API.post('/admin/staff', data);
export const getAdminStaff = (role) => API.get(`/admin/staff?role=${role}`);
export const getPendingDoctors = () => API.get('/admin/doctors/pending');
export const approveDoctor = (id) => API.put(`/admin/doctors/${id}/approve`);
export const deleteAdminStaff = (id) => API.delete(`/admin/staff/${id}`);
export const getAdminDepartments = () => API.get('/admin/departments');
export const getAdminDepartmentById = (id) => API.get(`/admin/departments/${id}`);
export const updateAdminDepartment = (id, data) => API.put(`/admin/departments/${id}`, data);
export const addAdminDepartment = (data) => API.post('/admin/departments', data);
export const deleteAdminDepartment = (id) => API.delete(`/admin/departments/${id}`);
export const getAdminReports = () => API.get('/admin/reports');
export const getAdminReportById = (id) => API.get(`/admin/reports/${id}`);
export const getAdminLogs = () => API.get('/admin/logs');
export const getAdminAnalytics = () => API.get('/admin/analytics');
export const getAdminFeedback = () => API.get('/admin/feedback');
export const getAdminFeedbackById = (id) => API.get(`/admin/feedback/${id}`);
export const replyAdminFeedback = (id, data) => API.put(`/admin/feedback/${id}/reply`, data);
export const getAdminSettings = () => API.get('/admin/settings');
export const updateAdminSettings = (data) => API.put('/admin/settings', data);
export const getAdminReviews = () => API.get('/admin/reviews');
export const getAdminMessages = () => API.get('/admin/messages');
export const getAdminBroadcasts = () => API.get('/admin/broadcast');
export const sendAdminBroadcast = (data) => API.post('/admin/broadcast', data);

// Reception API
export const getReceptionDashboard = () => API.get('/reception/dashboard');
export const getReceptionAppointments = () => API.get('/reception/appointments');
export const assignAppointment = (id, data) => API.put(`/reception/appointments/${id}/assign`, data);
export const cancelAppointment = (id) => API.put(`/reception/appointments/${id}/cancel`);
export const getReceptionPatients = () => API.get('/reception/patients');
export const updateReceptionPatient = (id, data) => API.put(`/reception/patients/${id}`, data);
export const deleteReceptionPatient = (id) => API.delete(`/reception/patients/${id}`);
export const getReceptionDoctors = () => API.get('/reception/doctors');
export const getReceptionBeds = () => API.get('/reception/beds');
export const getReceptionBilling = () => API.get('/reception/billing');

// Medical API
export const getMedicalDashboard = () => API.get('/medical/dashboard');
export const getMedicalInventory = () => API.get('/medical/inventory');
export const addMedicine = (data) => API.post('/medical/inventory', data);
export const deleteMedicine = (id) => API.delete(`/medical/inventory/${id}`);
export const getMedicalPrescriptions = () => API.get('/medical/prescriptions');
export const fulfillPrescription = (id) => API.put(`/medical/prescriptions/${id}/fulfill`);

// Lab API
export const getLabDashboard = () => API.get('/lab/dashboard');
export const getLabTests = () => API.get('/lab/tests');
export const createLabTest = (data) => API.post('/lab/tests', data);
export const getLabHistory = () => API.get('/lab/history');

export default API;
