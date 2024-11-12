import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer";
import Navbar from "../components/shared/navbar";

const NavbarFooterWrapper = () => {
  return (
    <main className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};

export default NavbarFooterWrapper;
