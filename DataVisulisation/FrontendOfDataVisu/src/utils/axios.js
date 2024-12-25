import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://datavisulization-app.vercel.app/api/v1', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
