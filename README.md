# User Management System

A full-stack application for managing user access to software applications within an organization. The system supports different user roles (Admin, Manager, Employee) and provides features for software access management and request handling.

## Features

- **User Authentication & Authorization**
  - Secure login and signup system
  - Role-based access control (Admin, Manager, Employee)
  - JWT-based authentication

- **Software Management**
  - Admins can create and manage software entries
  - Software details include name, description, and version
  - Track software usage and access

- **Request Management**
  - Employees can request access to software
  - Managers can approve/reject access requests
  - Request status tracking (Pending, Approved, Rejected)

- **User Profiles**
  - View and manage user information
  - Track software access history
  - Role-specific dashboards

## Tech Stack

### Frontend
- React.js
- Material-UI for UI components
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- TypeORM for database operations
- PostgreSQL database
- JWT for authentication

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd User-Management-system
```

2. Install backend dependencies:
```bash
cd Backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables:
   - Create a `.env` file in the Backend directory
   - Add the following variables:
     ```
     PORT=3001
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     DB_NAME=user_management
     JWT_SECRET=your_jwt_secret
     ```

5. Set up the database:
   - Create a PostgreSQL database named `user_management`
   - Run database migrations:
     ```bash
     cd Backend
     npm run typeorm migration:run
     ```

## Running the Application

1. Start the backend server:
```bash
cd Backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/signup` - User registration

### Software Management
- GET `/api/software` - Get all software
- POST `/api/software` - Create new software (Admin only)
- GET `/api/software/:id` - Get software details
- PUT `/api/software/:id` - Update software (Admin only)
- DELETE `/api/software/:id` - Delete software (Admin only)

### Request Management
- GET `/api/requests` - Get all requests (Manager only)
- POST `/api/requests` - Create new request (Employee only)
- PUT `/api/requests/:id/status` - Update request status (Manager only)
- GET `/api/requests/my-requests` - Get user's requests

### User Management
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile
- GET `/api/users` - Get all users (Admin only)

## User Roles

1. **Admin**
   - Create and manage software entries
   - View all users and their access
   - Full system access
   - username: admin password: admin123

2. **Manager**
   - Approve/reject software access requests
   - View team members' requests
   - Manage team access
   - username: manager password: manager123

3. **Employee**
   - Request access to software
   - View personal request history
   - Access granted software
   - username: employee password: employee123

## Images of the Assignemnt 


![Image](https://github.com/user-attachments/assets/f36583f5-5adc-4710-9213-abe637afe84e)
![Image](https://github.com/user-attachments/assets/5c3f5c6c-6cb5-43f1-97bf-432e3eb1038f)
![Image](https://github.com/user-attachments/assets/3d5cad56-7b6d-48ec-a561-d7c36ec3e47f)
![Image](https://github.com/user-attachments/assets/aea7106b-ffb5-484f-848a-1f2cde32e35a)
![Image](https://github.com/user-attachments/assets/f651b15f-142c-4fd2-8fae-cd1fb4bca41c)
![Image](https://github.com/user-attachments/assets/f5856161-87c0-4dd8-8587-bbc57ffbc53b)
![Image](https://github.com/user-attachments/assets/e562654a-7e13-4cff-b041-132f29f49b1d)
![Image](https://github.com/user-attachments/assets/345d6eae-7f5b-4545-ae40-b8c872b36675)
![Image](https://github.com/user-attachments/assets/343df292-ab35-4903-b9f8-4501d83efa6b)
![Image](https://github.com/user-attachments/assets/0244e4c4-0add-4237-9857-d9ab7fc92025)
