import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../product/product-card';

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const responseData = await axios
  //         .get('https://a4e5-113-160-225-96.ngrok-free.app/product', {
  //           headers: {
  //             'Content-Type': 'application/json;charset=UTF-8',
  //             'Access-Control-Allow-Origin': '*',
  //             'ngrok-skip-browser-warning': 'true',
  //           },
  //           params: {
  //             orderBy: 'ASC',
  //             page: 1,
  //             take: 10,
  //           },
  //         })
  //         .then(({ data: response }) => {
  //           setProducts(response.data);
  //           console.log('object', response.data);
  //         });
  //       // setProducts(response.data); // Lưu dữ liệu sản phẩm vào state
  //       // console.log('object', response);
  //       setLoading(false); // Đổi trạng thái loading khi có dữ liệu
  //     } catch (err: any) {
  //       setError('Lỗi khi tải dữ liệu sản phẩm'); // Lỗi khi gọi API
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: response } = await axios.get(
          'https://b7c7-113-160-225-96.ngrok-free.app/product',
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

        // Đảm bảo response.data tồn tại
        if (Array.isArray(response.data)) {
          setProducts(response.data); // Lưu danh sách sản phẩm
        }
        setLoading(false);
      } catch {
        setError('Lỗi khi tải dữ liệu sản phẩm');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log('products', products);

  return (
    <div className="bg-white min-h-screen p-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-36">
      <h1 className="text-4xl font-bold mb-6 text-center">New Arrival</h1>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show loading indicator */}
      {loading ? (
        <div className="text-center">Loading...</div> // Replace with a spinner if needed
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 max-w-full justify-center">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-center">No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
