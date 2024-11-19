import { forwardRef } from 'react';
import { Image } from 'antd';
import Button from '../common/button';

interface LargeProductCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  buttonText: string;
  isVisible?: boolean;
  animationClass?: string;
}

const LargeProductCard = forwardRef<HTMLDivElement, LargeProductCardProps>(
  (
    { imageSrc, altText, title, description, buttonText, isVisible = false, animationClass },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 bg-[#EDEDED] 
          ${isVisible ? animationClass : ''} h-auto md:h-[600px] w-[680px]`}
      >
        <div className="justify-center md:justify-start mt-4 md:mt-0 p-6 md:p-1">
          <h2 className="text-6xl md:text-6xl font-semibold p-6">{title}</h2>
          <p className="text-sm text-[#909090] mb-6 p-6">{description}</p>
          <Button text={buttonText} to="/product" className="text-black border-black ml-6" />
        </div>
        <Image
          className="w-[829px] h-[502px] md:w-4/5 lg:w-3/4 xl:w-2/3 object-contain mt-6"
          src={imageSrc}
          alt={altText}
          preview={false}
        />
      </div>
    );
  }
);

export default LargeProductCard;
