import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.1.70.163:5000',
  withCredentials: true,
});

export default api;
