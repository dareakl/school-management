const Joi = require("joi");

//Create: all fields required
const teacherSchema = Joi.object({
  name: Joi.string().min(2).required(),
  subject: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string()
    .pattern(/^[0-9]{8}$/)
    .required(),
});

//Update: all fields optional but validated if present
const updateTeacherSchema = teacherSchema.fork(
  ["name", "subject", "email", "contactNumber"],
  (field) => field.optional()
);
// Create: Class Schema
const classSchema = Joi.object({
  level: Joi.string().required(),
  name: Joi.string().required(),
  teacherEmail: Joi.string().email().required(),
});

// New: Class update schema (all fields optional)
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
