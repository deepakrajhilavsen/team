const express = require("express");
const passport = require("passport");
const createUserController = require("../controller/createUserController");
const {
  viewProfile,
  updateProfile,
} = require("../controller/profileController");

const userRouter = express.Router();

userRouter.get(
  "/view-profile",
  passport.authenticate("jwt", { session: false }),
  viewProfile
);
userRouter.post(
  "/create-user",
  passport.authenticate("jwt", { session: false }),
  createUserController
);
userRouter.patch(
  "/update-profile",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

module.exports = userRouter;
