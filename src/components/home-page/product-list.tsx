import { useState, useEffect } from 'react';
import ProductCard from '../product/product-card';
import axiosInstance from '../../services/axios';
import { useTranslation } from 'react-i18next';

export interface Product {
  id: string;
  name: string;
  price: number;
  photos: string[];
  createdAt?: string;
  purchaseCount?: number; // Số lượng mua
  url: string;
}

const ProductList = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
  const [activeTab, setActiveTab] = useState<'newArrival' | 'bestseller' | 'featured'>(
    'newArrival'
  ); // Tab đang chọn

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params: Record<string, string> = {
          orderBy: 'ASC',
          page: '1',
          take: '12',
        };

        const { data: response } = await axiosInstance.get(`/product`, { params });

        if (Array.isArray(response.data)) {
          let filteredProducts: Product[] = [];

          if (activeTab === 'newArrival') {
            // Lọc sản phẩm mới
            filteredProducts = response.data
              .filter((product: Product) => product.createdAt) // Chỉ lấy sản phẩm có `createdAt`
              .sort(
                (a: Product, b: Product) =>
                  new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
              )
              .slice(0, 12);
          } else if (activeTab === 'bestseller') {
            // Lọc sản phẩm bán chạy
            filteredProducts = response.data
              .filter((product: Product) => product.purchaseCount) // Chỉ lấy sản phẩm có `purchaseCount`
              .sort((a: Product, b: Product) => (b.purchaseCount || 0) - (a.purchaseCount || 0))
              .slice(0, 12);
          } else if (activeTab === 'featured') {
            filteredProducts = response.data.slice(0, 12);
          }

          setProducts(filteredProducts);
        }
        setLoading(false);
      } catch {
        setError('Lỗi khi tải dữ liệu sản phẩm');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  return (
    <div className="bg-white p-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-14">
      <div className="flex flex-wrap text-xs space-x-1 sm:space-x-0 mb-4">
        <button
          onClick={() => setActiveTab('newArrival')}
          className={`py-2 px-4 border-b-2 ${
            activeTab === 'newArrival' ? 'border-black font-bold' : 'border-transparent'
          }`}
        >
          {t('productTabs.newArrival')}
        </button>
        <button
          onClick={() => setActiveTab('bestseller')}
          className={`py-2 px-4 border-b-2 ${
            activeTab === 'bestseller' ? 'border-black font-bold' : 'border-transparent'
          }`}
        >
          {t('productTabs.bestseller')}
        </button>
        <button
          onClick={() => setActiveTab('featured')}
          className={`py-2 px-4 border-b-2 ${
            activeTab === 'featured' ? 'border-black font-bold' : 'border-transparent'
          }`}
        >
          {t('productTabs.featured')}
        </button>
      </div>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <p className="text-red-500 text-center">{t('error.loadingProducts')}</p>}

      {/* Show loading indicator */}
      {loading ? (
        <div className="text-center">{t('loading')}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-full justify-center">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-center">{t('noProducts')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
