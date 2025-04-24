const Teacher = require("../models/teacherModel");
const { teacherSchema, updateTeacherSchema } = require("../utils/validators");

//Create Teacher
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

//Get All Teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).json({ data: teachers });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};

//Get Single Teachers Details
exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      return res.status(400).json({ error: "Teacher Not Found" });
    }
    res.status(200).json({ data: teacher });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update Teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = updateTeacherSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const teacher = await Teacher.findByPk(id);
    if (!teacher) return res.status(404).json({ error: "Teacher Not Found" });

    await teacher.update(req.body);
    res.status(200).json({ message: "Teacher updated", data: teacher });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Delete Teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);
    if (!teacher) return res.status(404).json({ error: "Teacher Not Found" });

    await teacher.destroy();
    res.status(200).json({ message: "Teacher deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
