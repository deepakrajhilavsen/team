const express = require("express");
const passport = require("passport");
const createRecruiterController = require("../controller/createRecruiterController");
const {
  viewRecruiterProfile,
  updateRecruiterProfile,
} = require("../controller/profileController");

const recruierRouter = express.Router();

recruierRouter.post(
  "/create-user",
  passport.authenticate("jwt", { session: false }),
  createRecruiterController
);
recruierRouter.patch(
  "/update-profile",
  passport.authenticate("jwt", { session: false }),
  updateRecruiterProfile
);
recruierRouter.get(
  "/view-details",
  passport.authenticate("jwt", { session: false }),
  viewRecruiterProfile
);

module.exports = recruierRouter;
