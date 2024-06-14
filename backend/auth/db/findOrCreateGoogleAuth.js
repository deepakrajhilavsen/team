const Auth = require("../model/authModel");

const findOrCreateGoogleAuth = async (profile) => {
  const user = await Auth.findOrCreate(
    { googleId: profile.id },
    {
      username: profile.emails[0].value,
      googleId: profile.id,
    }
  );
  delete user.created;
  return user.doc;
};

module.exports = findOrCreateGoogleAuth;
