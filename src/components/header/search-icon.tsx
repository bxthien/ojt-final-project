import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';

interface SearchIconProps {
  isActive: boolean;
}

const SearchIcon: React.FC<SearchIconProps> = ({ isActive }) => {
  return (
    <Link
      to="/product-page"
      className={`relative p-1 hover:text-[#56B280] ${
        isActive ? 'text-[#56B280] font-bold' : 'text-gray-700'
      }`}
    >
      <CiSearch className="w-6 h-6" />
    </Link>
  );
};

export default SearchIcon;
