// frontend/myfrontend/src/api.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token:', token); 
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error)
    return Promise.reject(error);
  }
);

// Authentication API
export const signup = (userData, onSuccess) => {
  return api.post('auth/signup/', userData)
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      onSuccess('/');
      return response;
    });
};

export const login = (userData) => {
  return api.post('auth/token/', userData)
    .then(response => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      return response;
    });
};

export const logout = () => {
  localStorage.removeItem('token'); // Remove token from local storage on logout
  return api.post('auth/logout/');
};

// Tasks API
export const getTasks = () => {
  return api.get('tasks/')
    .then(response => response.data)
    .catch(handleError);
};

export const getTask = (taskId) => {
  return api.get(`tasks/${taskId}/`)
    .then(response => response.data)
    .catch(handleError);
};

export const createTask = (taskData) => api.post('tasks/', taskData);
export const updateTask = (taskId, taskData) => api.put(`tasks/${taskId}/`, taskData);
export const deleteTask = (taskId) => api.delete(`tasks/${taskId}/`);

// Error handler for tasks API
const handleError = (error) => {
  // Check if the error is due to unauthorized (401) and handle it accordingly
  if (error.response && error.response.status === 401) {
    console.error('Unauthorized access. Logging out...');
    logout();
  }
  console.error('Error:', error);
  throw error;  // Rethrow the error to propagate it to the calling code
};

export default api;
