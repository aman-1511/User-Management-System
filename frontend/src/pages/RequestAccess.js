import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Button, List, ListItem, ListItemText, Divider, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllSoftware, requestAccess } from '../utils/api';

const RequestAccess = () => {
  const navigate = useNavigate();
  const [softwareList, setSoftwareList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const data = await getAllSoftware();
        setSoftwareList(data);
      } catch (err) {
        setError('Failed to fetch software list');
      }
    };
    fetchSoftware();
  }, []);

  const handleRequestAccess = async (softwareId) => {
    setLoading(true);
    setError('');
    try {
      await requestAccess(softwareId);
      setSuccess('Access request submitted successfully!');
      setTimeout(() => {
        const fetchSoftware = async () => {
          try {
            const data = await getAllSoftware();
            setSoftwareList(data);
          } catch (err) {
            setError('Failed to fetch software list');
          }
        };
        fetchSoftware();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request access');
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
            Available Software
          </Typography>
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <List>
            {softwareList.map((software, index) => (
              <React.Fragment key={software.id}>
                <ListItem>
                  <ListItemText
                    primary={software.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Version: {software.version}
                        </Typography>
                        <br />
                        {software.description}
                      </>
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRequestAccess(software.id)}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Request Access'}
                  </Button>
                </ListItem>
                {index < softwareList.length - 1 && <Divider />}
              </React.Fragment>
            ))}
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

export default RequestAccess; 