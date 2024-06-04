const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  googleSignIn,
} = require("../controller/loginController");
const verifyToken = require("../../middlewares/verifyToken");

const authRouter = express.Router();

authRouter.post("/auth/register", registerUser);
authRouter.post("/auth/login", loginUser);
authRouter.post("/auth/verify-token", verifyToken);
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get("/auth/google/callback", googleSignIn);

module.exports = authRouter;
