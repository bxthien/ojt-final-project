import React from 'react';
import DualRangeSlider from './dual-range-slider';

const PriceSlider: React.FC = () => {
  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    console.log(`Selected Price Range: ${minPrice} - ${maxPrice}`);
  };

  return (
    <div>
      <DualRangeSlider onPriceChange={handlePriceChange} />
    </div>
  );
};

export default PriceSlider;
