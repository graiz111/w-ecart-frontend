import axiosInstance from '../utils/axiosInstance';

/**
 * Order Service
 * Handles all order-related API calls
 */

// Create payment intent with Stripe
export const createPaymentIntent = async (amount) => {
  const response = await axiosInstance.post('/orders/create-payment-intent', { amount });
  return response.data;
};

// Create new order
export const createOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders', orderData);
  return response.data;
};

// Get order by ID
export const getOrderById = async (orderId) => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data;
};

// Get my orders (logged in user)
export const getMyOrders = async () => {
  const response = await axiosInstance.get('/orders/my-orders');
  return response.data;
};

// Get all orders (Admin)
export const getAllOrders = async (queryParams = {}) => {
  const response = await axiosInstance.get('/orders', { params: queryParams });
  return response.data;
};

// Update order status (Admin)
export const updateOrderStatus = async (orderId, status) => {
  const response = await axiosInstance.put(`/orders/${orderId}/status`, { status });
  return response.data;
};

// Get order statistics (Admin)
export const getOrderStats = async () => {
  const response = await axiosInstance.get('/orders/admin/stats');
  return response.data;
};

export default {
  createPaymentIntent,
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderStats,
};