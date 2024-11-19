import React from 'react';
import ProductColumn from './product-column';

interface Product {
  image: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const products: Product[] = [
  {
    image: '',
    title: 'Popular Products',
    description:
      'Experience the integration of AI with fitness tracking, display incredible performance, multitasking and ease of use.',
    backgroundColor: 'bg-white',
  },
  {
    image: '',
    title: 'iPad Pro',
    description:
      'Experience the integration of M2 with Retina display, incredible performance, multitasking and ease of use.',
    backgroundColor: 'bg-[#F9F9F9]',
  },
  {
    image: '',
    title: 'Samsung Galaxy',
    description:
      'Experience high-end specifications with Retina display, incredible performance, multitasking and ease of use.',
    backgroundColor: 'bg-[#EAEAEA]',
  },
  {
    image: '',
    title: 'MacBook Pro',
    description:
      'Experience the integration of M2 with Retina display, incredible performance, multitasking and ease of use.',
    backgroundColor: 'bg-[#E0E0E0]',
  },
];

const ProductColumnGrid: React.FC = () => {
  return (
    <div className="flex h-full">
      {products.map((product, index) => (
        <ProductColumn
          key={index}
          image={product.image}
          title={product.title}
          description={product.description}
          backgroundColor={product.backgroundColor}
        />
      ))}
    </div>
  );
};

export default ProductColumnGrid;
