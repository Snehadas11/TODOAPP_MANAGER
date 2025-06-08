import React, { useState } from 'react';
import api from '../api';

const EditTodo = ({ todo, onSave, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [dueDate, setDueDate] = useState(todo.dueDate ? todo.dueDate.split('T')[0] : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/todos/${todo._id}`, {
        title,
        description,
        dueDate,
      });
      onSave(response.data);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '6px', width: '100%' }}
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ display: 'block', marginBottom: '6px', width: '100%' }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        style={{ display: 'block', marginBottom: '6px' }}
      />
      <button type="submit" style={{ marginRight: '10px' }}>Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditTodo;
