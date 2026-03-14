import React from 'react';

export const ATSSimulator = ({ resumeText, aiFeedback, skillGapAnalysis }) => {
    // Mocking parsed sections based on AI feedback for visualization
    const extractedSkills = skillGapAnalysis?.extractedSkills || aiFeedback?.strengthAreas || [];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
                <span className="mr-2">🤖</span> ATS Parser Simulation
            </h3>
            <p className="text-slate-600 mb-6">
                This is how recruiting software (Applicant Tracking Systems) "sees" and parses your resume.
                Ensure your formatting allows for clean extraction.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Extracted Data View */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <h4 className="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">
                            Parsed Metadata
                        </h4>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-slate-500 block text-xs uppercase font-bold">Document Type</span>
                                <span className="font-medium text-slate-800">Standard Resume text/plain</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block text-xs uppercase font-bold">Word Count</span>
                                <span className="font-medium text-slate-800">{resumeText ? resumeText.split(/\s+/).length : 0} words</span>
                            </div>
                            <div>
                                <span className="text-slate-500 block text-xs uppercase font-bold">Readability Score</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    High Scanability
                                </span>
                            </div>
                            <div>
                                <span className="text-slate-500 block text-xs uppercase font-bold">Formatting Issues</span>
                                {aiFeedback?.score?.formatting < 5 ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                        Tables/Images detected
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                                        None (Clean Text)
                                    </span>
                                )}
                            </div>

                            <div className="pt-3 border-t border-slate-200">
                                <span className="text-slate-500 block text-xs uppercase font-bold mb-2">Detected Skills Entity Map</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {extractedSkills.map((skill, idx) => (
                                        <span key={idx} className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-xs">
                                            {typeof skill === 'string' ? skill : (skill.skill || 'Skill')}
                                        </span>
                                    ))}
                                    {extractedSkills.length === 0 && <span className="text-slate-400 italic">No exact skill matches found</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Raw Text View (Code-like) */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-800 h-full flex flex-col">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-slate-400 text-xs font-mono">parsed_output.txt</span>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-[500px] font-mono text-sm text-green-400">
                            {resumeText ? (
                                <pre className="whitespace-pre-wrap leading-relaxed">
                                    {/* Highlighting skills in the raw text if possible, otherwise just text */}
                                    {resumeText}
                                </pre>
                            ) : (
                                <span className="text-slate-500">No raw text available.</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
