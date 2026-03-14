import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JobRolesPage = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobRoles();
  }, []);

  const fetchJobRoles = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/job-roles`
      );
      setJobRoles(data.data || []);
    } catch (error) {
      console.error("Error fetching job roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Tech", "Non-Tech", "Hybrid"];

  const filteredJobRoles = jobRoles.filter(role => {
    const matchesCategory = selectedCategory === "All" || role.category === selectedCategory;
    const matchesSearch = role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
          </div>
          <p className="text-slate-600 mt-6 font-medium">Loading job roles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Browse Job Roles
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Explore different career paths and their required skills. Select a role to analyze your resume against it.
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search job roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-slate-700 border border-slate-300 hover:border-blue-400"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobRoles.map((role) => (
            <div
              key={role._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group"
            >
              <div className="p-6">
                {/* Category Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${role.category === "Tech"
                  ? "bg-blue-100 text-blue-800"
                  : role.category === "Non-Tech"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                  }`}>
                  {role.category}
                </span>

                {/* Role Title */}
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {role.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {role.description}
                </p>

                {/* Key Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.requiredSkills?.slice(0, 5).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
                        {skill.skill}
                      </span>
                    ))}
                    {role.requiredSkills?.length > 5 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-xs">
                        +{role.requiredSkills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Salary Range */}
                {role.salaryRange?.entryLevel && (
                  <div className="mb-6 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
                    <div className="text-sm text-slate-600">Entry Level Salary:</div>
                    <div className="text-lg font-bold text-slate-800">
                      ₹{role.salaryRange.entryLevel.min?.toLocaleString()} - ₹{role.salaryRange.entryLevel.max?.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">
                    {role.totalSkills || role.requiredSkills?.length || 0} skills
                  </span>
                  <Link
                    to="/analyze"
                    state={{
                      role: role.title,
                      description: role.description
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm"
                  >
                    Analyze for this Role
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobRoles.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl mb-6">
              <svg className="h-16 w-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-3">No job roles found</h3>
            <p className="text-slate-500 mb-8">
              Try a different search term or category
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRolesPage;