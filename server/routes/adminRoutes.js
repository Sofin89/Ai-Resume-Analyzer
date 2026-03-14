// import express from "express";
// import JobRole from "../models/jobRoleModel.js";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Admin only routes
// router.use(protect);
// router.use(isAdmin);

// // CRUD for job roles
// router.post('/job-roles', async (req, res) => {
//   try {
//     const jobRole = await JobRole.create(req.body);
//     res.status(201).json(jobRole);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.get('/job-roles', async (req, res) => {
//   try {
//     const jobRoles = await JobRole.find({ isActive: true });
//     res.json(jobRoles);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/analytics', async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalResumes = await Resume.countDocuments();
//     const avgReadinessScore = await Resume.aggregate([
//       { $match: { jobReadinessScore: { $gt: 0 } } },
//       { $group: { _id: null, avgScore: { $avg: "$jobReadinessScore" } } }
//     ]);
    
//     res.json({
//       totalUsers,
//       totalResumes,
//       avgReadinessScore: avgReadinessScore[0]?.avgScore || 0
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;

import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  createJobRole,
  getAllJobRoles,
  getJobRoleById,
  updateJobRole,
  deleteJobRole,
  getPopularJobRoles,
  getJobRolesByCategory
} from "../controllers/jobRoleController.js";

import {
  getAdminDashboard,
  getAllUsers,
  getAllResumes,
  getSystemAnalytics,
  toggleUserStatus
} from "../controllers/adminController.js";

const router = express.Router();

// Apply admin middleware to all routes
router.use(protect);
router.use(isAdmin);

// ========== JOB ROLE MANAGEMENT ==========
router.route("/job-roles")
  .post(createJobRole)
  .get(getAllJobRoles);

router.route("/job-roles/popular")
  .get(getPopularJobRoles);

router.route("/job-roles/category/:category")
  .get(getJobRolesByCategory);

router.route("/job-roles/:id")
  .get(getJobRoleById)
  .put(updateJobRole)
  .delete(deleteJobRole);

// ========== USER MANAGEMENT ==========
router.route("/users")
  .get(getAllUsers);

router.route("/users/:userId/toggle-status")
  .put(toggleUserStatus);

// ========== RESUME MANAGEMENT ==========
router.route("/resumes")
  .get(getAllResumes);

// ========== ANALYTICS & DASHBOARD ==========
router.route("/dashboard")
  .get(getAdminDashboard);

router.route("/analytics")
  .get(getSystemAnalytics);

export default router;