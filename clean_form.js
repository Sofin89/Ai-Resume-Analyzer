const fs = require('fs');

const path = 'c:\\Users\\PCS\\Desktop\\resume\\resumeAnalyzer\\client\\src\\components\\SmartAnalyzeForm.jsx';
let content = fs.readFileSync(path, 'utf8');

// Remove lines that start with // (ignoring leading whitespace)
content = content.replace(/^\s*\/\/.*$/gm, '');

// Remove consecutive empty lines (more than 2)
content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync(path, content, 'utf8');
console.log('Cleaned SmartAnalyzeForm.jsx');
