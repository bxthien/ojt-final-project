import React from 'react';
import { useTranslation } from 'react-i18next';

interface PriceSortSelectProps {
  priceSortOrder: 'asc' | 'desc';
  onPriceSortChange: (order: 'asc' | 'desc') => void;
}

const PriceSortSelect: React.FC<PriceSortSelectProps> = ({ priceSortOrder, onPriceSortChange }) => {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrder = event.target.value as 'asc' | 'desc';
    onPriceSortChange(selectedOrder);
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
        <option value="asc">{t('priceSort.lowToHigh')}</option>
        <option value="desc">{t('priceSort.highToLow')}</option>
      </select>
    </div>
  );
};

export default PriceSortSelect;
