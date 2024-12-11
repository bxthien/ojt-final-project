import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../../constants/useProductDetail';
import ProductMainImage from './product-main-image';
import ProductImages from './product-image';
import { Breadcrumb } from 'antd';
import ProductDescription from './product-description';
import ColorSelector from './color-selector';
import MemorySelector from './memory-selector';
import ActionButtons from './action-buttons';
import { useTranslation } from 'react-i18next';
import RelatedProducts from './related-products';

const ProductDetailPage = () => {
  const { id: productId } = useParams<{ id: string }>();
  const { t } = useTranslation();

  // Sử dụng hook để lấy chi tiết sản phẩm từ API
  const { product, loading, error } = useProductDetail(productId || '');

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value && value >= 1) {
      setQuantity(value);
    } else {
      setQuantity(1); // Nếu giá trị không hợp lệ, đặt lại về 1
    }
  };

  // Xử lý lựa chọn
  const handleImageSelect = (image: string) => {
    setSelectedImage(image); // Cập nhật ảnh lớn khi chọn ảnh nhỏ
  };

  const handleColorSelect = (color: string) => setSelectedColor(color);
  const handleSizeSelect = (size: string) => setSelectedSize(size);

  if (loading) return <div>{t('productDetail.loading')}</div>;
  if (error || !product) return <div>{error || t('productDetail.notFound')}</div>;

  return (
    <div className="bg-gray-100 px-4">
      <div className="container mx-auto px-10 py-8">
        <Breadcrumb className="mx-8 mb-6 text-xs sm:text-sm md:text-base">
          <Breadcrumb.Item>
            <a href="/">{t('breadcrumb.home')}</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/product">{t('breadcrumb.product')}</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <ProductMainImage url={selectedImage || product?.photos[0]?.url} />

            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              <ProductImages
                images={product?.photos?.map((photo) => photo.url)}
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <ProductDescription name={product.name} price={product.price} />
            <div className="flex items-center mb-4">
              {/* Stars */}
              {[...Array(5)].map((_, index) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                  key={index}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div>
            {product.info.description}

            <div className="mb-6">
              {selectedColor && product.info.color[0] && (
                <ColorSelector
                  colors={product.info.color}
                  selectedColor={selectedColor || product.info.color[0]}
                  onColorSelect={handleColorSelect}
                />
              )}
              {selectedSize && product.info.size[0] && (
                <MemorySelector
                  sizes={product.info.size}
                  selectedSize={selectedSize || product.info.size[0]}
                  onSizeSelect={handleSizeSelect}
                />
              )}
            </div>

            <div className="flex items-center mb-6 rounded-lg">
              <label htmlFor="quantity" className="text-lg font-semibold mb-2 mr-2">
                {t('productDetail.quantity')}:
              </label>
              <input
                type="number"
                id="quantity"
                className="w-16 text-center border-t border-b p-2"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </div>
            <ActionButtons productId={product.id} productName={product.name} quantity={quantity} />
          </div>
          {/* <p className="text-base text-gray-600 mt-2">
          <strong>Description Detail:</strong> {product.info.description}
        </p> */}
        </div>
        <RelatedProducts id={product.id} categoryId={product.category.id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
