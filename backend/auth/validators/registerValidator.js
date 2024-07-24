const Joi = require("joi");
const emailValidator = require("./customValidators");

const registerValidator = Joi.object().keys({
  username: Joi.string()
    .required()
    .custom(emailValidator)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "co", "org", "in", "ac"] },
    })
    .messages({
      "string.email": `Enter valid email id`,
      "string.empty": `Email cannot be empty`,
      "any.reqiured": `Email is required`,
      "any.invalid": `Invalid Domain`,
    }),

  password: Joi.string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .required()
    .messages({
      "string.min":
        "Password must be minimum 8 characters, with at least a symbol, upper and lower case letters and a number",
      "object.regex": `Password must be minimum 8 characters, with at least a symbol, upper and lower case letters and a number`,
      "string.pattern.base":
        "Password must be minimum 8 characters, with at least a symbol, upper and lower case letters and a number",
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),

  role: Joi.boolean().optional(),
});

module.exports = registerValidator;
