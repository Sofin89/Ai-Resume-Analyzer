import express from "express";
import {
  getAllJobRoles,
  getJobRoleById,
  getPopularJobRoles,
  getJobRolesByCategory
} from "../controllers/jobRoleController.js";

const router = express.Router();

// Public routes
router.get("/", getAllJobRoles);
router.get("/popular", getPopularJobRoles);
router.get("/category/:category", getJobRolesByCategory);
router.get("/:id", getJobRoleById);

export default router;