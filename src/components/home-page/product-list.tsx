import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../product/product-card';

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
  createdAt?: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: response } = await axios.get(
          'https://be-final-project-bddr.onrender.com/product',
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

        if (Array.isArray(response.data)) {
          // Lọc và sắp xếp sản phẩm dựa trên createdAt nếu có
          const sortedProducts = response.data
            .filter((product: Product) => product.createdAt) // Loại bỏ sản phẩm không có createdAt
            .sort(
              (a: Product, b: Product) =>
                new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
            );

          // Chỉ lấy 4 sản phẩm mới nhất
          setProducts(sortedProducts.slice(0, 4));
        }
        setLoading(false);
      } catch {
        setError('Lỗi khi tải dữ liệu sản phẩm');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen p-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-36">
      <h1 className="text-4xl font-bold mb-6 text-center">New Arrival</h1>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show loading indicator */}
      {loading ? (
        <div className="text-center">Loading...</div> // Replace with a spinner if needed
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 max-w-full justify-center">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-center">No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
