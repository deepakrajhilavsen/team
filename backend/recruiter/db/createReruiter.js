const Recruiter = require("../model/recruiterModel");

const createRecruiter = async (recruiterDetails) => {
  const newRecruiter = new Recruiter({ ...recruiterDetails });
  const recruiter = newRecruiter.save();
  return recruiter;
};

module.exports = createRecruiter;
