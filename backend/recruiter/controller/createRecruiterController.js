const asyncErrorHandler = require("../../middlewares/asyncErrorHandler");
const { REGISTER_SUCCESS } = require("../../Utils/constants");
const createRecruiterService = require("../services/createRecruiterService");

const createRecruiterController = asyncErrorHandler(async (req, res) => {
  const authId = req.user.id;
  const recruiterDetails = {
    authId,
    ...req.body,
    mobile_no: req.body.mobile_no ? String(req.body.mobile_no) : undefined,
  };

  const recruiter = await createRecruiterService(recruiterDetails);

  res
    .status(REGISTER_SUCCESS.status)
    .send({ message: REGISTER_SUCCESS.message, recruiterDetails: recruiter });
});

module.exports = createRecruiterController;
