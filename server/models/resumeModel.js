// import mongoose from "mongoose"; // line 27

// const resumeSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "User",
//   },
//   originalFileName: {
//     type: String,
//     required: true,
//   },
//   originalText: {
//     type: String, 
//   },
//   customizedText: {
//     type: String, 
//   },
//   aiFeedback: {
//     type: mongoose.Schema.Types.Mixed,
//   },
// }, {
//   timestamps: true,
// });

// const Resume = mongoose.model("Resume", resumeSchema);
// export default Resume;




import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  originalFileName: {
    type: String,
    required: true,
  },
  originalText: {
    type: String,
  },
  customizedText: {
    type: String,
  },
  targetJobRole: {
    type: String,
    default: "",
  },
  jobDescription: {
    type: String,
    default: "",
  },
  aiFeedback: {
    type: mongoose.Schema.Types.Mixed,
  },
  skillGapAnalysis: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  improvementRoadmap: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  jobReadinessScore: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      skillsMatch: 0,
      experience: 0,
      projects: 0,
      keywords: 0,
      formatting: 0,
      impactWords: 0,
      totalScore: 0
    }
  }
}, {
  timestamps: true,
});

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;