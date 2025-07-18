"use client";
import React from "react";
import { useAuth } from "../redux/hooks";

const Navbar = () => {
  const { isAuthenticated, admin, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-700 text-white shadow">
      {/* left */}
      <div className="text-xl font-bold tracking-wide">Order Management</div>

      {/* right */}
      <div>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <span className="font-medium">{admin?.name || "Admin"}</span>
            <button
              onClick={logout}
              className="bg-white text-blue-700 px-4 py-1 rounded hover:bg-blue-100 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/login"
            className="bg-white text-blue-700 px-4 py-1 rounded hover:bg-blue-100 transition"
          >
            Admin Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
