import React from 'react';
import ProductColumn from './product-column';
import Macbook from '../../assets/images/macmobile.png';
import AppleWatch from '../../assets/images/applewatch.png';
import Ipad from '../../assets/images/ipad.png';
import SamSung from '../../assets/images/samsung.png';

interface Product {
  image: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const products: Product[] = [
  {
    image: AppleWatch,
    title: 'Popular Products',
    description:
      'Experience the integration of AI with fitness tracking, display incredible performance, multitasking and ease of use.',
    backgroundColor: 'bg-white',
  },
  {
    image: Ipad,
    title: 'iPad Pro',
    description:
      'Experience the integration of M2 with Retina display, incredible performance, multitasking and ease of use.',
    backgroundColor: 'bg-[#F9F9F9]',
  },
  {
    image: SamSung,
    title: 'Samsung Galaxy',
    description:
      'Experience high-end specifications with Retina display, incredible performance, multitasking and ease of use.',
    backgroundColor: 'bg-[#EAEAEA]',
  },
  {
    image: Macbook,
    title: 'MacBook Pro',
    description:
      'Experience the integration of M2 with Retina display, incredible performance, multitasking and ease of use.',
    backgroundColor: 'bg-[#E0E0E0]',
  },
];

const ProductColumnGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
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
