const Joi = require("joi");
const objectIdValidator = require("../../Utils/customValidator");

const userDetailsValidator = Joi.object({
  authId: Joi.string().custom(objectIdValidator).required().messages({
    "any.required": "authId is required",
  }),
  name: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),

  mobile_no: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be 10 digits.",
      "any.required": "Mobile number is required",
    }),

  linkedIn: Joi.string().uri().max(255).messages({
    "string.uri": "Invalid LinkedIn profile link",
    "string.max": "LinkedIn profile link must be less than 255 characters",
  }),

  qualifications: Joi.object({
    qualification: Joi.string().valid("UG", "PG", "Other").required().messages({
      "any.only": "Qualification must be UG or PG",
      "any.required": "Qualification is required",
    }),
    specification: Joi.string().min(1).max(64).required().messages({
      "any.required": "Specification is required",
      "string.max": "Specification must be less than 64 characters",
    }),
  }),

  jobRoles: Joi.array()
    .items(
      Joi.string().min(1).max(255).required().messages({
        "string.empty": "Job role cannot be empty",
        "any.required": "Job role is required",
      })
    )
    .messages({
      "array.base": "Job roles must be an array",
    }),

  skills: Joi.array()
    .items(
      Joi.string().min(1).max(255).required().messages({
        "string.empty": "Skill cannot be empty",
        "any.required": "Skill is required",
      })
    )
    .min(1)
    .max(10)
    .required()
    .messages({
      "array.min": "Minimum 1 skill required",
      "any.required": "Skills cannot be empty",
      "array.max": "There can be a maximum of ten skills",
    }),

  experience: Joi.object({
    experience: Joi.string()
      .valid("Fresher", "Student", "Experienced")
      .required()
      .messages({
        "any.required": "Experience is required",
        "any.only": "Experience must be Fresher, Student, or Experienced",
      }),
    jobHistory: Joi.array()
      .items(
        Joi.object({
          role: Joi.string().required().messages({
            "any.required": "Current job role is required",
          }),
          company: Joi.string().required().messages({
            "any.required": "Current job company is required",
          }),
          startDate: Joi.date().max("now").required().messages({
            "date.max": "invalid date",
          }),
          current: Joi.boolean().default(false).optional(),
          endDate: Joi.when("current", {
            is: false,
            then: Joi.date().required(),
            otherwise: Joi.allow(null).optional(),
          }),
        })
      )
      .optional(),
  }).optional(),

  preferredLocations: Joi.array()
    .items(
      Joi.string().min(1).max(255).required().messages({
        "string.empty": "Preferred location cannot be empty",
        "any.required": "Preferred location is required",
      })
    )
    .messages({
      "array.base": "Preferred locations must be an array",
    }),

  profilePhoto: Joi.string()
    .uri()
    .max(255)
    .messages({
      "string.uri": "Invalid profile photo link",
      "string.max": "Profile photo link must be less than 255 characters",
    })
    .optional(),

  resume: Joi.string()
    .uri()
    .max(255)
    .messages({
      "string.uri": "Invalid resume link",
      "string.max": "Resume link must be less than 255 characters",
    })
    .optional(),
});

module.exports = userDetailsValidator;
