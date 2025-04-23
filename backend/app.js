const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/db");
const teacherRoutes = require("./routes/teacherRoutes");
const classRoutes = require("./routes/classRoutes");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classRoutes);

//Check if in development or production
if (process.env.NODE_ENV === "development") {
  // Force sync for development (drops and recreates tables)
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Database synced with alter: true (dev mode)");
    })
    .catch((err) => {
      console.error("Failed to sync database:", err);
    });
} else {
  // Safe sync for production (only applies migrations)
  sequelize
    .sync()
    .then(() => {
      console.log("Database synced (safe sync for production)");
    })
    .catch((err) => {
      console.error("Failed to sync database:", err);
    });
}
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
