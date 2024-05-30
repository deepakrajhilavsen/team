const Joi = require("joi");

const loginValidator = Joi.object().keys({
  username: Joi.string().required().messages({
    "string.empty": `Email cannot be empty`,
    "any.required": `Email is required`,
  }),
  password: Joi.string().required().messages({
    "string.empty": `Password cannot be empty`,
    "any.required": `Password is required`,
  }),
});

module.exports = loginValidator;
