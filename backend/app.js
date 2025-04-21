const express = require("express");
const app = express();
const sequelize = require("./config/db");
const teacherRoutes = require("./routes/teacherRoutes");
const classRoutes = require("./routes/classRoutes");

require("dotenv").config();

app.use(express.json());

app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
