import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AnalyzePage from './pages/AnalyzePage';
import CustomizePage from './pages/CustomizePage';
import ProfilePage from './pages/ProfilePage';
import JobRolesPage from './pages/JobRolesPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import JobRolesManagement from './pages/admin/JobRolesManagement';
import UsersManagement from './pages/admin/UsersManagement';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import AdminResumes from './pages/admin/AdminResumes';
import AdminSettings from './pages/admin/AdminSettings';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="job-roles" element={<JobRolesPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="analyze" element={<AnalyzePage />} />
              <Route path="customize" element={<CustomizePage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/job-roles" element={<JobRolesManagement />} />
              <Route path="admin/users" element={<UsersManagement />} />
              <Route path="admin/analytics" element={<AnalyticsPage />} />
              <Route path="admin/resumes" element={<AdminResumes />} />
              <Route path="admin/settings" element={<AdminSettings />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;