import { useState, useEffect } from 'react';
import ProductCard from '../components/product/product-card';
import ProductSidebar from '../components/product/product-side-bar';
import { useProducts } from '../constants/useProducts';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
      .filter((product) => product.price >= minPrice && product.price <= maxPrice)
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
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

    // Update URL query parameters
    const params = new URLSearchParams(location.search);
    params.set('minPrice', min.toString());
    params.set('maxPrice', max.toString());
    navigate(`/products?${params.toString()}`, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 pl-5">
        <ProductSidebar
          onBrandSelect={() => {}}
          onMemorySelect={() => {}}
          selectedBrand=""
          selectedMemory=""
          onPriceSortChange={handlePriceSortChange}
          onPriceChange={handlePriceRangeChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 p-2">
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
