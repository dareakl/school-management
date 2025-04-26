📘 School Management Portal

A full-stack school admin portal for managing teachers and classes

Built with:

    🔙 Backend: Node.js + Express + Sequelize + MySQL

    🔜 Frontend: React (Vite) + Material-UI (MUI)

    Containerization: Docker & Docker Compose

🧩 Features

    👨‍🏫 Create, Update, Delete, and View Teachers

    🏫 Create, Update, Delete, and View Classes

    🧩 Assign Teachers to Classes

    🎯 Client-side + Server-side Validation

    🔒 Reusable forms with validations

    💻 RESTful APIs  with Joi validations

    MySQL database connection via Sequelize ORM

    Frontend served with Vite + MUI

    Ready-to-run with Docker Compose

🧪 Validations

    Implemented using Joi for backend validation.

    Name and Subject must be at least 2 characters.

    Email must be valid and must not be from .gov.sg domain.

    Contact number must be 8 digits, no spaces allowed.

    All fields validated during creation; optional validation for updates

🧪 Backend Setup (Node + Express + MySQL) (Local Setup Without Docker)

🔧 Prerequisites

        Node.js & npm

        MySQL (running)

        Postman (optional for testing)

1.  Clone the Repo

    git clone https://github.com/dareakl/school-management.git

2.  Set Up MySQL

    Create a MySQL database named school:

3.  Setup Backend (In Terminal go to the backend folder)

    cd backend
    npm install

4.  Start backed (in terminal)

    npm start

    You can see this in Terminal

    Server is running on port 3002
    Database synced with alter: true (dev mode)

5.  Frontend Setup

    cd ../frontend
    npm install

6.  Start Frontend:

    npm run dev

    Now open http://localhost:5173 to view the app in the browser.

🔗 API Endpoints

👨‍🏫 Teachers

    Method                 | Route                     | Description
    GET                    | /api/teachers             | Get all teachers
    GET                    | /api/teachers/:id         | Get teacher by ID
    POST                   | /api/teachers             | Create new teacher
    PUT                    | /api/teachers/:id         | Update teacher
    DELETE                 | /api/teachers/:id         | Delete teacher

🏫 Classes

    Method                 | Route                     | Description
    GET                    | /api/classes              | Get all classes
    GET                    | /api/classes/:id          | Get class by ID
    POST                   | /api/classes              | Create new class
    PUT                    | /api/classes/:id          | Update class
    DELETE                 | /api/classes/:id          | Delete class

🐳 Docker Setup

    1. Build & Run with Docker Compose
        docker-compose up --build

    This will:

    Start MySQL on port 3306

    Start the Node.js backend on http://localhost:3002

    Serve the frontend React app at http://localhost:3000

🐞 Troubleshooting

    DB Connection Refused: If running in Docker, make sure your backend uses host: 'mysql' instead of localhost

    Frontend makes wrong API calls: Double-check your .env and services/api.js file in frontend

    Docker Port Conflicts: Stop any other MySQL, Node, or frontend dev servers before running docker-compose

🛠 Technologies Used

    Tech                | Purpose
    Node.js             | Backend runtime
    Express.js          | REST API server
    Sequelize           | ORM for MySQL
    MySQL               | Relational DB
    React + Vite        | Frontend framework
    Material UI         | UI components
    Docker              | Containerization

📦 Docker Commands

    # Build containers
    docker-compose up --build

    # Stop containers
    docker-compose down

    # View logs
    docker-compose logs -f

    # Rebuild frontend or backend
    docker-compose up --build frontend
    docker-compose up --build backend

🔗 Postman Collection

You can import the API collection for testing via Postman:

    📥 Download from here: doc/postman/School Management.postman_collection.json

Tested routes:

    GET /api/teachers

    POST /api/teachers

    PUT /api/teachers/:id

    DELETE /api/teachers/:id

    GET /api/classes

    POST /api/classes

    PUT /api/classes/:id

    DELETE /api/classes/:id


    ## 🖼️ Frontend Screenshots

    Here are some screenshots of the School Management Portal frontend built using **React + Vite + MUI**:

    ### 🔹 Dashboard / Class List Page
    Displays all available classes and their assigned form teachers.

    ![Class List](screenshots/class-list.png)

    ---

    ### 🔹 Add New Class
    Form to create a new class by selecting level, name, and assigning a teacher.

    ![Add Class](screenshots/add-class.png)

    ---

    ### 🔹 Edit Class
    Update an existing class with new teacher or class name.

    ![Edit Class](screenshots/edit-class.png)

    ---

    ### 🔹 Teacher List
    View all teachers with their subjects and contact information.

    ![Teacher List](screenshots/teacher-list.png)

    ---

    ### 🔹 Add Teacher
    Form to add a new teacher with name, subject, email, and contact number.

    ![Add Teacher](screenshots/add-teacher.png)

    ---

    ### 🔹 Edit Teacher
    Edit existing teacher details.

    ![Edit Teacher](screenshots/edit-teacher.png)
