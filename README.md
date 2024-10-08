# Education Management System Backend

This repository contains the backend implementation for an Education Management System. It provides a RESTful API for managing courses, assignments, grades, and user authentication.

## Live Demo

Backend API URL: https://backend-education-management.onrender.com

## GitHub Repository

https://github.com/mayurhapani/backend_Education_Management.git

## Features

- User authentication and authorization with JWT
- CRUD operations for courses, assignments, and grades
- Enrollment of students in courses
- Assignment submission and grading
- Course progress tracking
- Role-based access control (RBAC)
- Redis caching for improved performance

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Redis
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- Redis

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mayurhapani/backend_Education_Management.git
   cd backend_Education_Management
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=8001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   REDIS_URL=your_redis_url
   ```

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### User Routes

- POST `/api/v1/users/register` - Register a new user
- POST `/api/v1/users/login` - User login
- GET `/api/v1/users/logout` - User logout

### Course Routes

- POST `/api/v1/courses/createCourse` - Create a new course (Admin only)
- GET `/api/v1/courses/getAllCourses` - Get all courses
- GET `/api/v1/courses/getCourse/:id` - Get a course by ID
- PATCH `/api/v1/courses/update/:id` - Update a course (Admin only)
- DELETE `/api/v1/courses/delete/:id` - Delete a course (Admin only)
- GET `/api/v1/courses/enrolled` - Get enrolled courses (Student only)
- POST `/api/v1/courses/:courseId/enroll` - Enroll students in a course (Admin/Teacher only)
- GET `/api/v1/courses/teacherCourses` - Get courses by teacher (Teacher only)

### Assignment Routes

- POST `/api/v1/assignments/createAssignment` - Create a new assignment (Teacher only)
- GET `/api/v1/assignments/getAllAssignments` - Get all assignments
- GET `/api/v1/assignments/getAssignment/:id` - Get an assignment by ID
- PATCH `/api/v1/assignments/update/:id` - Update an assignment (Teacher only)
- DELETE `/api/v1/assignments/delete/:id` - Delete an assignment (Teacher only)
- GET `/api/v1/assignments/enrolled` - Get assignments for enrolled courses (Student only)
- GET `/api/v1/assignments/submitted` - Get submitted assignments (Student only)

### Grade Routes

- POST `/api/v1/grades/createGrade` - Create a new grade (Teacher only)
- GET `/api/v1/grades/getAllGrades` - Get all grades
- GET `/api/v1/grades/getGrade/:id` - Get a grade by ID
- PATCH `/api/v1/grades/update/:id` - Update a grade (Teacher only)
- DELETE `/api/v1/grades/delete/:id` - Delete a grade (Teacher only)

## License

This project is licensed under the MIT License.
