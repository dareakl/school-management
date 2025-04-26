const Joi = require("joi");
const Teacher = require("../models/teacherModel");

// Teacher schema - with detailed validation messages
const teacherSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),

  subject: Joi.string().min(2).required().messages({
    "string.base": "Subject must be a string",
    "string.empty": "Subject is required",
    "string.min": "Subject must be at least 2 characters",
    "any.required": "Subject is required",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .external(async (value) => {
      const existing = await Teacher.findOne({ where: { email: value } });
      if (existing) {
        throw new Error("Email already registered");
      }
    })
    .custom((value, helpers) => {
      if (value.endsWith("@gov.sg") || value.endsWith(".gov.sg")) {
        return helpers.message("This email address is Invalid");
      }
      return value;
    })
    .messages({
      "string.email": "This email address is invalid",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  contactNumber: Joi.string()
    .pattern(/^[0-9]{8}$/)
    .required()
    .messages({
      "string.empty": "Work contact is required",
      "string.pattern.base":
        "This work contact number is invalid (must be 8 digits, no spaces)",
      "any.required": "Work contact is required",
    }),
});

// Update schema — all fields optional, same rules
const updateTeacherSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  subject: Joi.string().min(2).optional(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .custom((value, helpers) => {
      if (value.endsWith("@gov.sg") || value.endsWith(".gov.sg")) {
        return helpers.message("This email address is invalid");
      }
      return value;
    })
    .external(async (value, helpers) => {
      const { id } = helpers?.prefs?.context || {};
      const existing = await Teacher.findOne({ where: { email: value } });

      if (existing && existing.id !== parseInt(id)) {
        throw new Error("Email already registered");
      }
    }),
  contactNumber: Joi.string()
    .pattern(/^[0-9]{8}$/)
    .optional()
    .messages({
      "string.pattern.base": "Work contact number must be 8 digits",
    }),
});
// Class creation schema — with detailed messages
const classSchema = Joi.object({
  level: Joi.string().min(1).required().messages({
    "string.base": "Level must be a string",
    "string.empty": "Level is required",
    "string.min": "Level must be at least 1 character",
    "any.required": "Level is required",
  }),

  name: Joi.string().min(1).required().messages({
    "string.base": "Class name must be a string",
    "string.empty": "Class name is required",
    "string.min": "Class name must be at least 1 character",
    "any.required": "Class name is required",
  }),

  teacherEmail: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Teacher email must be a string",
      "string.email": "This teacher email is invalid",
      "string.empty": "Teacher email is required",
      "any.required": "Teacher email is required",
    }),
});

// Class update schema — optional fields, with same messages
const updateClassSchema = classSchema.fork(
  ["level", "name", "teacherEmail"],
  (field) => field.optional()
);

module.exports = {
  teacherSchema,
  classSchema,
  updateTeacherSchema,
  updateClassSchema,
};
