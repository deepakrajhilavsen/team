const { default: mongoose } = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  authId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
  },
  mobile_no: {
    type: Number,
    trim: true,
  },
  companyLogo: {
    type: String,
  },
});

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

module.exports = Recruiter;
