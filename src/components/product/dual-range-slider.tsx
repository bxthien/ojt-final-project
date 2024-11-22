import React, { useState, useEffect } from 'react';

const DualRangeSlider = ({
  onPriceChange,
}: {
  onPriceChange: (minPrice: number, maxPrice: number) => void;
}) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minInputValue, setMinInputValue] = useState<number>(minPrice);
  const [maxInputValue, setMaxInputValue] = useState<number>(maxPrice);

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinInputValue(value);
    setMinPrice(value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxInputValue(value);
    setMaxPrice(value);
  };

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
    setMinInputValue(value);
  };

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
    setMaxInputValue(value);
  };

  useEffect(() => {
    onPriceChange(minPrice, maxPrice);
  }, [minPrice, maxPrice, onPriceChange]);

  const leftPosition = (minPrice / 5000) * 100;
  const rightPosition = 100 - (maxPrice / 5000) * 100;

  return (
    <div>
      <div className="flex justify-between gap-4 mb-6">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
          <input
            type="number"
            value={minInputValue}
            onChange={handleMinInputChange}
            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            max={maxPrice - 1}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <input
            type="number"
            value={maxInputValue}
            onChange={handleMaxInputChange}
            className="w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min={minPrice + 1}
            max="5000"
          />
        </div>
      </div>

      <div className="relative h-2 mb-8">
        <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
        <div
          className="absolute h-2 bg-[#56B280] rounded-full"
          style={{
            left: `${leftPosition}%`,
            right: `${rightPosition}%`,
          }}
        />
        <input
          type="range"
          min="0"
          max="5000"
          value={minPrice}
          onChange={handleMinSliderChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#56B280] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:bg-[#56B280]"
        />
        <input
          type="range"
          min="0"
          max="5000"
          value={maxPrice}
          onChange={handleMaxSliderChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#56B280] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:bg-[#56B280]"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>${minPrice.toLocaleString()}</span>
        <span>${maxPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default DualRangeSlider;
