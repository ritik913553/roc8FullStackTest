import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://datavisulization-app.vercel.app/api/v1', 
  // baseURL: 'http://localhost:9000/api/v1',  // for local development
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
