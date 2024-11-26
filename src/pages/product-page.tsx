import { useState } from 'react';
import ProductCard from '../components/product/product-card';
import ProductSidebar from '../components/product/product-side-bar';
import { useProducts } from '../constants/useProducts';

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
}

const ProductPage = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');

  // Gọi hook useProducts mà không truyền category để lấy toàn bộ sản phẩm
  const { products, loading, error } = useProducts('', selectedBrand, selectedMemory);
  const handlePriceSort = (order: 'asc' | 'desc') => {
    console.log(`Sorting by price: ${order}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 pl-5">
        <ProductSidebar
          onBrandSelect={setSelectedBrand}
          onMemorySelect={setSelectedMemory}
          selectedBrand={selectedBrand}
          selectedMemory={selectedMemory}
          onPriceSortChange={handlePriceSort}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-center">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product: Product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className="text-center w-full">No products available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
