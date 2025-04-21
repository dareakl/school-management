const Teacher = require("../models/teacherModel");

exports.createTeacher = async (req, res) => {
  try {
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
