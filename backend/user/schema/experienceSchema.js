const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    experience: {
      type: String,
      enum: ["Fresher", "Student", "Experienced"],
    },
    currentJob: {
      role: String,
      company: String,
      from: Date,
      CTC: Number,
    },
    previousJobs: [
      {
        role: String,
        company: String,
      },
    ],
    yearsOfExperience: {
      type: Number,
    },
  },
  { _id: false }
);

module.exports = experienceSchema;
