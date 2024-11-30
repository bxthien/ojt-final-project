import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../constants/useProducts';

interface SearchProps {
  isMobile: boolean;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ placeholder, isMobile }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null); // Reference for the search container

  const { products } = useProducts('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/product?search=${value}`);
      setSuggestions([]); // Close suggestions after pressing Enter
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setValue(searchTerm);

    // Filter product suggestions
    if (searchTerm.trim() === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = products
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((product) => product.name);

      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setSuggestions([]);
    navigate(`/product?search=${suggestion}`);
  };

  // Close suggestions when clicking outside the search container
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchRef}
      className={`${
        isMobile ? 'p-4 border-t' : 'hidden md:flex items-center flex-1 max-w-lg mx-8'
      }`}
    >
      <div className="relative w-full">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-[#56B280]"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-200 rounded-md mt-1 w-full shadow-lg z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
