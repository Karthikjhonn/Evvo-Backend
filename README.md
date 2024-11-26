Leave Management System
This project is a Leave Management System built using Node.js, Express.js, and MongoDB. It allows users to manage their leave balances and leave requests efficiently.

Technologies Used
Backend: Node.js, Express.js
Database: MongoDB
Authentication:JWT Token

Installation
Prerequisites
Node.js
MongoDB
Package Manager (npm or yarn)

1. Clone the repository:
git clone <repository-url>
cd leave-management-system

2. Install dependencies:
npm i

3. Configure environment variables:
Create a .env file in the project root.
Add the following variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/leave_management

4. Start the server:
npm start

API Endpoints

Method/Endpoint/Description

1. User Routes
POST	/api/users	Register a new user
GET	/api/users/:id	Get user details

2. Leave Balance Routes
GET	/api/leaveBalance	Get leave balance for a user

3. Leave Request Routes
POST	/api/leaveRequest	Submit a leave request
DELETE	/api/leaveRequest	Delete a leave request and update balances


Contact
Author: KARTHICK V
Email: karthickvinayagam21@gmail.com
GitHub: https://github.com/Karthikjhonn
