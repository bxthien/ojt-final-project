import { useEffect, useState } from 'react';
import { filterSections } from '../../constants/data';
import MobileFilterSidebar from './mobile-filter-sidebar';
import PriceSortSelect from './price-sort-select';
import PriceRangeSidebar from './price-range';
import { getCategories } from '../../constants/useCategory';
import SelectCategory from './select-category';

interface Category {
  id: string;
  name: string;
}

interface ProductSidebarProps {
  onPriceSortChange: (order: 'ASC' | 'DESC') => void;
  onPriceChange: (newMinPrice: number, newMaxPrice: number) => void;
  minPrice: number;
  maxPrice: number;
  onCategorySelect: (newCategory: string[]) => void;
  selectedCategories: string[];
}

const ProductSidebar = ({
  onPriceSortChange,
  onPriceChange,
  minPrice,
  maxPrice,
  onCategorySelect,
  selectedCategories,
}: ProductSidebarProps) => {
  const [sections, setSections] = useState(filterSections);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priceSortOrder, setPriceSortOrder] = useState<'ASC' | 'DESC'>('ASC');

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
      )
    );
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
    document.body.style.overflow = isMobileFilterOpen ? 'unset' : 'hidden';
  };

  const handlePriceSortChange = (order: 'ASC' | 'DESC') => {
    setPriceSortOrder(order);
    onPriceSortChange(order);
  };

  const handleCategorySelect = (selected: string[]) => {
    onCategorySelect(selected); // Gửi danh sách category về component cha
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block p-6 w-64 bg-white border-r">
        <div className="p-6">
          {/* Price Sort Select */}
          <PriceSortSelect
            priceSortOrder={priceSortOrder}
            onPriceSortChange={handlePriceSortChange}
          />

          {/* Categories Section */}
          <div className="mb-6">
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
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={toggleMobileFilter}
        className="lg:hidden left-5 z-50 bg-[#56B280] text-white mt-4 p-4 ml-4 rounded-lg shadow-lg"
        aria-label="Open filters"
      >
        Filter
      </button>

      {/* Mobile Filter Sidebar */}
      <MobileFilterSidebar
        isOpen={isMobileFilterOpen}
        onClose={toggleMobileFilter}
        sections={sections}
        toggleSection={toggleSection}
        priceSortOrder={priceSortOrder}
        onPriceSortChange={handlePriceSortChange}
        onPriceChange={onPriceChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        selectedCategories={[]}
      />
    </>
  );
};

export default ProductSidebar;
