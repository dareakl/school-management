const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Teacher = sequelize.define("Teacher", {
  name: DataTypes.STRING,
  subject: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  contactNumber: DataTypes.STRING,
});

module.exports = Teacher;
