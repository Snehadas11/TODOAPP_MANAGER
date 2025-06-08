import React, { useState } from 'react';
import api from '../api';
import './TodoStyles.css';

const TodoItem = ({ todo, refreshTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate?.substring(0, 10) || '',
  });

  const isOverdue = todo.status === 'Open' && todo.dueDate && new Date(todo.dueDate) < new Date();

  const handleUpdate = async () => {
    try {
      await api.put(`/todos/${todo._id}`, editData);
      setIsEditing(false);
      refreshTodos();
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const toggleStatus = async () => {
    try {
      const newStatus = todo.status === 'Open' ? 'Complete' : 'Open';
      await api.put(`/todos/${todo._id}`, { status: newStatus });
      refreshTodos();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/todos/${todo._id}`);
      refreshTodos();
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const cardClassNames = ['todo-card'];
  if (isOverdue) cardClassNames.push('overdue');
  if (todo.status === 'Complete') cardClassNames.push('complete');

  return (
    <div
      className={cardClassNames.join(' ')}
      onClick={(e) => {
        if (!['BUTTON', 'INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
          toggleStatus();
        }
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="todo-input"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="todo-textarea"
          />
          <input
            type="date"
            value={editData.dueDate}
            onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
            className="todo-input"
          />
          <button onClick={handleUpdate} className="todo-button primary">Save</button>
          <button onClick={() => setIsEditing(false)} className="todo-button secondary">Cancel</button>
        </>
      ) : (
        <>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p><strong>Due:</strong> {todo.dueDate?.substring(0, 10)}</p>
          <p>
            <strong>Status:</strong>{' '}
            {isOverdue ? <span style={{ color: 'red' }}>Overdue</span> : todo.status}
          </p>
          <div>
            <button onClick={() => setIsEditing(true)} className="todo-button primary">Edit</button>
            <button onClick={handleDelete} className="todo-button danger">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
