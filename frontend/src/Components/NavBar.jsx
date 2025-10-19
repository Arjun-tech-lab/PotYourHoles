import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import axios
import image from "../assets/icon.jpg";

const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      // ✅ call backend logout endpoint
      await axios.post("http://localhost:8080/api/auth/logout", {}, { withCredentials: true });

      // ✅ call parent App’s logout handler if provided
      if (onLogout) {
        await onLogout();
      }

      navigate("/"); // ✅ redirect after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={image} className="h-8 w-8 rounded-full shadow-md object-cover" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            PotYourholes
          </span>
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/" className="block py-2 px-3 text-white rounded-sm md:p-0 hover:bg-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="block py-2 px-3 text-white rounded-sm md:p-0 hover:bg-blue-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/Services"
                className="block py-2 px-3 text-white rounded-sm md:p-0 hover:bg-blue-500"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/Booking"
                className="block py-2 px-3 text-white rounded-sm md:p-0 hover:bg-blue-500"
              >
                Booking
              </Link>
            </li>
            <li>
              <Link
                to="/ContactUs"
                className="block py-2 px-3 text-white rounded-sm md:p-0 hover:bg-blue-500"
              >
                Contact
              </Link>
            </li>

            {/* Login / Logout Button */}
            <li className="ml-auto">
              {user ? (
                <button
                  onClick={handleLogoutClick}
                  className="block py-2 px-3 text-white rounded-sm md:p-0 hover:bg-red-500 bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="block py-2 px-3 text-white rounded-sm md:p-0 hover:bg-blue-500"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
