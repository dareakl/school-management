const Teacher = require("../models/teacherModel");
const { teacherSchema } = require("../utils/validators");

exports.createTeacher = async (req, res) => {
  try {
    const { error } = teacherSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).json({ data: teachers });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};
