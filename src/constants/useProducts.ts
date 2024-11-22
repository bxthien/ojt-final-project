import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './fetchProducts';

export const useProducts = (category: string, brand?: string, memory?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Tạo params một cách linh hoạt để không gửi những giá trị không cần thiết
        const params: { [key: string]: string | undefined } = {
          orderBy: 'ASC',
          page: '1',
          take: '10',
        };

        if (category) params.category = category;
        if (brand) params.brand = brand;
        if (memory) params.memory = memory;

        const { data: response } = await axios.get(
          'https://409e-113-160-225-96.ngrok-free.app/product',
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
              'ngrok-skip-browser-warning': 'true',
            },
            params: params,
          }
        );

        // Đảm bảo response.data tồn tại và là mảng
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Lưu danh sách sản phẩm
        } else {
          setError('Không có sản phẩm');
        }
      } catch {
        setError('Lỗi khi tải dữ liệu sản phẩm');
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category, brand, memory]); // Chạy lại khi category, brand hoặc memory thay đổi

  return { products, loading, error };
};
