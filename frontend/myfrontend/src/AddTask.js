// frontend/myfrontend/src/AddTask.js
import React, { useState } from 'react';
import { createTask } from './api';

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'TODO', // Set a default status
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(taskData);
      // You can redirect to the tasks page or perform other actions after successful task creation
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
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
