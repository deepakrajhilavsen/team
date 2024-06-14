const passport = require("passport");
const generateToken = require("../utils/generateToken");

const googleSignInService = async (req, res, callback) => {
  passport.authenticate("google", { session: false })(
    req,
    res,
    async (err) => {
      if (err) {
        callback(err, null);
        return;
      }
      const user = req.user;
      const accessToken = generateToken(user._id, user.username);
      const result = {
        user: user,
        accessToken: accessToken,
      };
      callback(null, result);
    }
  );
};

module.exports = googleSignInService;
