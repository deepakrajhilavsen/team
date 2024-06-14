const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  googleSignIn,
  verifyToken,
} = require("../controller/authController");

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/verify-token", verifyToken);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get("/google/callback", googleSignIn);

module.exports = authRouter;
