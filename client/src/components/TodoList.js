import React, { useEffect, useState } from 'react';
import api from '../api';
import AddTodo from './AddTodo';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get('/todos') // ✅ Get all todos
      .then(res => setTodos(res.data))
      .catch(err => console.error('Fetch error:', err.message));
  }, []);

  const addTodo = newTodo => setTodos([...todos, newTodo]);

  return (
    <div>
      <h2>My Todo List</h2>
      <AddTodo onAdd={addTodo} />
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
