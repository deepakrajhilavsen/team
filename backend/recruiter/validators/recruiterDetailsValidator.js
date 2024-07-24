const Joi = require("joi");
const objectIdValidator = require("../../Utils/customValidator");

const recruiterDetailsValidator = Joi.object({
  authId: Joi.string().custom(objectIdValidator).required().messages({
    "any.required": "authId is required",
  }),
  name: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),
  company: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Company name cannot be empty",
    "any.required": "Company name is required",
  }),
  companyEmail: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Company email is required",
  }),
  companyWebsite: Joi.string().uri().max(255).optional().messages({
    "string.uri": "Invalid company website link",
    "string.max": "Company website link must be less than 255 characters",
  }),
  mobile_no: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .messages({
      "string.pattern.base": "Mobile number must be 10 digits.",
    }),
  companyLogo: Joi.string().uri().max(255).optional().messages({
    "string.uri": "Invalid company logo link",
    "string.max": "Company logo link must be less than 255 characters",
  }),
});

module.exports = recruiterDetailsValidator;
