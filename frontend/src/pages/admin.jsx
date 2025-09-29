import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [contacts, setContacts] = useState([]);

  const [newAppointment, setNewAppointment] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    area: "",
    city: "",
    state: "",
    postCode: "",
    potholePhoto: null,
  });

  // Pagination for appointments
  const [currentAppPage, setCurrentAppPage] = useState(1);
  const [appsPerPage] = useState(5);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("fullName");

  // ====================== FETCH FUNCTIONS ======================
  const fetchAppointments = async (search = "", field = "fullName", page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/appointments?search=${search}&searchField=${field}&page=${page}&limit=${appsPerPage}`
      );
      const data = res.data;
      setAppointments(Array.isArray(data.appointments) ? data.appointments : []);
      setTotalAppointments(data.total || 0);
    } catch (err) {
      console.error("Error fetching appointments:", err.response?.data || err.message);
      setAppointments([]);
      setTotalAppointments(0);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/contact");
      const data = res.data;
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        setContacts(data.contacts || []);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err.response?.data || err.message);
      setContacts([]);
    }
  };

  // ====================== EFFECTS ======================
  useEffect(() => {
    fetchAppointments(searchQuery, searchField, currentAppPage);
  }, [currentAppPage, searchField]);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setCurrentAppPage(1);
      fetchAppointments(searchQuery, searchField, 1);
    }, 300); // debounce
    return () => clearTimeout(delay);
  }, [searchQuery, searchField]);

  // ====================== CRUD HANDLERS ======================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This appointment will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5001/api/appointments/${id}`);
        fetchAppointments(searchQuery, searchField, currentAppPage);
        Swal.fire("Deleted!", "Appointment has been deleted.", "success");
      } catch (err) {
        console.error("Failed to delete appointment", err.response?.data || err.message);
        Swal.fire("Error", "Failed to delete appointment", "error");
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!newAppointment.fullName || !newAppointment.email || !newAppointment.phone || !newAppointment.date) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", newAppointment.fullName);
    formData.append("email", newAppointment.email);
    formData.append("phone", newAppointment.phone);
    formData.append("date", newAppointment.date);
    formData.append("address[area]", newAppointment.area || "");
    formData.append("address[city]", newAppointment.city || "");
    formData.append("address[state]", newAppointment.state || "");
    formData.append("address[postCode]", newAppointment.postCode || "");

    if (newAppointment.potholePhoto) {
      formData.append("potholePhoto", newAppointment.potholePhoto);
    }

    try {
      await axios.post("http://localhost:5001/api/appointments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Added!", "Appointment has been added.", "success");

      setNewAppointment({
        fullName: "",
        email: "",
        phone: "",
        date: "",
        area: "",
        city: "",
        state: "",
        postCode: "",
        potholePhoto: null,
      });

      fetchAppointments(searchQuery, searchField, 1);
    } catch (err) {
      console.error("Failed to add appointment", err.response?.data || err.message);
      Swal.fire("Error", err.response?.data?.error || "Failed to add appointment", "error");
    }
  };

  // ====================== PAGINATION ======================
  const paginateApps = (pageNumber) => setCurrentAppPage(pageNumber);

  const Pagination = ({ totalItems, itemsPerPage, currentPage, paginate }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages === 0) return null;

    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);
    const pageNumbers = [];

    if (startPage > 1) pageNumbers.push(1, "...");
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    if (endPage < totalPages) pageNumbers.push("...", totalPages);

    return (
      <nav className="mt-4 flex justify-center">
        <ul className="flex items-center space-x-2">
          <li>
            <button
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {"<<"}
            </button>
          </li>
          <li>
            <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {"<"}
            </button>
          </li>
          {pageNumbers.map((number, idx) =>
            number === "..." ? (
              <li key={idx} className="px-2 py-1">
                ...
              </li>
            ) : (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-2 py-1 rounded ${
                    currentPage === number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {number}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {">"}
            </button>
          </li>
          <li>
            <button
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              {">>"}
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // ====================== RENDER ======================
  return (
    <div className="p-6 space-y-12">
      {/* Add Appointment Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add Appointment</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleAdd}>
          {[
            { label: "Full Name", key: "fullName" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Date", key: "date" },
            { label: "Area", key: "area" },
            { label: "City", key: "city" },
            { label: "State", key: "state" },
            { label: "Post Code", key: "postCode" },
          ].map(({ label, key }, idx) => (
            <input
              key={idx}
              type={label === "Email" ? "email" : label === "Date" ? "date" : "text"}
              placeholder={label}
              value={newAppointment[key]}
              onChange={(e) => setNewAppointment({ ...newAppointment, [key]: e.target.value })}
              required={["fullName", "email", "phone", "date"].includes(key)}
              className="border px-3 py-2 rounded"
            />
          ))}
          <input
            type="file"
            onChange={(e) => setNewAppointment({ ...newAppointment, potholePhoto: e.target.files[0] })}
            className="col-span-1 sm:col-span-2 border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Add Appointment
          </button>
        </form>
      </div>

      {/* Search Input */}
      <div className="mb-4 max-w-md mx-auto flex space-x-2">
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="fullName">Full Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="address.city">City</option>
          <option value="address.state">State</option>
        </select>
        <input
          type="search"
          placeholder={`Search by ${searchField.replace("address.", "")}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Appointments Table */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left border text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((app) => (
                  <tr key={app._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{app.fullName}</td>
                    <td className="px-6 py-4">{app.email}</td>
                    <td className="px-6 py-4">{app.phone}</td>
                    <td className="px-6 py-4">{new Date(app.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {app.address?.area || ""}, {app.address?.city || ""},{" "}
                      {app.address?.state || ""}, {app.address?.postCode || ""}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination
            totalItems={totalAppointments}
            itemsPerPage={appsPerPage}
            currentPage={currentAppPage}
            paginate={paginateApps}
          />
        </div>
      </div>

      {/* Contacts Table (No Pagination) */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left border text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3">First Name</th>
                <th className="px-6 py-3">Last Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Message</th>
                <th className="px-6 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((msg) => (
                  <tr key={msg._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{msg.firstName}</td>
                    <td className="px-6 py-4">{msg.lastName || "-"}</td>
                    <td className="px-6 py-4">{msg.email}</td>
                    <td className="px-6 py-4">{msg.message}</td>
                    <td className="px-6 py-4">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No contact messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
