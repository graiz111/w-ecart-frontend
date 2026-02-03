import axiosInstance from '../utils/axiosInstance';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

// Register new user
export const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

// Logout user
export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

// Get current user
export const getMe = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};

// Update password
export const updatePassword = async (passwords) => {
  const response = await axiosInstance.put('/auth/password', passwords);
  return response.data;
};

export default {
  register,
  login,
  logout,
  getMe,
  updatePassword,
};