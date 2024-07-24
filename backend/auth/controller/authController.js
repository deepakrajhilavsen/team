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
  const { username, password, role } = req.body;
  await registerService(username, password, role, req, res, (err, result) => {
    if (err) {
      return next(err);
    }

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.HTTP_SECURE,
      sameSite: "none",
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
      secure: process.env.HTTP_SECURE,
      sameSite: "none",
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
      secure: process.env.HTTP_SECURE,
      sameSite: "none",
    });

    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Auth Screen</title></head>
      <body>
        <script>
            if (window.opener) {
              window.opener.postMessage(${JSON.stringify({
                user: result.user,
              })}, '*');
            }
            window.close();
        </script>
      </body>
      </html>
    `);
  });
});

const verifyToken = (req, res) => {
  const token = req.cookies.accessToken;

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    res
      .status(SUCCEEDED.status)
      .send({ id: decoded.id, username: decoded.username });
  } catch (error) {
    res.status(FORBIDDEN.status).send({ message: FORBIDDEN.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleSignIn,
  verifyToken,
};
