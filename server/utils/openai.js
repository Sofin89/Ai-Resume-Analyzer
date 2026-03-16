import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Function to lazy-initialize the Gemini client
let genAIInstance = null;
const getGenAI = () => {
  if (!genAIInstance) {
    let rawApiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    const apiKey = rawApiKey ? rawApiKey.replace(/^["'\s]+|["'\s]+$/g, '') : '';

    // CRITICAL FIX: The Google Gemini SDK internally checks process.env.OPENAI_BASE_URL
    // and will accidentally route requests to OpenRouter if it exists, causing a 404.
    if (process.env.OPENAI_BASE_URL) {
      delete process.env.OPENAI_BASE_URL;
    }

    if (!apiKey) {
      console.error("⚠️ GEMINI_API_KEY is missing in .env file");
    }
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance;
};

// Helper function to auto-close heavily truncated JSON outputs
const repairJSON = (str) => {
  let s = str.trim();
  if (!s) return "{}";

  let inString = false;
  let isEscape = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && !isEscape) {
      isEscape = true;
    } else {
      if (s[i] === '"' && !isEscape) {
        inString = !inString;
      }
      isEscape = false;
    }
  }
  if (inString) s += '"';

  const stack = [];
  inString = false;
  isEscape = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && !isEscape) {
      isEscape = true;
      continue;
    }
    if (s[i] === '"' && !isEscape) {
      inString = !inString;
    } else if (!inString) {
      if (s[i] === '{') stack.push('}');
      else if (s[i] === '[') stack.push(']');
      else if (s[i] === '}' || s[i] === ']') {
        if (stack.length > 0 && stack[stack.length - 1] === s[i]) {
          stack.pop();
        }
      }
    }
    isEscape = false;
  }

  while (stack.length > 0) {
    s += stack.pop();
  }
  return s;
};

// System instructions in Gemini are set differently (using systemInstruction)
const getGenerativeModel = (systemInstruction) => {
  return getGenAI().getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction,
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json",
    }
  });
};

const getTextModel = (systemInstruction) => {
  return getGenAI().getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction,
    generationConfig: {
      temperature: 0.7,
    }
  });
};

export const getOpenAIResponse = async (prompt) => {
  try {
    const model = getTextModel("You are a helpful assistant, Always reply clearly and concisely");
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Error in getOpenAIResponse:", error);
    throw new Error("❌ Failed to get AI response.");
  }
};

