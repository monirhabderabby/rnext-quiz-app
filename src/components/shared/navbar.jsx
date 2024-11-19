// Packages
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Local imports
import logo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";
import { removeCookie } from "../../lib/cookies";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const role = auth?.user?.role || "user";
  const isAdmin = role.includes("admin");
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("user");
    setAuth(null);
    navigate(0);
  };

  return (
    <header className="flex justify-between items-center mb-12">
      <Link to="/">
        <img src={logo} className="h-7" />
      </Link>
      <div>
        {isAdmin && (
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded "
            style={{ fontFamily: "Jaro" }}
          >
            Dashboard
          </Link>
        )}
        {!auth && (
          <Link
            to="/login"
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            style={{ fontFamily: "Jaro" }}
          >
            Login
          </Link>
        )}

        {auth && (
          <button
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            style={{ fontFamily: "Jaro" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
