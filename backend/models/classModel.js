const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Teacher = require("../models/teacherModel");

const Class = sequelize.define("Class", {
  level: DataTypes.STRING,
  name: DataTypes.STRING,
});

// Define relationship explicitly with alias and foreign key
Class.belongsTo(Teacher, {
  as: "formTeacher",
  foreignKey: "formTeacherId",
});

Teacher.hasMany(Class, {
  foreignKey: "formTeacherId",
});

module.exports = Class;
