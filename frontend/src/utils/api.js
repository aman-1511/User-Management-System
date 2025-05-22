import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, 
  withCredentials: true
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.url, 'with headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      headers: error.config?.headers
    });
    
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      return Promise.reject(new Error('Request timed out. Please try again.'));
    } else if (!error.response) {
      console.error('Network error');
      return Promise.reject(new Error('Network error. Please check your connection and ensure the backend server is running.'));
    } else if (error.response.status === 404) {
      return Promise.reject(new Error('Resource not found. Please check the URL.'));
    } else if (error.response.status === 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    } else if (error.response.status === 0) {
      return Promise.reject(new Error('CORS error: Unable to connect to the server. Please check if the server is running and CORS is properly configured.'));
    }
    
    return Promise.reject(error);
  }
);

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('token');
    return null;
  }
};

export const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const login = async (username, password) => {
  try {
    console.log('Attempting login for username:', username);
    const response = await api.post('/auth/login', { username, password });
    console.log('Login response:', response.data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      const decoded = jwtDecode(response.data.token);
      console.log('Decoded token:', decoded);
      return decoded;
    } else {
      throw new Error('No token received from server');
    }
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (username, password, role) => {
  try {
    console.log('Attempting registration for username:', username, 'role:', role);
    const response = await api.post('/auth/register', { username, password, role });
    console.log('Registration response:', response.data);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      const decoded = jwtDecode(response.data.token);
      console.log('Decoded token:', decoded);
      return decoded;
    } else {
      throw new Error('No token received from server');
    }
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const createSoftware = async (data) => {
  try {
    console.log('Creating software with data:', data);
    const response = await api.post('/software', data);
    console.log('Create software response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating software:', error);
    throw error;
  }
};

export const updateSoftware = async (id, data) => {
  try {
    console.log(`Updating software ${id} with data:`, data);
    const response = await api.put(`/software/${id}`, data);
    console.log('Update software response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating software:', error);
    throw error;
  }
};

export const deleteSoftware = async (id) => {
  try {
    console.log(`Deleting software ${id}`);
    const response = await api.delete(`/software/${id}`);
    console.log('Delete software response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting software:', error);
    throw error;
  }
};

export const getAllSoftware = async () => {
  const response = await api.get('/software');
  return response.data;
};

export const requestAccess = async (softwareId) => {
  const response = await api.post('/requests', { softwareId });
  return response.data;
};

export const getPendingRequests = async () => {
  const response = await api.get('/requests/pending');
  return response.data;
};

export const getMyRequests = async () => {
  try {
    console.log('Making request to /requests/my');
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await api.get('/requests/my');
    console.log('Response from /requests/my:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getMyRequests:', error.response?.data || error.message);
    throw error;
  }
};

export const approveRequest = async (requestId) => {
  try {
    console.log('Approving request:', requestId);
    const response = await api.put(`/requests/${requestId}/approve`);
    console.log('Approved request response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error approving request:', error);
    throw error;
  }
};

export const rejectRequest = async (requestId) => {
  try {
    console.log('Rejecting request:', requestId);
    const response = await api.put(`/requests/${requestId}/reject`);
    console.log('Rejected request response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error rejecting request:', error);
    throw error;
  }
};

export default api; 