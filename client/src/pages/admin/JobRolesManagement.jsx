import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { showSuccess, showError } from "../../utils/toast";

const JobRolesManagement = () => {
  const [jobRoles, setJobRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Tech",
    description: "",
    requiredSkills: [{ skill: "", proficiency: "Intermediate", importance: "Important" }],
    salaryRange: {
      entryLevel: {
        min: "",
        max: "",
        currency: "INR"
      }
    }
  });

  useEffect(() => {
    fetchJobRoles();
  }, []);

  const fetchJobRoles = async () => {
    try {
      const { data } = await axios.get("/api/admin/job-roles");
      setJobRoles(data.data || []);
    } catch (error) {
      console.error("Error fetching job roles:", error);
      showError("Failed to load job roles");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...formData.requiredSkills];
    updatedSkills[index][field] = value;
    setFormData({
      ...formData,
      requiredSkills: updatedSkills
    });
  };

  const addSkillField = () => {
    setFormData({
      ...formData,
      requiredSkills: [
        ...formData.requiredSkills,
        { skill: "", proficiency: "Intermediate", importance: "Important" }
      ]
    });
  };

  const removeSkillField = (index) => {
    const updatedSkills = formData.requiredSkills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      requiredSkills: updatedSkills
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRole) {
        await axios.put(`/api/admin/job-roles/${editingRole._id}`, formData);
        showSuccess("Job role updated successfully");
      } else {
        await axios.post("/api/admin/job-roles", formData);
        showSuccess("Job role added successfully");
      }
      setShowAddForm(false);
      setEditingRole(null);
      setFormData({
        title: "",
        category: "Tech",
        description: "",
        requiredSkills: [{ skill: "", proficiency: "Intermediate", importance: "Important" }],
        salaryRange: {
          entryLevel: {
            min: "",
            max: "",
            currency: "INR"
          }
        }
      });
      fetchJobRoles();
    } catch (error) {
      showError(error.response?.data?.message || "Failed to save job role");
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({
      title: role.title,
      category: role.category,
      description: role.description,
      requiredSkills: role.requiredSkills.length > 0
        ? role.requiredSkills
        : [{ skill: "", proficiency: "Intermediate", importance: "Important" }],
      salaryRange: role.salaryRange || {
        entryLevel: {
          min: "",
          max: "",
          currency: "INR"
        }
      }
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job role?")) {
      try {
        await axios.delete(`/api/admin/job-roles/${id}`);
        showSuccess("Job role deleted successfully");
        fetchJobRoles();
      } catch (error) {
        showError(error.response?.data?.message || "Failed to delete job role");
      }
    }
  };

  const handleRestore = async (id) => {
    if (window.confirm("Are you sure you want to restore this job role?")) {
      try {
        await axios.put(`/api/admin/job-roles/${id}`, { isActive: true });
        showSuccess("Job role restored successfully");
        fetchJobRoles();
      } catch (error) {
        showError(error.response?.data?.message || "Failed to restore job role");
      }
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
          <p className="text-slate-600 mt-6 font-medium">Loading job roles...</p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-4xl font-bold text-slate-800 mb-2">Job Roles Management</h1>
              <p className="text-slate-600">Manage job roles and their required skills</p>
            </div>
          </div>
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingRole(null);
              setFormData({
                title: "",
                category: "Tech",
                description: "",
                requiredSkills: [{ skill: "", proficiency: "Intermediate", importance: "Important" }],
                salaryRange: {
                  entryLevel: { min: "", max: "", currency: "INR" }
                }
              });
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            + Add New Role
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="mb-10 bg-white rounded-2xl shadow-xl border border-slate-200 p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              {editingRole ? "Edit Job Role" : "Add New Job Role"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="Tech">Tech</option>
                    <option value="Non-Tech">Non-Tech</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>

              {/* Salary Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Entry Level Min Salary
                  </label>
                  <input
                    type="number"
                    value={formData.salaryRange?.entryLevel?.min || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      salaryRange: {
                        ...formData.salaryRange,
                        entryLevel: { ...formData.salaryRange?.entryLevel, min: e.target.value }
                      }
                    })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Entry Level Max Salary
                  </label>
                  <input
                    type="number"
                    value={formData.salaryRange?.entryLevel?.max || ""}
                    onChange={(e) => setFormData({
                      ...formData,
                      salaryRange: {
                        ...formData.salaryRange,
                        entryLevel: { ...formData.salaryRange?.entryLevel, max: e.target.value }
                      }
                    })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Required Skills *
                  </label>
                  <button
                    type="button"
                    onClick={addSkillField}
                    className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    + Add Skill
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.requiredSkills.map((skill, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Skill name (e.g., React.js, Python, Project Management)"
                          value={skill.skill}
                          onChange={(e) => handleSkillChange(index, "skill", e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div className="flex gap-4">
                        <select
                          value={skill.proficiency}
                          onChange={(e) => handleSkillChange(index, "proficiency", e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                        <select
                          value={skill.importance}
                          onChange={(e) => handleSkillChange(index, "importance", e.target.value)}
                          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Core">Core</option>
                          <option value="Important">Important</option>
                          <option value="Good to have">Good to have</option>
                        </select>
                        {formData.requiredSkills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkillField(index)}
                            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingRole(null);
                  }}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  {editingRole ? "Update Role" : "Add Role"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Job Roles List */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Job Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Salary (Entry)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Skills</th>
                  <th className="px6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {jobRoles.length > 0 ? (
                  jobRoles.map((role) => (
                    <tr key={role._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">{role.title}</div>
                        <div className="text-sm text-slate-500 truncate max-w-xs">{role.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${role.category === "Tech"
                          ? "bg-blue-100 text-blue-800"
                          : role.category === "Non-Tech"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                          }`}>
                          {role.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-700 font-medium">
                          {role.salaryRange?.entryLevel?.min
                            ? `${role.salaryRange.entryLevel.currency || 'INR'} ${role.salaryRange.entryLevel.min} - ${role.salaryRange.entryLevel.max}`
                            : "Not set"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                          {role.requiredSkills?.length || 0} skills
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${role.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                          }`}>
                          {role.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEdit(role)}
                            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => role.isActive ? handleDelete(role._id) : handleRestore(role._id)}
                            className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${role.isActive
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              }`}
                          >
                            {role.isActive ? "Delete" : "Restore"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="text-slate-500">No job roles found. Add your first job role!</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </div >
  );
};

export default JobRolesManagement;