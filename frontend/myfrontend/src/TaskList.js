// frontend/myfrontend/src/TaskList.js
import React from 'react';

const TaskList = ({ tasks, onUpdate, onDelete }) => (
  <div>
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <strong>{task.title}</strong> - {task.description} ({task.status})
          <button onClick={() => onUpdate(task.id)}>Update</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

export default TaskList;
