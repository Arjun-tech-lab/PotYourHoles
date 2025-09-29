import express from "express";
import Appointment from "../models/potholes.js"; 
import upload from "../middleware/upload.js";

const router = express.Router();

// ------------------- CREATE APPOINTMENT -------------------
router.post("/", upload.single("potholePhoto"), async (req, res) => {
  try {
    const appointment = new Appointment({
      fullName: req.body.fullName,
      phone: req.body.phone,
      email: req.body.email,
      date: req.body.date,
      address: req.body.address || {},
      potholePhoto: req.file ? req.file.path : null,
    });

    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ------------------- GET APPOINTMENTS (SEARCH + PAGINATION) -------------------
router.get("/", async (req, res) => {
  try {
    // Parse query params
    const search = req.query.search || "";
    const searchField = req.query.searchField || ""; // e.g., "fullName", "email", "phone", "address.city"
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 5;

    let filter = {};

    if (search && searchField) {
      const regex = new RegExp(search, "i"); // case-insensitive
      // Only allow search in known fields for safety
      const allowedFields = ["fullName", "email", "phone", "address.area", "address.city", "address.state", "address.postCode"];
      if (allowedFields.includes(searchField)) {
        filter[searchField] = regex;
      }
    } else if (search) {
      // fallback: search all fields if no searchField specified
      const regex = new RegExp(search, "i");
      filter = {
        $or: [
          { fullName: regex },
          { email: regex },
          { phone: regex },
          { "address.area": regex },
          { "address.city": regex },
          { "address.state": regex },
          { "address.postCode": regex },
        ],
      };
    }

    const total = await Appointment.countDocuments(filter);
    const appointments = await Appointment.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      appointments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// ------------------- GET SINGLE APPOINTMENT -------------------
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Not found" });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- UPDATE APPOINTMENT -------------------
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------- DELETE APPOINTMENT -------------------
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
