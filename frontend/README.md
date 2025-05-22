# User Management System Frontend

This is the frontend application for the User Management System, built with React, TypeScript, and Material-UI.

## Features

- User authentication (login/signup)
- Role-based access control (Admin, Manager, Employee)
- Software management for admins
- Access request system for employees
- Request approval system for managers

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── utils/         # Utility functions and API client
  ├── App.tsx        # Main application component
  └── index.tsx      # Application entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/api`. Make sure the backend server is running before starting the frontend application.

## Authentication

The application uses JWT tokens for authentication. Tokens are stored in localStorage and automatically included in API requests.

## Role-Based Access

- **Admin**: Can create and manage software
- **Manager**: Can approve/reject access requests
- **Employee**: Can request access to software
