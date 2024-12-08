import React from 'react';
import ProductColumn from './product-column';
import { useTranslation } from 'react-i18next';

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
    title: 'product.popularProductsTitle',
    description: 'product.popularProductsDescription',
    backgroundColor: 'bg-white',
  },
  {
    image: Ipad,
    title: 'product.ipadProTitle',
    description: 'product.ipadProDescription',
    backgroundColor: 'bg-[#F9F9F9]',
  },
  {
    image: SamSung,
    title: 'product.samsungGalaxyTitle',
    description: 'product.samsungGalaxyDescription',
    backgroundColor: 'bg-[#EAEAEA]',
  },
  {
    image: Macbook,
    title: 'product.macbookProTitle',
    description: 'product.macbookProDescription',
    backgroundColor: 'bg-[#E0E0E0]',
  },
];

const ProductColumnGrid: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductColumn
          key={index}
          image={product.image}
          title={t(product.title)}
          description={t(product.description)}
          backgroundColor={product.backgroundColor}
        />
      ))}
    </div>
  );
};

export default ProductColumnGrid;
