// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import resumeRoutes from "./routes/resumeRoutes.js";
// import customizeRoutes from "./routes/customizeRoutes.js";
// import { protect } from "./middleware/authMiddleware.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import jobRoleRoutes from "./routes/jobRoleRoutes.js";

// dotenv.config(); // Load variables from .env

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// // app.use(cors());
// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow any localhost port or no origin (e.g., Postman)
//     if (!origin || origin.startsWith('http://localhost:')) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "Content-Type,Authorization", // We must allow the Authorization header
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Test Route
// app.get("/", (req, res) => {
//   res.send("SmartResume Backend is working");
// });

// import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/uploads", express.static("uploads"));
// app.use("/api/resume", protect, resumeRoutes);
// app.use("/api/customize-resume", protect, customizeRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/job-roles", jobRoleRoutes);

// app.use(notFound);
// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import customizeRoutes from "./routes/customizeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import jobRoleRoutes from "./routes/jobRoleRoutes.js";

import { protect } from "./middleware/authMiddleware.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//////////////////////////////
// CONNECT DATABASE
//////////////////////////////

connectDB();

//////////////////////////////
// ROBUST MANUAL CORS (Top Priority)
//////////////////////////////

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://ai-resume-analyzer.vercel.app",
    "https://ai-resume-analyzer-opal-two.vercel.app",
    process.env.CORS_ORIGIN
  ].map(o => o?.replace(/\/$/, "").toLowerCase().trim()).filter(Boolean);

  const normalizedOrigin = origin?.replace(/\/$/, "").toLowerCase().trim();

  // Logging for production debugging
  console.log(`[CORS Check] Method: ${req.method} | URL: ${req.url} | Origin: ${origin}`);

  if (normalizedOrigin && (allowedOrigins.includes(normalizedOrigin) || normalizedOrigin.startsWith('http://localhost:'))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // Non-browser requests
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");

  // Handle Preflight OPTIONS request
  if (req.method === "OPTIONS") {
    console.log(`[CORS Preflight] Handled for origin: ${origin}`);
    return res.status(200).end();
  }

  next();
});

app.use(express.json());

//////////////////////////////
// DEBUG ROUTES
//////////////////////////////

app.get("/api/health-check", (req, res) => {
  res.json({
    status: "active",
    time: new Date().toISOString(),
    message: "🚀 SmartResume Backend is working"
  });
});

app.get("/api/debug-config", (req, res) => {
  res.json({
    env: {
      PORT: process.env.PORT,
      CORS_ORIGIN: process.env.CORS_ORIGIN,
      NODE_ENV: process.env.NODE_ENV
    },
    allowedOriginsExample: [
      "https://ai-resume-analyzer-opal-two.vercel.app"
    ]
  });
});

//////////////////////////////
// ROUTES
//////////////////////////////

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SmartResume Backend is healthy and active");
});

// Auth
app.use("/api/auth", authRoutes);

// Users
app.use("/api/users", userRoutes);

// Resume
app.use("/api/resume", protect, resumeRoutes);

// Resume Customization
app.use("/api/customize-resume", protect, customizeRoutes);

// Admin
app.use("/api/admin", adminRoutes);

// Job Roles
app.use("/api/job-roles", jobRoleRoutes);

// Static uploads
app.use("/uploads", express.static("uploads"));

//////////////////////////////
// ERROR HANDLING
//////////////////////////////

app.use(notFound);
app.use(errorHandler);

//////////////////////////////
// START SERVER
//////////////////////////////

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});