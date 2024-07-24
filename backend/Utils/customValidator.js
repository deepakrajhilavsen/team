const { default: mongoose } = require("mongoose");

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid authId");
  }
  return value;
};

module.exports = objectIdValidator;
