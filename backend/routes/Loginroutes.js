import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/Login.js";

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  const { name, username, email, password, password_confirmation } = req.body;

  //  Validation
  if (!name || !username || !email || !password || !password_confirmation) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password !== password_confirmation) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    //  Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login route (email OR username + password)
router.post("/login", async (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return res.status(400).json({ message: "Email/Username and password are required" });
  }

  try {
    const user = await User.findOne(email ? { email } : { username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    res.json({ message: "Login successful", user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
