import React from 'react';
import { useLocation } from "react-router-dom";

const SuccBooking = () => {
  const location = useLocation();
  const { appointment } = location.state || {};

  return (
    <section className="min-h-screen bg-white py-12 antialiased dark:bg-gray-900 md:py-20">
      <div className="mx-auto max-w-4xl px-6 2xl:px-0">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
          Thanks for your Booking!
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Thank you, your pothole repair appointment has been successfully scheduled.
        </p>

        {appointment ? (
          <div className="space-y-6 sm:space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800 mb-8">
            <dl className="sm:flex items-center justify-between gap-6 text-lg">
              <dt className="font-semibold text-gray-600 dark:text-gray-400">Date</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {new Date(appointment.date).toLocaleDateString()}
              </dd>
            </dl>

            <dl className="sm:flex items-center justify-between gap-6 text-lg">
              <dt className="font-semibold text-gray-600 dark:text-gray-400">Name</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {appointment.fullName}
              </dd>
            </dl>

            <dl className="sm:flex items-center justify-between gap-6 text-lg">
              <dt className="font-semibold text-gray-600 dark:text-gray-400">Phone</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {appointment.phone}
              </dd>
            </dl>

            <dl className="sm:flex items-center justify-between gap-6 text-lg">
              <dt className="font-semibold text-gray-600 dark:text-gray-400">Address</dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {appointment.address?.area}, {appointment.address?.city}, {appointment.address?.state}, {appointment.address?.postCode}
              </dd>
            </dl>

            {appointment.potholePhoto && (
              <div className="mt-6">
                <img
                  src={`http://localhost:5001/${appointment.potholePhoto}`}
                  alt="Pothole"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-lg text-gray-600 dark:text-gray-400">No appointment data found.</p>
        )}

        <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <a
            href="#"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-lg px-6 py-3 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Track your order
          </a>
          <a
            href="#"
            className="py-3 px-6 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Return to shopping
          </a>
        </div>
      </div>
    </section>
  );
};

export default SuccBooking;
