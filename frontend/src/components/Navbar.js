import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/api';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User Management System
        </Typography>
        <Box>
          {user ? (
            <>
              {user.role === 'Admin' && (
                <Button color="inherit" onClick={() => navigate('/create-software')}>
                  Create Software
                </Button>
              )}
              {user.role === 'Manager' && (
                <Button color="inherit" onClick={() => navigate('/pending-requests')}>
                  Pending Requests
                </Button>
              )}
              {user.role === 'Employee' && (
                <Button color="inherit" onClick={() => navigate('/request-access')}>
                  Request Access
                </Button>
              )}
              <Button color="inherit" onClick={() => navigate('/profile')}>
                My Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 