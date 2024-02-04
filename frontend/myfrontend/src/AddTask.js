// frontend/myfrontend/src/AddTask.js
import React, { useState } from 'react';
import { createTask } from './api';
import './AddTask.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const AddTask = () => {
  const navigate = useNavigate();  // Initialize navigate from useNavigate
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'TODO', // Set a default status
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
    setError(null);  // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(taskData);
      navigate('/');  // Redirect to the home page after successful task creation
    } catch (error) {
      console.error('Error creating task:', error);
      setError(error.response?.data || 'Unknown error');  // Set the error message
    }
  };

  return (
    <div className="add-task-container">
      <h2>Add Task</h2>
      {error && <div className="error-message">{error}</div>}  {/* Display error if it exists */}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={taskData.title} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={taskData.description} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Status:
          <select name="status" value={taskData.status} onChange={handleChange} required>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
