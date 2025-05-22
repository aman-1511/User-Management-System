import React from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/api';

const UserProfile = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            User Profile
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Username
            </Typography>
            <Typography variant="body1" paragraph>
              {user.username}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Role
            </Typography>
            <Typography variant="body1" paragraph>
              {user.role}
            </Typography>
            {user.role === 'Admin' && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate('/create-software')}
                sx={{ mt: 2 }}
              >
                Create Software
              </Button>
            )}
            {user.role === 'Manager' && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate('/pending-requests')}
                sx={{ mt: 2 }}
              >
                View Pending Requests
              </Button>
            )}
            {user.role === 'Employee' && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate('/request-access')}
                sx={{ mt: 2 }}
              >
                Request Software Access
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserProfile; 