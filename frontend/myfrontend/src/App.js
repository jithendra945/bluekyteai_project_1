// frontend/myfrontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { getTasks, logout } from './api';
import TaskList from './TaskList';
import AddTask from './AddTask';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        console.log('Tasks:', response);
        // Check if response.data is defined before mapping
        if (response) {
          const transformedTasks = response.map((task) => ({
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

  const handleUpdateTask = (taskId) => {
    // Navigate to the AddTask page with the task ID as a route parameter
    navigate(`/add-task/${taskId}`);
  };

  const handleDeleteTask = (taskId) => {
    // Handle delete logic, e.g., send delete request to API
    console.log(`Delete task with ID: ${taskId}`);
  };

  return (
    <div className="app-container">
      <h1>Task Management App</h1>
      {loggedIn && (
        <>
          <button onClick={handleLogout}>Logout</button>
          <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
          <div className="nav-links">
            <Link to="/add-task">Add Task</Link>
          </div>
        </>
      )}
      {loggedIn && tasks && tasks.length === 0 && (
        <div>
          <p>No tasks available.</p>
        </div>
      )}
    </div>
  );
};

export default App;
