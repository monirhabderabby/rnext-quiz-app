// Packages
import React from "react";

// Local imports
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center mb-12">
      <img src={logo} className="h-7" />
      <div>
        <Link
          to="/login"
          className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
          style={{ fontFamily: "Jaro" }}
        >
          Login
        </Link>

        <button
          className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
          style={{ fontFamily: "Jaro" }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
