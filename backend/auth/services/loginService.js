const passport = require("passport");
const globalValidator = require("../../Utils/globalValidators");
const loginValidator = require("../validators/loginValidator");
const generateToken = require("./generateToken");

const loginService = async (username, password, req, res, callback) => {
  if (
    globalValidator(loginValidator, {
      username,
      password,
    })
  ) {
    passport.authenticate("local", { session: false })(
      req,
      res,
      async (err) => {
        if (err) {
          callback(err, null);
          return;
        }
        const user = req.user;
        const sanitizedUser = {
          _id: user._id,
          username: user.username,
          name: user.name,
          mobile_no: user.mobile_no,
          skills: user.skills,
        };
        const accessToken = generateToken(user._id, user.username);
        const result = { sanitizedUser, accessToken };
        callback(null, result);
      }
    );
  }
};

module.exports = loginService;
