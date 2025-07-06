# Task Management API Documentation

## 🚀 Quick Start Guide

### Prerequisites
- Java 17 
- PostgreSQL 
- Maven 3.6 

### Setup Instructions

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd TaskManager_temp
```

2. **Setup PostgreSQL Database**
```sql
-- Connect to PostgreSQL as admin
CREATE DATABASE db_name;
CREATE USER taskapp WITH PASSWORD 'your_password';
```

3. **Configure application.yml**
```
spring.datasource.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/db_name}
spring.datasource.username=${DATABASE_USERNAME:Name}
spring.datasource.password=${DATABASE_PASSWORD:your_password}
spring.datasource.driver-class-name=org.postgresql.Driver
```

4. **Run the application**
```bash
mvn clean install
mvn spring-boot:run
```

5. **Verify it's running**
- Open browser: `http://localhost:8080/`
- Should see: "Whitelabel Error Page" (this is normal - means server is running)

---

## 📋 API Overview

**Base URL:** `http://localhost:8080/`

**Authentication:** JWT Bearer Token (after login)

**Content-Type:** `application/json`

---

## 🔐 Authentication Endpoints

### 1. User Registration
**POST** `/auth/register`

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "password": "StrongPass1",
  "confirmPassword": "StrongPass1"
}

```
200 OK or 201 Created – Returns JWT and user info (AuthResponseDto)

401/403/404 – Error responses



### 2. User Login
**POST** ` /auth/login`

**Request Body:**
```json
{
  "phoneNumber": "+1234567890",
  "password": "YourPassword123"
}

```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "fullName": "John Doe"
}
```

200 OK – Returns JWT and user info (AuthResponseDto)

401/403/404 – Error responses
```



---

## 📝 Task Management Endpoints

**Note:** All task endpoints require authentication. Include JWT token in Authorization header.

### Headers for All Task Endpoints:
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

### 1. Create Task
**POST** `/task`

**Request Body:**
```json

{
  "title": "Finish API",
  "content": "Complete all API endpoints",
  "createdDate": 1751865600000,
  "dueDate": 1752470400000,
  "priority": "HIGH",
  "status": "TODO",
  "userId": 1
}
Response: 201 Created with created TaskDto

```

**Field Validations:**
- `title`: Required, max 100 characters
- `content`: Optional, task description
- `status`: Required, must be one of: `TODO`, `IN_PROGRESS`, REVIEW `DONE`
- `priority`: Required, must be one of: `LOW`, `MEDIUM`, `HIGH`
- `dueDate`: Optional, Unix timestamp in seconds

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task created successfully!",
  "taskId": 1
}
```

### 2. Get All Tasks
**GET** `/tasks`

**Success Response (200):**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "content": "Write comprehensive API documentation for the task management system",
    "status": "TODO",
    "priority": "HIGH",
    "createdDate": 1704067200,
    "dueDate": 1704067200,
    "userId": 1
  },
  {
    "id": 2,
    "title": "Fix login bug",
    "content": "Resolve authentication issue in login endpoint",
    "status": "IN_PROGRESS",
    "priority": "CRITICAL",
    "createdDate": 1704067300,
    "dueDate": 1704067400,
    "userId": 1
  }
]
```

### 3. Get Task by ID
**GET** `/tasks/{id}`

**Example:** `GET /api/tasks/1`

**Success Response (200):**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "content": "Write comprehensive API documentation for the task management system",
  "status": "TODO",
  "priority": "HIGH",
  "createdDate": 1704067200,
  "dueDate": 1704067200,
  "userId": 1
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Task not found."
}
```

### 4. Update Task
**PUT** `/tasks/{id}`

**Request Body:**
```json
{
  "title": "Updated task title",
  "content": "Updated task description",
  "status": "IN_PROGRESS",
  "priority": "MEDIUM",
  "dueDate": 1704067200
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully!"
}
```

### 5. Delete Task
**DELETE** `/tasks/{id}`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully!"
}
```

---

## 🧪 Testing Guide
### Using Swagger
You can  TEST http://localhost:8080/swagger-ui/index.html


### Using Postman

1. **Import Environment Variables:**
```json
{
  "name": "Task Management API",
  "values": [
    {
      "key": "baseUrl",
      "value": "http://localhost:8080/"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

2. **Test Flow:**
    - Register a new user
    - Login with credentials
    - Copy the token from login response
    - Set token in environment variable
    - Test task operations

### Using cURL

1. **Register User:**
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "password": "StrongPass1",
    "confirmPassword": "StrongPass1"
  }'

```

2. **Login:**
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1234567890",
    "password": "password123"
  }'

```

3. **Create Task (replace YOUR_TOKEN):**
```bash
curl -X POST http://localhost:8080/task \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Task",
    "content": "This is a test task",
    "status": "TODO",
    "priority": "HIGH",
    "createdDate": 1751865600000,
    "dueDate": 1752470400000,
    "userId": 1
  }'

```

4. **Get All Tasks:**
```bash
curl -X GET http://localhost:8080/task \
  -H "Authorization: Bearer YOUR_TOKEN"

```

---

