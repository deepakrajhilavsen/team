const asyncErrorHandler = require("../../middlewares/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  FORBIDDEN,
  SUCCEEDED,
} = require("../../Utils/constants");
const googleSignInService = require("../services/googleSignInService");
const loginService = require("../services/loginService");
const registerService = require("../services/registerService");

const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { username, password } = req.body;
  await registerService(username, password, req, res, (err, result) => {
    if (err) {
      return next(err);
    }

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false, // change secure to true, made it false to test on localhost
    });
    res.status(REGISTER_SUCCESS.status).send({
      message: REGISTER_SUCCESS.message,
      user: result.user,
    });
  });
});

const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { username, password } = req.body;

  await loginService(username, password, req, res, (err, result) => {
    if (err) {
      return next(err);
    }

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false, // change secure to true, made it false to test on localhost
    });
    res.status(LOGIN_SUCCESS.status).send({
      message: LOGIN_SUCCESS.message,
      user: result.sanitizedUser,
    });
  });
});

const googleSignIn = asyncErrorHandler(async (req, res, next) => {
  await googleSignInService(req, res, (err, result) => {
    if (err) {
      return next(err);
    }

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false, // change secure to true, made it false to test on localhost
    });
    res.status(LOGIN_SUCCESS.status).send({
      message: LOGIN_SUCCESS.message,
      user: result.user,
    });
  });
});

const verifyToken = (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    res
      .status(SUCCEEDED.status)
      .send({ id: decoded.id, username: decoded.username });
  } catch (error) {
    res.status(FORBIDDEN.status).send({ message: FORBIDDEN.message });
  }
};

module.exports = { registerUser, loginUser, googleSignIn, verifyToken };
