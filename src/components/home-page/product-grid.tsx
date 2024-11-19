import React from 'react';
import ProductCard from './smallProduct-card';
import LargeProductCard from './largeProduct-card';
import PlayStation from '../../assets/images/PlayStation.png';
import HeadPhone from '../../assets/images/headphone.png';
import AppleVision from '../../assets/images/applevision.png';
import MacBook from '../../assets/images/MacBook.png';
import { productData } from '../../constants/data';

const ProductGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 animate-fadeIn">
      <div className="grid grid-rows-2">
        <div className="h-auto md:h-[328px]">
          <ProductCard
            imageSrc={PlayStation}
            altText="PlayStation"
            title={productData.product1.name}
            description={`${productData.product1.description}`}
            className="md:text-6xl"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 h-[272px] animate-fadeIn">
          <ProductCard
            imageSrc={HeadPhone}
            altText="AirPods Max"
            title={productData.product2.name}
            description={productData.product2.description}
            bgColor="bg-[#EDEDED]"
            className="h-[350px] md:h-[400px]"
          />

          <ProductCard
            imageSrc={AppleVision}
            altText="Apple Vision"
            title={productData.product3.name}
            description={productData.product3.description}
            bgColor="bg-[#353535]"
            textColor="text-white"
            className="h-[300px] md:h-[350px]"
          />
        </div>
      </div>

      <div className="flex-1 flex items-stretch justify-center animate-fadeIn">
        <LargeProductCard
          imageSrc={MacBook}
          altText="MacBook"
          title={productData.product4.name}
          description={productData.product4.description}
          buttonText={productData.buttonText}
        />
      </div>
    </div>
  );
};

export default ProductGrid;
