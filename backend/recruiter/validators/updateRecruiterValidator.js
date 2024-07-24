const Joi = require("joi");
const objectIdValidator = require("./customValidator");

const updateRecruiterValidator = Joi.object()
  .keys({
    authId: Joi.string().custom(objectIdValidator).optional().messages({
      "any.required": "authId is required",
    }),
    name: Joi.string().min(1).max(255).optional().messages({
      "string.empty": "Name cannot be empty",
    }),
    company: Joi.string().min(1).max(255).optional().messages({
      "string.empty": "Company name cannot be empty",
    }),
    companyEmail: Joi.string().email().optional().messages({
      "string.email": "Please provide a valid email address",
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
  })
  .min(1)
  .messages({
    "object.min": "No update value found",
  });

module.exports = updateRecruiterValidator;
