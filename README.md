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

2. **Manager**
   - Approve/reject software access requests
   - View team members' requests
   - Manage team access

3. **Employee**
   - Request access to software
   - View personal request history
   - Access granted software

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 