export const getAIReview = async (resumeText, targetJobRole = "", jobDescription = "") => {
  console.log("🔍 Received targetJobRole in getAIReview:", targetJobRole);

  let roleContext = "";
  if (jobDescription) {
    roleContext = `The user has explicitly provided a Job Description:
    
    """
    ${jobDescription}
    """
    
    You MUST evaluate the resume ONLY against this specific Job Description and the target role ${targetJobRole ? "**" + targetJobRole + "**" : "it implies"}.
    Focus your analysis, recommendations, and scoring specifically on how well the resume matches this job description.`;
  } else if (targetJobRole) {
    roleContext = "The user has explicitly selected the target job role: **" + targetJobRole + "**.\n" +
      "You MUST evaluate the resume ONLY against this role. Do NOT infer a different role from the resume.\n" +
      "Focus your analysis, recommendations, and scoring specifically on how well the resume matches THIS role.";
  } else {
    roleContext = "No job role or description is explicitly provided.\n" +
      "Step 1: Infer the MOST LIKELY target job role from the resume content.\n" +
      "Step 2: Clearly state this inferred role before evaluation.";
  }

  const prompt = `
You are an ** AI Career Intelligence Engine ** designed for an academic + industry - ready platform:
** "AI Powered Resume Skill Gap Analyzer" **.

You act as a hybrid of:
• Senior Industry Recruiter  
• Career Mentor  
• Skill Gap Analyst  

Your goal is NOT just to judge the resume,
  but to help the user understand:
✅ Where they currently stand  
✅ How job - ready they are for the TARGET ROLE  
✅ What EXACT skills they are missing for the TARGET ROLE  
✅ How to improve for the TARGET ROLE  

---

## 🎯 TARGET ROLE CONTEXT
${roleContext}

---

## 🧭 STEP 1: ROLE CLASSIFICATION
Determine whether the TARGET role is:
• Tech  
• Non - Tech  

Then apply role - appropriate evaluation standards.

---

## 🧠 STEP 2: ROLE SKILL FRAMEWORK
For the TARGET ROLE "${targetJobRole || 'Inferred from resume'}", define:
• Core skills required for this specific role(industry standard – 2025)
• Tools / technologies / competencies expected
• Experience level expectations(fresher / junior / mid / senior)

Use THIS framework to judge the resume — not generic software roles.

---

## 🔍 STEP 3: RESUME ANALYSIS(2025 STANDARD)

Evaluate strictly on:
• Skill relevance to the TARGET ROLE "${targetJobRole || 'Inferred from resume'}"
• Depth vs surface - level mentions of role - specific skills
• Real - world applicability for the target role
• Clarity and ATS compatibility
• Evidence of learning, projects, or experience relevant to target role

Avoid bias toward development roles unless the target role demands it.

---

## 📊 STEP 4: SCORING(STRICT & REALISTIC)

Use this rubric for "${targetJobRole || 'Inferred from resume'}":
  1–3  → Poor / Not Job Ready for this role  
4–6  → Beginner / Needs Improvement for this role  
7–8  → Job Ready / Competitive for this role  
9–10 → Industry Ready / Top Candidate for this role  

---

## 📦 OUTPUT FORMAT(STRICT JSON ONLY)

{
  "targetJobRole": "${targetJobRole || "Inferred from resume"}",
    "resumeType": "Tech | Non-Tech",
      "jobReadinessLevel": "Not Ready | Partially Ready | Job Ready",
        "score": {
    "skillsMatch": number,
      "experience": number,
        "projects": number,
          "keywords": number,
            "formatting": number,
              "impactWords": number
  },
  "strengthAreas": [
    "Skills or areas where the candidate meets expectations for ${targetJobRole || 'the inferred role'}"
  ],
    "skillGaps": [
      "Specific missing or weak skills REQUIRED for ${targetJobRole || 'the inferred role'}"
    ],
      "improvementRoadmap": [
        "Step-by-step skills to learn in priority order for ${targetJobRole || 'the inferred role'}",
        "Include tools, technologies, or concepts needed for ${targetJobRole || 'the inferred role'}",
        "Mention what to learn first and why for ${targetJobRole || 'the inferred role'}"
      ],
        "resumeImprovements": [
          "Exact bullet rewrites tailored for ${targetJobRole || 'the inferred role'}",
          "Avoid vague words like 'worked', 'helped'",
          "Use role-specific action verbs for ${targetJobRole || 'the inferred role'}"
        ],
          "keywordsToAdd": [
            "Role-specific ATS keywords for ${targetJobRole || 'the inferred role'}"
          ],
            "wordsToAvoid": [
              "Generic or weak resume words"
            ],
              "roleSpecificAdvice": [
                "Practical advice to become job-ready for ${targetJobRole || 'the inferred role'}"
              ]
}

---

## 📄 RESUME INPUT
"""
${resumeText}
"""
  `;

  try {
    const model = getGenerativeModel("You are a professional resume reviewer. Provide helpful suggestions strictly in JSON format. Always use the target job role provided by the user. BE EXTREMELY CONCISE. Limit array responses to a maximum of 2 items.");

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let cleaned = text;
    const startIndex = cleaned.indexOf('{');
    if (startIndex !== -1) {
      cleaned = cleaned.substring(startIndex);
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleaned);
    } catch (err) {
      console.warn("⚠️ Initial JSON parsing failed, attempting advanced auto-repair...");
      const repaired = repairJSON(cleaned);
      parsedResponse = JSON.parse(repaired);
    }

    console.log("✅ Successfully parsed AI response for role:", parsedResponse.targetJobRole || "Unknown");
    return parsedResponse;

  } catch (error) {
    console.error("❌ getAIReview ERROR:", error);
    if (error.message) console.error("Error Message:", error.message);
    if (error.stack) console.error("Error Stack:", error.stack);
    
    return {
      targetJobRole: targetJobRole || "Analysis failed",
      resumeType: "Unknown",
      jobReadinessLevel: "Analysis Failed",
      score: {
        skillsMatch: 0,
        experience: 0,
        projects: 0,
        keywords: 0,
        formatting: 0,
        impactWords: 0
      },
      strengthAreas: [`AI request failed: ${error.message || "Unknown error"}`],
      skillGaps: ["Please check server logs for detailed AI error."],
      improvementRoadmap: [],
      resumeImprovements: [],
      keywordsToAdd: [],
      wordsToAvoid: [],
      roleSpecificAdvice: []
    };
  }
};


