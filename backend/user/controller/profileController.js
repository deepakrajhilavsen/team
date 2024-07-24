const { UPDATE_SUCCESS, FETCH_SUCCESS } = require("../../Utils/constants");
const asyncErrorHandler = require("../../middlewares/asyncErrorHandler");
const {
  updateProfileService,
  viewProfileSevice,
} = require("../services/profileService");

const updateProfile = asyncErrorHandler(async (req, res) => {
  const authId = req.user.id;
  const updateDetails = { ...req.body };

  const updatedUserDetails = await updateProfileService(authId, updateDetails);

  res.status(UPDATE_SUCCESS.status).send({
    user: updatedUserDetails,
    message: UPDATE_SUCCESS.message,
  });
});

const viewProfile = asyncErrorHandler(async (req, res) => {
  const { id } = req.user;
  const user = await viewProfileSevice(id);

  res.status(FETCH_SUCCESS.status).send({
    user: user,
    message: FETCH_SUCCESS.message,
  });
});

module.exports = { updateProfile, viewProfile };
