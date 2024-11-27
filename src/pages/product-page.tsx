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
}

const ProductPage = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Gọi hook useProducts mà không truyền category để lấy toàn bộ sản phẩm
  const { products, loading, error } = useProducts('', selectedBrand, selectedMemory);

  // Cập nhật danh sách gợi ý khi searchTerm thay đổi
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

  // Xử lý khi click ra ngoài danh sách gợi ý
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
          onBrandSelect={setSelectedBrand}
          onMemorySelect={setSelectedMemory}
          selectedBrand={selectedBrand}
          selectedMemory={selectedMemory}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 md:p-10">
        {/* Search Bar */}
        <div className="mb-5 relative" ref={suggestionsRef}>
          <Search
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Gợi ý tìm kiếm */}
          {showSuggestions && suggestedProducts.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg w-full max-h-60 overflow-y-auto">
              {suggestedProducts.map((product) => (
                <li
                  key={product.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
                    setSearchTerm(product.name); // Cập nhật giá trị thanh tìm kiếm
                    setShowSuggestions(false); // Ẩn danh sách gợi ý
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-center">
            {Array.isArray(products) && products.length > 0 ? (
              products
                .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((product: Product) => <ProductCard key={product.id} product={product} />)
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
