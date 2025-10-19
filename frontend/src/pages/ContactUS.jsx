import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const ContactUs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const data = {
      firstName: e.target["grid-first-name"].value,
      lastName: e.target["grid-last-name"].value,
      email: e.target["grid-email"].value,
      message: e.target["grid-message"].value,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/contact", // make sure backend runs on 5000
        data
      );

      console.log("Message saved:", res.data);
      navigate("/", { state: { message: res.data } });
    } catch (err) {
      console.error("Error sending message:", err);
      setErrorMsg("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 border">
        {/* Left Panel */}
        <div className="bg-gray-900 md:col-span-4 p-10 text-white">
          <p className="mt-4 text-sm leading-7 font-regular uppercase">Contact</p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
            Get In <span className="text-indigo-600">Touch</span>
          </h3>
          <p className="mt-4 leading-7 text-gray-200">
            "We are here to make our roads safer, one pothole at a time. Whether you want to report an issue, share feedback, or collaborate with us, we’d love to hear from you. Your voice matters, and together we can build smoother and safer streets for everyone."
          </p>
          {/* Contact info */}
          <div className="flex items-center mt-5">
            <svg className="h-6 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 489.536 489.536">
              <path d="m488.554,476l-99-280.2c-1-4.2-5.2-7.3-9.4-7.3h-45.6c12.9-31.1 19.6-54.9 19.6-70.8 0-64.6-50-117.7-112.5-117.7-61.5,0-112.5,52.1-112.5,117.7 0,17.6 8.2,43.1 19.9,70.8h-39.7c-4.2,0-8.3,3.1-9.4,7.3l-99,280.2c-3.2,10.3 6.3,13.5 9.4,13.5h468.8c4.2,0.5 12.5-4.2 9.4-13.5zm-246.9-455.3c51,0 91.7,43.7 91.7,96.9 0,56.5-79.2,182.3-91.7,203.1-31.3-53.1-91.7-161.5-91.7-203.1 0-53.1 40.6-96.9 91.7-96.9zm-216.7,448l91.7-259.4h41.7c29.9,64.1 83.3,151 83.3,151s81.4-145.7 83.8-151h47.4l91.7,259.4h-439.6z" />
              <rect width="136.5" x="177.054" y="379.1" height="20.8" />
              <path d="m289.554,108.2c0-26-21.9-47.9-47.9-47.9s-47.9,21.9-47.9,47.9 20.8,47.9 47.9,47.9c27.1,0 47.9-21.8 47.9-47.9z" />
            </svg>
            <span className="text-sm">House #14, Street #12, Jayanagar, Bangalore, India.</span>
          </div>
          <div className="flex items-center mt-5">
            <svg className="h-6 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 60 60">
              <path d="M59.002,37.992c-3.69,0-6.693-3.003-6.693-6.693..." />
            </svg>
            <span className="text-sm">+91 8976543425</span>
          </div>
          <div className="flex items-center mt-5">
            <svg className="h-6 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 300 300">
              <circle cx="150" cy="150" r="140" stroke="currentColor" strokeWidth="10" fill="none" />
              <polygon points="142,142 83,142 83,158 158,158 158,44 142,44" />
            </svg>
            <span className="text-sm">24/7</span>
          </div>
        </div>

        {/* Form Panel */}
        <form onSubmit={handleSubmit} className="md:col-span-8 p-10">
          {/* First & Last Name */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label htmlFor="grid-first-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                First Name
              </label>
              <input id="grid-first-name" name="grid-first-name" type="text" placeholder="Jane" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label htmlFor="grid-last-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Last Name
              </label>
              <input id="grid-last-name" name="grid-last-name" type="text" placeholder="Doe" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label htmlFor="grid-email" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email Address
              </label>
              <input id="grid-email" name="grid-email" type="email" placeholder="you@example.com" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label htmlFor="grid-message" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Your Message
              </label>
              <textarea id="grid-message" name="grid-message" rows="10" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
            </div>
          </div>

          {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}

          <div className="flex justify-between w-full px-3">
            <div className="md:flex md:items-center">
              <label className="block text-gray-500 font-bold">
                <input className="mr-2 leading-tight" type="checkbox" />
                <span className="text-sm">Send me your newsletter!</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>

          <a href="https://veilmail.io/e/FkKh7o" className="font-medium text-blue-600 hover:underline mt-4">
            Or click here to reveal our protected email address
          </a>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
