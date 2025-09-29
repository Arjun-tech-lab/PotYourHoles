import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import appointmentRoutes from "./routes/potholeroutes.js";
import cors from "cors";
import contact from "./routes/contactus.js";
import authRoutes from "./routes/Loginroutes.js"

// 🔹 New imports for Google Auth
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config();
console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET =", process.env.GOOGLE_SECRET_ID);


// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // React dev server
    credentials: true, // allow sending cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// 🔹 Session middleware (needed for login persistence)
app.use(
  session({
    secret: process.env.SESSION_SECRET, // change in prod
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// 🔹 Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: "http://localhost:5001/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you could save user to MongoDB
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact", contact);
app.use("/api/auth", authRoutes);

// 🔹 Google Auth routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // redirect to React dashboard
    res.redirect("http://localhost:5173");
  }
);

app.get("/api/current_user", (req, res) => {
  res.send(req.user || null);
});

app.get("/api/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    req.session.destroy(); // destroy session completely
    res.json({ message: "Logged out successfully" }); // send JSON to frontend
  });
});


// Static folder for uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
