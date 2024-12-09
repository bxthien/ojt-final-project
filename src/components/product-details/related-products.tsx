import React from 'react';
import { Product } from '../home-page/product-list';
import ProductCard from '../product/product-card';
import { useTranslation } from 'react-i18next';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const { t } = useTranslation();

  if (products.length === 0) {
    return <p className="text-gray-500">{t('relatedProducts.noProducts')}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
