import mongoose from "mongoose";

const jobRoleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job role title is required"],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Tech', 'Non-Tech', 'Hybrid'],
    required: true,
    default: 'Tech'
  },
  description: {
    type: String,
    required: [true, "Job role description is required"]
  },
  requiredSkills: [{
    skill: {
      type: String,
      required: true,
      trim: true
    },
    proficiency: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    },
    importance: {
      type: String,
      enum: ['Core', 'Important', 'Good to have'],
      default: 'Important'
    }
  }],
  industryStandards: [{
    technology: String,
    tools: [String],
    frameworks: [String],
    minimumExperience: String,
    certifications: [String]
  }],
  salaryRange: {
    entryLevel: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'INR'
      }
    },
    midLevel: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'INR'
      }
    },
    seniorLevel: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'INR'
      }
    }
  },
  growthProspects: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  marketDemand: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  learningResources: [{
    title: String,
    type: {
      type: String,
      enum: ['Course', 'Tutorial', 'Book', 'Documentation', 'Project']
    },
    url: String,
    duration: String,
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    free: {
      type: Boolean,
      default: false
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total skills count
jobRoleSchema.virtual('totalSkills').get(function() {
  return this.requiredSkills.length;
});

// Virtual for core skills
jobRoleSchema.virtual('coreSkills').get(function() {
  return this.requiredSkills
    .filter(skill => skill.importance === 'Core')
    .map(skill => skill.skill);
});

const JobRole = mongoose.model('JobRole', jobRoleSchema);

export default JobRole;