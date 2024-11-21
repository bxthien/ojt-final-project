import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/product/product-card';
import ProductSidebar from '../components/product/product-side-bar';

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: response } = await axios.get(
          'https://b7c7-113-160-225-96.ngrok-free.app/product',
          {
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
          }
        );

        // Đảm bảo response.data tồn tại
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Lưu danh sách sản phẩm
        }
        setLoading(false);
      } catch {
        setError('Lỗi khi tải dữ liệu sản phẩm');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedBrand, selectedMemory]); // Re-run when the filters change

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

export default ProductPage;
