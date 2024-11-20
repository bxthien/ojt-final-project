import { useState, useEffect } from 'react';
import ProductCard from '../components/product/product-card';
import ProductSidebar from '../components/product/product-side-bar';
import { Product } from '../constants/data';
import Header from '../components/header/header';
import Footer from '../components/footer';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Construct the query parameters
        const params = new URLSearchParams();
        if (selectedBrand) params.append('brand', selectedBrand);
        if (selectedMemory) params.append('memory', selectedMemory);

        // Replace with your actual API endpoint
        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedBrand, selectedMemory]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-4 right-4 md:hidden z-50 bg-[#56B280] text-white p-3 rounded-full shadow-lg hover:bg-[#4a9c70] transition-colors"
      >
        {isSidebarOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      <div className="flex flex-1 pl-9">
        {/* Sidebar with mobile overlay */}
        <div
          className={`
          fixed md:static inset-0 bg-black bg-opacity-50 md:bg-transparent z-40
          ${isSidebarOpen ? 'block' : 'hidden'} md:block
        `}
        >
          <div
            className={`
            w-64 bg-white h-full transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          `}
          >
            <ProductSidebar
              onBrandSelect={(brand) => {
                setSelectedBrand(brand);
                setIsSidebarOpen(false);
              }}
              onMemorySelect={(memory) => {
                setSelectedMemory(memory);
                setIsSidebarOpen(false);
              }}
              selectedBrand={selectedBrand}
              selectedMemory={selectedMemory}
            />
          </div>
        </div>

        <main className="flex-1 p-6 md:ml-64">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
