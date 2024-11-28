import React from 'react';

interface PriceSortSelectProps {
  priceSortOrder: 'asc' | 'desc';
  onPriceSortChange: (order: 'asc' | 'desc') => void;
}

const PriceSortSelect: React.FC<PriceSortSelectProps> = ({ priceSortOrder, onPriceSortChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value as 'asc' | 'desc';
    onPriceSortChange(selectedOrder); // Gọi callback để cập nhật giá trị sắp xếp
  };

  return (
    <div className="mb-6">
      <label htmlFor="priceSort" className="block mb-2 font-semibold text-gray-800">
        Sort by Price
      </label>
      <select
        id="priceSort"
        value={priceSortOrder}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
};

export default PriceSortSelect;
