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
  ({ imageSrc, altText, title, description, bgColor = 'bg-white', textColor = 'text-black' }) => (
    <div className={`${bgColor} `}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Image
          className="w-full md:w-1/2 object-contain pr-2"
          src={imageSrc}
          alt={altText}
          preview={false}
        />
        <div className={`text-center md:text-left ${textColor} flex-1`}>
          <h2 className="text-2xl md:text-2xl font-semibold mt-10 pt-4">{title}</h2>
          <p className="text-sm text-[#909090]">{description}</p>
        </div>
      </div>
    </div>
  )
);

export default ProductCard;
