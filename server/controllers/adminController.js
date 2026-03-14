import User from "../models/userModel.js";
import Resume from "../models/resumeModel.js";
import JobRole from "../models/jobRoleModel.js";

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getAdminDashboard = async (req, res) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments();
    const totalResumes = await Resume.countDocuments();
    const totalJobRoles = await JobRole.countDocuments({ isActive: true });
    const activeUsers = await User.countDocuments({ isActive: true });

    // Recent activities
    const recentResumes = await Resume.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('originalFileName targetJobRole jobReadinessScore createdAt');

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt isActive');

    // Job readiness distribution
    const scoreDistribution = await Resume.aggregate([
      {
        $addFields: {
          normalizedScore: {
            $cond: {
              if: { $eq: [{ $type: "$jobReadinessScore" }, "object"] },
              then: "$jobReadinessScore.totalScore",
              else: "$jobReadinessScore"
            }
          }
        }
      },
      {
        $bucket: {
          groupBy: "$normalizedScore",
          boundaries: [0, 30, 50, 70, 85, 101],
          default: "Other",
          output: {
            count: { $sum: 1 },
            avgScore: { $avg: "$normalizedScore" }
          }
        }
      }
    ]);

    // Top job roles by analysis count
    const topJobRoles = await Resume.aggregate([
      { $match: { targetJobRole: { $ne: "" } } },
      { $group: { _id: "$targetJobRole", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalResumes,
          totalJobRoles,
          activeUsers,
          avgJobReadiness: scoreDistribution.reduce((acc, curr) => acc + (curr.avgScore || 0), 0) / scoreDistribution.length
        },
        recentActivities: {
          resumes: recentResumes,
          users: recentUsers
        },
        analytics: {
          scoreDistribution,
          topJobRoles
        }
      }
    });
  } catch (error) {
    console.error("❌ Admin dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data"
    });
  }
};

// @desc    Get all users (admin view)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = "" } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    // Get resume count for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const resumeCount = await Resume.countDocuments({ user: user._id });
        const avgScore = await Resume.aggregate([
          { $match: { user: user._id } },
          {
            $addFields: {
              normalizedScore: {
                $cond: {
                  if: { $eq: [{ $type: "$jobReadinessScore" }, "object"] },
                  then: "$jobReadinessScore.totalScore",
                  else: "$jobReadinessScore"
                }
              }
            }
          },
          { $match: { normalizedScore: { $gt: 0 } } },
          { $group: { _id: null, avgScore: { $avg: "$normalizedScore" } } }
        ]);

        return {
          ...user.toObject(),
          resumeCount,
          avgJobReadiness: avgScore[0]?.avgScore || 0
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        users: usersWithStats,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalUsers: total
        }
      }
    });
  } catch (error) {
    console.error("❌ Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users"
    });
  }
};

// @desc    Get all resumes (admin view)
// @route   GET /api/admin/resumes
// @access  Private/Admin
export const getAllResumes = async (req, res) => {
  try {
    const { page = 1, limit = 20, minScore = 0, maxScore = 100 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Use aggregation pipeline to handle Mixed-type jobReadinessScore
    // (can be an object {totalScore: N} or a plain number N)
    const pipeline = [
      // Step 1: Normalize the score field
      {
        $addFields: {
          normalizedScore: {
            $cond: {
              if: { $eq: [{ $type: "$jobReadinessScore" }, "object"] },
              then: "$jobReadinessScore.totalScore",
              else: "$jobReadinessScore"
            }
          }
        }
      },
      // Step 2: Filter by normalized score range
      {
        $match: {
          normalizedScore: { $gte: parseFloat(minScore), $lte: parseFloat(maxScore) }
        }
      },
      // Step 3: Sort by newest first
      { $sort: { createdAt: -1 } },
      // Step 4: Use $facet to get paginated results + stats in one query
      {
        $facet: {
          resumes: [
            { $skip: skip },
            { $limit: parseInt(limit) },
            // Populate user info
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [{ $project: { name: 1, email: 1 } }]
              }
            },
            { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
            // Exclude heavy text fields
            {
              $project: {
                originalText: 0,
                "aiFeedback.skillMatches": 0,
                "skillGapAnalysis.skillMatches": 0
              }
            }
          ],
          stats: [
            {
              $group: {
                _id: null,
                avgScore: { $avg: "$normalizedScore" },
                maxScore: { $max: "$normalizedScore" },
                minScore: { $min: "$normalizedScore" },
                total: { $sum: 1 }
              }
            }
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      }
    ];

    const [result] = await Resume.aggregate(pipeline);

    const resumes = result.resumes || [];
    const stats = result.stats[0] || { avgScore: 0, maxScore: 0, minScore: 0, total: 0 };
    const total = result.totalCount[0]?.count || 0;

    res.status(200).json({
      success: true,
      data: {
        resumes,
        stats,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalResumes: total
        }
      }
    });
  } catch (error) {
    console.error("❌ Get all resumes error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes"
    });
  }
};

// @desc    Get system analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
export const getSystemAnalytics = async (req, res) => {
  try {
    // Daily analysis count (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyAnalysis = await Resume.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $addFields: {
          normalizedScore: {
            $cond: {
              if: { $eq: [{ $type: "$jobReadinessScore" }, "object"] },
              then: "$jobReadinessScore.totalScore",
              else: "$jobReadinessScore"
            }
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
          avgScore: { $avg: "$normalizedScore" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // User registration trend
    const userRegistration = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } },
      { $limit: 12 }
    ]);

    // Job role popularity
    const jobRolePopularity = await Resume.aggregate([
      { $match: { targetJobRole: { $ne: "", $exists: true } } },
      { $group: { _id: "$targetJobRole", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Score distribution
    const scoreDistribution = await Resume.aggregate([
      {
        $addFields: {
          normalizedScore: {
            $cond: {
              if: { $eq: [{ $type: "$jobReadinessScore" }, "object"] },
              then: "$jobReadinessScore.totalScore",
              else: "$jobReadinessScore"
            }
          }
        }
      },
      {
        $bucket: {
          groupBy: "$normalizedScore",
          boundaries: [0, 30, 50, 70, 85, 101],
          default: "Other",
          output: {
            count: { $sum: 1 },
            avgScore: { $avg: "$normalizedScore" }
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        dailyAnalysis,
        userRegistration,
        jobRolePopularity,
        scoreDistribution,
        summary: {
          totalAnalyses: dailyAnalysis.reduce((acc, curr) => acc + curr.count, 0),
          avgDailyAnalyses: (dailyAnalysis.reduce((acc, curr) => acc + curr.count, 0) / 30).toFixed(1),
          mostPopularRole: jobRolePopularity[0]?._id || "N/A"
        }
      }
    });
  } catch (error) {
    console.error("❌ System analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch system analytics"
    });
  }
};

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:userId/toggle-status
// @access  Private/Admin
export const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Prevent deactivating admin users
    if (user.isAdmin && req.user._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Cannot deactivate another admin user"
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error("❌ Toggle user status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle user status"
    });
  }
};