import ProductImages from './product-image';
import ProductMainImage from './product-main-image';
import ProductDetails from './product-detail';
import ColorSelector from './color-selector';
import ActionButtons from './action-buttons';
import PlayStation from '../../assets/images/playstation.png';
import AppleWatch from '../../assets/images/applewatch.png';
import PlayStationMobile from '../../assets/images/PlayStationMobile.png';
import { useState } from 'react';
import MemorySelector from './memory-selector';
import ProductDescription from './product-description';

const ProductDetailPage = () => {
  // Dữ liệu tĩnh của sản phẩm
  const product = {
    name: 'Apple iPhone 14 Pro Max',
    price: '$1399',
    oldPrice: '$1499',
    photos: [
      PlayStation, // URL ảnh sản phẩm
      AppleWatch,
      PlayStationMobile,
    ],
    colors: ['#000000', '#781DBC', '#E10000', '#E1B000', '#E8E8E8'],
    sizes: ['128GB', '256GB', '512GB', '1TB'],
  };

  // State để quản lý ảnh lớn và màu đã chọn
  const [selectedImage, setSelectedImage] = useState<string>(product.photos[0]); // Ảnh lớn mặc định là ảnh đầu tiên
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]); // Màu mặc định là màu đầu tiên
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]); // Kích thước mặc định là kích thước đầu tiên

  // Hàm xử lý khi chọn ảnh nhỏ
  const handleImageSelect = (image: string) => {
    setSelectedImage(image); // Cập nhật ảnh lớn
  };

  // Hàm xử lý khi chọn màu
  const handleColorSelect = (color: string) => {
    setSelectedColor(color); // Cập nhật màu
  };

  // Hàm xử lý khi chọn dung lượng
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size); // Cập nhật dung lượng
  };

  return (
    <div className="container mx-auto pr-40 pl-40 pt-28 pb-28 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Section: Images */}
      <div className="flex gap-12">
        <ProductImages images={product.photos} onImageSelect={handleImageSelect} />
        <ProductMainImage image={selectedImage} />
      </div>

      {/* Right Section: Details */}
      <div>
        <ProductDetails name={product.name} price={product.price} />
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onColorSelect={handleColorSelect}
        />
        <MemorySelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeSelect={handleSizeSelect}
        />
        <ProductDescription />
        <ActionButtons />
      </div>
    </div>
  );
};

export default ProductDetailPage;
