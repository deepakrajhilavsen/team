const Recruiter = require("../model/recruiterModel");

const updateRecruiterByID = async (authId, updatedDetails) => {
  const updatedRecruiterDetails = await Recruiter.findOneAndUpdate(
    { authId },
    { ...updatedDetails },
    { new: true }
  );
  return updatedRecruiterDetails;
};

module.exports = updateRecruiterByID;
