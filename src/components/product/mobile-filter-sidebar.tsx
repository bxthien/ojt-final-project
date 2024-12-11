import { FaTimes } from 'react-icons/fa';
import PriceSortSelect from './price-sort-select';
import PriceRangeSidebar from './price-range';
// import { Select } from 'antd';
import SelectCategory from './select-category';

// Define the Section interface
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
  onCategorySelect: (newCategory: string[]) => void;
  selectedCategories: string[];
}

const MobileFilterSidebar: React.FC<MobileFilterSidebarProps> = ({
  isOpen,
  onClose,
  sections,
  // toggleSection,
  priceSortOrder,
  onPriceSortChange,
  onPriceChange,
  minPrice,
  maxPrice,
  categories,
  selectedCategories,
  onCategorySelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      <div className="bg-white h-full flex flex-col">
        <div className="flex items-center justify-between border-b">
          <h2 className="text-lg font-semibold p-4">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close filters"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Sort by Price Section */}
          <div className="mb-6">
            <PriceSortSelect
              priceSortOrder={priceSortOrder}
              onPriceSortChange={onPriceSortChange}
            />
          </div>

          {/* Categories Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <SelectCategory
              categories={categories}
              selectedCategories={selectedCategories}
              onCategorySelect={onCategorySelect}
            />
          </div>

          {/* Sections */}
          {sections.map((section) => (
            <div key={section.id} className="mb-6">
              <hr className="mb-4" />

              {section.isOpen && (
                <div className="pl-2">
                  {section.id === 'price' && (
                    <PriceRangeSidebar
                      onPriceChange={onPriceChange}
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Apply Filters Button */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-[#56B280] text-white py-3 rounded-lg font-medium hover:bg-[#4a9c6f] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterSidebar;
