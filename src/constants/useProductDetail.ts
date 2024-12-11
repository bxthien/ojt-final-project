import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../services/axios';

type Photo = {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

// Define the Product type based on API response
interface Product {
  id: string;
  name: string;
  price: number;
  isDelete: boolean;
  url: string | null;
  urls: string[] | null;
  info: {
    description: string;
    color: string[];
    size: string[];
    policy: string;
  };
  color?: string[];
  size?: string[];
  quantity: number;
  createdAt: string;
  updatedAt: string;
  photos: Photo[];
  category: {
    id: string;
    name: string;
    categoryId: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export const useProductDetail = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetail = async () => {
      try {
        const { data: response } = await axiosInstance.get(`/product/${productId}`);

        if (response) {
          setProduct(response);
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
