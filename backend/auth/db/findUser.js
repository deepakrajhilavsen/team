const User = require("../model/userModel");

const findUser = async (username) => {
  const user = await User.findOne(
    { username },
    { username: 1, _id: 1, hash: 1, name: 1, mobile_no: 1, skills: 1 }
  );

  return user;
};

module.exports = findUser;
