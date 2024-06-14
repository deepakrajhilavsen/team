const express = require("express");
const passport = require("passport");

const profileRouter = express.Router();

profileRouter.get("/user/view-profile", passport.authenticate('jwt', {session: false}), profileUpdateController);
profileRouter.post("/user/create-user", passport.authenticate('jwt', {session: false}), createUserController);

module.exports = profileRouter;
