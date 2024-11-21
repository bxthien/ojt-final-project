import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface SearchProps {
  isMobile: boolean;
}

const Search: React.FC<SearchProps> = ({ isMobile }) => {
  return (
    <div
      className={`${isMobile ? 'p-4 border-t' : 'hidden md:flex items-center flex-1 max-w-lg mx-8'}`}
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#56B280]"
        />
        <CiSearch className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
  );
};

export default Search;
