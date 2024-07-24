const asyncErrorHandler = require("../../middlewares/asyncErrorHandler");
const { UPDATE_SUCCESS, FETCH_SUCCESS } = require("../../Utils/constants");
const {
  updateProfileService,
  viewProfileSevice,
} = require("../services/profileService");

const updateRecruiterProfile = asyncErrorHandler(async (req, res) => {
  const authId = req.user.id;
  const updateDetails = { ...req.body };

  const updatedRecruiterDetails = await updateProfileService(
    authId,
    updateDetails
  );

  res.status(UPDATE_SUCCESS.status).send({
    message: UPDATE_SUCCESS.message,
    updatedDetails: updatedRecruiterDetails,
  });
});

const viewRecruiterProfile = asyncErrorHandler(async (req, res) => {
  const authId = req.user.id;

  const recruiter = await viewProfileSevice(authId);

  res
    .status(FETCH_SUCCESS.status)
    .send({ message: FETCH_SUCCESS.message, recruiterDetails: recruiter });
});

module.exports = { updateRecruiterProfile, viewRecruiterProfile };
