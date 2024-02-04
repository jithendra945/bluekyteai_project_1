// frontend/myfrontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Link, Navigate, Routes, Route } from 'react-router-dom';
import { getTasks, logout } from './api';
import AddTask from './AddTask'; // Import the new component

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
        setTasks(response.data);
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
      {loggedIn && tasks.length === 0 ? (
        <div>
          <p>No tasks available.</p>
          <Link to="/add-task">Add Task</Link>
        </div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.description} ({task.status})
            </li>
          ))}
        </ul>
      )}
      <Routes>
        {/* <Route path="/" element={<Navigate to="/tasks" />} /> */}
        <Route path="/tasks" element={<TaskList tasks={tasks} />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </div>
  );
};

export default App;
