import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';

// Determine the API base URL based on the environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add auth token and set loading state
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    useUiStore.getState().setLoading(true);
    return config;
  },
  (error) => {
    useUiStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors, clear loading state
axiosInstance.interceptors.response.use(
  (response) => {
    useUiStore.getState().setLoading(false);
    return response;
  },
  (error) => {
    useUiStore.getState().setLoading(false);
    
    let errorMessage = 'An unexpected error occurred.';
    let status = null;

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status code outside of 2xx
        status = error.response.status;
        errorMessage = error.response.data?.detail || error.response.data?.message || `Error ${status}: ${error.response.statusText}`;
        
        // Handle specific status codes
        if (status === 401) {
          // Token expired or invalid, log out user
          useAuthStore.getState().clearToken();
          errorMessage = 'Session expired. Please log in again.';
          // Optionally redirect to login page here, or let the component handle it
        } else if (status === 403) {
          errorMessage = 'You do not have permission to perform this action.';
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'Network Error: No response received from server.';
      } else {
        // Something else happened in setting up the request
        errorMessage = `Request setup error: ${error.message}`;
      }
    }

    useUiStore.getState().setError(errorMessage); // Set global error message
    console.error('API Call Error:', errorMessage, error);
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
