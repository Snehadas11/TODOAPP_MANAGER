import React, { useEffect, useState } from 'react';
import api from './api';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/user')
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => {
        setUser(null);
      });
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Todo App</h1>
        <a href="http://localhost:5000/auth/google">
          <button>Login with Google</button>
        </a>
      </div>
    );
  }

  const handleAdd = (newTask) => {
    // your logic
  };

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo onAdd={handleAdd} />
      <TodoList />
      <a href="http://localhost:5000/auth/logout">
        <button>Logout</button>
      </a>
    </div>
  );
}

export default App;
