const globalValidator = require("../../Utils/globalValidators");
const createRecruiter = require("../db/createReruiter");
const recruiterDetailsValidator = require("../validators/recruiterDetailsValidator");

const createRecruiterService = async (recruiterDetails) => {
  if (globalValidator(recruiterDetailsValidator, recruiterDetails)) {
    const recruiter = await createRecruiter(recruiterDetails);
    return recruiter;
  }
};

module.exports = createRecruiterService;
