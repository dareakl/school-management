📘 School Management Portal
A simple admin portal to manage Teachers and Classes in a school system.

Built with:

🔙 Backend: Node.js + Express + Sequelize + MySQL

🔜 Frontend: React (Vite) + Material-UI (MUI)

🧩 Features
👨‍🏫 Create, Update, Delete, and View Teachers

🏫 Create, Update, Delete, and View Classes

🧩 Assign Teachers to Classes

🎯 Client-side + Server-side Validation

🔒 Unique Email Check for Teachers

💻 RESTful APIs

🛠️ Tech Stack

Layer | Tech
Backend | Node.js, Express, Sequelize
Database | MySQL
Frontend | React.js, Material-UI
Validation | Joi

🧪 Backend Setup (Node + Express + MySQL)
🔧 Prerequisites
Node.js & npm

    MySQL (running)

    Postman (optional for testing)

🚀 1. Setup Backend
cd backend
npm install

📄 2. Create .env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school
DB_PORT=3306
PORT=3002

NODE_ENV=development
#NODE_ENV=production

🗄️ 3. Configure Sequelize in config/db.js

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,
{
host: process.env.DB_HOST,
dialect: "mysql",
port: process.env.DB_PORT,
logging: false,
}
);

module.exports = sequelize;

▶️ 4. Run the Server

    npm start

🔗 API Endpoints

👨‍🏫 Teachers

Method | Route | Description
GET | /api/teachers | Get all teachers
GET | /api/teachers/:id | Get teacher by ID
POST | /api/teachers | Create new teacher
PUT | /api/teachers/:id | Update teacher
DELETE | /api/teachers/:id | Delete teacher

🏫 Classes

Method | Route | Description
GET | /api/classes | Get all classes
GET | /api/classes/:id | Get class by ID
POST | /api/classes | Create new class
PUT | /api/classes/:id | Update class
DELETE | /api/classes/:id | Delete class

🎨 Frontend Setup (React + MUI)

🔧 Prerequisites
Node.js

    npm / yarn

🚀 1. Setup Frontend

    cd frontend
    npm install

🔁 2. Configure API Base URL

In frontend/src/services/api.js:

import axios from "axios";

const api = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL,
headers: {
"Content-Type": "application/json",
},
});

export default api;

▶️ 3.Start Frontend (Vite Dev Server)

    npm run dev

📝 Notes

Data is stored in MySQL, using Sequelize ORM.

Email is unique for each teacher.

Class requires a valid teacher's email for assignment.

Validation is done using Joi on both create and update.

✅ Features

Create / Edit / Delete Teachers

Create / Edit / Delete Classes

Assign teacher to class using email

Client-side and server-side validation

Friendly UI with MUI

Error handling with helpful messages

🧪 Validations

Implemented using Joi for backend validation.

Name and Subject must be at least 2 characters.

Email must be valid and must not be from .gov.sg domain.

Contact number must be 8 digits, no spaces allowed.

All fields validated during creation; optional validation for updates

🛡️ Production Considerations

Don't use sequelize.sync({ force: true }) in production.

Implement Sequelize migrations instead for database changes.

Add authentication and role-based access for admins.
