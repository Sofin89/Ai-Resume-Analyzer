import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AnalyzeForm } from "./SmartAnalyze/AnalyzeForm";
import { AnalysisResults } from "./SmartAnalyze/AnalysisResults";
import { ResumePreview } from "./SmartAnalyze/ResumePreview";
import { ResumeMatching } from "./SmartAnalyze/ResumeMatching";
import { SkillGapRoadmap } from "./SmartAnalyze/SkillGapRoadmap";
import { BulletRewriter } from "./SmartAnalyze/BulletRewriter";
import { ATSSimulator } from "./SmartAnalyze/ATSSimulator";
import { InterviewPrep } from "./SmartAnalyze/InterviewPrep";

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
  "Other (Specify)"
];

const SmartAnalyzeForm = () => {
  const [file, setFile] = useState(null);
  const [targetJobRole, setTargetJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [customJobRole, setCustomJobRole] = useState("");
  const [analysisData, setAnalysisData] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [showParsed, setShowParsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState(false);
  const [analysisId, setAnalysisId] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Check for job data passed from JobRolesPage
    if (location.state) {
      const { role, description } = location.state;

      if (role) {
        // Check if the role exists in our predefined list (case-insensitive)
        const roleExists = jobRoles.find(r => r.toLowerCase() === role.toLowerCase());
        if (roleExists) {
          setTargetJobRole(roleExists);
        } else {
          setTargetJobRole("Other (Specify)");
          setCustomJobRole(role);
        }
      }

      if (description) {
        setJobDescription(description);
      }

      // Clear the state once handled to avoid re-populating on every render/navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state, jobRoles]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a PDF resume");
      return;
    }

    const finalJobRole = targetJobRole === "Other (Specify)" ? customJobRole : targetJobRole;
    if (!finalJobRole) {
      toast.error("Please select or specify your target job role");
      return;
    }

    if (!user) {
      toast.error("Please log in to analyze a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("targetJobRole", finalJobRole);
    formData.append("jobDescription", jobDescription);

    console.log("📤 Sending targetJobRole & jobDescription to backend");

    setLoading(true);
    setAnalysisData(null);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume/upload`,
        formData,
        config
      );

      console.log("✅ Received response:", response.data);

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
      console.error("Analysis error:", err);
      toast.error(err.response?.data?.message || "Something went wrong during analysis");
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

    if (!user) {
      toast.error("Please login to download report");
      return;
    }

    setDownloadingReport(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        responseType: 'blob'
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/resume/${analysisId}/download`,
        config
      );
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
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
    console.log("📊 Analysis Data:", analysisData);
    console.log("🔍 AI Feedback:", analysisData?.aiFeedback);
    console.log("🎯 Target Job Role:", analysisData?.targetJobRole);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-md p-6 sm:p-8 animate-fade-in">
      {/* Debug Button (remove in production) */}
      {analysisData && (
        <button
          onClick={debugAnalysisData}
          className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-full text-xs opacity-50 hover:opacity-100 transition-opacity"
          title="Debug Analysis Data"
        >
          🐛
        </button>
      )}

      {/* Form Section component */}
      <AnalyzeForm
        setFile={setFile}
        targetJobRole={targetJobRole}
        handleJobRoleChange={handleJobRoleChange}
        jobRoles={jobRoles}
        customJobRole={customJobRole}
        setCustomJobRole={setCustomJobRole}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        loading={loading}
        handleSubmit={handleSubmit}
      />

      {analysisData && (
        <div className="mt-10 pt-8 border-t border-slate-200 animate-fade-in">
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto gap-2 mb-8 bg-slate-50 p-2 rounded-xl border border-slate-200 hide-scrollbar">
            {[
              { id: 'overview', label: '📊 Overview & Matching' },
              { id: 'roadmap', label: '🛣️ Learning Roadmap' },
              { id: 'rewrite', label: '✍️ Bullet Rewriter' },
              { id: 'ats', label: '🤖 ATS Simulator' },
              { id: 'interview', label: '🗣️ Interview Prep' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${activeTab === tab.id
                  ? 'bg-white text-blue-700 shadow-sm border border-blue-100'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'overview' && (
              <ResumeMatching
                analysisData={analysisData}
                downloadingReport={downloadingReport}
                handleDownloadReport={handleDownloadReport}
              />
            )}
            {activeTab === 'roadmap' && (
              <SkillGapRoadmap skillGapAnalysis={analysisData?.skillGapAnalysis} />
            )}
            {activeTab === 'rewrite' && (
              <BulletRewriter targetJobRole={analysisData?.targetJobRole} />
            )}
            {activeTab === 'ats' && (
              <ATSSimulator
                resumeText={resumeText}
                aiFeedback={analysisData?.aiFeedback}
                skillGapAnalysis={analysisData?.skillGapAnalysis}
              />
            )}
            {activeTab === 'interview' && (
              <InterviewPrep
                analysisId={analysisId}
                targetJobRole={analysisData?.targetJobRole}
              />
            )}
          </div>
        </div>
      )}

      {/* No Analysis Yet Placeholder */}
      {!analysisData && !loading && (
        <div className="mt-10 text-center py-12">
          <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Ready for Analysis</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Upload your resume and select your target job role to get personalized AI feedback and skill gap analysis.
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
          <h3 className="text-xl font-semibold text-slate-700 mt-6 mb-2">Analyzing Your Resume</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Our AI is analyzing your resume against the target job role. This may take a few moments...
          </p>
        </div>
      )}
    </div>
  );
};

export default SmartAnalyzeForm;