import { useState } from 'react';
import ProductCard from '../product/product-card';
import ProductSidebar from '../product/product-side-bar';
import { useProducts } from '../../constants/useProducts'; // Import custom hook

const SmartWatchPage = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');

  const { products, loading, error } = useProducts('smartwatch', selectedBrand, selectedMemory);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 pl-5">
        <ProductSidebar
          onBrandSelect={setSelectedBrand}
          onMemorySelect={setSelectedMemory}
          selectedBrand={selectedBrand}
          selectedMemory={selectedMemory}
        />
      </div>

      {/* Product Grid */}
      <div className="flex-1 justify-center items-center p-10 md:p-10">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className="text-center w-full">No products available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartWatchPage;
