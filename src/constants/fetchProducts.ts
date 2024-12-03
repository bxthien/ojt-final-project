// import axios from 'axios';
import axiosInstance from '../services/axios';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  photos: string[];
  url: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data: response } = await axiosInstance.get(`/product`);

    if (Array.isArray(response)) {
      return response;
    } else {
      throw new Error('No products found');
    }
  } catch {
    throw new Error('Error fetching products');
  }
};
