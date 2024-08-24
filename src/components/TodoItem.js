// src/components/TodoItem.js
import React from 'react';

const TodoItem = ({ task, index, toggleComplete, deleteTask }) => {
  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleComplete(index)}>{task.text}</span>
      <button onClick={() => deleteTask(index)}>Delete</button>
    </li>
  );
};

export default TodoItem;