export const getSkillGapAnalysis = async (resumeText, targetJobRole = "", jobDescription = "") => {
  let promptContext = `** TARGET JOB ROLE:**\n${targetJobRole || "Inferred from resume"} `;
  if (jobDescription) {
    promptContext += `\n\n ** JOB DESCRIPTION:**\n${jobDescription} `;
  }

  const prompt = `
You are an AI Skill Gap Analyzer for the "AI Powered Resume Skill Gap Analyzer" platform.
Your task is to analyze the resume against the target job role and specific Job Description(if provided) to identify skill gaps.

** RESUME:**
  ${resumeText}

${promptContext}

** ANALYSIS REQUIREMENTS:**
  1. Extract ALL technical and soft skills mentioned in the resume
2. Identify required skills based on the Job Description and the target job role(2025 industry standards)
3. Compare and categorize:
- Present skills(clearly mentioned with evidence)
- Partial skills(mentioned but needs improvement)
  - Missing skills(critical for the role / JD but not in resume)
4. Generate improvement roadmap with specific learning resources
5. Calculate job readiness score(0 - 100)

  ** OUTPUT FORMAT(STRICT JSON):**
    {
      "targetJobRole": "string",
      "extractedSkills": ["skill1", "skill2"],
      "requiredSkills": ["skillA", "skillB"],
      "skillMatches": [
        {
          "skill": "JavaScript",
          "status": "present", // present, partial, missing
          "resumeMention": "how it's mentioned in resume",
          "industryStandard": "expected level"
        }
      ],
      "missingSkills": ["skillX", "skillY"],
      "partialSkills": ["skillZ"],
      "jobReadinessScore": 75,
      "improvementRoadmap": [
        {
          "skill": "React.js",
          "priority": "high",
          "resources": ["FreeCodeCamp React Course", "React Documentation"],
          "timeline": "2-3 weeks"
        }
      ],
      "strengthAreas": ["Frontend Development", "Problem Solving"],
      "recommendations": [
        "Add project on GitHub showcasing API integration",
        "Learn Docker for deployment"
      ]
    }
      `;

  try {
    const model = getGenerativeModel("You are a career counselor and technical recruiter. Analyze skill gaps. Return only valid JSON. BE EXTREMELY CONCISE. Maximum 2 items per array constraint.");
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let cleaned = text;
    const startIndex = cleaned.indexOf('{');
    if (startIndex !== -1) {
      cleaned = cleaned.substring(startIndex);
    }

    try {
      const parsed = JSON.parse(cleaned);
      console.log("✅ Skill Gap Analysis completed");
      return parsed;
    } catch (e) {
      console.warn("⚠️ Skill Gap JSON parsing failed, attempting repair...");
      const repaired = repairJSON(cleaned);
      return JSON.parse(repaired);
    }
  } catch (error) {
    console.error("❌ getSkillGapAnalysis ERROR:", error);
    if (error.message) console.error("Error Message:", error.message);

    return {
      targetJobRole: targetJobRole || "Analysis failed",
      extractedSkills: [],
      requiredSkills: [],
      skillMatches: [],
      missingSkills: [],
      partialSkills: [],
      jobReadinessScore: 0,
      improvementRoadmap: [],
      strengthAreas: [`Analysis failed: ${error.message || "Unknown error"}`],
      recommendations: ["Please check backend logs for AI provider error details."]
    };
  }
};

