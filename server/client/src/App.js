import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/user', { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const handleLogout = () => {
    window.location.href = 'http://localhost:5000/auth/logout';
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1>Todo Task Manager</h1>

      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <p>Email: {user.emails[0].value}</p>
          <img src={user.photos[0].value} alt="User" width="100" />
          <br /><br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <a href="http://localhost:5000/auth/google">
          <button>Login with Google</button>
        </a>
      )}
    </div>
  );
}

export default App;
