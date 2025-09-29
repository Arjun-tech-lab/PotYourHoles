import express from "express";
import Contact from "../models/contactus.js"; // adjust path if needed

const router = express.Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !email || !message) {
      return res.status(400).json({ msg: "Please fill required fields" });
    }

    const newContact = new Contact({ firstName, lastName, email, message });
    await newContact.save();

    res.status(201).json({ msg: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ GET /api/contact - fetch all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
