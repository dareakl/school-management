const Class = require("../models/classModel");
const Teacher = require("../models/teacherModel");
const { classSchema, updateClassSchema } = require("../utils/validators");

//Create Class
exports.createClass = async (req, res) => {
  try {
    const { error } = classSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { level, name, teacherEmail } = req.body;
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

//Get All Class
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

//Get Single Class Details
exports.getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundClass = await Class.findByPk(id, {
      include: {
        model: Teacher,
        as: "formTeacher",
        attributes: ["name", "email"],
      },
    });
    if (!foundClass) {
      return res.status(404).json({ error: "Class Not Found" });
    }
    res.status(200).json({ data: foundClass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update Class
exports.updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate incoming data (partial updates allowed)
    const { error } = updateClassSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingClass = await Class.findByPk(id);
    if (!existingClass) {
      return res.status(404).json({ error: "Class Not Found" });
    }

    const { level, name, teacherEmail } = req.body;

    // Set current teacher ID by default
    let formTeacherId = existingClass.formTeacherId;

    // If teacherEmail provided, look it up
    if (teacherEmail) {
      const teacher = await Teacher.findOne({ where: { email: teacherEmail } });
      if (!teacher) {
        return res.status(400).json({ error: "Teacher Not Found" });
      }
      formTeacherId = teacher.id;
    }

    // Update only fields provided
    await existingClass.update({
      level: level ?? existingClass.level,
      name: name ?? existingClass.name,
      formTeacherId,
    });

    res.status(200).json({ message: "Class updated", data: existingClass });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Delete Class
exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const existingClass = await Class.findByPk(id);
    if (!existingClass)
      return res.status(404).json({ error: "Class Not Found" });

    await existingClass.destroy();
    res.status(200).json({ message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
