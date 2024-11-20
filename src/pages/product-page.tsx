import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/product/product-card';
import ProductSidebar from '../components/product/product-side-bar';
import Header from '../components/header/header';
import Footer from '../components/footer';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string[];
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://4eca-113-160-225-96.ngrok-free.app/product', {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': 'true',
          },
          params: {
            orderBy: 'ASC',
            page: 1,
            take: 10,
          },
        });

        setProducts(response.data); // Lưu dữ liệu sản phẩm vào state
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Lỗi khi tải dữ liệu sản phẩm: ${err.message}`);
        } else {
          setError('Lỗi khi tải dữ liệu sản phẩm');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedBrand, selectedMemory]); // Re-run when the filters change

  return (
    <div className="min-h-screen">
      <Header />
      <ProductSidebar
        onBrandSelect={setSelectedBrand}
        onMemorySelect={setSelectedMemory}
        selectedBrand={selectedBrand}
        selectedMemory={selectedMemory}
      />

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}

      {/* Error state */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display filtered products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
