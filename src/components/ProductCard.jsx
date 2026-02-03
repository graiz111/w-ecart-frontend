import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    addToCart(product);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist');
      return;
    }
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <Link to={`/products/${product._id}`} className="card product-card relative group">
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10 hover:scale-110 transition-transform"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-600" />
        )}
      </button>

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold z-10">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Product Image */}
      <div className="image-zoom overflow-hidden">
        <img
          src={product.images?.[0]?.url || '/placeholder.jpg'}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm text-primary-600 font-medium">{product.category}</p>
        <h3 className="text-lg font-semibold mt-1 line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < Math.floor(product.ratings) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.numOfReviews || 0})
          </span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-4">
          <div>
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary-600">
                  ${product.discountPrice}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-primary-600">
                ${product.price}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FaShoppingCart />
          </button>
        </div>

        {/* Stock Status */}
        {product.stock === 0 && (
          <p className="text-red-500 text-sm mt-2 font-medium">Out of Stock</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;