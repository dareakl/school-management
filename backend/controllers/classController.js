const Class = require("../models/classModel");
const Teacher = require("../models/teacherModel");

exports.createClass = async (req, res) => {
  const { level, name, teacherEmail } = req.body;
  try {
    const teacher = await Teacher.findOne({ where: { email: teacherEmail } });
    if (!teacher) return res.status(400).json({ error: "Teacher Not Found" });

    const newClass = await Class.create({
      level,
      name,
      formTeacherId: teacher.id,
    });
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: { model: Teacher, as: "formTeacher", attributes: ["name"] },
    });
    res.status(200).json({ data: classes });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};
