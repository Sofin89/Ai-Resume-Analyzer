import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3 flex-shrink-0 text-green-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);
const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3 flex-shrink-0 text-red-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3 flex-shrink-0 text-blue-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);
const TargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3 flex-shrink-0 text-purple-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>
);
const GapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3 flex-shrink-0 text-amber-500 mt-0.5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
const RoadmapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-3 flex-shrink-0 text-indigo-500 mt-0.5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
      clipRule="evenodd"
    />
  </svg>
);
const SuggestionItem = ({ suggestion }) => {
  const replaceWithMatch = suggestion.match(/Replace '(.+?)' with '(.+?)'/i);
  if (replaceWithMatch) {
    const before = replaceWithMatch[1];
    const after = replaceWithMatch[2];
    return (
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="flex items-start text-sm text-red-600">
          <span className="font-mono bg-red-100 p-1 rounded mr-2">-</span>
          <span className="line-through">{`'${before}'`}</span>
        </div>
        <div className="flex items-start text-sm text-green-700 mt-2">
          <span className="font-mono bg-green-100 p-1 rounded mr-2">+</span>
          <span>{`'${after}'`}</span>
        </div>
      </div>
    );
  }
  if (suggestion.includes("â†’")) {
    const parts = suggestion.split("â†’");
    const before = parts[0].replace("Replace", "").trim();
    const after = parts[1].trim();
    return (
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="flex items-center text-sm text-red-600">
          <span className="font-mono bg-red-100 p-1 rounded mr-2">-</span>
          <span className="line-through">{before}</span>
        </div>
        <div className="flex items-center text-sm text-green-700 mt-2">
          <span className="font-mono bg-green-100 p-1 rounded mr-2">+</span>
          <span>{after}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start text-slate-600">
      <InfoIcon />
      <span>{suggestion}</span>
    </div>
  );
};
const SmartAnalyzeForm = () => {
  const [file, setFile] = useState(null);
  const [targetJobRole, setTargetJobRole] = useState("");
  const [customJobRole, setCustomJobRole] = useState("");
  const [analysisData, setAnalysisData] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [showParsed, setShowParsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);
  const [analysisId, setAnalysisId] = useState("");
  const jobRoles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Product Manager",
    "UX/UI Designer",
    "Data Analyst",
    "Business Analyst",
    "Marketing Manager",
    "Sales Executive",
    "Digital Marketing Specialist",
    "Content Writer",
    "Human Resources Manager",
    "Finance Analyst",
    "Operations Manager",
    "Project Manager",
    "Cybersecurity Analyst",
    "Network Engineer",
    "Mobile App Developer",
    "QA Engineer",
    "Other (Specify)",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a PDF resume");
      return;
    }
    const finalJobRole =
      targetJobRole === "Other (Specify)" ? customJobRole : targetJobRole;
    if (!finalJobRole) {
      toast.error("Please select or specify your target job role");
      return;
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      toast.error("Please log in to analyze a resume");
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("targetJobRole", finalJobRole);
    console.log("ðŸ“¤ Sending targetJobRole to backend: ", finalJobRole);
    setLoading(true);
    setAnalysisData(null);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume/upload`,
        formData,
        config,
      );
      console.log("âœ… Received response: ", response.data);
      if (response.data.success) {
        setResumeText(response.data.data?.resumeText || "");
        setAnalysisData(response.data.data);
        setResumeUrl(response.data.data?.resumeUrl || "");
        setAnalysisId(response.data.data?.analysisId || "");
        toast.success("Resume analyzed successfully!");
      } else {
        toast.error(response.data.message || "Analysis failed");
      }
    } catch (err) {
      console.error("Analysis error: ", err);
      toast.error(
        err.response?.data?.message || "Something went wrong during analysis",
      );
    } finally {
      setLoading(false);
    }
  };
  const handleJobRoleChange = (e) => {
    setTargetJobRole(e.target.value);
    if (e.target.value !== "Other (Specify)") {
      setCustomJobRole("");
    }
  };
  const handleDownloadReport = async () => {
    if (!analysisId) {
      toast.error("No analysis found to download");
      return;
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      toast.error("Please login to download report");
      return;
    }
    setDownloadingReport(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        responseType: "blob",
      };
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/resume/${analysisId}/download`,
        config,
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `skill-gap-report-${analysisId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error(error.response?.data?.message || "Failed to download report");
    }
    setDownloadingReport(false);
  };
  const debugAnalysisData = () => {
    console.log("ðŸ“Š Analysis Data:", analysisData);
    console.log("ðŸ” AI Feedback:", analysisData?.aiFeedback);
    console.log("ðŸŽ¯ Target Job Role:", analysisData?.targetJobRole);
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 sm:p-8">
      {/* Debug Button (remove in production) */}
      {analysisData && (
        <button
          onClick={debugAnalysisData}
          className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-full text-xs opacity-50 hover:opacity-100 transition-opacity"
          title="Debug Analysis Data"
        >
          ðŸ›
        </button>
      )}
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="resume-upload"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
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
          <label
            htmlFor="target-job-role"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
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
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-3.5 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analyzing...
            </>
          ) : (
            "ðŸ” Analyze Resume for Target Role"
          )}
        </button>
      </form>
      {analysisData && (
        <div className="mt-10 pt-8 border-t border-slate-200 animate-fade-in">
          {/* Download Report Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleDownloadReport}
              disabled={downloadingReport}
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
            >
              {downloadingReport ? (
                <>
                  <svg
                    className="animate-spin-ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Complete Report (PDF)
                </>
              )}
            </button>
          </div>
          {/* Target Job Role Display */}
          {analysisData.targetJobRole && (
            <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-sm">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-1">
                    Analysis for:{" "}
                    <span className="text-purple-700">
                      {analysisData.targetJobRole}
                    </span>
                  </h3>
                  {analysisData.targetJobRole !== "Inferred from resume" && (
                    <p className="text-blue-600">
                      This resume has been evaluated specifically for{" "}
                      <span className="font-semibold">
                        {analysisData.targetJobRole}
                      </span>{" "}
                      role
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Overall Score Display */}
          {analysisData.overallScore !== undefined && (
            <div className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-300">
              <div className="text-center">
                <div className="text-6xl font-black text-blue-700 mb-2">
                  {analysisData.overallScore}/100
                </div>
                <div className="text-lg font-semibold text-blue-800 mb-4">
                  Overall Job Readiness Score
                </div>
                <div className="w-full max-w-md mx-auto bg-blue-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${analysisData.overallScore}%` }}
                  ></div>
                </div>
                <div className="mt-4 text-sm text-slate-600">
                  {analysisData.overallScore >= 80
                    ? "ðŸŽ‰ Excellent! You're job-ready"
                    : analysisData.overallScore >= 60
                      ? "ðŸ‘ Good, but needs some improvements"
                      : "ðŸ“ˆ Needs significant improvement"}
                </div>
              </div>
            </div>
          )}
          {/* AI Feedback Display */}
          {analysisData.aiFeedback && (
            <>
              {/* Score Breakdown */}
              {analysisData.aiFeedback.score && (
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">
                    Score Breakdown
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 text-center">
                    {analysisData.aiFeedback.score.overall && (
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 shadow-sm">
                        <div className="text-4xl font-black text-blue-700">
                          {analysisData.aiFeedback.score.overall}/10
                        </div>
                        <div className="text-sm font-semibold text-blue-800 mt-2 uppercase tracking-wider">
                          Overall Score
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2.5 mt-3">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{
                              width: `${analysisData.aiFeedback.score.overall * 10}% `,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {analysisData.aiFeedback.score.roleRelevance && (
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300 shadow-sm">
                        <div className="text-4xl font-black text-purple-700">
                          {analysisData.aiFeedback.score.roleRelevance}/10
                        </div>
                        <div className="text-sm font-semibold text-purple-800 mt-2 uppercase tracking-wider">
                          Role Relevance
                        </div>
                        <div className="w-full bg-purple-200 rounded-full h-2.5 mt-3">
                          <div
                            className="bg-purple-600 h-2.5 rounded-full"
                            style={{
                              width: `${analysisData.aiFeedback.score.roleRelevance * 10}% `,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {Object.entries(analysisData.aiFeedback.score)
                      .filter(
                        ([key]) => !["overall", "roleRelevance"].includes(key),
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-gradient-to-br from-slate-50 to-slate-100 p-5 rounded-xl border-2 border-slate-300 shadow-sm"
                        >
                          <div className="text-3xl font-black text-slate-700">
                            {value}/10
                          </div>
                          <div className="text-sm font-semibold text-slate-800 mt-2 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2.5 mt-3">
                            <div
                              className="bg-slate-600 h-2.5 rounded-full"
                              style={{ width: `${value * 10}% ` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  {/* Strength Areas */}
                  {analysisData.aiFeedback.strengthAreas?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                        <CheckIcon />
                        Strength Areas
                      </h3>
                      <ul className="space-y-3">
                        {analysisData.aiFeedback.strengthAreas.map(
                          (item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start bg-green-50 p-3 rounded-lg border border-green-200"
                            >
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 rounded-full text-xs font-bold mr-3 flex-shrink-0">
                                âœ“
                              </span>
                              <span className="text-green-700">{item}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                  {/* Skill Gaps */}
                  {analysisData.aiFeedback.skillGaps?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-amber-700 mb-4 flex items-center">
                        <GapIcon />
                        Skill Gaps to Address
                      </h3>
                      <ul className="space-y-3">
                        {analysisData.aiFeedback.skillGaps.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start bg-amber-50 p-3 rounded-lg border border-amber-200"
                          >
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mr-3 flex-shrink-0">
                              !
                            </span>
                            <span className="text-amber-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* Right Column */}
                <div>
                  {/* Resume Improvements */}
                  {analysisData.aiFeedback.resumeImprovements?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
                        <InfoIcon />
                        Resume Improvements
                      </h3>
                      <div className="space-y-4">
                        {analysisData.aiFeedback.resumeImprovements.map(
                          (item, idx) => (
                            <SuggestionItem key={idx} suggestion={item} />
                          ),
                        )}
                      </div>
                    </div>
                  )}
                  {/* Keywords to Add */}
                  {analysisData.aiFeedback.keywordsToAdd?.length > 0 && (
                    <div className="mb-8 p-5 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-200">
                      <h3 className="text-xl font-bold text-indigo-800 mb-4">
                        ðŸ”‘ Keywords to Add for ATS
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.aiFeedback.keywordsToAdd.map(
                          (keyword, idx) => (
                            <span
                              key={idx}
                              className="bg-white text-indigo-700 border border-indigo-300 px-3 py-1.5 rounded-full text-sm font-medium"
                            >
                              {keyword}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                  {/* Words to Avoid */}
                  {analysisData.aiFeedback.wordsToAvoid?.length > 0 && (
                    <div className="mb-8 p-5 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                      <h3 className="text-xl font-bold text-red-800 mb-4">
                        ðŸš« Words to Avoid
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.aiFeedback.wordsToAvoid.map(
                          (word, idx) => (
                            <span
                              key={idx}
                              className="bg-white text-red-700 border border-red-300 px-3 py-1.5 rounded-full text-sm font-medium line-through"
                            >
                              {word}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {/* Skill Gap Analysis Display */}
          {analysisData.skillGapAnalysis && (
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                ðŸ“Š Detailed Skill Gap Analysis
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Missing Skills */}
                {analysisData.skillGapAnalysis.missingSkills &&
                  analysisData.skillGapAnalysis.missingSkills.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                        <svg
                          className="h-5 w-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        Missing Skills
                      </h4>
                      <div className="space-y-3">
                        {analysisData.skillGapAnalysis.missingSkills.map(
                          (skill, idx) => (
                            <div
                              key={idx}
                              className="flex items-start bg-red-50 p-4 rounded-xl border border-red-200"
                            >
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-800 rounded-full text-sm font-bold mr-4 flex-shrink-0">
                                !
                              </span>
                              <span className="text-red-700 font-medium">
                                {skill}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                {/* Improvement Roadmap */}
                {analysisData.skillGapAnalysis.improvementRoadmap &&
                  analysisData.skillGapAnalysis.improvementRoadmap.length >
                    0 && (
                    <div>
                      <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                        <svg
                          className="h-5 w-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        Improvement Roadmap
                      </h4>
                      <div className="space-y-3">
                        {analysisData.skillGapAnalysis.improvementRoadmap.map(
                          (step, idx) => (
                            <div
                              key={idx}
                              className="flex items-start bg-green-50 p-4 rounded-xl border border-green-200"
                            >
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-bold mr-4 flex-shrink-0">
                                {idx + 1}
                              </span>
                              <div>
                                {typeof step === "object" ? (
                                  <>
                                    <span className="text-green-700 font-medium">
                                      {step.skill}
                                    </span>
                                    {step.priority && (
                                      <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                                        {step.priority} priority
                                      </span>
                                    )}
                                    {step.timeline && (
                                      <div className="text-sm text-green-600 mt-1">
                                        â° Timeline: {step.timeline}
                                      </div>
                                    )}
                                    {step.resources &&
                                      step.resources.length > 0 && (
                                        <div className="text-sm text-green-600 mt-1">
                                          ðŸ“š Resources:{" "}
                                          {step.resources.join(", ")}
                                        </div>
                                      )}
                                  </>
                                ) : (
                                  <span className="text-green-700">{step}</span>
                                )}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}
          {/* View Resume Button */}
          <div className="text-center mt-10 pt-6 border-t border-slate-200">
            <button
              onClick={() => setShowParsed(!showParsed)}
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {showParsed ? "Hide Uploaded Resume" : "Show Uploaded Resume"}
            </button>
          </div>
        </div>
      )}
      {showParsed && resumeText && (
        <div className="mt-8 animate-fade-in">
          <h3 className="font-semibold text-xl mb-4 text-slate-800 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Uploaded Resume Preview
          </h3>
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(resumeText);
                  toast.success("Resume text copied to clipboard!");
                }}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Copy Text
              </button>
            </div>
            <div className="whitespace-pre-wrap bg-slate-900 font-mono text-sm text-slate-100 border border-slate-700 p-6 rounded-xl overflow-auto max-h-[700px]">
              {resumeText}
            </div>
          </div>
        </div>
      )}
      {/* No Analysis Yet Placeholder */}
      {!analysisData && !loading && (
        <div className="mt-10 text-center py-12">
          <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Ready for Analysis
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Upload your resume and select your target job role to get
            personalized AI feedback and skill gap analysis.
          </p>
        </div>
      )}
      {/* Loading State */}
      {loading && !analysisData && (
        <div className="mt-10 text-center py-12">
          <div className="inline-block relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-2">
            Analyzing Your Resume
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Our AI is analyzing your resume against the target job role. This
            may take a few moments...
          </p>
        </div>
      )}
    </div>
  );
};
export default SmartAnalyzeForm;
