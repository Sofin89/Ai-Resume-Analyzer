
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { renderResumeText } from "../utils/renderResume.jsx";

// const ResultModal = ({ isOpen, onClose, item }) => {
//   if (!isOpen || !item) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col animate-slide-up">
//         <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
//           <div>
//             <h3 className="text-2xl font-bold text-slate-800">{item.originalFileName}</h3>
//             {item.targetJobRole && (
//               <div className="flex items-center mt-2">
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
//                   🎯 Target: {item.targetJobRole}
//                 </span>
//                 <span className="text-sm text-slate-500 ml-4">
//                   {new Date(item.createdAt).toLocaleDateString('en-IN', { 
//                     weekday: 'short', 
//                     year: 'numeric', 
//                     month: 'short', 
//                     day: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </span>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={onClose}
//             className="text-slate-500 hover:text-slate-800 hover:bg-slate-200 p-2 rounded-full transition-colors duration-200"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <div className="p-6 overflow-y-auto flex-1">
//           {item.customizedText ? (
//             <div className="space-y-8">
//               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
//                 <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                   </svg>
//                   AI-Customized Resume
//                 </h4>
//                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-inner">
//                   <div className="text-sm leading-relaxed">
//                     {renderResumeText(item.customizedText)}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-8">
//               {item.originalText && (
//                 <div className="mb-8">
//                   <h4 className="text-xl font-bold text-slate-700 mb-4 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     Original Resume Text
//                   </h4>
//                   <div className="bg-gradient-to-br from-slate-50 to-slate-100 font-mono text-sm text-slate-800 border-2 border-slate-300 p-6 rounded-xl overflow-auto max-h-[300px]">
//                     {item.originalText.substring(0, 1000)}...
//                     {item.originalText.length > 1000 && (
//                       <div className="text-slate-500 text-sm mt-3">
//                         ... and {item.originalText.length - 1000} more characters
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {item.aiFeedback && (
//                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
//                   <h4 className="text-xl font-bold text-green-800 mb-6 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     AI Analysis Results
//                   </h4>
//                   <FeedbackDisplay feedback={item.aiFeedback} />
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//         <div className="p-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white rounded-b-2xl">
//           <div className="flex justify-between items-center">
//             <div className="text-sm text-slate-500">
//               {item.customizedText ? "🤖 Customized with Advanced AI" : "🔍 Analyzed with Precision AI"}
//             </div>
//             <div className="space-x-3">
//               <button
//                 onClick={onClose}
//                 className="px-5 py-2.5 bg-gradient-to-r from-slate-200 to-slate-300 text-slate-800 font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
//               >
//                 Close
//               </button>
//               {item.customizedText && (
//                 <button
//                   onClick={() => {
//                     navigator.clipboard.writeText(item.customizedText);
//                     // You can add a toast notification here
//                     alert("✅ Resume text copied to clipboard!");
//                   }}
//                   className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
//                 >
//                   Copy Resume Text
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FeedbackDisplay = ({ feedback }) => {
//   if (!feedback) return null;

//   return (
//     <div className="space-y-8">
//       {/* Target Job Role */}
//       {feedback.targetJobRole && feedback.targetJobRole !== "Inferred from resume" && (
//         <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border-2 border-purple-200">
//           <h4 className="font-bold text-purple-800 mb-2 text-lg">🎯 Targeted Role Analysis</h4>
//           <p className="text-purple-700 font-medium">{feedback.targetJobRole}</p>
//         </div>
//       )}

//       {/* Overall Score */}
//       {feedback.score && feedback.score.overall && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 text-center shadow-sm">
//             <div className="text-4xl font-black text-blue-700 mb-2">{feedback.score.overall}/10</div>
//             <div className="text-sm font-semibold text-blue-800">Overall Score</div>
//             <div className="mt-3">
//               <div className="w-full bg-blue-200 rounded-full h-2">
//                 <div 
//                   className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" 
//                   style={{ width: `${feedback.score.overall * 10}%` }}
//                 ></div>
//               </div>
//             </div>
//           </div>

//           {feedback.score.roleRelevance && (
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300 text-center shadow-sm">
//               <div className="text-4xl font-black text-purple-700 mb-2">{feedback.score.roleRelevance}/10</div>
//               <div className="text-sm font-semibold text-purple-800">Role Relevance</div>
//               <div className="mt-3">
//                 <div className="w-full bg-purple-200 rounded-full h-2">
//                   <div 
//                     className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" 
//                     style={{ width: `${feedback.score.roleRelevance * 10}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-5 rounded-xl border-2 border-slate-300 text-center shadow-sm">
//             <div className="text-3xl font-black text-slate-700 mb-2">
//               {feedback.resumeType || "Mixed"}
//             </div>
//             <div className="text-sm font-semibold text-slate-800">Resume Type</div>
//           </div>

//           <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300 text-center shadow-sm">
//             <div className="text-3xl font-black text-green-700 mb-2">
//               {feedback.jobReadinessLevel || "Ready"}
//             </div>
//             <div className="text-sm font-semibold text-green-800">Job Readiness</div>
//           </div>
//         </div>
//       )}

//       {/* Summary */}
//       {feedback.summary && (
//         <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
//           <h4 className="font-bold text-blue-800 mb-3 text-lg">Executive Summary</h4>
//           <p className="text-slate-700 leading-relaxed">{feedback.summary}</p>
//         </div>
//       )}

//       {/* Strength Areas */}
//       {feedback.strengthAreas?.length > 0 && (
//         <div className="mb-8">
//           <h4 className="font-bold text-green-700 mb-4 text-lg flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//             </svg>
//             Strength Areas
//           </h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {feedback.strengthAreas.map((strength, i) => (
//               <div key={i} className="flex items-center bg-white p-4 rounded-xl border border-green-200 shadow-sm">
//                 <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-bold mr-4 flex-shrink-0">
//                   ✓
//                 </span>
//                 <span className="text-green-700">{strength}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Skill Gaps */}
//       {feedback.skillGaps?.length > 0 && (
//         <div className="mb-8">
//           <h4 className="font-bold text-amber-700 mb-4 text-lg flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
//             </svg>
//             Skill Gaps to Address
//           </h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {feedback.skillGaps.map((gap, i) => (
//               <div key={i} className="flex items-center bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
//                 <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-800 rounded-full text-sm font-bold mr-4 flex-shrink-0">
//                   !
//                 </span>
//                 <span className="text-amber-700">{gap}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Improvement Roadmap */}
//       {feedback.improvementRoadmap?.length > 0 && (
//         <div className="mb-8">
//           <h4 className="font-bold text-blue-700 mb-4 text-lg flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//             </svg>
//             Improvement Roadmap
//           </h4>
//           <div className="space-y-3">
//             {feedback.improvementRoadmap.map((step, i) => (
//               <div key={i} className="flex items-start bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
//                 <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-bold mr-4 flex-shrink-0 mt-0.5">
//                   {i + 1}
//                 </span>
//                 <span className="text-blue-700">{step}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Keywords to Add */}
//       {feedback.keywordsToAdd?.length > 0 && (
//         <div className="mb-8">
//           <h4 className="font-bold text-indigo-700 mb-4 text-lg">Keywords to Add for ATS</h4>
//           <div className="flex flex-wrap gap-2">
//             {feedback.keywordsToAdd.map((keyword, i) => (
//               <span key={i} className="bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 border-2 border-indigo-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
//                 {keyword}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo || !userInfo.token) {
//         navigate("/login");
//         return;
//       }
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/users/profile`,
//           config
//         );
//         setProfile(data);
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//         localStorage.removeItem("userInfo");
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [navigate]);

//   const openModalWithItem = (item) => {
//     setSelectedItem(item);
//     setIsModalOpen(true);
//   };

//   const logoutHandler = () => {
//     localStorage.removeItem("userInfo");
//     navigate("/login");
//   };

//   const filteredHistory = profile?.history ? 
//     profile.history.filter(item => {
//       if (filter === "analysis") return !item.customizedText;
//       if (filter === "customized") return item.customizedText;
//       return true;
//     }) : [];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
//             <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
//           </div>
//           <p className="text-slate-600 mt-6 font-medium">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
//         {/* Animated Background */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
//           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//           {/* Header Section */}
//           <div className="mb-12">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//               <div className="flex items-center space-x-6">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30"></div>
//                   <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
//                     {profile?.name?.charAt(0).toUpperCase()}
//                   </div>
//                 </div>
//                 <div>
//                   <h1 className="text-4xl font-bold text-slate-800 mb-2">My Profile</h1>
//                   {profile && (
//                     <div className="space-y-1">
//                       <p className="text-slate-600">
//                         Welcome back, <span className="font-semibold text-blue-600">{profile.name}</span>
//                       </p>
//                       <p className="text-sm text-slate-500">{profile.email}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 <Link
//                   to="/analyze"
//                   className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   New Analysis
//                 </Link>
//                 <button
//                   onClick={logoutHandler}
//                   className="inline-flex items-center px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                   </svg>
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           {profile && profile.history.length > 0 && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//               <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-300 shadow-lg">
//                 <div className="flex items-center">
//                   <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl mr-5">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="text-4xl font-bold text-blue-700">
//                       {profile.history.length}
//                     </div>
//                     <div className="text-sm font-semibold text-blue-800">Total Activities</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-300 shadow-lg">
//                 <div className="flex items-center">
//                   <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl mr-5">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="text-4xl font-bold text-green-700">
//                       {profile.history.filter(h => !h.customizedText).length}
//                     </div>
//                     <div className="text-sm font-semibold text-green-800">Resume Analyses</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-300 shadow-lg">
//                 <div className="flex items-center">
//                   <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl mr-5">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="text-4xl font-bold text-purple-700">
//                       {profile.history.filter(h => h.customizedText).length}
//                     </div>
//                     <div className="text-sm font-semibold text-purple-800">Customized Resumes</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Activity History Section */}
//           <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
//             <div className="p-8">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//                 <h2 className="text-3xl font-bold text-slate-800 mb-4 md:mb-0">Activity History</h2>

//                 {/* Filter Buttons */}
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => setFilter("all")}
//                     className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
//                       filter === "all" 
//                       ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" 
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md"
//                     }`}
//                   >
//                     All Activities
//                   </button>
//                   <button
//                     onClick={() => setFilter("analysis")}
//                     className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
//                       filter === "analysis" 
//                       ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg" 
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md"
//                     }`}
//                   >
//                     Analyses Only
//                   </button>
//                   <button
//                     onClick={() => setFilter("customized")}
//                     className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
//                       filter === "customized" 
//                       ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg" 
//                       : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md"
//                     }`}
//                   >
//                     Customized Only
//                   </button>
//                 </div>
//               </div>

//               {profile && filteredHistory.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredHistory.map((item) => (
//                     <div
//                       key={item._id}
//                       className="group bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300"
//                     >
//                       <div className="flex flex-col h-full">
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start mb-4">
//                             <span
//                               className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
//                                 item.customizedText
//                                   ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800"
//                                   : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800"
//                               }`}
//                             >
//                               {item.customizedText ? "✨ Customized" : "🔍 Analyzed"}
//                             </span>

//                             {/* Score Badge */}
//                             {item.aiFeedback?.score?.overall && (
//                               <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
//                                 item.aiFeedback.score.overall >= 8 
//                                   ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800"
//                                   : item.aiFeedback.score.overall >= 6
//                                   ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800"
//                                   : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800"
//                               }`}>
//                                 {item.aiFeedback.score.overall}/10
//                               </span>
//                             )}
//                           </div>

//                           {/* Target Job Role */}
//                           {item.targetJobRole && (
//                             <div className="mb-4">
//                               <div className="flex items-center text-sm text-slate-600 mb-2">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                 </svg>
//                                 Target Role:
//                               </div>
//                               <span className="inline-block bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 text-sm font-medium px-4 py-2 rounded-xl border border-purple-200">
//                                 {item.targetJobRole}
//                               </span>
//                             </div>
//                           )}

//                           <h3 className="font-bold text-xl text-slate-800 mb-3 line-clamp-2">
//                             {item.originalFileName}
//                           </h3>

//                           <div className="flex items-center text-sm text-slate-400 mt-4">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                               <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                             {new Date(item.createdAt).toLocaleDateString('en-IN', { 
//                               year: 'numeric', 
//                               month: 'short', 
//                               day: 'numeric'
//                             })}
//                           </div>
//                         </div>

//                         <div className="mt-6 space-y-3">
//                           <button
//                             onClick={() => openModalWithItem(item)}
//                             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center group"
//                           >
//                             <span>View Details</span>
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                               <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//                             </svg>
//                           </button>

//                           {!item.customizedText && (
//                             <Link
//                               to="/customize"
//                               className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-3 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center text-sm group"
//                             >
//                               <span>Customize This Resume</span>
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                               </svg>
//                             </Link>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-16">
//                   <div className="inline-block p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl mb-6">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-2xl font-semibold text-slate-700 mb-3">No Activity Found</h3>
//                   <p className="text-slate-500 max-w-md mx-auto mb-8">
//                     {filter !== "all" 
//                       ? `No ${filter} activities found. Try a different filter.`
//                       : "Your analyzed and customized resumes will appear here."}
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <Link
//                       to="/analyze"
//                       className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       Analyze Resume
//                     </Link>
//                     <Link
//                       to="/customize"
//                       className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                       </svg>
//                       Customize Resume
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <ResultModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         item={selectedItem}
//       />
//     </>
//   );
// };

// export default ProfilePage;


import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { renderResumeText } from "../utils/renderResume.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';

const ResultModal = ({ isOpen, onClose, item, onDownloadReport }) => {
  if (!isOpen || !item) return null;

  const getScore = (scoreObj) => {
    if (typeof scoreObj === 'object' && scoreObj !== null) {
      return scoreObj.totalScore || 0;
    }
    return scoreObj || 0;
  };

  const renderSkillGapAnalysis = (analysis) => {
    if (!analysis) return null;

    return (
      <div className="space-y-6">
        {/* Job Readiness Score */}
        {analysis.jobReadinessScore && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-bold text-blue-800 mb-2">Job Readiness Score</h4>
                <p className="text-blue-600">How ready you are for the target role</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-blue-700">{getScore(analysis.jobReadinessScore)}/100</div>
                <div className="text-sm text-blue-600 mt-1">Score</div>
                <div className="w-48 bg-blue-200 rounded-full h-3 mt-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                    style={{ width: `${getScore(analysis.jobReadinessScore)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Extracted vs Required Skills */}
        {analysis.extractedSkills && analysis.requiredSkills && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border-2 border-green-200">
              <h4 className="font-bold text-green-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.extractedSkills.slice(0, 15).map((skill, idx) => (
                  <span key={idx} className="bg-white text-green-700 border border-green-300 px-3 py-1.5 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
                {analysis.extractedSkills.length > 15 && (
                  <span className="text-green-600 text-sm">
                    +{analysis.extractedSkills.length - 15} more
                  </span>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-blue-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.requiredSkills.slice(0, 15).map((skill, idx) => (
                  <span key={idx} className="bg-white text-blue-700 border border-blue-300 px-3 py-1.5 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
                {analysis.requiredSkills.length > 15 && (
                  <span className="text-blue-600 text-sm">
                    +{analysis.requiredSkills.length - 15} more
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Skill Matches */}
        {analysis.skillMatches && analysis.skillMatches.length > 0 && (
          <div>
            <h4 className="font-bold text-slate-800 mb-4 text-lg">Skill Analysis</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Skill</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Your Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Required Level</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {analysis.skillMatches.map((match, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{match.skill}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${match.status === 'present'
                          ? 'bg-green-100 text-green-800'
                          : match.status === 'partial'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{match.resumeMention || 'Not mentioned'}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{match.industryStandard || 'Not specified'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Missing Skills */}
        {analysis.missingSkills && analysis.missingSkills.length > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-200">
            <h4 className="font-bold text-red-800 mb-4 text-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Critical Missing Skills
            </h4>
            <div className="flex flex-wrap gap-3">
              {analysis.missingSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center bg-white p-3 rounded-xl border border-red-200 shadow-sm">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-800 rounded-full text-sm font-bold mr-3 flex-shrink-0">
                    !
                  </span>
                  <span className="text-red-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Improvement Roadmap */}
        {analysis.improvementRoadmap && analysis.improvementRoadmap.length > 0 && (
          <div>
            <h4 className="font-bold text-indigo-800 mb-6 text-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Personalized Improvement Roadmap
            </h4>
            <div className="space-y-4">
              {analysis.improvementRoadmap.map((step, idx) => (
                <div key={idx} className="flex items-start bg-white p-5 rounded-2xl border-2 border-indigo-100 shadow-sm">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    {typeof step === 'object' ? (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-indigo-700">{step.skill}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${step.priority === 'high' ? 'bg-red-100 text-red-800' :
                            step.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                            {step.priority?.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        {step.timeline && (
                          <div className="flex items-center text-sm text-indigo-600 mb-2">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Timeline: {step.timeline}
                          </div>
                        )}
                        {step.resources && step.resources.length > 0 && (
                          <div className="mt-3">
                            <div className="text-sm font-medium text-indigo-800 mb-2">Recommended Resources:</div>
                            <div className="space-y-2">
                              {step.resources.map((resource, resIdx) => (
                                <div key={resIdx} className="flex items-start text-sm text-indigo-700 bg-indigo-50 p-3 rounded-lg">
                                  <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {resource}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-indigo-700">{step}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200">
            <h4 className="font-bold text-emerald-800 mb-4 text-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Actionable Recommendations
            </h4>
            <div className="space-y-3">
              {analysis.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start bg-white p-4 rounded-xl border border-emerald-200">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold mr-4 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-emerald-700">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col animate-slide-up">
        <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">{item.originalFileName}</h3>
            {item.targetJobRole && (
              <div className="flex items-center mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                  🎯 Target: {item.targetJobRole}
                </span>
                <span className="text-sm text-slate-500 ml-4">
                  {new Date(item.createdAt).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {onDownloadReport && (
              <button
                onClick={() => onDownloadReport(item._id)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-800 hover:bg-slate-200 p-2 rounded-full transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Tabs for different views */}
          <div className="flex border-b border-slate-200 mb-6">
            <button className={`px-4 py-3 font-medium text-sm border-b-2 ${item.customizedText ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-800'}`}>
              {item.customizedText ? '✨ AI-Customized Resume' : '🔍 AI Analysis'}
            </button>
            {item.skillGapAnalysis && (
              <button className="px-4 py-3 font-medium text-sm border-b-2 border-transparent text-slate-600 hover:text-slate-800">
                📊 Skill Gap Analysis
              </button>
            )}
          </div>

          {item.customizedText ? (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
                <h4 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  AI-Customized Resume
                </h4>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-inner">
                  <div className="text-sm leading-relaxed">
                    {renderResumeText(item.customizedText)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Original Resume Preview */}
              {item.originalText && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-slate-700 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Original Resume Preview
                  </h4>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 font-mono text-sm text-slate-800 border-2 border-slate-300 p-6 rounded-xl overflow-auto max-h-[300px]">
                    {item.originalText.substring(0, 1000)}...
                    {item.originalText.length > 1000 && (
                      <div className="text-slate-500 text-sm mt-3">
                        ... and {item.originalText.length - 1000} more characters
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Skill Gap Analysis Section */}
              {item.skillGapAnalysis && (
                <div className="mb-8">
                  {renderSkillGapAnalysis(item.skillGapAnalysis)}
                </div>
              )}

              {/* AI Feedback */}
              {item.aiFeedback && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                  <h4 className="text-xl font-bold text-green-800 mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    AI Analysis Results
                  </h4>
                  <FeedbackDisplay feedback={item.aiFeedback} />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white rounded-b-2xl">
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-500">
              {item.customizedText ? "🤖 Customized with Advanced AI" : "🔍 Analyzed with Precision AI"}
            </div>
            <div className="space-x-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gradient-to-r from-slate-200 to-slate-300 text-slate-800 font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Close
              </button>
              {item.customizedText && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(item.customizedText);
                    alert("✅ Resume text copied to clipboard!");
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  Copy Resume Text
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedbackDisplay = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className="space-y-8">
      {/* Target Job Role */}
      {feedback.targetJobRole && feedback.targetJobRole !== "Inferred from resume" && (
        <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border-2 border-purple-200">
          <h4 className="font-bold text-purple-800 mb-2 text-lg">🎯 Targeted Role Analysis</h4>
          <p className="text-purple-700 font-medium">{feedback.targetJobRole}</p>
        </div>
      )}

      {/* Overall Score */}
      {feedback.score && feedback.score.overall && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-300 text-center shadow-sm">
            <div className="text-4xl font-black text-blue-700 mb-2">{feedback.score.overall}/10</div>
            <div className="text-sm font-semibold text-blue-800">Overall Score</div>
            <div className="mt-3">
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  style={{ width: `${feedback.score.overall * 10}%` }}
                ></div>
              </div>
            </div>
          </div>

          {feedback.score.roleRelevance && (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-300 text-center shadow-sm">
              <div className="text-4xl font-black text-purple-700 mb-2">{feedback.score.roleRelevance}/10</div>
              <div className="text-sm font-semibold text-purple-800">Role Relevance</div>
              <div className="mt-3">
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${feedback.score.roleRelevance * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-5 rounded-xl border-2 border-slate-300 text-center shadow-sm">
            <div className="text-3xl font-black text-slate-700 mb-2">
              {feedback.resumeType || "Mixed"}
            </div>
            <div className="text-sm font-semibold text-slate-800">Resume Type</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-300 text-center shadow-sm">
            <div className="text-3xl font-black text-green-700 mb-2">
              {feedback.jobReadinessLevel || "Ready"}
            </div>
            <div className="text-sm font-semibold text-green-800">Job Readiness</div>
          </div>
        </div>
      )}

      {/* Summary */}
      {feedback.summary && (
        <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
          <h4 className="font-bold text-blue-800 mb-3 text-lg">Executive Summary</h4>
          <p className="text-slate-700 leading-relaxed">{feedback.summary}</p>
        </div>
      )}

      {/* Strength Areas */}
      {feedback.strengthAreas?.length > 0 && (
        <div className="mb-8">
          <h4 className="font-bold text-green-700 mb-4 text-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Strength Areas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {feedback.strengthAreas.map((strength, i) => (
              <div key={i} className="flex items-center bg-white p-4 rounded-xl border border-green-200 shadow-sm">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-bold mr-4 flex-shrink-0">
                  ✓
                </span>
                <span className="text-green-700">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resume Improvements */}
      {feedback.resumeImprovements?.length > 0 && (
        <div className="mb-8">
          <h4 className="font-bold text-blue-700 mb-4 text-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Resume Improvements
          </h4>
          <div className="space-y-3">
            {feedback.resumeImprovements.map((improvement, i) => (
              <div key={i} className="flex items-start bg-white p-4 rounded-xl border border-blue-200 shadow-sm">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mr-4 flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-blue-700">{improvement}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keywords to Add */}
      {feedback.keywordsToAdd?.length > 0 && (
        <div className="mb-8">
          <h4 className="font-bold text-indigo-700 mb-4 text-lg">Keywords to Add for ATS</h4>
          <div className="flex flex-wrap gap-2">
            {feedback.keywordsToAdd.map((keyword, i) => (
              <span key={i} className="bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 border-2 border-indigo-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState("all");
  const [downloadingReports, setDownloadingReports] = useState({});
  const navigate = useNavigate();

  const getScore = (scoreObj) => {
    if (typeof scoreObj === 'object' && scoreObj !== null) {
      return scoreObj.totalScore || 0;
    }
    return scoreObj || 0;
  };

  const chartData = useMemo(() => {
    if (!profile?.history) return [];

    // Get analyses with scores and sort chronologically (oldest first for the chart)
    return profile.history
      .filter(item => !item.customizedText && item.jobReadinessScore)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .map((item, index) => ({
        name: `Analysis ${index + 1}`,
        score: getScore(item.jobReadinessScore),
        date: new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        role: item.targetJobRole || 'Generic Role'
      }));
  }, [profile?.history]);

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.token) {
        navigate("/login");
        return;
      }
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
          config
        );
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        localStorage.removeItem("userInfo");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const openModalWithItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleDownloadReport = async (analysisId) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return;

    setDownloadingReports(prev => ({ ...prev, [analysisId]: true }));

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        responseType: 'blob'
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/resume/${analysisId}/download`,
        config
      );

      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `skill-gap-report-${analysisId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download report. Please try again.");
    } finally {
      setDownloadingReports(prev => ({ ...prev, [analysisId]: false }));
    }
  };

  const filteredHistory = profile?.history ?
    profile.history.filter(item => {
      if (filter === "analysis") return !item.customizedText;
      if (filter === "customized") return item.customizedText;
      return true;
    }) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
          </div>
          <p className="text-slate-600 mt-6 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30"></div>
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                    {profile?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-800 mb-2">My Profile</h1>
                  {profile && (
                    <div className="space-y-1">
                      <p className="text-slate-600">
                        Welcome back, <span className="font-semibold text-blue-600">{profile.name}</span>
                      </p>
                      <p className="text-sm text-slate-500">{profile.email}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/job-roles"
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                  </svg>
                  Browse Job Roles
                </Link>
                <Link
                  to="/analyze"
                  className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  New Analysis
                </Link>
                <button
                  onClick={logoutHandler}
                  className="inline-flex items-center px-5 py-2.5 bg-white border-2 border-slate-300 text-slate-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          {profile && profile.history.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl mr-5">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-blue-700">
                      {profile.history.length}
                    </div>
                    <div className="text-sm font-semibold text-blue-800">Total Activities</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl mr-5">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-700">
                      {profile.history.filter(h => !h.customizedText).length}
                    </div>
                    <div className="text-sm font-semibold text-green-800">Resume Analyses</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl mr-5">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-700">
                      {profile.history.filter(h => h.customizedText).length}
                    </div>
                    <div className="text-sm font-semibold text-purple-800">Customized Resumes</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Chart Section */}
          {chartData.length > 1 && (
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden mb-12 p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Resume Score Progression
              </h2>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                      formatter={(value, name, props) => [`${value}/100`, `Score for ${props.payload.role}`]}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#4f46e5"
                      strokeWidth={4}
                      dot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#ec4899', stroke: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recommended Roles */}
          {profile?.preferredJobRoles && profile.preferredJobRoles.length > 0 && (
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden mb-12 p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Targeted Career Paths
              </h2>
              <div className="flex flex-wrap gap-3">
                {profile.preferredJobRoles.map((role, idx) => (
                  <span key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200 px-5 py-2.5 rounded-xl font-medium shadow-sm flex items-center">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mr-3"></span>
                    {role}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Activity History Section */}
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4 md:mb-0">Activity History</h2>

                {/* Filter Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${filter === "all"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md"
                      }`}
                  >
                    All Activities
                  </button>
                  <button
                    onClick={() => setFilter("analysis")}
                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${filter === "analysis"
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md"
                      }`}
                  >
                    Analyses Only
                  </button>
                  <button
                    onClick={() => setFilter("customized")}
                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${filter === "customized"
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md"
                      }`}
                  >
                    Customized Only
                  </button>
                </div>
              </div>

              {profile && filteredHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHistory.map((item) => (
                    <div
                      key={item._id}
                      className="group bg-gradient-to-br from-white to-slate-50 p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${item.customizedText
                                ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800"
                                : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800"
                                }`}
                            >
                              {item.customizedText ? "✨ Customized" : "🔍 Analyzed"}
                            </span>

                            {/* Job Readiness Score Badge */}
                            {item.jobReadinessScore && (
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getScore(item.jobReadinessScore) >= 80
                                ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800"
                                : getScore(item.jobReadinessScore) >= 60
                                  ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800"
                                  : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800"
                                }`}>
                                {getScore(item.jobReadinessScore)}/100
                              </span>
                            )}
                          </div>

                          {/* Target Job Role */}
                          {item.targetJobRole && (
                            <div className="mb-4">
                              <div className="flex items-center text-sm text-slate-600 mb-2">
                                <svg className="h-4 w-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Target Role:
                              </div>
                              <span className="inline-block bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 text-sm font-medium px-4 py-2 rounded-xl border border-purple-200">
                                {item.targetJobRole}
                              </span>
                            </div>
                          )}

                          <h3 className="font-bold text-xl text-slate-800 mb-3 line-clamp-2">
                            {item.originalFileName}
                          </h3>

                          {/* Skill Gap Stats */}
                          {item.skillGapAnalysis && (
                            <div className="mb-4">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="text-center p-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                                  <div className="text-sm font-bold text-blue-700">
                                    {item.skillGapAnalysis.extractedSkills?.length || 0}
                                  </div>
                                  <div className="text-xs text-blue-600">Your Skills</div>
                                </div>
                                <div className="text-center p-2 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                                  <div className="text-sm font-bold text-green-700">
                                    {item.skillGapAnalysis.missingSkills?.length || 0}
                                  </div>
                                  <div className="text-xs text-green-600">Missing Skills</div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center text-sm text-slate-400 mt-4">
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {new Date(item.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <button
                            onClick={() => openModalWithItem(item)}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center group"
                          >
                            <span>View Details</span>
                            <svg className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          <div className="grid grid-cols-2 gap-3">
                            {!item.customizedText && (
                              <Link
                                to="/customize"
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-2 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center text-sm group"
                              >
                                <span>Customize</span>
                                <svg className="h-3 w-3 ml-1 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                              </Link>
                            )}

                            {!item.customizedText && (
                              <button
                                onClick={() => handleDownloadReport(item._id)}
                                disabled={downloadingReports[item._id]}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center text-sm disabled:opacity-50"
                              >
                                {downloadingReports[item._id] ? (
                                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <>
                                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    PDF Report
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-block p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl mb-6">
                    <svg className="h-16 w-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-700 mb-3">No Activity Found</h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-8">
                    {filter !== "all"
                      ? `No ${filter} activities found. Try a different filter.`
                      : "Your analyzed and customized resumes will appear here."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/job-roles"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                      Browse Job Roles
                    </Link>
                    <Link
                      to="/analyze"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Analyze Resume
                    </Link>
                    <Link
                      to="/customize"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Customize Resume
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        onDownloadReport={handleDownloadReport}
      />
    </>
  );
};

export default ProfilePage;