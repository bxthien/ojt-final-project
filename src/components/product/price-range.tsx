import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useCurrencyFormatter from '../../redux/useCurrencyFormatter';

interface PriceRangeSidebarProps {
  onPriceChange: (min: number, max: number) => void;
  minPrice: number;
  maxPrice: number;
}

const PriceRangeSidebar: React.FC<PriceRangeSidebarProps> = ({ onPriceChange, minPrice }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrencyFormatter();
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(5000);

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = parseInt(e.target.value);
    setLocalMinPrice(newMinPrice);
    onPriceChange(newMinPrice, localMaxPrice);
  };

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = parseInt(e.target.value);
    setLocalMaxPrice(newMaxPrice);
    onPriceChange(localMinPrice, newMaxPrice);
  };

  // Tính toán tỷ lệ phần trăm cho thanh trượt
  const leftPosition = (localMinPrice / 5000) * 100;
  const rightPosition = 100 - (localMaxPrice / 5000) * 100;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="minPrice" className="block">
          {t('priceRange.minPrice')}
        </label>
        <input
          type="number"
          id="minPrice"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          value={localMinPrice}
          onChange={(e) => {
            const newMinPrice = Math.max(0, parseInt(e.target.value)); // Đảm bảo giá trị không âm
            setLocalMinPrice(newMinPrice);
            onPriceChange(newMinPrice, localMaxPrice);
          }}
        />
      </div>
      <div>
        <label htmlFor="maxPrice" className="block">
          {t('priceRange.maxPrice')}
        </label>
        <input
          type="number"
          id="maxPrice"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          value={localMaxPrice}
          onChange={(e) => {
            const newMaxPrice = Math.max(localMinPrice, parseInt(e.target.value)); // Đảm bảo maxPrice không nhỏ hơn minPrice
            setLocalMaxPrice(newMaxPrice);
            onPriceChange(localMinPrice, newMaxPrice);
          }}
        />
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
          max={5000}
          value={localMinPrice}
          onChange={handleMinSliderChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#56B280] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:bg-[#56B280]"
        />
        <input
          type="range"
          min="0"
          max={5000}
          value={localMaxPrice}
          onChange={handleMaxSliderChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#56B280] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:bg-[#56B280]"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatCurrency(localMinPrice)}</span>
        <span>{formatCurrency(localMaxPrice)}</span>
      </div>
    </div>
  );
};

export default PriceRangeSidebar;
