const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Teacher = require("../models/teacherModel");

const Class = sequelize.define("Class", {
  level: DataTypes.STRING,
  name: DataTypes.STRING,
});

Teacher.hasMany(Class);
Class.belongsTo(Teacher, { as: "formTeacher" });

module.exports = Class;
