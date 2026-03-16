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
// MIDDLEWARE & CORS
//////////////////////////////

// 1. Logging middleware (Before CORS to see all requests)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin || 'No Origin'}`);
  next();
});

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://ai-resume-analyzer.vercel.app",
  "https://ai-resume-analyzer-opal-two.vercel.app",
  process.env.CORS_ORIGIN
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps / postman)
    if (!origin) return callback(null, true);

    // Normalize origin and allowedOrigins by removing trailing slashes for robust matching
    const normalizedOrigin = origin.replace(/\/$/, "");
    
    const isAllowed = allowedOrigins.some(allowed => {
      if (!allowed) return false;
      const normalizedAllowed = allowed.replace(/\/$/, "");
      return normalizedOrigin === normalizedAllowed || normalizedOrigin.startsWith(normalizedAllowed);
    }) || normalizedOrigin.startsWith('http://localhost:');
    
    if (isAllowed) {
      return callback(null, true);
    }

    console.log(`CORS Blocked for origin: ${origin}`);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

app.use(express.json());

//////////////////////////////
// ROUTES
//////////////////////////////

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 SmartResume Backend is working");
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