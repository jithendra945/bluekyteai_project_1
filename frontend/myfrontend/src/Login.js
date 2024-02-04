// frontend/myfrontend/src/Login.js

import React, { useState, useEffect } from 'react';
import { login } from './api';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log('Login successful:', response.data);

      // Redirect to the home page upon successful login
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response.data);
      setError(error.response.data || 'Unknown error');
    }
  };

  return (
    <div className="login-container">
      <h2 className="header">Task Management - Login</h2>
      {error && (
        <div className="error-message">
          {Object.entries(error).map(([field, messages]) => (
            <div key={field}>
              <p>{field.charAt(0).toUpperCase() + field.slice(1)}:</p>
              <ul>
                {messages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        New user? <Link to="/signup">Signup</Link>
      </p>
      <p>
        Redirect to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default Login;
