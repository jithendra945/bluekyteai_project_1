// frontend/myfrontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { getTasks, logout, deleteTask } from './api';
import TaskList from './TaskList';
import AddOrUpdateTask from './AddOrUpdateTask';

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
    // Navigate to the AddOrUpdateTask page with the task ID as a route parameter
    navigate(`/add-task/${taskId}`);
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      try {
        // Delete the task using the deleteTask API function
        await deleteTask(taskId);
        
        // After successful deletion, update the tasks list
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      } catch (error) {
        console.error(`Error deleting task with ID ${taskId}:`, error);
      }
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
      {loggedIn && (
        <>
          <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
          <div className="nav-links">
            <Link to="/add-task">Add Task</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
