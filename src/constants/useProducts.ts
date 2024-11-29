import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './fetchProducts';

export const useProducts = (category: string, brand: string = '', memory: string = '') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build params dynamically
        const params: Record<string, string> = {
          orderBy: 'ASC',
          page: '1',
          take: '12',
        };

        if (category) params.category = category;
        if (brand) params.brand = brand;
        if (memory) params.memory = memory;

        // Fetch data from the API
        const { data: response } = await axios.get<{
          data: Product[];
          message?: string;
        }>('https://fd8f-113-160-225-96.ngrok-free.app/product', {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': 'true',
          },
          params,
        });

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
  }, [category, brand, memory]);

  return { products, loading, error };
};
