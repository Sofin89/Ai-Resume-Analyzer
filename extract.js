const fs = require('fs');
const path = require('path');

const srcPath = 'c:\\Users\\PCS\\Desktop\\resume\\resumeAnalyzer\\client\\src\\components\\SmartAnalyzeForm.jsx';
const dirPath = 'c:\\Users\\PCS\\Desktop\\resume\\resumeAnalyzer\\client\\src\\components\\SmartAnalyze';

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

const content = fs.readFileSync(srcPath, 'utf8');

// 1. Extract Icons
const iconsMatch = content.match(/const CheckIcon = \(\) => [\s\S]*?const SuggestionItem/);
const iconsCode = iconsMatch[0].replace('const SuggestionItem', '');
const exportedIconsCode = `import React from 'react';\n\n` + iconsCode.replace(/const /g, 'export const ');
fs.writeFileSync(path.join(dirPath, 'Icons.jsx'), exportedIconsCode);

// 2. Extract SuggestionItem
const suggestionMatch = content.match(/const SuggestionItem = [\s\S]*?const SmartAnalyzeForm/);
const suggestionCode = suggestionMatch[0].replace('const SmartAnalyzeForm', '');
const finalSuggestionCode = `import React from 'react';\nimport { InfoIcon } from './Icons';\n\nexport ` + suggestionCode;
fs.writeFileSync(path.join(dirPath, 'SuggestionItem.jsx'), finalSuggestionCode);

// 3. Extract AnalyzeForm
const formRegex = /<form onSubmit=\{handleSubmit\} className="space-y-6">[\s\S]*?<\/form>/;
const formCode = content.match(formRegex)[0];
const analyzeFormCode = `import React from 'react';

export const AnalyzeForm = ({
  file, setFile, targetJobRole, handleJobRoleChange, jobRoles, customJobRole, setCustomJobRole, loading, handleSubmit
}) => {
  return (
    ${formCode.replace(/\n/g, '\n    ')}
  );
};
`;
fs.writeFileSync(path.join(dirPath, 'AnalyzeForm.jsx'), analyzeFormCode);

// 4. Extract AnalysisResults
const resultsStartStr = `<div className="mt-10 pt-8 border-t border-slate-200 animate-fade-in">`;
const resultsStartIndex = content.indexOf(resultsStartStr);
// The results div ends right before `{showParsed && resumeText && (`
const resultsEndStr = `{showParsed && resumeText && (`
const resultsEndIndex = content.indexOf(resultsEndStr);

let resultsCode = content.substring(resultsStartIndex, resultsEndIndex);
// remove trailing closing tags if necessary, we just need the div structure.
// it's wrapped in {analysisData && ( ... )} so we can just grab from `<div className="mt-10` to the last `</div>` before `showParsed`

// Find the precise end of that div:
const reverseResultsMatches = resultsCode.lastIndexOf('</div>');
resultsCode = resultsCode.substring(0, reverseResultsMatches + 6);

const analysisResultsCode = `import React from 'react';
import { CheckIcon, GapIcon, InfoIcon } from './Icons';
import { SuggestionItem } from './SuggestionItem';

export const AnalysisResults = ({ analysisData, downloadingReport, handleDownloadReport }) => {
  return (
    ${resultsCode}
  );
};
`;
fs.writeFileSync(path.join(dirPath, 'AnalysisResults.jsx'), analysisResultsCode);

// 5. Extract ResumePreview
const previewRegex = /<div className="mt-8 animate-fade-in">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/; // match up to the end of the preview section
// actually let's just use string parsing
const previewStartStr = `<div className="mt-8 animate-fade-in">`;
const previewStartIndex = content.indexOf(previewStartStr);
const blankStateStartStr = `{/* No Analysis Yet Placeholder */}`;
const blankStateStartIndex = content.indexOf(blankStateStartStr);
let previewCode = content.substring(previewStartIndex, blankStateStartIndex);
const reversePreviewMatches = previewCode.lastIndexOf('</div>');
previewCode = previewCode.substring(0, reversePreviewMatches + 6);

const resumePreviewCode = `import React from 'react';
import { toast } from 'react-toastify';

export const ResumePreview = ({ resumeText }) => {
  return (
    ${previewCode}
  );
};
`;
fs.writeFileSync(path.join(dirPath, 'ResumePreview.jsx'), resumePreviewCode);

console.log("Extraction complete.");
