import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

export const InterviewPrep = ({ analysisId, targetJobRole }) => {
    const [questionsData, setQuestionsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleGenerate = async () => {
        setLoading(true);
        setQuestionsData(null);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/resume/generate-questions`,
                { analysisId },
                config
            );

            if (response.data.success) {
                setQuestionsData(response.data.data);
            } else {
                toast.error("Failed to generate questions.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while generating questions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
                        <span className="mr-2">🗣️</span> AI Interview Preparation
                    </h3>
                    <p className="text-slate-600">
                        Generate tailored interview questions based on your specific resume and target role.
                    </p>
                </div>
                {!questionsData && (
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            "Generate Questions"
                        )}
                    </button>
                )}
            </div>

            {questionsData && questionsData.questions && (
                <div className="space-y-6 animate-fade-in">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6 text-indigo-800">
                        Questions generated for: <span className="font-bold">{questionsData.targetJobRole || targetJobRole}</span>
                    </div>

                    <div className="grid gap-6">
                        {questionsData.questions.map((q, idx) => (
                            <div key={idx} className="p-5 border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors shadow-sm">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider
                    ${q.type?.toLowerCase().includes('behavioral') ? 'bg-purple-100 text-purple-700' :
                                            q.type?.toLowerCase().includes('technical') ? 'bg-blue-100 text-blue-700' :
                                                'bg-emerald-100 text-emerald-700'}`}
                                    >
                                        {q.type}
                                    </span>
                                    {q.difficulty && (
                                        <span className="text-xs text-slate-500 font-medium">
                                            Difficulty: {q.difficulty}
                                        </span>
                                    )}
                                </div>

                                <h4 className="text-lg font-bold text-slate-800 mb-3">{q.question}</h4>

                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                    <h5 className="text-sm font-semibold text-slate-700 mb-1 flex items-center">
                                        <svg className="w-4 h-4 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        What the interviewer is looking for:
                                    </h5>
                                    <p className="text-sm text-slate-600">
                                        {q.whatInterviewerIsLookingFor}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center pt-6 border-t border-slate-200">
                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="text-indigo-600 font-semibold hover:text-indigo-800 hover:underline"
                        >
                            Regenerate Questions
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
