import React from 'react';
import { AnalysisResults } from './AnalysisResults';

export const ResumeMatching = ({ analysisData, downloadingReport, handleDownloadReport }) => {
    if (!analysisData) return null;

    return (
        <div className="animate-fade-in">
            {/* We reuse the core view of AnalysisResults here, but we can wrap it or add JD specific UI */}
            {analysisData.jobDescription ? (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-300 opacity-20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-2/3 pr-8">
                            <h2 className="text-3xl font-black mb-2 flex items-center">
                                <span className="mr-3 text-4xl">🎯</span> Job Description Match
                            </h2>
                            <p className="text-blue-100 text-lg">
                                Your resume was analyzed directly against the provided job description for the <strong className="text-white">{analysisData.targetJobRole}</strong> role.
                            </p>
                        </div>

                        <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
                            <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20 shadow-xl">
                                <div className="w-32 h-32 rounded-full border-8 border-emerald-400 flex items-center justify-center flex-col bg-slate-900/50">
                                    <span className="text-4xl font-black text-white">{analysisData.overallScore?.totalScore || 0}%</span>
                                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest mt-1">Match</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            <AnalysisResults
                analysisData={analysisData}
                downloadingReport={downloadingReport}
                handleDownloadReport={handleDownloadReport}
                showParsed={false} // Handled in ATS Simulator now ideally
            />
        </div>
    );
};
