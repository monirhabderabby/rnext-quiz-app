// Packages
import React from "react";

// Local imports
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import useAuth from "../../hooks/useAuth";
import { removeCookie } from "../../lib/cookies";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("user");
    setAuth(null);
    navigate(0);
  };

  return (
    <header className="flex justify-between items-center mb-12">
      <img src={logo} className="h-7" />
      <div>
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
