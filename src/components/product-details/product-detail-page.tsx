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
    photos: [PlayStation, AppleWatch, PlayStationMobile],
    colors: ['#000000', '#781DBC', '#E10000', '#E1B000', '#E8E8E8'],
    sizes: ['128GB', '256GB', '512GB', '1TB'],
  };

  const [selectedImage, setSelectedImage] = useState<string>(product.photos[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);

  const handleImageSelect = (image: string) => setSelectedImage(image);
  const handleColorSelect = (color: string) => setSelectedColor(color);
  const handleSizeSelect = (size: string) => setSelectedSize(size);

  return (
    <div className="container mx-auto pt-8 pb-8 px-4 lg:pt-28 lg:pb-28 lg:px-40">
      {/* Grid responsive: 1 cột trên mobile, 2 cột trên tablet và desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Images */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
          {/* Small Images */}
          <div className="flex md:flex-col gap-4 justify-center md:justify-start">
            <ProductImages images={product.photos} onImageSelect={handleImageSelect} />
          </div>
          {/* Main Image */}
          <div className="w-full">
            <ProductMainImage image={selectedImage} />
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="flex flex-col gap-6 md:text-left md:items-start pl-9">
          {/* Thông tin sản phẩm */}
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
    </div>
  );
};

export default ProductDetailPage;
