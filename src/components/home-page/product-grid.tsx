import React from 'react';
import ProductCard from './smallProduct-card';
import LargeProductCard from './largeProduct-card';
import PlayStation from '../../assets/images/playstation.png';
import HeadPhone from '@app/assets/images/headphone.png';
import AppleVision from '../../assets/images/applevision.png';
import MacBook from '../../assets/images/macbook.png';
import PlayStationMobile from '../../assets/images/PlayStationMobile.png';
import HeadPhoneMobile from '../../assets/images/headphonemobile.png';
import AppleVisionMobile from '../../assets/images/applevisionmoblie.png';
import MacBookMobile from '../../assets/images/macmobile.png';
import { productData } from '../../constants/data';
import { useTranslation } from 'react-i18next';

const ProductGrid: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="animate-fadeIn">
      {/* Mobile Layout */}
      <div className="block md:hidden space-y-4">
        <ProductCard
          imageSrc={PlayStationMobile}
          altText={t(productData.altText.playstation)}
          title={t(productData.product1.name)}
          description={t(productData.product1.description)}
          className="h-auto"
        />
        <ProductCard
          imageSrc={HeadPhoneMobile}
          altText={t(productData.altText.headphone)}
          title={t(productData.product2.name)}
          description={t(productData.product2.description)}
          bgColor="bg-[#EDEDED]"
          className="h-auto"
        />
        <ProductCard
          imageSrc={AppleVisionMobile}
          altText={t(productData.altText.appleVision)}
          title={t(productData.product3.name)}
          description={t(productData.product3.description)}
          bgColor="bg-[#353535]"
          textColor="text-white"
          className="h-auto"
        />
        <LargeProductCard
          imageSrc={MacBookMobile}
          altText={t(productData.altText.macbook)}
          title={t(productData.product4.name)}
          description={t(productData.product4.description)}
          buttonText={t(productData.buttonText)}
        />
      </div>

      {/* Tablet/iPad Layout */}
      <div className="hidden md:block lg:hidden">
        <div className="flex flex-col space-y-4">
          <div className="w-full">
            <ProductCard
              imageSrc={PlayStation}
              altText={t(productData.altText.playstation)}
              title={t(productData.product1.name)}
              description={t(productData.product1.description)}
              className="h-auto md:h-[328px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ProductCard
              imageSrc={HeadPhone}
              altText={t(productData.altText.headphone)}
              title={t(productData.product2.name)}
              description={t(productData.product2.description)}
              bgColor="bg-[#EDEDED]"
              className="h-auto"
            />
            <ProductCard
              imageSrc={AppleVision}
              altText={t(productData.altText.appleVision)}
              title={t(productData.product3.name)}
              description={t(productData.product3.description)}
              bgColor="bg-[#353535]"
              textColor="text-white"
              className="h-auto"
            />
          </div>

          <div className="w-full">
            <LargeProductCard
              imageSrc={MacBook}
              altText={t(productData.altText.macbook)}
              title={t(productData.product4.name)}
              description={t(productData.product4.description)}
              buttonText={t(productData.buttonText)}
              className="h-auto md:h-[600px]"
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid grid-cols-2">
        <div className="grid grid-rows-2">
          <div className="h-auto md:h-[328px]">
            <ProductCard
              imageSrc={PlayStation}
              altText={t(productData.altText.playstation)}
              title={t(productData.product1.name)}
              description={t(productData.product1.description)}
              className="md:text-6xl"
            />
          </div>

          <div className="grid grid-cols-2 h-[272px] animate-fadeIn">
            <ProductCard
              imageSrc={HeadPhone}
              altText={t(productData.altText.headphone)}
              title={t(productData.product2.name)}
              description={t(productData.product2.description)}
              bgColor="bg-[#EDEDED]"
              className="h-[350px] md:h-[400px]"
            />
            <ProductCard
              imageSrc={AppleVision}
              altText={t(productData.altText.appleVision)}
              title={t(productData.product3.name)}
              description={t(productData.product3.description)}
              bgColor="bg-[#353535]"
              textColor="text-white"
              className="h-[300px] md:h-[350px]"
            />
          </div>
        </div>

        <div className="flex-1 flex items-stretch justify-center animate-fadeIn">
          <LargeProductCard
            imageSrc={MacBook}
            altText={t(productData.altText.macbook)}
            title={t(productData.product4.name)}
            description={t(productData.product4.description)}
            buttonText={t(productData.buttonText)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
