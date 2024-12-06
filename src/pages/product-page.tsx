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
  // const location = useLocation() as { state?: { searchTerm?: string } };
  // const [searchTerm, setSearchTerm] = useState<string>(location.state?.searchTerm || '');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const category = searchParams.get('category') || 'default-category';
  const brand = searchParams.get('brand') || '';
  const memory = searchParams.get('memory') || '';

  const searchKey = searchParams.get('searchKey') || '';
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchTerm(searchParams.get('search') || '');
  }, [location.search]);

  // Fetch products from the useProducts hook
  // const { products, loading, error } = useProducts('');
  const { products, loading, error } = useProducts({
    category,
    brand,
    memory,
    minPrice,
    maxPrice,
    searchKey,
  });

  // Filter and sort products when price range, sort order, or search term changes
  useEffect(() => {
    const filtered = products
      .filter((product) => product.price >= minPrice && product.price <= maxPrice) // Filter by price range
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())) // Filter by search term
      .sort(
        (a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price) // Sort by price
      );
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, sortOrder, searchTerm, products]);

  // Callback to update sort order
  const handlePriceSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlMinPrice = queryParams.get('minPrice');
    const urlMaxPrice = queryParams.get('maxPrice');

    if (urlMinPrice) setMinPrice(Number(urlMinPrice));
    if (urlMaxPrice) setMaxPrice(Number(urlMaxPrice));
  }, [location]);

  const handlePriceChange = (newMinPrice: number, newMaxPrice: number) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);

    // Cập nhật giá trị minPrice và maxPrice trong URL
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('minPrice', newMinPrice.toString());
    searchParams.set('maxPrice', newMaxPrice.toString());

    // Thay đổi URL mà không reload trang
    window.history.pushState({}, '', `${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/5">
        <ProductSidebar
          onBrandSelect={() => {}}
          onMemorySelect={() => {}}
          selectedBrand=""
          selectedMemory=""
          onPriceSortChange={handlePriceSortChange}
          onPriceChange={handlePriceChange}
          minPrice={0}
          maxPrice={0}
        />
      </div>
      {/* Price Range Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-8  pt-5 md:p-8">
        {/* Search Bar */}

        {searchTerm && (
          <p className="text-lg text-gray-700 mb-6">
            Searching for: <span className="font-semibold">{searchTerm}</span>
          </p>
        )}
        {/* Product Grid */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-2">
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2"> */}
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
