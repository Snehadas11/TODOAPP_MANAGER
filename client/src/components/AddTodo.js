import React, { useState } from 'react';
import api from '../api';

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await api.post('/todos', { title }); // ✅ Notice the path
      onAdd(res.data); // callback to parent
      setTitle('');
    } catch (err) {
      console.error('Add task error:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
