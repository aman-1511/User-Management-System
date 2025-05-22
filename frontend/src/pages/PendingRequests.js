import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Button, List, ListItem, ListItemText, Divider, Snackbar, Alert } from '@mui/material';
import { getPendingRequests, approveRequest, rejectRequest } from '../utils/api';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(data);
    } catch (err) {
      setError('Failed to fetch pending requests');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    setLoading(true);
    setError('');
    try {
      await approveRequest(requestId);
      setSuccess('Request approved successfully');
      await fetchRequests(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve request');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (requestId) => {
    setLoading(true);
    setError('');
    try {
      await rejectRequest(requestId);
      setSuccess('Request rejected successfully');
      await fetchRequests(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject request');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess('');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Pending Requests
          </Typography>
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <List>
            {requests.map((request, index) => (
              <React.Fragment key={request.id}>
                <ListItem>
                  <ListItemText
                    primary={`${request.user.username} - ${request.software.name}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Version: {request.software.version}
                        </Typography>
                        <br />
                        {request.software.description}
                      </>
                    }
                  />
                  <Box>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(request.id)}
                      disabled={loading}
                      sx={{ mr: 1 }}
                    >
                      {loading ? 'Processing...' : 'Approve'}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReject(request.id)}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : 'Reject'}
                    </Button>
                  </Box>
                </ListItem>
                {index < requests.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            {requests.length === 0 && (
              <Typography align="center" color="text.secondary">
                No pending requests
              </Typography>
            )}
          </List>
        </Paper>
      </Box>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PendingRequests; 