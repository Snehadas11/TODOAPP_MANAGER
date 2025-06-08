import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

const Home = ({ onTodoAdded }) => {
  const navigate = useNavigate();
  return (
    <>
      <AddTodo onTodoAdded={onTodoAdded} />
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button
          onClick={() => navigate('/todos')}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: 'auto',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>+</span> View My Todo
        </button>
      </div>
    </>
  );
};

const TodoListPage = ({ refresh }) => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15, justifyContent: 'space-between' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            marginRight: 10,
            userSelect: 'none',
          }}
          title="Back to Add Todo"
        >
          ←
        </button>
        <h2 style={{ margin: 0 }}>My Todo List</h2>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            fontSize: '16px',
            borderRadius: '50%',
            cursor: 'pointer',
            lineHeight: '1',
          }}
          title="Add New Todo"
        >
          +
        </button>
      </div>
      <TodoList key={refresh} />
    </>
  );
};

const MainApp = () => {
  const [refresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  const handleTodoAdded = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetch('http://localhost:5000/auth/user', {
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else throw new Error('Not logged in');
      })
      .then((data) => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
        window.location.href = 'http://localhost:5000/auth/google';
      });
  }, []);

  if (isLoggedIn === null) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Todo Task Manager</h1>
      <Routes>
        <Route path="/" element={<Home onTodoAdded={handleTodoAdded} />} />
        <Route path="/todos" element={<TodoListPage refresh={refresh} />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <MainApp />
  </Router>
);

export default App;
