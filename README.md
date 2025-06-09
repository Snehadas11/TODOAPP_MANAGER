# TODOAPP_MANAGER


# TODO Task Manager

A full-stack task management web application that enables authenticated users to manage their personal to-do tasks efficiently. The application is built using the MERN (MongoDB, Express, React, Node.js) stack with Google OAuth-based authentication for secure access and user isolation.

## Project Overview

The TODO Task Manager is designed to provide users with a simple, intuitive, and responsive interface for managing their tasks. Each user can register or sign in via Google, and maintain a private list of tasks that can be created, updated, deleted, and marked as completed.

## Core Objectives

- Implement secure login using Google OAuth
- Maintain user-specific task data
- Enable CRUD (Create, Read, Update, Delete) operations on tasks
- Provide an intuitive and responsive user interface
- Apply full-stack development practices and RESTful API design


## Technology Stack

| Layer          | Tools / Libraries                 |
|----------------|---------------------------------|
| Frontend       | React, Axios, React Router       |
| Backend        | Node.js, Express.js              |
| Authentication | Passport.js (Google OAuth 2.0)  |
| Database       | MongoDB, Mongoose                |
| Deployment     | Render                           | 

## Folder Structure


TODOAPP\_MANAGER/
├── client/                 # Frontend - React
│   ├── src/
│   │   ├── components/     # AddTodo, TodoList, TodoItem
│   │   ├── App.js          # Main UI logic
│   │   └── index.js        # React root file
├── server/                 # Backend - Node + Express
│   ├── models/             # Mongoose models (e.g., Todo)
│   ├── routes/             # Task API routes
│   ├── passport.js         # Google OAuth strategy
│   └── index.js            # Express server entry
└── README.md               # Documentation file


## Authentication

Google OAuth 2.0 is integrated via `passport-google-oauth20`. Users must sign in using their Google account. Sessions are securely maintained using cookies and `express-session`.

Environment variables (`.env` file) required:

GOOGLE\_CLIENT\_ID=your\_client\_id
GOOGLE\_CLIENT\_SECRET=your\_client\_secret
MONGO\_URI=your\_mongodb\_uri
SESSION\_SECRET=your\_secure\_session\_string


## Functional Features

| Feature                | Description                                                  |
|------------------------|--------------------------------------------------------------|
| Google Login           | Secure login via Google OAuth                                |
| Add Task               | Create new personal tasks                                    |
| Edit Task              | Modify existing task title, description, or due date         |
| Mark Complete/Open     | Toggle task status                                           |
| Delete Task            | Remove individual tasks                                      |
| User-Specific Storage  | Tasks are visible only to the logged-in user                 |



## Setup Instructions

### Step 1: Clone Repository

git clone https://github.com/Snehadas11/TODOAPP_MANAGER.git
cd TODOAPP_MANAGER

### Step 2: Install Server Dependencies


cd server
npm install
touch .env
# Add the required variables mentioned above
node index.js


### Step 3: Install Client Dependencies


cd ../client
npm install
npm start


> Client will run on `localhost:3000`, server on `localhost:5000`.



## Deployment (Optional)

You can deploy your application with the following services:

| Service          | Use                         |
| ---------------- | --------------------------- |
| Vercel           | Hosting the React frontend  |
| Render / Railway | Hosting the Express backend |
| MongoDB Atlas    | Cloud-hosted NoSQL database |

Update the `.env` file accordingly with production secrets.



## Author

Sneha B
GitHub: https://github.com/Snehadas11


## License

This project is licensed under the MIT License.
See the LICENSE file for more information.

