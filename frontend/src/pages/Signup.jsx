import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // External popup library

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
  "http://localhost:8080/api/auth/signup", // <-- must match controller mapping
  formData,
  { withCredentials: true } // allow cookies/session
      );

      // ✅ Show success popup
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been registered successfully.",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login"); // Redirect to login after popup
      });
    } catch (err) {
      // Show backend error message
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 max-w">
          Or{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            login to your account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  iworkedon.com/
                </span>
                <input
                  type="text"
                  name="username"
                  placeholder="john"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="flex-1 border border-gray-300 pl-3 block w-full rounded-none rounded-r-md"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
