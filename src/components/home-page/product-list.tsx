import React from 'react';
import ProductCard from '../product/product-card';
import { products, Product } from '../../constants/data';

const ProductList: React.FC = () => {
  return (
    <div className="bg-white min-h-screen p-8 px-4 sm:px-8 md:px-16 lg:px-36">
      <h1 className="text-2xl font-bold mb-6 text-center">New Arrival</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-full">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
