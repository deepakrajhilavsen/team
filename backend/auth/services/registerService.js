const passport = require("passport");
const globalValidator = require("../../Utils/globalValidators");
const registerValidator = require("../validators/registerValidator");
const hashPassword = require("../utils/hashPassword");
const createAuth = require("../db/createAuth");
const generateToken = require("../utils/generateToken");

const registerService = async (username, password, role, req, res, callback) => {
  if (
    globalValidator(registerValidator, {
      username,
      password,
      role
    })
  ) {
    const hash = await hashPassword(password);
    const newUser = await createAuth(username, hash, role);
    passport.authenticate("local", { session: false })(
      req,
      res,
      async (err) => {
        if (err) {
          callback(err, null);
          return;
        }
        const username = req.user.username;
        const id = req.user.id;
        const accessToken = generateToken(id, username);
        const user = {
          username: newUser.username,
          _id: id,
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
