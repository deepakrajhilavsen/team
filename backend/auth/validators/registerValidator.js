const Joi = require("joi");
const emailValidator = require("./emailValidator");

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

  mobile_no: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required()
    .messages({ "string.pattern.base": `Mobile number must be 10 digits.` }),

  skills: Joi.array()
    .items(
      Joi.string().min(1).max(255).required().messages({
        "string.empty": `Skill cannot be empty`,
        "any.required": `Skill is required`,
      })
    )
    .min(2)
    .max(10)
    .required()
    .messages({
      "array.min": `There needs to be a minimum of two skills`,
      "any.required": `Skill cannot be empty`,
    }),
});

module.exports = registerValidator;
