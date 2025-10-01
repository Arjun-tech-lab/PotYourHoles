import express from "express";
import Appointment from "../models/Appointment.js";
import upload from "../middleware/upload.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const router = express.Router();

// Map AI output to DB severity
const mapSeverity = (aiClass) => {
  switch ((aiClass || "").toLowerCase()) {
    case "major_pothole":
      return "high";
    case "moderate_pothole":
      return "medium";
    case "minor_pothole":
      return "low";
    default:
      return "low"; // fallback
  }
};

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
      severity: "low", // default severity
    });

    if (appointment.potholePhoto) {
      console.log("[AI] Sending image to AI server:", appointment.potholePhoto);
      try {
        const form = new FormData();
        form.append("image", fs.createReadStream(appointment.potholePhoto));

        const aiResponse = await axios.post("http://localhost:5002/predict", form, {
          headers: form.getHeaders(),
          timeout: 10000,
        });

        console.log("[AI] AI server response:", aiResponse.data);

        const aiClass = aiResponse.data?.class || "minor_pothole";
        appointment.severity = mapSeverity(aiClass);

        console.log("[AI] Mapped severity:", appointment.severity);
      } catch (err) {
        console.error("[AI] AI analysis error:", err.message);
        appointment.severity = "low"; // fallback
      }
    }

    const saved = await appointment.save();
    console.log("[DB] Appointment saved with severity:", saved.severity);
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// ------------------- GET APPOINTMENTS -------------------
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 5;

    let filter = {};
    if (search) {
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
    const { status, severity } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Not found" });

    if (status) appointment.status = status;
    if (severity) appointment.severity = severity;

    await appointment.save();
    console.log("[DB] Appointment updated with severity:", appointment.severity);
    res.json(appointment);
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

// ------------------- ANALYZE EXISTING APPOINTMENTS -------------------
router.post("/analyze", async (req, res) => {
  try {
    const appointments = await Appointment.find({ potholePhoto: { $exists: true }, severity: "low" });

    for (const appt of appointments) {
      console.log("[AI] Analyzing existing appointment:", appt._id);
      try {
        const form = new FormData();
        form.append("image", fs.createReadStream(appt.potholePhoto));

        const aiResponse = await axios.post("http://localhost:5002/predict", form, {
          headers: form.getHeaders(),
          timeout: 10000,
        });

        const aiClass = aiResponse.data?.class || "minor_pothole";
        appt.severity = mapSeverity(aiClass);
        await appt.save();

        console.log("[AI] Updated severity:", appt.severity);
      } catch (err) {
        console.error("[AI] Failed to analyze appointment:", appt._id, err.message);
      }
    }

    res.json({ message: "Analysis complete" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
