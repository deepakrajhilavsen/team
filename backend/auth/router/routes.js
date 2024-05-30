const express = require("express");
const { registerUser, loginUser } = require("../controller/loginController");
const verifyToken = require("../../middlewares/verifyToken");

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/verify-token", verifyToken);

module.exports = authRouter;
