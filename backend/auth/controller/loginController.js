const asyncErrorHandler = require("../../Utils/asyncErrorHandler");
const { REGISTER_SUCCESS, LOGIN_SUCCESS } = require("../../Utils/constants");
const loginService = require("../services/loginService");
const registerService = require("../services/registerService");

const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { name, username, password, mobile_no, skills } = req.body;
  await registerService(
    username,
    name,
    password,
    mobile_no.toString(),
    skills,
    req,
    res,
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.status(REGISTER_SUCCESS.status).send({
        message: REGISTER_SUCCESS.message,
        accessToken: result.accessToken,
        user: result.user,
      });
    }
  );
});

const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { username, password } = req.body;

  await loginService(username, password, req, res, (err, result) => {
    if (err) {
      return next(err);
    }
    res.status(LOGIN_SUCCESS.status).send({
      message: LOGIN_SUCCESS.message,
      accessToken: result.accessToken,
      user: result.sanitizedUser,
    });
  });
});

module.exports = { registerUser, loginUser };
