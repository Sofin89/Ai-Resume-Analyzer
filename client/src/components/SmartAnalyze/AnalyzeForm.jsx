import React from 'react';

export const AnalyzeForm = ({
  setFile, targetJobRole, handleJobRoleChange, jobRoles, customJobRole, setCustomJobRole,
  jobDescription, setJobDescription, loading, handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="resume-upload" className="block text-sm font-medium text-slate-700 mb-2">
          Upload your resume (PDF only)
        </label>
        <input
          id="resume-upload"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
          required
        />
      </div>

      {/* Job Role Selection */}
      <div>
        <label htmlFor="target-job-role" className="block text-sm font-medium text-slate-700 mb-2">
          Target Job Role *
        </label>
        <select
          id="target-job-role"
          value={targetJobRole}
          onChange={handleJobRoleChange}
          className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition px-4 py-3"
          required
        >
          <option value="">-- Select your target job role --</option>
          {jobRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>

        {targetJobRole === "Other (Specify)" && (
          <div className="mt-3">
            <input
              type="text"
              placeholder="Please specify your target job role (e.g., AI Researcher, Game Developer, etc.)"
              value={customJobRole}
              onChange={(e) => setCustomJobRole(e.target.value)}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition px-4 py-3"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Be specific about the role you're targeting
            </p>
          </div>
        )}
      </div>

      {/* Job Description Input */}
      <div>
        <label htmlFor="job-description" className="block text-sm font-medium text-slate-700 mb-2">
          Job Description (Optional but Recommended)
        </label>
        <textarea
          id="job-description"
          rows="4"
          placeholder="Paste the job description here for a more accurate ATS match score..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition px-4 py-3"
        ></textarea>
        <p className="text-xs text-slate-500 mt-2">
          Adding a job description helps our AI tailor the skill gap analysis and ATS score directly to the company's requirements.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-3.5 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          "🔍 Analyze Resume for Target Role"
        )}
      </button>
    </form>
  );
};
