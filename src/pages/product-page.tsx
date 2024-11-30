import { useState, useEffect } from 'react';
import ProductCard from '../components/product/product-card';
import ProductSidebar from '../components/product/product-side-bar';
import { useProducts } from '../constants/useProducts';
import { useLocation } from 'react-router-dom';

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
  url: string;
}

const ProductPage = () => {
  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // State for sorting and price range
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  // State for search term from URL query parameters
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch search term from URL query
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchTerm(searchParams.get('search') || '');
  }, [location.search]);

  // Fetch products using the custom hook
  const { products, loading, error } = useProducts(minPrice, maxPrice);

  // Filter and sort products when dependencies change
  useEffect(() => {
    const filtered = products
      .filter((product) => product.price >= minPrice && product.price <= maxPrice) // Filter by price range
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
      .sort(
        (a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price) // Sort by price
      );
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, sortOrder, searchTerm, products]);

  // Handlers for sorting and price range changes
  const handlePriceSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 pl-5">
        <ProductSidebar
          onBrandSelect={() => {}} // Placeholder callback for brand selection
          onMemorySelect={() => {}} // Placeholder callback for memory selection
          selectedBrand="" // Placeholder for selected brand
          selectedMemory="" // Placeholder for selected memory
          onPriceSortChange={handlePriceSortChange} // Pass handler for sort order
          onPriceChange={handlePriceRangeChange} // Pass handler for price range
          minPrice={minPrice} // Pass minimum price
          maxPrice={maxPrice} // Pass maximum price
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 pt-5 md:p-8">
        {/* Display search term */}
        {searchTerm && (
          <p className="text-lg text-gray-700 mb-6">
            Searching for: <span className="font-semibold">{searchTerm}</span>
          </p>
        )}

        {/* Error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Loading spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-full justify-center">
            {/* Display products */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))
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
