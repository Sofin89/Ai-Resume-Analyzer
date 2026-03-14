import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (!storedUserInfo) {
      navigate("/login");
      return;
    }

    const parsedUserInfo = JSON.parse(storedUserInfo);
    setUserInfo(parsedUserInfo);

    // Check if user is admin
    const isAdmin = parsedUserInfo.email === "sofinmansuri0@gmail.com" || 
                    parsedUserInfo.isAdmin === true ||
                    parsedUserInfo.email.includes("admin");
    
    if (!isAdmin) {
      navigate("/");
      return;
    }

    fetchAdminStats();
  }, [navigate]);

  const fetchAdminStats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
        config
      );

      setStats(data.data);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
          </div>
          <p className="text-slate-600 mt-6 font-medium">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
              <p className="text-slate-600">
                Welcome back, <span className="font-semibold text-blue-600">{userInfo?.name}</span>
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-300 shadow-lg">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl mr-5">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-6.299a9.004 9.004 0 00-9-3m9 3v1a9.004 9.004 0 01-9 3m0 0a9.004 9.004 0 01-9-3m9 3v-1" />
                  </svg>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-700">{stats.stats.totalUsers}</div>
                  <div className="text-sm font-semibold text-blue-800">Total Users</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-300 shadow-lg">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl mr-5">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-700">{stats.stats.totalResumes}</div>
                  <div className="text-sm font-semibold text-green-800">Resume Analyses</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-300 shadow-lg">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl mr-5">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-700">{stats.stats.totalJobRoles}</div>
                  <div className="text-sm font-semibold text-purple-800">Job Roles</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border-2 border-amber-300 shadow-lg">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-xl mr-5">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-4xl font-bold text-amber-700">{Math.round(stats.stats.avgJobReadiness)}%</div>
                  <div className="text-sm font-semibold text-amber-800">Avg Readiness</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Features */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Admin Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="text-blue-500 text-2xl mb-4">📊</div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Analytics</h3>
                <p className="text-slate-600 text-sm">View detailed analytics and reports</p>
              </div>

              <div className="p-6 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="text-green-500 text-2xl mb-4">👥</div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">User Management</h3>
                <p className="text-slate-600 text-sm">Manage users and their permissions</p>
              </div>

              <div className="p-6 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="text-purple-500 text-2xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Job Roles</h3>
                <p className="text-slate-600 text-sm">Add/edit job roles and requirements</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;