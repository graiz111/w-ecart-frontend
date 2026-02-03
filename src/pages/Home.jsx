import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGem, FaShippingFast, FaLock, FaUndo } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Loader';
import { getFeaturedProducts } from '../services/productService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const data = await getFeaturedProducts();
      setFeaturedProducts(data.products);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Rings', image: '/rings.jpg' },
    { name: 'Necklaces', image: '/necklaces.jpg' },
    { name: 'Earrings', image: '/earrings.jpg' },
    { name: 'Bracelets', image: '/bracelets.jpg' },
  ];

  const features = [
    {
      icon: <FaGem className="text-4xl text-primary-600" />,
      title: 'Premium Quality',
      description: 'Certified authentic jewellery with hallmark guarantee',
    },
    {
      icon: <FaShippingFast className="text-4xl text-primary-600" />,
      title: 'Free Shipping',
      description: 'Free delivery on orders above $1000',
    },
    {
      icon: <FaLock className="text-4xl text-primary-600" />,
      title: 'Secure Payment',
      description: '100% secure payment with Stripe',
    },
    {
      icon: <FaUndo className="text-4xl text-primary-600" />,
      title: 'Easy Returns',
      description: '30-day hassle-free return policy',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">
              Discover Timeless Elegance
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Exquisite jewellery crafted with precision and passion. Find your perfect piece today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products" className="btn-primary text-lg px-8 py-3">
                Shop Now
              </Link>
              <Link to="/products?category=Bridal" className="btn-secondary text-lg px-8 py-3">
                Bridal Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="group"
              >
                <div className="card overflow-hidden">
                  <div className="image-zoom">
                    <div className="h-48 bg-primary-100 flex items-center justify-center">
                      <span className="text-6xl">💍</span>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold group-hover:text-primary-600 transition">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-4 text-center text-gray-500">No featured products available</p>
            )}
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif">Join Our Newsletter</h2>
          <p className="text-xl mb-8">Get exclusive offers and updates delivered to your inbox</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-gray-900 px-6 py-3 rounded-r-lg hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;