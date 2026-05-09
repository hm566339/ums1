import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./components/ui/Toast";
import { MainLayout } from "./layouts/MainLayout";

// Auth Pages
import { Login } from "./pages/auth/Login";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";

// Dashboard Pages
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Students } from "./pages/students/Students";
import { Faculty } from "./pages/faculty/Faculty";
import { Courses } from "./pages/courses/Courses";
import { Attendance } from "./pages/attendance/Attendance";
import { Exams } from "./pages/exams/Exams";
import { Fees } from "./pages/fees/Fees";
import { Notifications } from "./pages/notifications/Notifications";
import { StudentPortal } from "./pages/student-portal/StudentPortal";
import { FacultyPortal } from "./pages/faculty-portal/FacultyPortal";
import { Settings } from "./pages/settings/Settings";
import { Policy } from "./pages/policy/Policy";

function App() {
  // Check if user is authenticated (mock implementation)
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          {/* {isAuthenticated ? ( */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/fees" element={<Fees />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/student-portal" element={<StudentPortal />} />
              <Route path="/faculty-portal" element={<FacultyPortal />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/policies" element={<Policy />} />
            </Route>
          {/* ) : (
            <Route path="/*" element={<Navigate to="/login" replace />} />
          )} */}

          {/* Fallback */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
