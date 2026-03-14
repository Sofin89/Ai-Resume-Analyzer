import React, { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";

const JobRoleSelector = ({ onSelect, selectedRole = "", className = "" }) => {
  const [jobRoles, setJobRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customRole, setCustomRole] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    fetchJobRoles();
  }, []);

  const fetchJobRoles = async () => {
    try {
      const { data } = await axios.get('/api/job-roles');
      setJobRoles(data.data || []);
    } catch (error) {
      console.error("Error fetching job roles:", error);
      // Fallback to default roles if API fails
      setJobRoles([
        { title: "Software Engineer" },
        { title: "Frontend Developer" },
        { title: "Backend Developer" },
        { title: "Full Stack Developer" },
        { title: "Data Scientist" },
        { title: "Machine Learning Engineer" },
        { title: "DevOps Engineer" },
        { title: "Product Manager" },
        { title: "UX/UI Designer" },
        { title: "Data Analyst" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    if (role === "custom") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      onSelect(role);
    }
  };

  const handleCustomRoleSubmit = () => {
    if (customRole.trim()) {
      onSelect(customRole.trim());
    }
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-12 bg-slate-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Select Target Job Role *
        </label>
        
        {/* Quick Select Buttons */}
        <div className="mb-4">
          <div className="text-xs text-slate-500 mb-2">Popular Roles:</div>
          <div className="flex flex-wrap gap-2">
            {jobRoles.slice(0, 6).map((role) => (
              <button
                key={role._id || role.title}
                type="button"
                onClick={() => handleRoleSelect(role.title)}
                className={`px-3 py-2 text-sm rounded-lg transition-all ${
                  selectedRole === role.title
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md"
                }`}
              >
                {role.title}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleRoleSelect("custom")}
              className="px-3 py-2 text-sm bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-lg hover:shadow-md transition-all"
            >
              + Custom
            </button>
          </div>
        </div>

        {/* Dropdown for all roles */}
        <select
          value={selectedRole === "custom" ? "" : selectedRole}
          onChange={(e) => handleRoleSelect(e.target.value)}
          className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition px-4 py-3"
        >
          <option value="">-- Browse all job roles --</option>
          {jobRoles.map((role) => (
            <option key={role._id || role.title} value={role.title}>
              {role.title}
            </option>
          ))}
          <option value="custom">Other (Specify Custom Role)</option>
        </select>
      </div>
      
      {/* Custom Role Input */}
      {showCustomInput && (
        <div className="animate-slide-up">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your custom job role (e.g., AI Researcher, Game Developer)"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              className="flex-1 rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition px-4 py-3"
            />
            <button
              type="button"
              onClick={handleCustomRoleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Use
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Be specific about the role you're targeting for better analysis
          </p>
        </div>
      )}

      {/* Selected Role Display */}
      {selectedRole && !showCustomInput && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-blue-600">Selected Role:</div>
              <div className="text-lg font-bold text-blue-800">{selectedRole}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                onSelect("");
                setShowCustomInput(false);
              }}
              className="text-slate-500 hover:text-slate-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRoleSelector;