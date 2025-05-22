import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  Container
} from '@mui/material';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [software, setSoftware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.log('No user found, redirecting to login');
        navigate('/login');
        return;
      }
      
      try {
        console.log('Fetching data for user:', user);
        setLoading(true);
        setError(null);

        if (user.role === 'Admin') {
          console.log('Fetching software data for Admin');
          const softwareResponse = await api.get('/software');
          console.log('Software response:', softwareResponse.data);
          setSoftware(softwareResponse.data);
        } else if (user.role === 'Manager') {
          console.log('Fetching data for Manager');
          const [softwareResponse, requestsResponse] = await Promise.all([
            api.get('/software'),
            api.get('/requests/pending')
          ]);
          console.log('Manager data:', { software: softwareResponse.data, requests: requestsResponse.data });
          setSoftware(softwareResponse.data);
          setRequests(requestsResponse.data);
        } else {
          console.log('Fetching requests for Employee');
          const requestsResponse = await api.get('/requests/my');
          console.log('Employee requests:', requestsResponse.data);
          setRequests(requestsResponse.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateSoftware = () => {
    navigate('/create-software');
  };

  const handleEditSoftware = (id) => {
    navigate(`/edit-software/${id}`);
  };

  const handleDeleteSoftware = async (id) => {
    if (window.confirm('Are you sure you want to delete this software?')) {
      try {
        await api.delete(`/software/${id}`);
        setSoftware(software.filter(s => s.id !== id));
      } catch (error) {
        console.error('Error deleting software:', error);
        setError('Failed to delete software');
      }
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      await api.put(`/requests/${requestId}/approve`);
      setRequests(requests.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Error approving request:', error);
      setError('Failed to approve request');
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await api.put(`/requests/${requestId}/reject`);
      setRequests(requests.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
      setError('Failed to reject request');
    }
  };

  if (!user) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ p: 3 }}>
          <Alert severity="error">Please log in to view your profile</Alert>
        </Box>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const renderAdminContent = () => (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1">
          <strong>Username:</strong> {user.username}
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {user.role}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreateSoftware}
          sx={{ mt: 2, mr: 2 }}
        >
          Create New Software
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Manage Software
      </Typography>
      <Grid container spacing={3}>
        {software.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="textSecondary">Version: {item.version}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <Typography color="textSecondary">
                  Status: {item.isActive ? 'Active' : 'Inactive'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handleEditSoftware(item.id)}
                >
                  Edit
                </Button>
                <Button 
                  size="small" 
                  color="error"
                  onClick={() => handleDeleteSoftware(item.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderManagerContent = () => (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manager Dashboard
        </Typography>
        <Typography variant="body1">
          <strong>Username:</strong> {user.username}
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {user.role}
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Paper>

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Pending Requests" />
        <Tab label="Available Software" />
      </Tabs>

      {activeTab === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Pending Requests
          </Typography>
          <Grid container spacing={3}>
            {requests.map((request) => (
              <Grid item xs={12} md={6} key={request.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{request.software.name}</Typography>
                    <Typography color="textSecondary">
                      Requested by: {request.user.username}
                    </Typography>
                    <Typography variant="body2">
                      Reason: {request.reason || 'No reason provided'}
                    </Typography>
                    <Typography color="textSecondary">
                      Requested on: {new Date(request.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="success"
                      onClick={() => handleApproveRequest(request.id)}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="small" 
                      color="error"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      Reject
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Available Software
          </Typography>
          <Grid container spacing={3}>
            {software.map((item) => (
              <Grid item xs={12} md={4} key={item.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="textSecondary">Version: {item.version}</Typography>
                    <Typography variant="body2">{item.description}</Typography>
                    <Typography color="textSecondary">
                      Status: {item.isActive ? 'Active' : 'Inactive'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );

  const renderEmployeeContent = () => {
    const approvedRequests = requests.filter(request => request.status === 'Approved');
    const pendingRequests = requests.filter(request => request.status === 'Pending');
    const rejectedRequests = requests.filter(request => request.status === 'Rejected');

    return (
      <Box>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Employee Dashboard
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {user.role}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/request-access')}
            sx={{ mt: 2, mr: 2 }}
          >
            Request Software Access
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            {renderRequestList(approvedRequests, 'Approved Requests')}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderRequestList(pendingRequests, 'Pending Requests')}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderRequestList(rejectedRequests, 'Rejected Requests')}
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderRequestList = (requests, title) => (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title} ({requests.length})
      </Typography>
      {requests.length === 0 ? (
        <Typography color="text.secondary">No {title.toLowerCase()}</Typography>
      ) : (
        <List>
          {requests.map((request) => (
            <React.Fragment key={request.id}>
              <ListItem>
                <ListItemText
                  primary={request.software.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        Status: {request.status}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Requested on: {new Date(request.createdAt).toLocaleDateString()}
                      </Typography>
                      {request.reason && (
                        <>
                          <br />
                          <Typography component="span" variant="body2">
                            Reason: {request.reason}
                          </Typography>
                        </>
                      )}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {user.role === 'Admin' && renderAdminContent()}
        {user.role === 'Manager' && renderManagerContent()}
        {user.role === 'Employee' && renderEmployeeContent()}
      </Box>
    </Container>
  );
};

export default Profile; 