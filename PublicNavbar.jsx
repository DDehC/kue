import { Link } from "react-router-dom";
import nodlogo from "../../assets/nodlogo.png";
import "../../App.css";
import "./navbar.css";

/*Imports icon for sign in button*/
import { FiLogIn } from "react-icons/fi";

export default function PublicNavbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <img src={nodlogo} alt="Logo" className="logo-brand" />
      </Link>
      <div className="nav-right">
      <Link className="nav-link" to="/">Welcome Page</Link>
      <Link className="nav-link" to="/calendar">Calendar</Link>
      <Link className="nav-link" to="/student">Student page</Link>
      <Link className="nav-link" to="/staff">Staff page</Link>
      <Link className="nav-link" to="/admin">Admin page</Link>
        {/* FiLogIn is the icon*/}
      <Link className="nav-link flex items-center gap-1" to="/login">
        Sign In<FiLogIn size={20} /> 
      </Link>
    </div>
    </nav>
  );
}
