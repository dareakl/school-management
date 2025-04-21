const express = require("express");
const app = express();
const sequelize = require("./config/db");

require("dotenv").config();

app.use(express.json());

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
