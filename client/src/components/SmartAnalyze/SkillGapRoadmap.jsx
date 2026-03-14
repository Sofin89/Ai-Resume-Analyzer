import React from 'react';

export const SkillGapRoadmap = ({ skillGapAnalysis }) => {
    if (!skillGapAnalysis) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
                <span className="mr-2">🛣️</span> Skill Gap Learning Roadmap
            </h3>
            <p className="text-slate-600 mb-8">
                Your tailored step-by-step plan to bridge the gap and become industry-ready.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2">
                    {/* Timeline View */}
                    <div className="relative pl-8 md:pl-0">
                        {/* Vertical Line for Desktop/Mobile */}
                        <div className="absolute left-10 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 transform md:-translate-x-1/2 rounded-full hidden sm:block"></div>

                        <div className="space-y-12">
                            {skillGapAnalysis.improvementRoadmap && skillGapAnalysis.improvementRoadmap.map((step, idx) => {
                                const isEven = idx % 2 === 0;
                                return (
                                    <div key={idx} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'justify-start' : 'justify-end'}`}>
                                        {/* Node Circle */}
                                        <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center transform -translate-x-1/2 z-10 shadow-md">
                                            <span className="text-xs font-bold text-blue-600">{idx + 1}</span>
                                        </div>

                                        {/* Content Box */}
                                        <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                            <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow relative group">
                                                {/* Connecting Arrow (Desktop) */}
                                                <div className={`hidden md:block absolute top-1/2 w-6 h-[2px] bg-blue-300 -translate-y-1/2 
                          ${isEven ? '-right-6' : '-left-6'}`}></div>

                                                {typeof step === 'object' ? (
                                                    <>
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h4 className="text-lg font-bold text-slate-800">{step.skill}</h4>
                                                            {step.priority && (
                                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full 
                                  ${step.priority.toLowerCase() === 'high' ? 'bg-red-100 text-red-700' :
                                                                        step.priority.toLowerCase() === 'medium' ? 'bg-amber-100 text-amber-700' :
                                                                            'bg-green-100 text-green-700'}`}>
                                                                    {step.priority}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {step.timeline && (
                                                            <div className="flex items-center text-sm font-medium text-indigo-600 mb-3 bg-indigo-50 px-3 py-1.5 rounded-md w-fit">
                                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                {step.timeline}
                                                            </div>
                                                        )}

                                                        {step.resources && step.resources.length > 0 && (
                                                            <div className="mt-4 pt-4 border-t border-slate-100/80">
                                                                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                                                                    <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                                                    Recommended Resources
                                                                </h5>
                                                                <ul className="space-y-1 text-sm text-slate-600">
                                                                    {step.resources.map((res, i) => (
                                                                        <li key={i} className="flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-400 before:rounded-full before:mr-2">
                                                                            {res}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-slate-700 font-medium">{step}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Missing Skills Sidebar */}
                <div className="space-y-6">
                    <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                        <h4 className="text-red-800 font-bold mb-4 flex items-center text-lg">
                            <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                            </span>
                            Critical Missing Skills
                        </h4>
                        {skillGapAnalysis.missingSkills && skillGapAnalysis.missingSkills.length > 0 ? (
                            <ul className="space-y-2">
                                {skillGapAnalysis.missingSkills.map((skill, idx) => (
                                    <li key={idx} className="flex items-center text-red-700 font-medium bg-white px-3 py-2 rounded-lg border border-red-50 shadow-sm">
                                        <span className="mr-2 text-red-400">×</span> {skill}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-100 font-medium">
                                No critical missing skills! You are well-aligned.
                            </p>
                        )}
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <h4 className="text-blue-800 font-bold mb-4 flex items-center text-lg">
                            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </span>
                            Next Steps
                        </h4>
                        <p className="text-blue-700 text-sm leading-relaxed">
                            Start with the high-priority skills at the top of your roadmap. Complete the recommended resources, build a small project incorporating each new skill, and then return to the <strong>Bullet Rewriter</strong> to add them to your resume!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
