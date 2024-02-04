// Login.js
import React, { useState } from 'react';
import { login } from './api';
import { Link } from 'react-router-dom'; // Import Link
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log('Login successful:', response.data);
      // Save token to local storage or Redux state upon successful login
    } catch (error) {
      console.error('Login error:', error.response.data);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
    </div>
  );
};

export default Login;
