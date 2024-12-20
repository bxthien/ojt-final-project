import { Image } from 'antd';
import { forwardRef } from 'react';

interface ProductCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  (
    { imageSrc, altText, title, description, bgColor = 'bg-white', textColor = 'text-black' },
    ref
  ) => (
    <div ref={ref} className={`${bgColor} flex flex-col md:flex-row items-center justify-between`}>
      {/* Responsive Image */}
      <Image
        className="w-full md:w-1/2 object-contain pr-2"
        src={imageSrc}
        alt={altText}
        preview={false}
      />

      {/* Responsive Text */}
      <div className={`text-center md:text-left ${textColor} flex-1`}>
        <h2 className="text-4xl md:text-2xl font-semibold mt-4 md:mt-10">{title}</h2>
        <p className="text-2xl md:text-base text-[#909090] mt-2 md:mt-4">{description}</p>
      </div>
    </div>
  )
);

export default ProductCard;
