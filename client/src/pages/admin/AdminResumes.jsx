import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { showSuccess, showError } from "../../utils/toast";

const AdminResumes = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [stats, setStats] = useState(null);
    const resumesPerPage = 10;

    useEffect(() => {
        fetchResumes();
    }, [currentPage]);

    const fetchResumes = async () => {
        try {
            const { data } = await axios.get(`/api/admin/resumes?page=${currentPage}&limit=${resumesPerPage}`);
            setResumes(data.data.resumes || []);
            setTotalPages(data.data.pagination?.totalPages || 1);
            setStats(data.data.stats);
        } catch (error) {
            console.error("Error fetching resumes:", error);
            showError("Failed to load resumes");
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
                    <p className="text-slate-600 mt-6 font-medium">Loading analyses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10 flex items-center">
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
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">Analyzed Resumes</h1>
                        <p className="text-slate-600">View and manage system-wide resume analyses</p>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                        <p className="text-sm text-slate-500 mb-1">Total Analyzed</p>
                        <p className="text-3xl font-bold text-blue-600">{stats?.total || 0}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                        <p className="text-sm text-slate-500 mb-1">Avg Score</p>
                        <p className="text-3xl font-bold text-indigo-600">{stats?.avgScore?.toFixed(1) || "0.0"}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                        <p className="text-sm text-slate-500 mb-1">Max Score</p>
                        <p className="text-3xl font-bold text-green-600">{stats?.maxScore || 0}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                        <p className="text-sm text-slate-500 mb-1">Min Score</p>
                        <p className="text-3xl font-bold text-amber-600">{stats?.minScore || 0}</p>
                    </div>
                </div>

                {/* Resumes List */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">File Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Target Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Score</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Analyzed On</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {resumes.length > 0 ? (
                                    resumes.map((resume) => (
                                        <tr key={resume._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-800 flex items-center">
                                                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="truncate max-w-[200px]" title={resume.originalFileName}>
                                                        {resume.originalFileName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-800">{resume.user?.name || "Unknown"}</div>
                                                <div className="text-xs text-slate-500">{resume.user?.email || "No Email"}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {resume.targetJobRole || <span className="text-slate-400 italic">Not Specified</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${(typeof resume.jobReadinessScore === 'object' ? resume.jobReadinessScore?.totalScore || 0 : resume.jobReadinessScore || 0) >= 80
                                                    ? "bg-green-100 text-green-800"
                                                    : (typeof resume.jobReadinessScore === 'object' ? resume.jobReadinessScore?.totalScore || 0 : resume.jobReadinessScore || 0) >= 60
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-amber-100 text-amber-800"
                                                    }`}>
                                                    {typeof resume.jobReadinessScore === 'object' ? resume.jobReadinessScore?.totalScore || 0 : resume.jobReadinessScore || "0"}/100
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                {new Date(resume.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            No analyses found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-slate-200 flex justify-between items-center">
                            <div className="text-sm text-slate-600">Page {currentPage} of {totalPages}</div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 disabled:opacity-50 transition-colors"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 disabled:opacity-50 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminResumes;
