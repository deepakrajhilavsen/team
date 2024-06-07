const User = require("../model/userModel");

const findOrCreateGoogleUser = async (profile) => {
  const user = await User.findOrCreate(
    { googleId: profile.id },
    {
      name: profile.displayName,
      username: profile.emails[0].value,
      googleId: profile.id,
      profilePhoto: profile.photos[0].value,
    }
  );
  delete user.created;
  return user.doc;
};

module.exports = findOrCreateGoogleUser;
