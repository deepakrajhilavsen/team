const passport = require("passport");
const globalValidator = require("../../Utils/globalValidators");
const loginValidator = require("../validators/loginValidator");
const findUser = require("../db/findUser");
const generateToken = require("./generateToken");
const CustomError = require("../../Utils/customError");
const { UNAUTHORIZED } = require("../../Utils/constants");

const loginService = async (username, password, req, res, callback) => {
  if (
    globalValidator(loginValidator, {
      username,
      password,
    })
  ) {
    const user = await findUser(username);
    if (!user) {
      callback(
        new CustomError(UNAUTHORIZED.message, UNAUTHORIZED.status),
        null
      );
      return;
    }
    if (user) {
      const sanitizedUser = {
        _id: user._id,
        username: user.username,
        name: user.name,
        mobile_no: user.mobile_no,
        skills: user.skills,
      };
      passport.authenticate("local", { session: false })(
        req,
        res,
        async (err) => {
          if (err) {
            callback(
              new CustomError(UNAUTHORIZED.message, UNAUTHORIZED.status),
              null
            );
          } else {
            const username = req.user.username;
            const id = req.user.id;
            const accessToken = generateToken(id, username);
            const result = { sanitizedUser, accessToken };
            callback(null, result);
          }
        }
      );
    }
  }
};

module.exports = loginService;
