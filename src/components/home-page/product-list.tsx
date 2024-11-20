import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../product/product-card';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

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