const User = require("../model/userModel");

const createUser = async (userDetails) => {
  const newUser = new User({ ...userDetails });
  const user = await newUser.save();
  return user;
};

module.exports = createUser;
