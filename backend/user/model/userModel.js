const { default: mongoose } = require("mongoose");
const qualificationSchema = require("../schema/qualificationSchema");
const experienceSchema = require("../schema/experienceSchema");

const userSchema = new mongoose.Schema({
  authId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: Number,
    trim: true,
  },
  linkedIn: {
    type: String,
  },
  qualifications: qualificationSchema,
  jobRoles: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  experience: experienceSchema,
  preferredLocations: {
    type: [String],
  },
  profilePhoto: {
    type: String,
  },
  resume: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
