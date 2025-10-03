import { useEffect } from "react";
import { setRole } from "../../utils/landing";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../navbars/AdminNavbar.jsx";
import Footer from "../Footer.jsx";

export default function AdminLayout() {
  useEffect(() => { setRole("admin"); }, []);
  return (
    <div className="layout" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AdminNavbar />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
