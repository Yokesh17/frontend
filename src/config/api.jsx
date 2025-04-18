// src/api/apiConfig.js
import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://yokesh17.pythonanywhere.com/", // fallback if env var not set
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Optional: Add token interceptor (if you use JWT/OAuth)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or use a secure cookie/store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    if (error.response?.status === 401) {
      // logout user, refresh token etc.
      console.warn("Unauthorized, redirect to login");
    }
    return Promise.reject(error);
  }
);

export default api;
