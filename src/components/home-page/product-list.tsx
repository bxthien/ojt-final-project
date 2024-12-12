import { useState, useEffect } from 'react';
import ProductCard from '../product/product-card';
import axiosInstance from '../../services/axios';
import { useTranslation } from 'react-i18next';

export type Photo = {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export interface Product {
  id: string;
  name: string;
  price: number;
  isDelete: boolean;
  url: string | null;
  urls?: string[];
  info: {
    description: string;
    policy: string;
  };
  quantity: number;
  createdAt: string;
  updatedAt: string;
  photos: Photo[];
  category: {
    id: string;
    name: string;
    categoryId: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

const ProductList = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]); // Dữ liệu sản phẩm
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params: Record<string, string> = {
          orderBy: 'ASC',
          page: '1',
          take: '10',
        };

        const { data: response } = await axiosInstance.get(`/product`, { params });

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        }
        setLoading(false);
      } catch {
        setError('Lỗi khi tải dữ liệu sản phẩm');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Chia sản phẩm theo từng danh mục
  const newArrivalProducts = products
    .filter((product) => product.createdAt)
    .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
    .slice(0, 12);

  const lowToHighPriceProducts = products
    .slice() // Tạo một bản sao để không làm thay đổi danh sách gốc
    .sort((a, b) => a.price - b.price)
    .slice(0, 12);

  const featuredProducts = products.slice(0, 12);

  return (
    <div className="bg-white p-8 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-14">
      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <p className="text-red-500 text-center">{t('error.loadingProducts')}</p>}

      {/* Show loading indicator */}
      {loading ? (
        <div className="text-center">{t('loading')}</div>
      ) : (
        <div className="space-y-8">
          {/* Danh mục New Arrival */}
          <section>
            <h2 className="text-xl font-bold mb-4">{t('productList.newArrival')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-full justify-center">
              {newArrivalProducts.length > 0 ? (
                newArrivalProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="text-center">{t('productList.noNewArrival')}</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">{t('productList.bestSeller')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-full justify-center">
              {lowToHighPriceProducts.length > 0 ? (
                lowToHighPriceProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="text-center">{t('productList.noProducts')}</p>
              )}
            </div>
          </section>

          {/* Danh mục Featured Products */}
          <section>
            <h2 className="text-xl font-bold mb-4">{t('productList.featuredProducts')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-w-full justify-center">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="text-center">{t('productList.noFeaturedProducts')}</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProductList;
