// src/apiAuth.js
import axios from 'axios';

const apiAuth = axios.create({
  baseURL: 'http://10.1.70.163:5000/auth',
  withCredentials: true,
});

export default apiAuth;
