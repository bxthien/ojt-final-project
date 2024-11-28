import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../../constants/useProductDetail';
// import ProductImages from './product-image';
import ProductMainImage from './product-main-image';
import ColorSelector from './color-selector';
import MemorySelector from './memory-selector';
import ActionButtons from './action-buttons';
import { Breadcrumb } from 'antd'; // Import Breadcrumb from Ant Design
import ProductDescription from './product-description';

const ProductDetailPage = () => {
  // Lấy productId từ URL
  const { id: productId } = useParams<{ id: string }>();

  // Sử dụng hook để lấy chi tiết sản phẩm từ API
  const { product, loading, error } = useProductDetail(productId || '');

  // Quản lý trạng thái lựa chọn hình ảnh, màu sắc và dung lượng
  // const [ setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Xử lý lựa chọn
  // const handleImageSelect = (image: string) => setSelectedImage(image);
  const handleColorSelect = (color: string) => setSelectedColor(color);
  const handleSizeSelect = (size: string) => setSelectedSize(size);

  if (loading) return <div>Loading product...</div>;
  if (error || !product) return <div>{error || 'Không tìm thấy sản phẩm'}</div>;

  // console.log(selectedImage, product.photos[0]);
  return (
    <div className="container mx-auto pt-4 pb-4 px-2 lg:pt-12 lg:pb-28 lg:px-40">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>
          <a href="/">Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/product-page">Product</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Phần bên trái: Hình ảnh sản phẩm */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
          {/* ảnh nhỏ */}
          {/* <div className="flex md:flex-col gap-4 justify-center md:justify-start">
            <ProductImages images={product.photos} onImageSelect={handleImageSelect} />
          </div> */}
          {/* ảnh chính */}
          <div className="w-full">
            <ProductMainImage url={product.url} photos={[]} />
            {/* <ProductMainImage photos={product.url[0]} url={''} /> */}
          </div>
        </div>
        {/*Bên phải: Thông tin sản phẩm */}
        <div className="flex flex-col gap-6 md:text-left md:items-start pl-9">
          {/* Thông tin chi tiết sản phẩm */}
          <ProductDescription name={product.name} price={product.price} />
          <ColorSelector
            colors={product.info.color}
            selectedColor={selectedColor || product.info.color[0]}
            onColorSelect={handleColorSelect}
          />
          <MemorySelector
            sizes={product.info.size}
            selectedSize={selectedSize || product.info.size[0]}
            onSizeSelect={handleSizeSelect}
          />
          <p className="text-base text-gray-600 mt-2">{product.info.description}</p>
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
