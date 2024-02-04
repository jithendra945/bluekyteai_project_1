// frontend/myfrontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { getTasks, logout } from './api';

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map((task) => (
      <li key={task.id}>
        <strong>{task.title}</strong> - {task.description} ({task.status})
      </li>
    ))}
  </ul>
);

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        console.log('Tasks:', response);
        // Check if response.data is defined before mapping
        if (response) {
          const transformedTasks = response.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
          }));
          setTasks(transformedTasks);
        } else {
          console.error('Error fetching tasks: Unexpected response structure');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    

    if (loggedIn) {
      fetchTasks();
    }
  }, [loggedIn]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // If already logged in, hide login/signup buttons
  const renderAuthButtons = () => {
    if (!loggedIn) {
      return (
        <div className="nav-links">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      );
    }
    return <button onClick={handleLogout}>Logout</button>;
  };

  return (
    <div className="app-container">
      <h1>Task Management App</h1>
      {renderAuthButtons()}
      {loggedIn && tasks && tasks.length === 0 && (
        <div>
          <p>No tasks available.</p>
          <Link to="/add-task">Add Task</Link>
        </div>
      )}
      {loggedIn && tasks && tasks.length > 0 && <TaskList tasks={tasks} />}
    </div>
  );
};

export default App;
