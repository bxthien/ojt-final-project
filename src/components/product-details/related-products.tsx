import React, { useEffect, useState } from 'react';
import { Product } from '../home-page/product-list';
import ProductCard from '../product/product-card';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../services/axios';

interface RelatedProductsProps {
  id: string; // ID của sản phẩm hiện tại
  categoryId: string; // ID của danh mục sản phẩm hiện tại
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ id, categoryId }) => {
  const { t } = useTranslation();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!categoryId) return; // Kiểm tra nếu có category

      try {
        setLoading(true);
        const params: Record<string, string> = {
          orderBy: 'ASC',
          page: '1',
          take: '5',
          category: categoryId,
        };

        const { data: response } = await axiosInstance.get(`/product`, { params });

        if (Array.isArray(response.data)) {
          // Lọc bỏ sản phẩm hiện tại
          const filteredProducts = response.data.filter(
            (product: { id: string }) => product.id !== id
          );
          setRelatedProducts(filteredProducts);
        }

        setLoading(false);
      } catch {
        setError('Lỗi khi tải dữ liệu sản phẩm');
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryId, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p>{t('loading')}...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (relatedProducts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('relatedProducts.noProducts')}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
