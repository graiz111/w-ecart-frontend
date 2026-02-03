import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaShippingFast, FaCheckCircle } from 'react-icons/fa';
import { getMyOrders } from '../services/orderService';
import { OrderSkeleton } from '../components/Loader';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data.orders);
    } catch (error) {
      toast.error(error.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
      case 'Confirmed':
        return <FaBox className="text-xl" />;
      case 'Shipped':
        return <FaShippingFast className="text-xl" />;
      case 'Delivered':
        return <FaCheckCircle className="text-xl" />;
      default:
        return <FaBox className="text-xl" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold font-serif mb-8">My Orders</h1>
        {[...Array(3)].map((_, i) => (
          <OrderSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
        <p className="text-gray-600 mb-8">Start shopping and your orders will appear here!</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold font-serif mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="card p-6">
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b">
              <div>
                <h3 className="font-semibold text-lg">Order #{order._id.slice(-8)}</h3>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus}
                </span>
                {getStatusIcon(order.orderStatus)}
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3 mb-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-primary-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">
                  Shipping Address: {order.shippingAddress.street}, {order.shippingAddress.city}
                </p>
                <p className="text-sm text-gray-600">
                  Payment Status: <span className="text-green-600 font-medium">Paid</span>
                </p>
              </div>

              <div className="text-right mt-3 md:mt-0">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-primary-600">
                  ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Track Order Button */}
            {(order.orderStatus === 'Shipped' || order.orderStatus === 'Confirmed') && (
              <button className="btn-primary w-full md:w-auto mt-4">
                Track Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;