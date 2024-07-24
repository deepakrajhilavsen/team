const Joi = require("joi");

const updateUserDetailsValidator = Joi.object()
  .keys({
    name: Joi.string().min(1).max(255).optional(),
    mobile_no: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional()
      .messages({
        "string.pattern.base": `Mobile number must be 10 digits.`,
      }),
    linkedIn: Joi.string().min(1).max(255).optional(),
    qualifications: Joi.object()
      .keys({
        qualification: Joi.string().valid("UG", "PG", "Other").optional(),
        specification: Joi.string().min(1).max(64).optional(),
      })
      .optional(),
    jobRoles: Joi.array()
      .items(Joi.string().min(1).max(255).optional())
      .optional(),
    skills: Joi.array()
      .items(Joi.string().min(1).max(255).optional())
      .optional(),
    experience: Joi.object()
      .keys({
        experience: Joi.string()
          .valid("Fresher", "Student", "Experienced")
          .optional(),
        jobHistory: Joi.array()
          .items(
            Joi.object().keys({
              role: Joi.string().optional().messages({
                "any.required": "Current job role is required",
              }),
              company: Joi.string().optional().messages({
                "any.required": "Current job company is required",
              }),
              startDate: Joi.date().max("now").optional().messages({
                "date.max": "Invalid date",
              }),
              current: Joi.boolean().default(false).optional(),
              endDate: Joi.when("current", {
                is: false,
                then: Joi.date().optional(),
                otherwise: Joi.allow(null).optional(),
              }),
            })
          )
          .optional(),
      })
      .optional(),
    preferredLocations: Joi.array()
      .items(Joi.string().min(1).max(255).optional())
      .optional(),
    profilePhoto: Joi.string().min(1).max(255).optional(),
    resume: Joi.string().min(1).max(255).optional(),
  })
  .min(1)
  .messages({
    "object.min": `No update value found`,
  });

module.exports = updateUserDetailsValidator;
