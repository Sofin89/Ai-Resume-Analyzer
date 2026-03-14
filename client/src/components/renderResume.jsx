import React from "react";

export const renderResumeText = (text, jobDesc = "") => {
  if (!text) return null;

  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const elements = [];

  lines.forEach((line, index) => {
    // Check for section headings (## HEADING ##)
    const headingMatch = line.match(/^##\s*(.+?)\s*##$/);
    if (headingMatch) {
      elements.push(
        <h2
          key={`heading-${index}`}
          className="text-lg font-bold text-slate-800 mt-6 mb-3 pb-2 border-b border-slate-200"
        >
          {headingMatch[1]}
        </h2>
      );
      return;
    }

    // Check for dates (likely following an institution/company)
    const dateMatch = line.match(/^\d{4}\s*[-–]\s*\d{4}$/);
    if (dateMatch) {
      elements.push(
        <div key={`date-${index}`} className="text-sm text-slate-500 italic mb-2">
          {line}
        </div>
      );
      return;
    }

    // Check for bullet points
    if (line.startsWith("- ")) {
      elements.push(
        <li
          key={`bullet-${index}`}
          className="flex items-start text-slate-700 mb-2"
        >
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
          <span>{line.substring(2)}</span>
        </li>
      );
      return;
    }

    // Check if line looks like a title/company
    const isBold =
      line.length > 2 &&
      !line.startsWith("-") &&
      !line.includes("@") &&
      !line.match(/^\d/);

    if (isBold && !line.includes("://")) {
      elements.push(
        <div
          key={`bold-${index}`}
          className="font-semibold text-slate-800 mt-4 mb-1"
        >
          {line}
        </div>
      );
      return;
    }

    // Regular paragraph
    if (line.trim()) {
      elements.push(
        <p key={`para-${index}`} className="text-slate-600 mb-3 leading-relaxed">
          {line}
        </p>
      );
    }
  });

  // Add job description context if provided
  if (jobDesc) {
    elements.unshift(
      <div key="job-desc-note" className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-700 font-medium">Customized for Job Description</p>
            <p className="text-xs text-blue-600 mt-1">This resume has been tailored to match the provided job requirements.</p>
          </div>
        </div>
      </div>
    );
  }

  return <div className="space-y-4">{elements}</div>;
};