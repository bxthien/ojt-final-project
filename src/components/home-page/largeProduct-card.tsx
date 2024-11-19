import { forwardRef } from 'react';
import { Image } from 'antd';
import Button from '../common/button';

interface LargeProductCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  buttonText: string;
  className?: string;
}

const LargeProductCard = forwardRef<HTMLDivElement, LargeProductCardProps>(
  ({ imageSrc, altText, title, description, buttonText }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col md:flex-row items-center justify-between bg-[#EDEDED] 
        h-auto md:h-[600px] w-full md:max-w-full pl-4 space-y-6 md:space-y-0`}
      >
        {/* Text Content */}
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h2 className="text-5xl md:text-6xl font-semibold mb-4">{title}</h2>
          <p className="text-2xl md:text-base text-[#272626] mb-6">{description}</p>
          {/* Center the Button on Mobile */}
          <div className="flex justify-center md:justify-start w-full">
            <Button text={buttonText} to="/product" className="text-black border-black" />
          </div>
        </div>

        {/* Image */}
        <Image
          className="w-full md:w-3/5 lg:w-1/2 object-contain"
          src={imageSrc}
          alt={altText}
          preview={false}
        />
      </div>
    );
  }
);

export default LargeProductCard;
