# Sheen E-learning App (React & Flask)
This project is a full-stack web application built with React for the front end and Flask for the backend. It enables users to register, login, and interact with various services through a RESTful API.

## Features
User authentication (Registration and Login)
Password visibility toggling for better user experience
Form validation and error handling
Integration with a backend API for data persistence
Uses Redux for state management in the frontend
Backend REST API built with Flask
API authentication using tokens (JWT)

## Table of Contents
1. Technologies
2. Project Structure
3. Setup Instructions
4. Available Scripts
5. API Endpoints
6. Contributing
7. License
8. Contact

## Technologies
- Frontend:
- React (with hooks)
- Redux Toolkit (for state management)
- React Router (for navigation)
- SweetAlert2 (for alert modals)
- Fetch API (for making HTTP requests)
- Tailwind CSS (for styling)
## Backend:
- Flask (Python framework)
- Flask-RESTful (for API handling)
- Flask-JWT-Extended (for token-based authentication)
- SQLAlchemy (ORM for database)
- Marshmallow (for request validation and serialization)

## Project Structure

├── client
│ ├── src
│ │ ├── Pages
│ │ ├── redux
│ │ ├── styles
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ ├── index.css
│ │ └── ...
│ └── package.json
│
└── server
├── Models
├── Routes
├── Pipfile
├── requirements.txt
├── app.py
├── seed.py
├── .env.cloudinary
└── render.yaml
client/ contains the React frontend.
server/ contains the Flask backend.
## Setup Instructions
## Prerequisites
Node.js installed for the React frontend.
Python 3.x installed for the Flask backend.
### Backend Setup (Flask)
Clone the repository and navigate to the server directory:

cd server
Set up a Python virtual environment:

pipenv install && pipenv shell
Install the dependencies:

pip install -r requirements.txt
Start the Flask development server:

flask run
The backend will be running at http://127.0.0.1:5555/.

### Frontend Setup (React)
Navigate to the client directory:
cd client
Install dependencies:

npm install
Start the React development server:

npm run dev
The frontend will be available at http://localhost:5173/.

### Available Scripts
In the project directory, you can run the following scripts:

## Frontend
npm run dev: Runs the React app in development mode.
npm run build: Builds the React app for production.
Backend
flask run: Runs the Flask app in development mode.
python -m unittest: Runs the unit tests (if available).
API Endpoints
User Registration
POST /api/user/create: Registers a new user.

Request body:

json

{
"email": "user@example.com",
"password": "password123",
"admin": "True/False"
}
Response: Success or error message.

User Login
POST /api/login: Logs in a user and returns a JWT token.

#### Request body:

{
"email": "user@example.com",
"password": "password123"
}
## Protected Routes
GET /api/protected: Requires JWT token in the Authorization header (Bearer Token).
Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue if you find a bug or want to suggest an improvement.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, feel free to reach out:

Email: *jay.kilonzo@gmail.com*