import axios from 'axios';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  photos: string[];
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data: response } = await axios.get(
      'https://a161-113-160-225-96.ngrok-free.app/product',
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'true',
        },
        params: {
          orderBy: 'ASC',
          page: 1,
          take: 10,
        },
      }
    );

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('No products found');
    }
  } catch {
    throw new Error('Lỗi khi tải dữ liệu sản phẩm');
  }
};
