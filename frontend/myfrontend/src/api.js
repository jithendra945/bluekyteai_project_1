import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';  // Replace with your Django backend API URL

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Include the token if available
  }
});

// Authentication API
export const signup = (userData) => api.post('signup/', userData);
export const login = (userData) => api.post('login/', userData);
export const logout = () => api.post('logout/');

// Tasks API
export const getTasks = () => api.get('tasks/');
export const createTask = (taskData) => api.post('tasks/', taskData);
export const updateTask = (taskId, taskData) => api.put(`tasks/${taskId}/`, taskData);

export default api;
