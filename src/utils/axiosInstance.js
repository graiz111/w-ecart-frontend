import axios from 'axios';

/**
 * Axios instance with default configuration
 * Handles API requests with credentials (cookies)
 */

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const message = error.response.data.message || 'Something went wrong';
      
      // Redirect to login on 401 (unauthorized)
      if (error.response.status === 401) {
        // Clear any stored auth data
        localStorage.removeItem('user');
        
        // Only redirect if not already on login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      
      // Handle 403 (Forbidden)
      if (error.response.status === 403) {
        window.location.href = '/';
      }
      
      error.message = message;
    } else if (error.request) {
      // Request was made but no response received
      error.message = 'Network error. Please check your connection.';
    } else {
      // Something else happened
      error.message = 'An unexpected error occurred';
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;