import React from 'react';
import { Link } from 'react-router-dom';

interface ProductColumnProps {
  image: string;
  title: string;
  description: string;
  backgroundColor: string;
}

const ProductColumn: React.FC<ProductColumnProps> = ({
  image,
  title,
  description,
  backgroundColor,
}) => {
  return (
    <div className={`${backgroundColor} p-6 sm:p-8 transition-transform hover:scale-105`}>
      <div className="flex flex-col h-full space-y-4">
        <div className="relative pt-[75%] sm:pt-[100%] w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-contain p-2"
          />
        </div>

        <div className="flex flex-col flex-grow space-y-3">
          <h2 className="text-lg sm:text-xl font-semibold text-center line-clamp-1">{title}</h2>

          <p className="text-sm text-gray-600 text-center line-clamp-3 sm:line-clamp-4 flex-grow">
            {description}
          </p>

          <div className="pt-2 flex justify-center">
            <button
              className="w-full sm:w-[120px] px-4 py-2 border border-gray-300 rounded-lg 
              hover:bg-[#56B280] hover:text-white hover:border-transparent 
              transition-all duration-300 text-sm sm:text-base"
            >
              <Link to="/product" className="block w-full h-full text-center">
                Shop Now
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductColumn;
