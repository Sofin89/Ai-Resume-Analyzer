import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30days");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const { data } = await axios.get("/api/admin/analytics");
      setAnalyticsData(data.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
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
          <p className="text-slate-600 mt-6 font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="mr-6 p-2 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all text-slate-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Go Back"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Platform Analytics</h1>
              <p className="text-slate-600">Detailed insights about platform usage and performance</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
            <div className="text-3xl font-bold text-blue-700 mb-2">
              {analyticsData?.summary?.totalAnalyses || 0}
            </div>
            <div className="text-sm text-slate-600">Total Analyses</div>
            <div className="mt-2 text-sm text-green-600">
              Avg: {analyticsData?.summary?.avgDailyAnalyses || "0.0"}/day
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
            <div className="text-3xl font-bold text-purple-700 mb-2">
              {analyticsData?.summary?.mostPopularRole || "N/A"}
            </div>
            <div className="text-sm text-slate-600">Most Popular Role</div>
            <div className="mt-2 text-sm text-slate-500">
              {analyticsData?.jobRolePopularity?.[0]?.count || 0} analyses
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
            <div className="text-3xl font-bold text-green-700 mb-2">
              {analyticsData?.userRegistration?.reduce((acc, curr) => acc + curr.count, 0) || 0}
            </div>
            <div className="text-sm text-slate-600">New Users (Last 12 Months)</div>
            <div className="mt-2 text-sm text-slate-500">
              Latest: {analyticsData?.userRegistration?.[0]?.count || 0} users
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Analysis Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Daily Analysis Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData?.dailyAnalysis || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="_id" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6' }}
                    name="Analyses Count"
                  />
                  <Line
                    type="monotone"
                    dataKey="avgScore"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6' }}
                    name="Avg Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Job Role Popularity */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Job Role Popularity</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData?.jobRolePopularity || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="_id" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Analyses Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Score Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Score Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData?.scoreDistribution || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analyticsData?.scoreDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Registration Trend */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
            <h3 className="text-lg font-bold text-slate-800 mb-6">User Registration Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData?.userRegistration || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="_id" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} name="New Users" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
