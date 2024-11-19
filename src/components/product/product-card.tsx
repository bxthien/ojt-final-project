import React from 'react';
import { Product } from '../../constants/data';

// Define the type for props
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { image, name, price } = product;

  return (
    <div className="bg-[#F6F6F6] shadow-md rounded-lg w-full sm:w-[268px] h-[384px] px-4 py-6 flex flex-col items-center">
      <img src={image} alt={name} className="w-40 h-40 object-cover rounded-md mb-4" />
      <h3 className="text-center text-sm font-semibold text-gray-800 flex-grow">{name}</h3>
      <p className="text-[#56B280] text-lg font-bold mt-2">${price}</p>
      <button className="bg-[#56B280] text-white w-full py-2 rounded-md mt-4 hover:bg-[#56B280]">
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
