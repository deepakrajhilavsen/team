const emailValidator = (value, helpers) => {
  const emailParts = value.split("@");
  const domainParts = emailParts[1].split(".");

  if (domainParts.length > 3) {
    return helpers.error("any.invalid");
  }

  return value;
};

module.exports = emailValidator;
