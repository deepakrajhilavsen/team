const User = require("../model/userModel");

const createUser = async (username, name, hash, mobile_no, skills) => {
  const user = new User({
    username: username.toLowerCase(),
    name: name,
    hash: hash,
    mobile_no: mobile_no,
    skills: skills,
  });

  const newUser = await user.save();

  return newUser;
};

module.exports = createUser;
