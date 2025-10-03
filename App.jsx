// frontend/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout    from "./components/layouts/PublicLayout.jsx";
import StudentLayout   from "./components/layouts/StudentLayout.jsx";
import StaffLayout     from "./components/layouts/StaffLayout.jsx";
import AdminLayout     from "./components/layouts/AdminLayout.jsx";
import RoleAwareLayout from "./components/layouts/RoleAwareLayout.jsx";

import WelcomeLanding from "./pages/WelcomeLanding.jsx";
import StudentLanding from "./pages/StudentLanding.jsx";
import StaffLanding   from "./pages/StaffLanding.jsx";
import AdminLanding   from "./pages/AdminLanding.jsx";
import RegisterPage   from "./pages/RegisterPage.jsx";
import RequestListPage from "./pages/RequestListPage.jsx";
import CombinedLandingPage from "./pages/CombinedLandingPage.jsx";
import CalendarPage           from "./pages/CalendarPage.jsx";
import LoginPage              from "./pages/LoginPage.jsx";
import PublicationRequestPage from "./pages/PublicationRequestPage.jsx";
import DepartmentPage         from "./pages/DepartmentPage.jsx";
import AdminUsersPage         from "./pages/AdminUsersPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<WelcomeLanding />} />
        <Route path="/combined" element={<CombinedLandingPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      {/* Student */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentLanding />} />
      </Route>

      {/* Staff */}
      <Route path="/staff" element={<StaffLayout />}>
        <Route index element={<StaffLanding />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminLanding />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>

      {/* Role-aware pages (navbar switches by persisted role) */}
      <Route element={<RoleAwareLayout />}>
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="staff/requests" element={<RequestListPage />} />  
        <Route path="admin/requests" element={<RequestListPage />} />   
        <Route path="staff/publish" element={<PublicationRequestPage />} />
        <Route path="admin/publish" element={<PublicationRequestPage />} />
        <Route path="departments/:slug" element={<DepartmentPage />} />
        {/* later: add other shared pages here to inherit the role navbar */}
      </Route>

      {/* Shared */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
