const Auth = require("../model/authModel");

const findAuth = async (username) => {
  const user = await Auth.findOne(
    { username },
    {
      username: 1,
      _id: 1,
      hash: 1,
      googleId: 1,
    }
  );

  return user;
};

module.exports = findAuth;
