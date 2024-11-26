import { useEffect, useState } from 'react';
import ProductCard from '../components/product/product-card';
import ProductSidebar from '../components/product/product-side-bar';
import { fetchProducts } from '../constants/fetchProducts';

interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Default sort order

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setSortedProducts(fetchedProducts); // Initialize sortedProducts
    };
    loadProducts();
  }, []);

  // Handle sorting when sortOrder changes
  useEffect(() => {
    const sorted = [...products].sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
  }, [sortOrder, products]);

  // Callback to update sort order
  const handlePriceSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 pl-5">
        {/* Sidebar */}
        <ProductSidebar
          onBrandSelect={() => {}}
          onMemorySelect={() => {}}
          selectedBrand=""
          selectedMemory=""
          onPriceSortChange={handlePriceSortChange}
        />
      </div>

      {/* Product Grid */}
      <div className="flex-1 justify-center items-center p-10 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-center">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
