import React from 'react';

interface SearchProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-[#56B280]"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Search;
