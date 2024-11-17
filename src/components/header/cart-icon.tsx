import React from 'react';
import { GrCart } from 'react-icons/gr';
import { Link } from 'react-router-dom';

interface CartIconProps {
  cartCount: number;
  isActive: boolean;
}

const CartIcon: React.FC<CartIconProps> = ({ cartCount = 0, isActive }) => {
  return (
    <Link
      to="/cart"
      className={`relative p-1 hover:text-[#56B280] ${
        isActive ? 'text-[#56B280] font-bold' : 'text-gray-700'
      }`}
    >
      <GrCart className="w-6 h-6" />
      <span className="absolute bottom-4 left-4 text-xs text-white bg-[#56B280] rounded-full px-1.5 py-0.5">
        {cartCount}
      </span>
    </Link>
  );
};

export default CartIcon;
