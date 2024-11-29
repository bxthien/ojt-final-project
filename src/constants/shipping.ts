import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho sản phẩm
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  photos: string[];
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await axios.get<Product[]>('https://be-final-project-bddr.onrender.com', {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        orderBy: 'ASC',
        page: 1,
        take: 10,
      },
    });

    // Kiểm tra kiểu dữ liệu trả về
    if (Array.isArray(data)) {
      return data;
    } else {
      throw new Error('No products found');
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Lỗi khi tải dữ liệu sản phẩm');
  }
};
