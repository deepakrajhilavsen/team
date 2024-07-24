const findUserByID = require("../../user/db/findUserById");
const Recruiter = require("../model/recruiterModel");

const findRecruiterByID = async (id) => {
  const recruiter = await Recruiter.findOne({ authId: id });
  return recruiter;
};

module.exports = findRecruiterByID;
