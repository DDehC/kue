import { useEffect } from "react";
import { setRole } from "../../utils/landing";
import { Outlet } from "react-router-dom";
import StudentNavbar from "../navbars/StudentNavbar.jsx";
import Footer from "../Footer.jsx";

export default function StudentLayout() {
  useEffect(() => { setRole("student"); }, []);
  return (
    <div className="layout" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <StudentNavbar />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
