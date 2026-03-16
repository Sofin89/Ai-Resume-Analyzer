import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:  'https://ai-resume-analyzer-id8q.onrender.com' || import.meta.env.VITE_API_URL ,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding token
axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden - maybe show upgrade message
      console.error('Access forbidden');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;