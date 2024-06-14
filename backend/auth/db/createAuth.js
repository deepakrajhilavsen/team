const Auth = require("../model/authModel");

const createAuth = async (username, hash) => {
  const user = new Auth({
    username: username.toLowerCase(),
    hash: hash,
  });

  const newUser = await user.save();

  return newUser;
};

module.exports = createAuth;
