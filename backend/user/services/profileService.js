const globalValidator = require("../../Utils/globalValidators");
const findUserByID = require("../db/findUserById");
const updateUserByID = require("../db/updateUserByID");
const updateUserDetailsValidator = require("../validators/updateDetailsValidator");

const updateProfileService = async (authId, updateDetails) => {
  if (globalValidator(updateUserDetailsValidator, updateDetails)) {
    const updatedUserDetails = await updateUserByID(authId, updateDetails);
    return updatedUserDetails;
  }
};

const viewProfileSevice = async (id) => {
  const user = await findUserByID(id);
  return user;
};

module.exports = { updateProfileService, viewProfileSevice };
