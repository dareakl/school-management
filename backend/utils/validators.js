const Joi = require("joi");

const teacherSchema = Joi.object({
  name: Joi.string().min(2).required(),
  subject: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string()
    .pattern(/^[0-9]{8}$/)
    .required(),
});

const classSchema = Joi.object({
  level: Joi.string().required(),
  name: Joi.string().required(),
  teacherEmail: Joi.string().email().required(),
});

module.exports = {
  teacherSchema,
  classSchema,
};