export const rewriteResumeBullet = async (bulletText, targetJobRole = "") => {
  const promptContext = targetJobRole
    ? `Target Job Role: ** ${targetJobRole}**.`
    : "No target role provided, make it generally impactful.";

  const prompt = `
You are an expert Executive Resume Writer.Your task is to rewrite the following resume bullet point to make it highly impactful, quantifiable, and ATS - friendly.

  ${promptContext}

** Original Bullet Point:**
  "${bulletText}"

  ** Instructions:**
    1. Transform the bullet using the STAR method (Situation, Task, Action, Result) if possible, or at least emphasize the ACTION and the RESULT.
2. Ensure strong action verbs(e.g., Orchestrated, Spearheaded, Engineered) are used.
3. Quantify achievements if the original bullet implies them, or use placeholders like "[X]%" if metrics are clearly missing but necessary.
4. Keep it concise(1 - 2 lines).
5. Tailor the keywords to the target job role if provided.

** OUTPUT FORMAT(STRICT JSON ONLY):**
  {
    "original": "${bulletText}",
    "rewritten": ["Option 1 (most impactful)", "Option 2 (slightly different phrasing)", "Option 3 (concise)"],
    "improvementsMade": ["Why option 1 is better (e.g., added strong verb, clarified impact)"]
  }
    `;

  try {
    const model = getGenerativeModel("You are an expert technical resume writer. Return strictly valid JSON.");
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let cleaned = text;
    const startIndex = cleaned.indexOf('{');
    if (startIndex !== -1) {
      cleaned = cleaned.substring(startIndex);
    }

    try {
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (err) {
      console.warn("⚠️ Bullet rewrite JSON parsing failed, attempting repair...");
      const repaired = repairJSON(cleaned);
      return JSON.parse(repaired);
    }
  } catch (error) {
    console.error("❌ Bullet Rewrite Error:", error);
    return {
      original: bulletText,
      rewritten: [bulletText], // Fallback to original
      improvementsMade: ["Error generating rewrite. Please try again later."]
    };
  }
};

export const generateInterviewQuestions = async (resumeText, targetJobRole, jobDescription = "") => {
  const promptContext = jobDescription
    ? `\n\n ** Job Description:**\n${jobDescription} `
    : "";

  const prompt = `
You are an Expert Technical Interviewer and Hiring Manager.
Generate tailored interview questions based on the candidate's resume and the target job role.

  ** Target Job Role:** ${targetJobRole}
** Resume Text:** ${resumeText}
${promptContext}

** Instructions:**
  1. Generate 5 - 10 highly relevant interview questions.
2. Include a mix of:
- Behavioral questions(based on their listed experience / projects)
  - Technical / Role - Specific questions(based on their listed skills and the specific target role)
    - Scenario / Problem - Solving questions(relevant to the target job)
3. For each question, provide a brief expected answer or what the interviewer is "looking for".

** OUTPUT FORMAT(STRICT JSON ONLY):**
  {
    "targetJobRole": "${targetJobRole}",
    "questions": [
      {
        "type": "Behavioral | Technical | Scenario",
        "question": "The interview question text",
        "whatInterviewerIsLookingFor": "Brief explanation of what a good answer should cover",
        "difficulty": "Easy | Medium | Hard"
      }
    ]
  }
    `;

  try {
    const model = getGenerativeModel("You are an expert technical interviewer. Output valid JSON only.");
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let cleaned = text;
    const startIndex = cleaned.indexOf('{');
    if (startIndex !== -1) {
      cleaned = cleaned.substring(startIndex);
    }

    try {
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn("⚠️ Interview Qs JSON parsing failed, attempting repair...");
      const repaired = repairJSON(cleaned);
      return JSON.parse(repaired);
    }
  } catch (error) {
    console.error("❌ Generate Interview Questions Error:", error);
    return {
      targetJobRole: targetJobRole,
      questions: []
    };
  }
};