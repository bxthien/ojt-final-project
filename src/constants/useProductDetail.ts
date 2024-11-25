import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProductDetail = (productId: string) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://be-final-project-bddr.onrender.com/product/${productId}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );

        // Đảm bảo response chứa thông tin sản phẩm
        if (response && response.data) {
          setProduct(response.data); // Lưu thông tin chi tiết sản phẩm
        } else {
          setError('Không tìm thấy sản phẩm');
        }
      } catch {
        setError('Lỗi khi tải thông tin sản phẩm');
      }
      setLoading(false);
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]); // Chạy lại khi productId thay đổi

  return { product, loading, error };
};
