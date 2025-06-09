// src/apiAuth.js
import axios from 'axios';

const apiAuth = axios.create({
  baseURL: 'http://localhost:5000/auth',
  withCredentials: true,
});

export default apiAuth;
