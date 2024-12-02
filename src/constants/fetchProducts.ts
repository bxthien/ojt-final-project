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
    // const { data: response } = await axios.get(
    //   'https://0837-113-160-225-96.ngrok-free.app/product',
    //   // 'https://315e-113-160-225-96.ngrok-free.app/product',
    //   {
    //     headers: {
    //       'Content-Type': 'application/json;charset=UTF-8',
    //       'Access-Control-Allow-Origin': '*',
    //       'ngrok-skip-browser-warning': 'true',
    //     },
    //     params: {
    //       orderBy: 'ASC',
    //       page: 1,
    //       take: 10,
    //     },
    //   }
    // );

    if (Array.isArray(response)) {
      return response;
    } else {
      throw new Error('No products found');
    }
  } catch {
    throw new Error('Error fetching products');
  }
};
