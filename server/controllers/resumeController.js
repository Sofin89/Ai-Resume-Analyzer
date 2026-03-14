
import fs from "fs";
import { getAIReview, getSkillGapAnalysis, rewriteResumeBullet, generateInterviewQuestions } from "../utils/openai.js";
import { extractTextFromPDF } from "../utils/pdfUtils.js";
import { generateSkillGapReport } from "../utils/pdfGenerator.js";
import Resume from "../models/resumeModel.js";
import User from "../models/userModel.js";

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filepath = req.file.path;
    const resumeText = await extractTextFromPDF(filepath);
    const targetJobRole = req.body.targetJobRole || "";
    const jobDescription = req.body.jobDescription || "";

    console.log("🔍 Starting Resume Analysis...");
    console.log("📄 Resume Text Length:", resumeText.length);
    console.log("🎯 Target Job Role:", targetJobRole);
    console.log("📝 Job Description Provided:", !!jobDescription);

    // Run both analyses in parallel for better performance
    const [aiFeedback, skillGapAnalysis] = await Promise.all([
      getAIReview(resumeText, targetJobRole, jobDescription),
      getSkillGapAnalysis(resumeText, targetJobRole, jobDescription)
    ]);

    // Calculate overall job readiness score
    const overallScore = calculateOverallScore(aiFeedback, skillGapAnalysis);

    const resumeUrl = `${req.protocol}://${req.get("host")}/${filepath.replace(
      /\\/g,
      "/"
    )}`;

    const newResumeEntry = new Resume({
      originalText: resumeText,
      aiFeedback: aiFeedback,
      skillGapAnalysis: skillGapAnalysis,
      improvementRoadmap: skillGapAnalysis?.improvementRoadmap || null,
      jobReadinessScore: overallScore, // Now an object instead of a number
      targetJobRole: targetJobRole || aiFeedback.targetJobRole,
      jobDescription: jobDescription,
      originalFileName: req.file.originalname,
      user: req.user._id,
    });

    await newResumeEntry.save();

    // Update user's career preferences if this is their first analysis
    if (targetJobRole) {
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { preferredJobRoles: targetJobRole }
      });
    }

    // Clean up uploaded file
    try {
      fs.unlinkSync(filepath);
      console.log("🗑️ Deleted uploaded file:", filepath);
    } catch (unlinkError) {
      console.warn("⚠️ Could not delete uploaded file:", unlinkError.message);
    }

    res.status(200).json({
      success: true,
      message: "Resume analysis completed successfully",
      data: {
        resumeText: resumeText.substring(0, 500) + "...", // Return only first 500 chars
        aiFeedback,
        skillGapAnalysis,
        overallScore,
        targetJobRole: targetJobRole || aiFeedback.targetJobRole,
        resumeUrl,
        analysisId: newResumeEntry._id,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("❌ Resume analysis failed:", error);

    // Clean up file even on error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        // Ignore cleanup errors
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const downloadAnalysisReport = async (req, res) => {
  try {
    const { analysisId } = req.params;

    const analysis = await Resume.findOne({
      _id: analysisId,
      user: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis report not found"
      });
    }

    const user = await User.findById(req.user._id).select('name email');

    const pdfBuffer = await generateSkillGapReport(
      analysis.skillGapAnalysis,
      {
        name: user.name,
        email: user.email,
        analysisDate: analysis.createdAt
      },
      {
        calculatedScore: analysis.jobReadinessScore,
        aiFeedback: analysis.aiFeedback,
        targetJobRole: analysis.targetJobRole
      }
    );

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="skill-gap-report-${analysisId}.pdf"`);

    res.send(pdfBuffer);

  } catch (error) {
    console.error("❌ Report generation failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate report"
    });
  }
};

export const getAnalysisHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const analyses = await Resume.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('originalFileName targetJobRole jobReadinessScore createdAt updatedAt');

    const total = await Resume.countDocuments({ user: req.user._id });

    res.status(200).json({
      success: true,
      data: {
        analyses,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalAnalyses: total,
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error("❌ Failed to fetch analysis history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analysis history"
    });
  }
};

export const getAnalysisById = async (req, res) => {
  try {
    const { analysisId } = req.params;

    const analysis = await Resume.findOne({
      _id: analysisId,
      user: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        analysis: {
          _id: analysis._id,
          originalFileName: analysis.originalFileName,
          targetJobRole: analysis.targetJobRole,
          jobReadinessScore: analysis.jobReadinessScore,
          createdAt: analysis.createdAt,
          updatedAt: analysis.updatedAt,
          aiFeedback: analysis.aiFeedback,
          skillGapAnalysis: analysis.skillGapAnalysis,
          improvementRoadmap: analysis.improvementRoadmap
        }
      }
    });

  } catch (error) {
    console.error("❌ Failed to fetch analysis:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analysis"
    });
  }
};

// Helper function to calculate advanced ATS score
const calculateOverallScore = (aiFeedback, skillGapAnalysis) => {
  // Extract scores from AI Feedback directly
  const scoreData = aiFeedback?.score || {};

  const skillsMatch = scoreData.skillsMatch || 0;
  const experience = scoreData.experience || 0;
  const projects = scoreData.projects || 0;
  const keywords = scoreData.keywords || 0;
  const formatting = scoreData.formatting || 0;
  const impactWords = scoreData.impactWords || 0;

  // New Weighted Scoring System
  // Skills Match (30%)
  // Experience (20%)
  // Projects (15%)
  // Keywords (15%)
  // Formatting (10%)
  // Impact Words (10%)
  const rawScoreOutof10 = (
    (skillsMatch * 0.30) +
    (experience * 0.20) +
    (projects * 0.15) +
    (keywords * 0.15) +
    (formatting * 0.10) +
    (impactWords * 0.10)
  );

  return {
    skillsMatch: skillsMatch * 10,
    experience: experience * 10,
    projects: projects * 10,
    keywords: keywords * 10,
    formatting: formatting * 10,
    impactWords: impactWords * 10,
    totalScore: Math.round(rawScoreOutof10 * 10) // Convert from 10-point scale to 100-point scale
  };
};

export const rewriteBullet = async (req, res) => {
  try {
    const { bulletText, targetJobRole } = req.body;

    if (!bulletText) {
      return res.status(400).json({ success: false, message: "bulletText is required" });
    }

    const rewrittenData = await rewriteResumeBullet(bulletText, targetJobRole);

    res.status(200).json({
      success: true,
      data: rewrittenData
    });
  } catch (error) {
    console.error("❌ Bullet rewrite failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to rewrite bullet."
    });
  }
};

export const generateQuestions = async (req, res) => {
  try {
    const { analysisId } = req.body;

    if (!analysisId) {
      return res.status(400).json({ success: false, message: "analysisId is required" });
    }

    const analysis = await Resume.findOne({
      _id: analysisId,
      user: req.user._id
    });

    if (!analysis) {
      return res.status(404).json({ success: false, message: "Resume analysis not found" });
    }

    const questionsData = await generateInterviewQuestions(
      analysis.originalText,
      analysis.targetJobRole,
      analysis.jobDescription
    );

    res.status(200).json({
      success: true,
      data: questionsData
    });
  } catch (error) {
    console.error("❌ Interview questions generation failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate interview questions."
    });
  }
};