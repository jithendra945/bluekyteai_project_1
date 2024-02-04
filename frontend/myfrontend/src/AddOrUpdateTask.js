// frontend/myfrontend/src/AddOrUpdateTask.js
import React, { useState, useEffect } from 'react';
import { createTask, getTask, updateTask } from './api';
import './AddOrUpdateTask.css';
import { useNavigate, useParams } from 'react-router-dom';

const AddOrUpdateTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();  // Get the taskId from the route parameters
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'TODO',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // If taskId is provided, fetch the task data for update
    if (taskId) {
      const fetchTaskData = async () => {
        try {
          const response = await getTask(taskId);
          setTaskData(response);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };

      fetchTaskData();
    }
  }, [taskId]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If taskId is provided, update the task; otherwise, create a new task
      if (taskId) {
        await updateTask(taskId, taskData);
      } else {
        await createTask(taskData);
      }

      navigate('/'); // Redirect to the home page after successful task creation or update
    } catch (error) {
      console.error('Error creating/updating task:', error);
      setError(error.response?.data || 'Unknown error');
    }
  };

  const onCancel = () => {
    navigate('/');
  }

  return (
    <div className="add-task-container">
      <h2>{taskId ? 'Update Task' : 'Add Task'}</h2>
      {error && <div className="error-message">{error}</div>}
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
        <button type="submit">{taskId ? 'Update Task' : 'Add Task'}</button>
        <button type="button" onClick={() => onCancel()}>Cancel</button>
      </form>
    </div>
  );
};

export default AddOrUpdateTask;
