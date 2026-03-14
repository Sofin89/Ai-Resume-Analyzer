import React from 'react';
import { CheckIcon, GapIcon, InfoIcon } from './Icons';
import { SuggestionItem } from './SuggestionItem';

export const AnalysisResults = ({ analysisData, downloadingReport, handleDownloadReport, showParsed, setShowParsed }) => {
  return (
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
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Downloading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-1">
                Analysis for: <span className="text-purple-700">{analysisData.targetJobRole}</span>
              </h3>
              {analysisData.targetJobRole !== "Inferred from resume" && (
                <p className="text-blue-600">
                  This resume has been evaluated specifically for <span className="font-semibold">{analysisData.targetJobRole}</span> role
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Overall Score Display */}
      {analysisData.overallScore && analysisData.overallScore.totalScore !== undefined && (
        <div className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-300">
          <div className="text-center">
            <div className="text-6xl font-black text-blue-700 mb-2">{analysisData.overallScore.totalScore}/100</div>
            <div className="text-lg font-semibold text-blue-800 mb-4">Overall Job Readiness Score</div>
            <div className="w-full max-w-md mx-auto bg-blue-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${analysisData.overallScore.totalScore}%` }}
              ></div>
            </div>
            <div className="mt-4 text-sm text-slate-600">
              {analysisData.overallScore.totalScore >= 80 ? "🎉 Excellent! You're extremely compatible with this role" :
                analysisData.overallScore.totalScore >= 60 ? "👍 Good, but needs some tailored improvements" :
                  "📈 Needs significant improvement to match this role"}
            </div>
          </div>
        </div>
      )}

      {/* AI Feedback Display */}
      {analysisData.aiFeedback && (
        <>
          {/* Detailed ATS Score Breakdown */}
          {analysisData.overallScore && (
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Detailed Match Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 text-center">
                {Object.entries(analysisData.overallScore)
                  .filter(([key]) => key !== 'totalScore')
                  .map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-br from-slate-50 to-slate-100 p-5 rounded-xl border-2 border-slate-300 shadow-sm">
                      <div className="text-3xl font-black text-slate-700">{value}%</div>
                      <div className="text-sm font-semibold text-slate-800 mt-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 mt-3">
                        <div className="bg-slate-600 h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
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
                    {analysisData.aiFeedback.strengthAreas.map((item, idx) => (
                      <li key={idx} className="flex items-start bg-green-50 p-3 rounded-lg border border-green-200">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 rounded-full text-xs font-bold mr-3 flex-shrink-0">
                          ✓
                        </span>
                        <span className="text-green-700">{item}</span>
                      </li>
                    ))}
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
                      <li key={idx} className="flex items-start bg-amber-50 p-3 rounded-lg border border-amber-200">
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
                    {analysisData.aiFeedback.resumeImprovements.map((item, idx) => (
                      <SuggestionItem key={idx} suggestion={item} />
                    ))}
                  </div>
                </div>
              )}

              {/* Keywords to Add */}
              {analysisData.aiFeedback.keywordsToAdd?.length > 0 && (
                <div className="mb-8 p-5 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-200">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">
                    🔑 Keywords to Add for ATS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.aiFeedback.keywordsToAdd.map((keyword, idx) => (
                      <span key={idx} className="bg-white text-indigo-700 border border-indigo-300 px-3 py-1.5 rounded-full text-sm font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Words to Avoid */}
              {analysisData.aiFeedback.wordsToAvoid?.length > 0 && (
                <div className="mb-8 p-5 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                  <h3 className="text-xl font-bold text-red-800 mb-4">
                    🚫 Words to Avoid
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.aiFeedback.wordsToAvoid.map((word, idx) => (
                      <span key={idx} className="bg-white text-red-700 border border-red-300 px-3 py-1.5 rounded-full text-sm font-medium line-through">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Role Specific Advice */}
              {analysisData.aiFeedback.roleSpecificAdvice?.length > 0 && (
                <div className="mb-8 p-5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
                  <h3 className="text-xl font-bold text-teal-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Role-Specific Advice
                  </h3>
                  <div className="space-y-3">
                    {analysisData.aiFeedback.roleSpecificAdvice.map((advice, idx) => (
                      <div key={idx} className="flex items-start text-teal-700">
                        <span className="mr-2">•</span>
                        <span>{advice}</span>
                      </div>
                    ))}
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
          <h3 className="text-2xl font-bold text-slate-800 mb-6">📊 Detailed Skill Gap Analysis</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Missing Skills */}
            {analysisData.skillGapAnalysis.missingSkills && analysisData.skillGapAnalysis.missingSkills.length > 0 && (
              <div>
                <h4 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Missing Skills
                </h4>
                <div className="space-y-3">
                  {analysisData.skillGapAnalysis.missingSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-start bg-red-50 p-4 rounded-xl border border-red-200">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-800 rounded-full text-sm font-bold mr-4 flex-shrink-0">
                        !
                      </span>
                      <span className="text-red-700 font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvement Roadmap */}
            {analysisData.skillGapAnalysis.improvementRoadmap && analysisData.skillGapAnalysis.improvementRoadmap.length > 0 && (
              <div>
                <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Improvement Roadmap
                </h4>
                <div className="space-y-3">
                  {analysisData.skillGapAnalysis.improvementRoadmap.map((step, idx) => (
                    <div key={idx} className="flex items-start bg-green-50 p-4 rounded-xl border border-green-200">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-bold mr-4 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        {typeof step === 'object' ? (
                          <>
                            <span className="text-green-700 font-medium">{step.skill}</span>
                            {step.priority && (
                              <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-800">
                                {step.priority} priority
                              </span>
                            )}
                            {step.timeline && (
                              <div className="text-sm text-green-600 mt-1">⏰ Timeline: {step.timeline}</div>
                            )}
                            {step.resources && step.resources.length > 0 && (
                              <div className="text-sm text-green-600 mt-1">
                                📚 Resources: {step.resources.join(', ')}
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-green-700">{step}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
