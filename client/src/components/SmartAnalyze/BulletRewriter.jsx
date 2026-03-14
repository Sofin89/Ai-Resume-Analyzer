import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

export const BulletRewriter = ({ targetJobRole }) => {
    const [bulletText, setBulletText] = useState("");
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const { user } = useAuth();

    const handleRewrite = async (e) => {
        e.preventDefault();
        if (!bulletText.trim()) {
            toast.error("Please enter a bullet point to rewrite");
            return;
        }

        setLoading(true);
        setResults(null);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/resume/rewrite-bullet`,
                { bulletText, targetJobRole },
                config
            );

            if (response.data.success) {
                setResults(response.data.data);
            } else {
                toast.error("Failed to rewrite bullet.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while rewriting.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
                <span className="mr-2">✍️</span> AI Resume Bullet Rewriter
            </h3>
            <p className="text-slate-600 mb-6">
                Transform weak bullet points into impactful, quantified achievements tailored to {targetJobRole || 'your target role'}.
            </p>

            <form onSubmit={handleRewrite} className="mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Original Bullet Point
                    </label>
                    <textarea
                        className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        rows="3"
                        placeholder="e.g., Fixed bugs in the software and helped the team"
                        value={bulletText}
                        onChange={(e) => setBulletText(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                    {loading ? "Rewriting..." : "Rewrite Bullet"}
                </button>
            </form>

            {results && (
                <div className="mt-6 border-t border-slate-200 pt-6 animate-fade-in">
                    <h4 className="text-lg font-bold text-slate-800 mb-4">Rewritten Options</h4>
                    <div className="space-y-4">
                        {results.rewritten.map((option, idx) => (
                            <div key={idx} className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start">
                                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                </div>
                                <div className="text-slate-800 font-medium">{option}</div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(option);
                                        toast.success("Copied to clipboard!");
                                    }}
                                    className="ml-auto text-blue-500 hover:text-blue-700"
                                    title="Copy"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {results.improvementsMade && results.improvementsMade.length > 0 && (
                        <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-100">
                            <h5 className="text-sm font-bold text-green-800 mb-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Why these are better:
                            </h5>
                            <ul className="text-sm text-green-700 list-disc list-inside">
                                {results.improvementsMade.map((imp, idx) => (
                                    <li key={idx}>{imp}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
