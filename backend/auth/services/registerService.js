const passport = require("passport");
const globalValidator = require("../../Utils/globalValidators");
const registerValidator = require("../validators/registerValidator");
const hashPassword = require("../utils/hashPassword");
const createUser = require("../db/createUser");
const generateToken = require("./generateToken");
const CustomError = require("../../Utils/customError");
const { UNAUTHORIZED } = require("../../Utils/constants");

const registerService = async (
  username,
  name,
  password,
  mobile_no,
  skills,
  req,
  res,
  callback
) => {
  if (
    globalValidator(registerValidator, {
      username,
      password,
      mobile_no,
      skills,
    })
  ) {
    const hash = await hashPassword(password);
    const newUser = await createUser(username, name, hash, mobile_no, skills);
    passport.authenticate("local", { session: false })(
      req,
      res,
      async (err) => {
        if (err) {
          callback(
            new CustomError(UNAUTHORIZED.message, UNAUTHORIZED.status),
            null
          );
        }
        const username = req.user.username;
        const id = req.user.id;
        const accessToken = generateToken(id, username);
        const user = {
          username: newUser.username,
          name: newUser.name,
          _id: id,
          mobile_no: newUser.mobile_no,
          skills: newUser.skills,
        };
        const result = {
          user: user,
          accessToken: accessToken,
        };
        callback(null, result);
      }
    );
  }
};

module.exports = registerService;
