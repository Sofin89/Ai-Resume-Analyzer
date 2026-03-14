import React from 'react';
import { toast } from 'react-toastify';

export const ResumePreview = ({ resumeText }) => {
  return (
    <div className="mt-8 animate-fade-in">
          <h3 className="font-semibold text-xl mb-4 text-slate-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
  );
};
