import React, { useState, useEffect } from 'react';
import api from '../api';
import TodoItem from './TodoItem';
import './TodoStyles.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dueDateFilter, setDueDateFilter] = useState('');

  const fetchTodos = async () => {
    try {
      const params = {};
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (statusFilter !== 'All') params.status = statusFilter;
      if (dueDateFilter) params.dueDate = dueDateFilter;

      const res = await api.get('/todos', { params });
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [searchTerm, statusFilter, dueDateFilter]);

  return (
    <div className="todo-list-container">
      <h2 className="todo-list-heading">Your Todos</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Complete">Complete</option>
        </select>

        <input
          type="date"
          value={dueDateFilter}
          onChange={e => setDueDateFilter(e.target.value)}
          title="Filter by due date"
        />
      </div>

      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        todos.map(todo => <TodoItem key={todo._id} todo={todo} refreshTodos={fetchTodos} />)
      )}
    </div>
  );
};

export default TodoList;
