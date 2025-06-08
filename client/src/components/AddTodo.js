import React, { useState } from 'react';
import api from '../api';
import './AddTodo.css';

const AddTodo = ({ refreshTodos }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/todos', { title, description, dueDate });
      setTitle('');
      setDescription('');
      setDueDate('');
      refreshTodos();
    } catch (err) {
      console.error('Error creating todo:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <h2 className="add-todo-heading">Add New Todo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        className="add-todo-input"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="add-todo-textarea"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="add-todo-input"
      />
      <button type="submit" className="add-todo-button">Add Todo</button>
    </form>
  );
};

export default AddTodo;
