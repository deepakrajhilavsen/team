const User = require("../model/userModel");

const updateUserByID = async (authId, updateDetails) => {
  const updatedUserDetails = await User.findOneAndUpdate(
    { authId },
    { ...updateDetails },
    { new: true }
  );
  return updatedUserDetails;
};

module.exports = updateUserByID;
