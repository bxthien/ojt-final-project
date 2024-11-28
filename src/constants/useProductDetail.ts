import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

// Define the Product type based on API response
interface Product {
  url: string;
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
  url: string;
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
          `https://0837-113-160-225-96.ngrok-free.app/product/${productId}`,
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
          setError('No found product');
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error('Axios Error:', err.response);
          setError(err.response?.data?.message || 'Error fetching product detail');
        } else if (err instanceof Error) {
          console.error('General Error:', err.message);
          setError(err.message || 'Error fetching product detail');
        } else {
          console.error('Unknown Error:', err);
          setError('Unknown Error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return { product, loading, error };
};
