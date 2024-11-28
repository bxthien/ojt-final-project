import { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/product/product-card';
import ProductSidebar from '../components/product/product-side-bar';
import { useProducts } from '../constants/useProducts';
import Search from '../components/header/search';

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
  url: string;
}

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Fetch products from the useProducts hook
  const { products, loading, error } = useProducts('');

  // Update suggested products based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestedProducts([]);
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filteredSuggestions = products.filter((product: Product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setSuggestedProducts(filteredSuggestions);
      setShowSuggestions(true);
    }
  }, [searchTerm, products]);

  // Filter and sort products when price range, sort order, or search term changes
  useEffect(() => {
    const filtered = products
      .filter((product) => product.price >= minPrice && product.price <= maxPrice) // Filter by price range
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
      .sort(
        (a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price) // Sort by price
      );
    setSortedProducts(filtered);
  }, [minPrice, maxPrice, sortOrder, searchTerm, products]);

  // Callback to update sort order
  const handlePriceSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  // Callback for price range change
  const handlePriceRangeChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  // Handle click outside the suggestion list
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          minPrice={0}
          maxPrice={0}
        />
      </div>
      {/* Price Range Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-8  pt-5 md:p-8">
        {/* Search Bar */}
        <div className="mb-5 relative" ref={suggestionsRef}>
          <Search
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Search Suggestions */}
          {showSuggestions && suggestedProducts.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg w-full max-h-60 overflow-y-auto">
              {suggestedProducts.map((product) => (
                <li
                  key={product.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event propagation
                    setSearchTerm(product.name); // Set search term to product name
                    setShowSuggestions(false); // Hide suggestions
                  }}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Product Grid */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-full justify-center">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product: Product) => (
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
