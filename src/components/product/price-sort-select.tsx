import React from 'react';
import { useTranslation } from 'react-i18next';

interface PriceSortSelectProps {
  priceSortOrder: 'ASC' | 'DESC';
  onPriceSortChange: (order: 'ASC' | 'DESC') => void;
}

const PriceSortSelect: React.FC<PriceSortSelectProps> = ({ priceSortOrder, onPriceSortChange }) => {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value as 'ASC' | 'DESC';
    onPriceSortChange(selectedOrder); // Gọi callback để cập nhật giá trị sắp xếp
  };

  return (
    <div className="mb-6">
      <label htmlFor="priceSort" className="block mb-2 font-semibold text-gray-800">
        {t('priceSort.label')}
      </label>
      <select
        id="priceSort"
        value={priceSortOrder}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="ASC">{t('priceSort.lowToHigh')}</option>
        <option value="DESC">{t('priceSort.highToLow')}</option>
      </select>
    </div>
  );
};

export default PriceSortSelect;
