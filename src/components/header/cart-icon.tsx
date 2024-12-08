import React from 'react';
import { GrCart } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CartIconProps {
  cartCount: number;
  isActive: boolean;
}

const CartIcon: React.FC<CartIconProps> = ({ cartCount = 0, isActive }) => {
  const { t } = useTranslation();

  return (
    <Link
      to="/cart"
      className={`relative p-1 hover:text-[#56B280] ${isActive ? 'text-[#56B280] font-bold' : 'text-gray-700'}`}
    >
      <GrCart className="w-6 h-6" />
      <span className="absolute bottom-4 left-4 text-xs text-white bg-[#56B280] rounded-full px-1.5 py-0.5">
        {cartCount}
      </span>
      {cartCount > 0 && (
        <span className="absolute top-4 left-0 text-xs text-white">{t('cart.items')}</span>
      )}
    </Link>
  );
};

export default CartIcon;
