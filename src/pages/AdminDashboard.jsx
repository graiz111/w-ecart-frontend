import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign, FaPlus } from 'react-icons/fa';
import { getOrderStats, getAllOrders } from '../services/orderService';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load order stats
      const orderStatsData = await getOrderStats();
      
      // Load recent orders
      const ordersData = await getAllOrders({ limit: 5, page: 1 });
      
      // Load product count
      const productsResponse = await axiosInstance.get('/products?limit=1');
      
      // Load user count
      const usersResponse = await axiosInstance.get('/users?limit=1');

      setStats({
        totalOrders: orderStatsData.stats.reduce((acc, stat) => acc + stat.count, 0),
        totalRevenue: orderStatsData.totalRevenue,
        totalProducts: productsResponse.data.total,
        totalUsers: usersResponse.data.total,
      });

      setRecentOrders(ordersData.orders);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <FaDollarSign className="text-4xl text-green-600" />,
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <FaShoppingCart className="text-4xl text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <FaBox className="text-4xl text-purple-600" />,
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers className="text-4xl text-orange-600" />,
      bgColor: 'bg-orange-50',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="skeleton h-8 w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold font-serif mb-4 md:mb-0">Admin Dashboard</h1>
        <Link to="/admin/products/new" className="btn-primary flex items-center gap-2">
          <FaPlus />
          Add New Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className={`card p-6 ${stat.bgColor}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/admin/products/new" className="card p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="bg-primary-100 p-3 rounded-lg">
              <FaPlus className="text-2xl text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold">Add Product</h3>
              <p className="text-sm text-gray-600">Create new product listing</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/orders" className="card p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaShoppingCart className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Manage Orders</h3>
              <p className="text-sm text-gray-600">View and update orders</p>
            </div>
          </div>
        </Link>

        <Link to="/admin/products" className="card p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaBox className="text-2xl text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold">Manage Products</h3>
              <p className="text-sm text-gray-600">Edit or remove products</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link to="/admin/orders" className="text-primary-600 hover:underline text-sm">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">#{order._id.slice(-8)}</td>
                    <td className="px-4 py-3 text-sm">{order.user?.name || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;