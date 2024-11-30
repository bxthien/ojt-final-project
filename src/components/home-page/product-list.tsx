import { useState, useEffect } from 'react';
import ProductCard from '../product/product-card';
import axiosInstance from '../../services/axios';

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
  createdAt?: string;
  url: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Build params dynamically
        const params: Record<string, string> = {
          orderBy: 'ASC',
          page: '1',
          take: '12',
        };

        const { data: response } = await axiosInstance.get(`/product`, { params });

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
    <div className="bg-white p-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-14">
      <h1 className="text-4xl font-bold mb-6 text-center">New Arrival</h1>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show loading indicator */}
      {loading ? (
        <div className="text-center">Loading...</div> // Replace with a spinner if needed
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-full justify-center">
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
