const { ROLES } = require("../../Utils/constants");
const Auth = require("../model/authModel");

const createAuth = async (username, hash, isRecruiter) => {
  const role = isRecruiter === true ? ROLES.recruiter : ROLES.user;
  const user = new Auth({
    username: username.toLowerCase(),
    hash: hash,
    role: role,
  });

  const newUser = await user.save();

  return newUser;
};

module.exports = createAuth;
