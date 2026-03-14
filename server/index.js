import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import customizeRoutes from "./routes/customizeRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import jobRoleRoutes from "./routes/jobRoleRoutes.js";

dotenv.config(); // Load variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
const corsOptions = {
  origin: function (origin, callback) {
    // Allow any localhost port or no origin (e.g., Postman)
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization", // We must allow the Authorization header
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("SmartResume Backend is working");
});

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/resume", protect, resumeRoutes);
app.use("/api/customize-resume", protect, customizeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/job-roles", jobRoleRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});