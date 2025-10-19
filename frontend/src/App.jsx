import React, { useEffect, useState } from "react";
import 'flowbite';
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import NavBar from "./Components/NavBar";
import PotholeSeverity from "./Components/PotHoleSevrity"; // <-- AI Component

import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/Aboutus";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import ContactUs from "./pages/ContactUS";
import SuccBooking from "./pages/SuccBooking";
import Admin from "./pages/admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Appointment from "./pages/Appointment";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auth/current_user", {
          withCredentials: true,
        });
        setUser(res.data.user || null); // match your backend response
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/logout", { withCredentials: true });
      setUser(null); // clear user state
      navigate("/"); // redirect to landing page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Login redirect for NavBar
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div>
      <NavBar
        user={user}
        onLogout={handleLogout}
        onLoginClick={handleLoginRedirect}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Sucessfull" element={<SuccBooking />} />
        <Route path="/admin" element={<Admin user={user} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/admin/appointment" element={<Appointment />} />
        <Route path="/potholeai" element={<PotholeSeverity />} /> 
      </Routes>
    </div>
  );
};

export default App;
