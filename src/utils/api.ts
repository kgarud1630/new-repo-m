import axios from 'axios';
import { auth } from '../config/firebase';

// Create an axios instance with base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  async (config) => {
    // Get current user
    const user = auth.currentUser;
    
    // If user is logged in, get their token and add to headers
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error statuses
    if (error.response) {
      // Handle 401 Unauthorized - redirect to login
      if (error.response.status === 401) {
        // Check if we're not already on the login page
        if (!window.location.pathname.includes('/auth/login')) {
          window.location.href = '/auth/login';
        }
      }
      
      // Handle 403 Forbidden - access denied
      if (error.response.status === 403) {
        console.error('Access denied. Insufficient permissions.');
      }
      
      // Handle 404 Not Found
      if (error.response.status === 404) {
        console.error('Resource not found.');
      }
      
      // Handle 500 Internal Server Error
      if (error.response.status >= 500) {
        console.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
