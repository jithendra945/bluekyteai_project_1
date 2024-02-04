// src/App.js
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getTasks } from './api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);

  useEffect(() => {
    if (loggedIn) {
      // Fetch tasks when the component mounts and user is logged in
      const fetchTasks = async () => {
        try {
          const response = await getTasks();
          setTasks(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };

      fetchTasks();
    }
  }, [loggedIn]); // Re-run effect when the login state changes

  // Redirect to login page if not logged in
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-container">
      <h1>Task Management App</h1>
      <div className="nav-links">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description} ({task.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
