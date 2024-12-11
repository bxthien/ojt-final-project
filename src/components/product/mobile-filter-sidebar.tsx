import { FaTimes } from 'react-icons/fa';
import PriceSortSelect from './price-sort-select';
import PriceRangeSidebar from './price-range';
import SelectCategory from './select-category';
import useCurrencyFormatter from '../../redux/useCurrencyFormatter';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface Section {
  id: string;
  title: string;
  isOpen: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface MobileFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sections: Section[];
  toggleSection: (sectionId: string) => void;
  priceSortOrder: 'ASC' | 'DESC';
  onPriceSortChange: (order: 'ASC' | 'DESC') => void;
  onPriceChange: (min: number, max: number) => void;
  minPrice: number;
  maxPrice: number;
  categories: Category[];
  selectedCategories: string[];
  onCategorySelect: (categories: string[]) => void;
}

const MobileFilterSidebar: React.FC<MobileFilterSidebarProps> = ({
  isOpen,
  onClose,
  priceSortOrder,
  onPriceSortChange,
  onPriceChange,
  minPrice,
  maxPrice,
  categories,
  selectedCategories,
  onCategorySelect,
}) => {
  const { formatCurrency } = useCurrencyFormatter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      <div className="bg-white h-full flex flex-col">
        <div className="flex items-center justify-between border-b">
          <h2 className="text-lg font-semibold p-4">{t('filter.filters')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label={t('filter.closeFilters')}
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Search Input for Filters */}
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder={t('filter.searchFilters')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort by Price Section */}
          <div className="mb-6">
            <PriceSortSelect
              priceSortOrder={priceSortOrder}
              onPriceSortChange={onPriceSortChange}
            />
          </div>

          {/* Categories Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">{t('filter.categories')}</h3>
            <SelectCategory
              categories={filteredCategories}
              selectedCategories={selectedCategories}
              onCategorySelect={onCategorySelect}
            />
          </div>

          {/* Price Range Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">{t('filter.priceRange')}</h3>
            <p className="text-sm">
              {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
            </p>
          </div>

          <div className="pl-2">
            <PriceRangeSidebar
              onPriceChange={onPriceChange}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </div>
        </div>
        {/* Apply Filters Button */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-[#56B280] text-white py-3 rounded-lg font-medium hover:bg-[#4a9c6f] transition-colors"
          >
            {t('filter.applyFilters')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterSidebar;
