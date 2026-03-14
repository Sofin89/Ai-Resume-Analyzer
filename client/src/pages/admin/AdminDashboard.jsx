import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { Link } from "react-router-dom";
import { showError, showSuccess } from "../../utils/toast";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    fetchRecentActivities();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");
      setDashboardData(data.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      showError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const { data } = await axios.get("/api/admin/analytics");
      setRecentActivities(data.data.dailyAnalysis || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const quickStats = [
    {
      title: "Total Users",
      value: dashboardData?.stats?.totalUsers || 0,
      icon: "👥",
      color: "from-blue-500 to-cyan-500",
      link: "/admin/users"
    },
    {
      title: "Resumes Analyzed",
      value: dashboardData?.stats?.totalResumes || 0,
      icon: "📄",
      color: "from-green-500 to-emerald-500",
      link: "/admin/resumes"
    },
    {
      title: "Job Roles",
      value: dashboardData?.stats?.totalJobRoles || 0,
      icon: "🎯",
      color: "from-purple-500 to-pink-500",
      link: "/admin/job-roles"
    },
    {
      title: "Avg. Score",
      value: dashboardData?.stats?.avgJobReadiness?.toFixed(1) || "0.0",
      icon: "⭐",
      color: "from-amber-500 to-orange-500",
      link: "/admin/analytics"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
          </div>
          <p className="text-slate-600 mt-6 font-medium">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Admin Dashboard</h1>
          <p className="text-slate-600">Manage your AI Resume Analyzer platform</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {quickStats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white text-2xl`}>
                    {stat.icon}
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.title}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 4.201a4 4 0 01-5.5-5.5" />
              </svg>
              Recent Users
            </h3>
            <div className="space-y-4">
              {dashboardData?.recentActivities?.users?.slice(0, 5).map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mr-4">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{user.name}</div>
                      <div className="text-sm text-slate-500">{user.email}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${user.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    }`}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to="/admin/users"
              className="mt-6 block text-center py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors"
            >
              View All Users
            </Link>
          </div>

          {/* Recent Analyses */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Analyses
            </h3>
            <div className="space-y-4">
              {dashboardData?.recentActivities?.resumes?.slice(0, 5).map((resume, index) => (
                <div key={index} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-slate-800 truncate">{resume.originalFileName}</div>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${(typeof resume.jobReadinessScore === 'object' ? resume.jobReadinessScore?.totalScore || 0 : resume.jobReadinessScore || 0) >= 80
                        ? "bg-green-100 text-green-800"
                        : (typeof resume.jobReadinessScore === 'object' ? resume.jobReadinessScore?.totalScore || 0 : resume.jobReadinessScore || 0) >= 60
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                      {typeof resume.jobReadinessScore === 'object' ? resume.jobReadinessScore?.totalScore || 0 : resume.jobReadinessScore || 0}/100
                    </span>
                  </div>
                  <div className="text-sm text-slate-500 mb-2">
                    {resume.user?.name || "Unknown User"} • {resume.targetJobRole || "No Role"}
                  </div>
                  <div className="text-xs text-slate-400">
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/admin/resumes"
              className="mt-6 block text-center py-3 bg-gradient-to-r from-green-50 to-green-100 text-green-700 font-medium rounded-lg hover:bg-green-100 transition-colors"
            >
              View All Analyses
            </Link>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/job-roles"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-purple-600">Manage Job Roles</h3>
            </div>
            <p className="text-slate-600 mb-4">Add, edit or remove job roles and their required skills</p>
            <span className="text-purple-600 font-medium">Manage →</span>
          </Link>

          <Link
            to="/admin/analytics"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600">View Analytics</h3>
            </div>
            <p className="text-slate-600 mb-4">Detailed analytics and insights about platform usage</p>
            <span className="text-blue-600 font-medium">View Reports →</span>
          </Link>

          <Link
            to="/admin/settings"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-gray-500 to-slate-500 text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-gray-600">System Settings</h3>
            </div>
            <p className="text-slate-600 mb-4">Configure platform settings and preferences</p>
            <span className="text-gray-600 font-medium">Configure →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;