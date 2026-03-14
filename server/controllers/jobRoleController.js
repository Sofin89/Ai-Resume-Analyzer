import JobRole from "../models/jobRoleModel.js";
import mongoose from "mongoose";

// @desc    Create a new job role
// @route   POST /api/job-roles
// @access  Private/Admin
export const createJobRole = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      requiredSkills,
      industryStandards,
      salaryRange,
      growthProspects,
      marketDemand,
      learningResources
    } = req.body;

    // Check if job role already exists
    const existingRole = await JobRole.findOne({ title });
    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: "Job role with this title already exists"
      });
    }

    const jobRole = await JobRole.create({
      title,
      category,
      description,
      requiredSkills,
      industryStandards,
      salaryRange,
      growthProspects,
      marketDemand,
      learningResources,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Job role created successfully",
      data: jobRole
    });
  } catch (error) {
    console.error("❌ Create job role error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create job role",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all job roles
// @route   GET /api/job-roles
// @access  Public
export const getAllJobRoles = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};

    // Public routes don't have req.user. Admin routes have req.user from auth middleware.
    if (!req.user) {
      query.isActive = true;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const jobRoles = await JobRole.find(query)
      .populate('createdBy', 'name email')
      .sort({ title: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await JobRole.countDocuments(query);

    res.status(200).json({
      success: true,
      count: jobRoles.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: jobRoles
    });
  } catch (error) {
    console.error("❌ Get job roles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job roles"
    });
  }
};

// @desc    Get job role by ID
// @route   GET /api/job-roles/:id
// @access  Public
export const getJobRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job role ID"
      });
    }

    const jobRole = await JobRole.findById(id)
      .populate('createdBy', 'name email')
      .select('-__v');

    if (!jobRole) {
      return res.status(404).json({
        success: false,
        message: "Job role not found"
      });
    }

    res.status(200).json({
      success: true,
      data: jobRole
    });
  } catch (error) {
    console.error("❌ Get job role by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job role"
    });
  }
};

// @desc    Update job role
// @route   PUT /api/job-roles/:id
// @access  Private/Admin
export const updateJobRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job role ID"
      });
    }

    const jobRole = await JobRole.findByIdAndUpdate(
      id,
      {
        ...req.body,
        lastUpdated: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    ).select('-__v');

    if (!jobRole) {
      return res.status(404).json({
        success: false,
        message: "Job role not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job role updated successfully",
      data: jobRole
    });
  } catch (error) {
    console.error("❌ Update job role error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update job role"
    });
  }
};

// @desc    Delete job role (soft delete)
// @route   DELETE /api/job-roles/:id
// @access  Private/Admin
export const deleteJobRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job role ID"
      });
    }

    const jobRole = await JobRole.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!jobRole) {
      return res.status(404).json({
        success: false,
        message: "Job role not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job role deleted successfully"
    });
  } catch (error) {
    console.error("❌ Delete job role error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete job role"
    });
  }
};

// @desc    Get popular job roles (based on resume analysis frequency)
// @route   GET /api/job-roles/popular
// @access  Public
export const getPopularJobRoles = async (req, res) => {
  try {
    // This would typically aggregate from Resume model
    // For now, return active roles sorted by title
    const popularRoles = await JobRole.find({ isActive: true })
      .sort({ title: 1 })
      .limit(10)
      .select('title category description requiredSkills.skill');

    res.status(200).json({
      success: true,
      data: popularRoles
    });
  } catch (error) {
    console.error("❌ Get popular job roles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch popular job roles"
    });
  }
};

// @desc    Get job roles by category
// @route   GET /api/job-roles/category/:category
// @access  Public
export const getJobRolesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const jobRoles = await JobRole.find({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isActive: true
    })
      .sort({ title: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('title description category requiredSkills.skill industryStandards.technology');

    const total = await JobRole.countDocuments({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isActive: true
    });

    res.status(200).json({
      success: true,
      category,
      count: jobRoles.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: jobRoles
    });
  } catch (error) {
    console.error("❌ Get job roles by category error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch job roles by category"
    });
  }
};