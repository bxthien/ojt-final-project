import React from 'react';
// import { Product } from '../../constants/data';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image: string[];
  };
};
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { image, name, price } = product;

  return (
    <div className="bg-[#F6F6F6] shadow-md rounded-lg w-full h-auto p-4 flex flex-col items-center transition-transform hover:scale-105">
      <div className="relative w-full pt-[100%] mb-4">
        <img
          src={image[0]}
          alt={name}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex flex-col items-center flex-grow w-full">
        <h3 className="text-center text-sm md:text-base font-semibold text-gray-800 line-clamp-2 mb-2">
          {name}
        </h3>
        <p className="text-[#56B280] text-base md:text-lg font-bold mt-auto mb-4">${price}</p>
        <button className="bg-[#56B280] text-white w-full py-2 md:py-3 rounded-md transition-colors hover:bg-white hover:text-black border border-transparent hover:border-black text-sm md:text-base">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
