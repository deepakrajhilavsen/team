const passport = require("passport");

const googleSignInService = async (callback) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      callback(err, null);
      return;
    }
  });
};

module.exports = googleSignInService;
