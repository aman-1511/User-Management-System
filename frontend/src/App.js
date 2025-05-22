import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateSoftware from './pages/CreateSoftware';
import RequestAccess from './pages/RequestAccess';
import PendingRequests from './pages/PendingRequests';
import Profile from './pages/Profile';
import { getCurrentUser } from './utils/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const PrivateRoute = ({ children, roles }) => {
  const user = getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/profile" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/create-software"
              element={
                <PrivateRoute roles={['Admin']}>
                  <CreateSoftware />
                </PrivateRoute>
              }
            />
            <Route
              path="/request-access"
              element={
                <PrivateRoute roles={['Employee']}>
                  <RequestAccess />
                </PrivateRoute>
              }
            />
            <Route
              path="/pending-requests"
              element={
                <PrivateRoute roles={['Manager']}>
                  <PendingRequests />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App; 