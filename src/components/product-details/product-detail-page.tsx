import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from '../../constants/useProductDetail';
import ProductMainImage from './product-main-image';
import ProductImages from './product-image';
import { Breadcrumb } from 'antd';
import ProductDescription from './product-description';
import ColorSelector from './color-selector';
import MemorySelector from './memory-selector';
import ActionButtons from './action-buttons';
import axiosInstance from '../../services/axios';
import RelatedProducts from './related-products';
import { Product } from '../../constants/fetchProducts';
import { useTranslation } from 'react-i18next';

const ProductDetailPage = () => {
  // Lấy productId từ URL
  const { id: productId } = useParams<{ id: string }>();
  const { t } = useTranslation(); // Sử dụng i18n

  const mockPhotos = [
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro.png',
    'https://cdn.tgdd.vn/Products/Images/42/329135/iphone-16-blue-600x600.png',
    'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121030-iphone-16-plus.png',
  ];

  // Sử dụng hook để lấy chi tiết sản phẩm từ API
  const { product, loading, error } = useProductDetail(productId || '');

  // Quản lý trạng thái lựa chọn hình ảnh, màu sắc và dung lượng
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Xử lý lựa chọn
  const handleImageSelect = (image: string) => {
    setSelectedImage(image); // Cập nhật ảnh lớn khi chọn ảnh nhỏ
  };

  const handleColorSelect = (color: string) => setSelectedColor(color);
  const handleSizeSelect = (size: string) => setSelectedSize(size);

  // Quản lý sản phẩm liên quan
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await axiosInstance.get('/product'); // Fetch all products
        if (product) {
          // Lọc sản phẩm tương tự dựa trên danh mục
          const filteredProducts = res.data.filter(
            (p: { category: string; id: string }) =>
              p.category === product.category && // Cùng danh mục
              p.id !== product.id // Không trùng sản phẩm hiện tại
          );
          setRelatedProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchRelatedProducts();
  }, [product]);

  if (loading) return <div>{t('productDetail.loading')}</div>;
  if (error || !product) return <div>{error || t('productDetail.notFound')}</div>;

  return (
    <div className="bg-gray-100 px-4">
      <div className="container mx-auto px-10 py-8">
        <Breadcrumb className="mb-6">
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
            <ProductMainImage url={selectedImage || product.url} />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              <ProductImages
                images={mockPhotos}
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
            <p className="text-gray-700 mb-6">{t('productDetail.description')}</p>

            <div className="mb-6">
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
            </div>

            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="text-lg font-semibold mb-2 mr-2">
                {t('productDetail.quantity')}:
              </label>
              <input
                type="number"
                id="quantity"
                className="w-16 text-center border rounded-md p-2"
                defaultValue="1"
                min="1"
              />
            </div>
            <ActionButtons productId={product.id} productName={product.name} />
          </div>
        </div>

        {/* Hiển thị sản phẩm liên quan */}
        <div className="container mx-auto">
          <h3 className="text-lg font-bold mb-6 pt-10">{t('productDetail.relatedProducts')}</h3>
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
