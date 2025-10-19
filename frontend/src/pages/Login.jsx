import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
  "http://localhost:8080/api/auth/login", // <-- must match controller mapping
  { email, password },
  { withCredentials: true }
      );
      setError("");
      onLogin(res.data.user); // update App user state
      navigate("/"); // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login to your account</h2>

        {/* Google Sign-In */}
        <a
          href="http://localhost:5001/auth/google"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-black hover:bg-gray-100 focus:ring-2 focus:ring-black focus:ring-offset-1 w-full justify-center mb-4"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </a>

        <div className="flex items-center gap-2 py-2 text-sm text-gray-500">
          <div className="h-px w-full bg-gray-300"></div>
          OR
          <div className="h-px w-full bg-gray-300"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/Signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
