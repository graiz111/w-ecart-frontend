const Loader = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="spinner"></div>
    </div>
  );
};

// Skeleton Loaders
export const ProductCardSkeleton = () => {
  return (
    <div className="card animate-pulse">
      <div className="skeleton h-64 w-full"></div>
      <div className="p-4">
        <div className="skeleton h-4 w-20 mb-2"></div>
        <div className="skeleton h-6 w-full mb-2"></div>
        <div className="skeleton h-4 w-24 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="skeleton h-8 w-24"></div>
          <div className="skeleton h-10 w-10 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
        <div className="skeleton h-96 w-full"></div>
        <div>
          <div className="skeleton h-8 w-3/4 mb-4"></div>
          <div className="skeleton h-6 w-1/2 mb-4"></div>
          <div className="skeleton h-20 w-full mb-4"></div>
          <div className="skeleton h-10 w-32 mb-4"></div>
          <div className="skeleton h-12 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export const OrderSkeleton = () => {
  return (
    <div className="card animate-pulse mb-4">
      <div className="p-4">
        <div className="skeleton h-6 w-48 mb-2"></div>
        <div className="skeleton h-4 w-32 mb-4"></div>
        <div className="skeleton h-20 w-full"></div>
      </div>
    </div>
  );
};

export default Loader;