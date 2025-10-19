import React, { useEffect, useState } from "react";
import axios from "axios";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Fetch appointments from Spring Boot backend
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/appointments", {
        params: { page, limit, search },
      });

      // Map appointments and include AI severity if available
      const appointmentsData = await Promise.all(
        (res.data.appointments || []).map(async (appt) => {
          // If severity is null or pending, fetch AI severity
          if (!appt.severity || appt.severity.toLowerCase() === "pending") {
            try {
              const aiRes = await axios.post(
                `http://localhost:8080/api/ai/predict/${appt.id || appt._id}`
              );
              appt.severity = aiRes.data.severity;
            } catch (err) {
              console.error("AI prediction failed:", err);
              appt.severity = "pending";
            }
          }
          return appt;
        })
      );

      setAppointments(appointmentsData);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setAppointments([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [page, search]);

  const getSeverityClass = (severity) => {
    switch ((severity || "").toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading appointments...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointments AI Analysis</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={handleSearchChange}
          className="border p-2 rounded w-full md:w-1/3"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Severity</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id || appt.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{appt.fullName}</td>
                <td className="py-2 px-4 border-b">
                  {appt.date ? new Date(appt.date).toLocaleString() : "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  {appt.potholePhoto ? (
                    <img
                      src={`http://localhost:8080/uploads/${appt.potholePhoto}`}
                      alt="Pothole"
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded-full font-semibold text-sm ${getSeverityClass(
                      appt.severity
                    )}`}
                  >
                    {appt.severity
                      ? appt.severity.charAt(0).toUpperCase() + appt.severity.slice(1)
                      : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages || totalPages === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Appointment;
