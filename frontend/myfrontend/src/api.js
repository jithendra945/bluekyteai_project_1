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
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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

export const login = (userData) => api.post('auth/token/', userData);
export const logout = () => api.post('auth/logout/');

// Tasks API
// frontend/myfrontend/src/api.js
export const getTasks = () => {
  return api.get('tasks/')
    .then(response => response.data)
    .catch(error => {
      // Check if the error is due to unauthorized (401) and handle it accordingly
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized access. Logging out...');
        // Optionally, you can log the user out when unauthorized
        // Logout logic can be added here
      }
      console.error('Error fetching tasks:', error);
      throw error;  // Rethrow the error to propagate it to the calling code
    });
};

export const createTask = (taskData) => api.post('tasks/', taskData);
export const updateTask = (taskId, taskData) => api.put(`tasks/${taskId}/`, taskData);
export const deleteTask = (taskId) => api.delete(`tasks/${taskId}/`);

export default api;
