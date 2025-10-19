import pothole from "../assets/image.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/potholeacc.jpg"

const LandingPage = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500); // animation delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center text-white"
        style={{
          backgroundImage: `url(${pothole})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <Link
            to="/Booking"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-sm font-medium">
              Making Roads Safer, One Pothole at a Time
            </span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>

          <h1
            className={`mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white transition-all duration-1000 ease-out ${
              showText ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
            }`}
          >
            Report Potholes, Fix Communities
          </h1>

          <p
            className={`mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-white transition-all duration-1000 ease-out delay-200 ${
              showText ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
            }`}
          >
            Snap a photo, pay a small fee, and help fix dangerous potholes in
            your neighbourhood . Together, we can make our roads safer for
            everyone.
          </p>

          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              to="/About"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Learn more
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            
          </div>
         
          
        </div>
      </section>

      {/* How We Work Section */}
      <section className="bg-gray-900 p-8 min-h-screen pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="md:w-2/3 lg:w-1/2">
            <h2 className="my-8 text-3xl font-bold text-white md:text-4xl">
              How We Work
            </h2>
            <p className="text-gray-300">
              Our process ensures potholes are reported, verified, and fixed as
              quickly as possible.
            </p>
          </div>

          <div className="mt-16 grid divide-x divide-y divide-gray-600 overflow-hidden rounded-3xl border border-gray-600 text-gray-600 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0">
            {/* Step 1 */}
            <div className="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-6 py-12 p-8">
                <div className="text-white text-4xl font-bold">1</div>
                <h5 className="text-xl font-semibold text-white">
                  Capture & Report
                </h5>
                <p className="text-gray-300">
                  Snap a photo of a pothole in your neighborhood and upload it
                  to our platform.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-6 py-12 p-8">
                <div className="text-white text-4xl font-bold">2</div>
                <h5 className="text-xl font-semibold text-white">
                  Pay a Small Fee
                </h5>
                <p className="text-gray-300">
                  Contribute a small fee to help fund the verification and
                  repair process.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-6 py-12 p-8">
                <div className="text-white text-4xl font-bold">3</div>
                <h5 className="text-xl font-semibold text-white">
                  Verification
                </h5>
                <p className="text-gray-300">
                  Our team validates the report, ensuring the pothole needs
                  fixing and notifying local authorities.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-6 py-12 p-8">
                <div className="text-white text-4xl font-bold">4</div>
                <h5 className="text-xl font-semibold text-white">
                  Pothole Fixed
                </h5>
                <p className="text-gray-300">
                  Repairs are carried out and you’ll be updated once your
                  reported pothole is fixed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  accidents sections */}
      <div className="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6 ">
      <div className="text-center mb-10">
        <h2 className="text-4xl tracking-tight font-bold text-primary-800">
          Highlighted Features
        </h2>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Can Help Image */}
        <div className="mr-0 md:mr-8 mb-6 md:mb-0">
          <img
            className="w-1/2 md:w-full mx-auto rounded-2xl shadow-lg object-cover"
            src={image}
            alt="can_help_banner"
          />
        </div>

        {/* Feature Cards */}
        <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
          <div className="w-full sm:w-1/2 mb-4 px-2">
            <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 className="text-2xl font-bold text-md mb-6">
                Millions of Accidents Annually
              </h3>
              <p className="text-sm">
                Potholes are responsible for over 2 million vehicle accidents annually in India alone. Many of these accidents occur because drivers swerve suddenly to avoid potholes or lose control of their vehicles on damaged roads.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-1/2 mb-4 px-2">
            <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 className="text-2xl font-bold text-md mb-6">
                Costly Vehicle Damage
              </h3>
              <p className="text-sm">
                Cars, motorcycles, and bicycles often suffer suspension damage, flat tires, and alignment problems from pothole impacts. Collectively, drivers spend billions of dollars annually repairing pothole-related damages, money that could be avoided with timely road maintenance.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-1/2 mb-4 px-2">
            <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 className="text-2xl font-bold text-md mb-6">
                Delayed Emergency Response
              </h3>
              <p className="text-sm">
                Poor roads with potholes slow down emergency services like ambulances and fire trucks. Delays caused by damaged roads can worsen outcomes for accident victims and emergency situations.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-1/2 mb-4 px-2">
            <div className="h-full py-4 px-6 border border-green-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 className="text-2xl font-bold text-md mb-6">
                Economic and Social Impact
              </h3>
              <p className="text-sm">
                Besides personal losses, potholes affect local economies. Delivery services, public transportation, and businesses face delays, increased maintenance costs, and lost productivity because of unsafe roads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h4 className="text-lg font-bold mb-4">PotYourHoles</h4>
            <p>
              PotYourHoles is a community-driven platform to report, fund, and
              fix potholes — making roads safer for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="hover:text-gray-300">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@potyourholes.com" className="hover:text-gray-300">
                  support@potyourholes.com
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="hover:text-gray-300">
                  +1-555-123-4567
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="hover:text-blue-400">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="hover:text-pink-500">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8">
          <p>© {new Date().getFullYear()} PotYourHoles. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default LandingPage;
