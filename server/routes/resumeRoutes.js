// // import express from "express"; //line 22
// // import multer from "multer";
// // import { analyzeResume } from "../controllers/resumeController.js";

// // const router = express.Router();

// // // Set up multer to store files in /uploads
// // const storage = multer.diskStorage({
// //   destination: function (req, res, cb) {
// //     cb(null, "uploads/");
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, `${Date.now()}-${file.originalname}`);
// //   },
// // });

// // const upload = multer({ storage });

// // // POST /api/resume/upload
// // router.post("/upload", upload.single("resume"), analyzeResume);

// // export default router;


// import express from "express";
// import multer from "multer";
// import { analyzeResume } from "../controllers/resumeController.js";

// const router = express.Router();

// // Set up multer to store files in /uploads
// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// // POST /api/resume/upload
// router.post("/upload", upload.single("resume"), analyzeResume);

// export default router;

import express from "express";
import multer from "multer";
import {
  analyzeResume, downloadAnalysisReport,
  getAnalysisHistory,
  getAnalysisById,
  rewriteBullet,
  generateQuestions
} from "../controllers/resumeController.js";

const router = express.Router();

// Set up multer to store files in /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ✅ Add middleware to parse form data properly
const parseFormData = (req, res, next) => {
  // Multer already parses form-data, but we can add debug logs
  console.log("📋 Multer parsed fields:");
  console.log("File:", req.file ? req.file.originalname : "No file");
  console.log("Form fields:", req.body);
  next();
};

// POST /api/resume/upload
router.post(
  "/upload",
  upload.single("resume"),
  parseFormData, // Add this middleware
  analyzeResume
);
router.get("/history", getAnalysisHistory);
router.get("/:analysisId", getAnalysisById);
router.get("/:analysisId/download", downloadAnalysisReport);

// AI Feature Endpoints
router.post("/rewrite-bullet", rewriteBullet);
router.post("/generate-questions", generateQuestions);

export default router;