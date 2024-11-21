const ProductDetails = ({ name, price }: { name: string; price: string }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-3xl font-bold text-[#56B280]">{price}</span>
      </div>
    </div>
  );
};

export default ProductDetails;

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   photos: string[];
// };

// const ProductDetail = () => {
//   const { id } = useParams<{ id: string }>(); // Lấy ID sản phẩm từ URL
//   const [product, setProduct] = useState<Product | null>(null); // Trạng thái cho chi tiết sản phẩm
//   const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
//   const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const { data: response } = await axios.get(
//           `https://b7c7-113-160-225-96.ngrok-free.app/product/${id}`,
//           {
//             headers: {
//               'Content-Type': 'application/json;charset=UTF-8',
//               'Access-Control-Allow-Origin': '*',
//               'ngrok-skip-browser-warning': 'true',
//             },
//           }
//         );

//         setProduct(response); // Lưu thông tin sản phẩm vào state
//         setLoading(false); // Ngừng trạng thái tải
//       } catch (error) {
//         setError('Lỗi khi tải chi tiết sản phẩm');
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchProductDetails(); // Gọi API nếu có ID
//     }
//   }, [id]); // Chỉ chạy lại khi ID thay đổi

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p>Không tìm thấy sản phẩm</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-8">
//       <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//       <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
//         <div className="w-full lg:w-1/2">
//           <img
//             src={product.photos[0]} // Hiển thị ảnh đầu tiên
//             alt={product.name}
//             className="w-full rounded-lg shadow-md"
//           />
//         </div>
//         <div className="w-full lg:w-1/2">
//           <p className="text-lg mb-4">{product.description}</p>
//           <p className="text-2xl font-semibold text-[#56B280] mb-4">${product.price}</p>
//           <button className="bg-[#56B280] text-white py-2 px-4 rounded-md transition hover:bg-white hover:text-black border border-transparent hover:border-black">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
