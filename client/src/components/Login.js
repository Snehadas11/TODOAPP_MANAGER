import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <a
       href="http://localhost:5000/auth/google"
     

        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Login with Google
      </a>
    </div>
  );
};

export default Login;
