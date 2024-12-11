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

const ProductDetailPage = () => {
  const { id: productId } = useParams<{ id: string }>();
  const { t } = useTranslation();

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
      setQuantity(1);
    }
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const handleColorSelect = (color: string) => setSelectedColor(color);
  const handleSizeSelect = (size: string) => setSelectedSize(size);

  if (loading) return <div>{t('productDetail.loading')}</div>;
  if (error || !product) return <div>{error || t('productDetail.notFound')}</div>;

  return (
    <div className="bg-gray-100 px-4">
      <div className="container mx-auto px-10 py-8">
        <Breadcrumb className="mx-8 mb-6">
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
            <ProductMainImage url={selectedImage || product?.urls?.[0]} />

            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              <ProductImages
                images={product?.urls}
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <ProductDescription
              name={product.name}
              price={product.price} // Truyền giá trị price thô
            />
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
              <span className="ml-2 text-gray-600">
                {t('productDetail.reviews', { rating: 4.5, count: 120 })}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{t('productDetail.description')}</p>

            <div className="mb-6">
              {product?.color?.[0] && (
                <ColorSelector
                  colors={product.color}
                  selectedColor={selectedColor || product.color[0]}
                  onColorSelect={handleColorSelect}
                />
              )}
              {product?.size?.[0] && (
                <MemorySelector
                  sizes={product.size}
                  selectedSize={selectedSize || product.size[0]}
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
