const User = require("../model/userModel");

const findUserByID = async (id) => {
  const user = await User.findOne({ authId: id });
  return user;
};

module.exports = findUserByID;
