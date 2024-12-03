import { useState, useEffect } from 'react';
import axiosInstance from '../services/axios';

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
  url: string;
}

interface UseProductsParams {
  category: string;
  brand?: string;
  memory?: string;
  minPrice?: number;
  maxPrice?: number;
  searchKey?: string;
  orderBy?: 'ASC' | 'DESC';
}

export const useProducts = ({
  category,
  brand = '',
  memory = '',
  minPrice = 0,
  maxPrice = 10000,
  searchKey = '',
  orderBy = 'ASC',
}: UseProductsParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build params dynamically
        const params: Record<string, string | number> = {
          category,
          brand,
          memory,
          minPrice,
          maxPrice,
          searchKey,
          orderBy,
          page: 1,
          take: 12,
        };

        const { data: response } = await axiosInstance.get(`/product`, { params });

        // Validate and update products
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error(response.message || 'Unexpected response format');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Error fetching products');
        } else {
          setError('Unknown error occurred');
        }
        console.error('Fetch Products Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, brand, memory, minPrice, maxPrice, searchKey, orderBy]);

  return { products, loading, error };
};
