const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    qualification: {
      type: String,
      enum: ["UG", "PG"],
    },
    degree: {
      type: String,
    },
    specification: {
      type: String,
    },
  },
  { _id: false }
);

module.exports = qualificationSchema;
