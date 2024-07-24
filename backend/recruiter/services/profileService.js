const globalValidator = require("../../Utils/globalValidators");
const findRecruiterByID = require("../db/findRecruiterByID");
const updateRecruiterByID = require("../db/updateRecruiterByID");
const updateRecruiterValidator = require("../validators/updateRecruiterValidator");

const updateProfileService = async (authId, updatedDetails) => {
  if (globalValidator(updateRecruiterValidator, updatedDetails)) {
    const updatedRecruiterDetails = await updateRecruiterByID(
      authId,
      updatedDetails
    );
    return updatedRecruiterDetails;
  }
};

const viewProfileSevice = async (id) => {
  const recruiter = await findRecruiterByID(id);
  return recruiter;
};

module.exports = { updateProfileService, viewProfileSevice };
