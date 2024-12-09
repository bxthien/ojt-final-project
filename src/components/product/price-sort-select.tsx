import React from 'react';

interface PriceSortSelectProps {
  priceSortOrder: 'ASC' | 'DESC';
  onPriceSortChange: (order: 'ASC' | 'DESC') => void;
}

const PriceSortSelect: React.FC<PriceSortSelectProps> = ({ priceSortOrder, onPriceSortChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value as 'ASC' | 'DESC';
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
        <option value="ASC">Low to High</option>
        <option value="DESC">High to Low</option>
      </select>
    </div>
  );
};

export default PriceSortSelect;
