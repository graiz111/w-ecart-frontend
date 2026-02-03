import axiosInstance from '../utils/axiosInstance';

/**
 * Product Service
 * Handles all product-related API calls
 */

// Get all products with filters
export const getProducts = async (queryParams = {}) => {
  const response = await axiosInstance.get('/products', { params: queryParams });
  return response.data;
};

// Get single product by ID
export const getProductById = async (productId) => {
  const response = await axiosInstance.get(`/products/${productId}`);
  return response.data;
};

// Get featured products
export const getFeaturedProducts = async () => {
  const response = await axiosInstance.get('/products/featured');
  return response.data;
};

// Create new product (Admin)
export const createProduct = async (productData) => {
  const response = await axiosInstance.post('/products', productData);
  return response.data;
};

// Update product (Admin)
export const updateProduct = async (productId, productData) => {
  const response = await axiosInstance.put(`/products/${productId}`, productData);
  return response.data;
};

// Delete product (Admin)
export const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/products/${productId}`);
  return response.data;
};

// Create product review
export const createReview = async (productId, reviewData) => {
  const response = await axiosInstance.post(`/products/${productId}/reviews`, reviewData);
  return response.data;
};

// Search products
export const searchProducts = async (searchTerm) => {
  const response = await axiosInstance.get('/products', {
    params: { search: searchTerm }
  });
  return response.data;
};

export default {
  getProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
  searchProducts,
};