import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">US</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">URLSync</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden sm:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(true)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300",
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-4 space-y-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}
