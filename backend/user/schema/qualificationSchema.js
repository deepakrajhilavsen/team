const { default: mongoose } = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    qualification: {
      type: String,
      enum: ["UG", "PG"],
    },
    specification: {
      type: String,
    },
  },
  { _id: false }
);

module.exports = qualificationSchema;
