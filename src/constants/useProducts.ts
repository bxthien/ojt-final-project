import { useState, useEffect } from 'react';
import axiosInstance from '../services/axios';

export type Photo = {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export interface Product {
  id: string;
  name: string;
  price: number;
  isDelete: boolean;
  url: string | null;
  info: {
    description: string;
    policy: string;
  };
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

interface UseProductsParams {
  categories?: string[];
  brand?: string;
  memory?: string;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  search?: string;
  orderBy?: 'ASC' | 'DESC';
}

export const useProducts = ({
  categories = [],
  minPrice = undefined,
  maxPrice = undefined,
  search = '',
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
        const params = {
          categoryIds: categories,
          search,
          orderBy,
          page: 1,
          take: 12,
          limit: 1,
          minPrice,
          maxPrice,
        };

        const { data: response } = await axiosInstance.post(`/product/filter`, { ...params });

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
  }, [categories.join(','), minPrice, maxPrice, search, orderBy]);

  return { products, loading, error };
};
