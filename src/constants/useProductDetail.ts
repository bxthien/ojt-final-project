import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

// Define the Product type based on API response
interface Product {
  id: string;
  name: string;
  price: number;
  info: {
    description: string;
    color: string[];
    size: string[];
  };
  photos: string[];
}

// Define the expected structure of the response
interface ProductDetailResponse {
  id: string;
  name: string;
  price: number;
  info: {
    description: string;
    color: string[];
    size: string[];
  };
  photos: string[];
}

export const useProductDetail = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetail = async () => {
      try {
        const response = await axios.get<ProductDetailResponse>(
          `https://be-final-project-bddr.onrender.com/product/${productId}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );

        if (response.data) {
          setProduct(response.data);
        } else {
          setError('Không tìm thấy sản phẩm');
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error('Axios Error:', err.response);
          setError(err.response?.data?.message || 'Lỗi khi tải chi tiết sản phẩm');
        } else if (err instanceof Error) {
          console.error('General Error:', err.message);
          setError(err.message || 'Lỗi khi tải chi tiết sản phẩm');
        } else {
          console.error('Unknown Error:', err);
          setError('Lỗi không xác định');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return { product, loading, error };
};
