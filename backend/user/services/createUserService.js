const globalValidator = require("../../Utils/globalValidators");
const createUser = require("../db/createUser");
const userDetailsValidator = require("../validators/userDetailsValidator");

const createUserService = async (userDetails) => {
  if (globalValidator(userDetailsValidator, userDetails)) {
    const user = await createUser(userDetails);
    return user;
  }
};

module.exports = createUserService;
