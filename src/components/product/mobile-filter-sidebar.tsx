import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import BrandFilter from './branch-filter';
import MemoryFilter from './memory-filter';
import { FaTimes } from 'react-icons/fa';
import PriceSortSelect from './price-sort-select';
import PriceRangeSidebar from './price-range';
import { useTranslation } from 'react-i18next';

interface Section {
  id: string;
  title: string;
  isOpen: boolean;
}

interface MobileFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sections: Section[];
  toggleSection: (sectionId: string) => void;
  onBrandSelect: (brand: string) => void;
  onMemorySelect: (memory: string) => void;
  selectedBrand: string;
  selectedMemory: string;
  priceSortOrder: 'asc' | 'desc';
  onPriceSortChange: (order: 'asc' | 'desc') => void;
  onPriceChange: (min: number, max: number) => void;
  minPrice: number;
  maxPrice: number;
}

const MobileFilterSidebar = ({
  isOpen,
  onClose,
  sections,
  toggleSection,
  onBrandSelect,
  onMemorySelect,
  selectedBrand,
  selectedMemory,
  priceSortOrder,
  onPriceSortChange,
  onPriceChange,
  minPrice,
  maxPrice,
}: MobileFilterSidebarProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      <div className="bg-white h-full flex flex-col">
        <div className="flex items-center justify-between border-b">
          <h2 className="text-lg font-semibold p-4">{t('filters.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close filters"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <PriceSortSelect
              priceSortOrder={priceSortOrder}
              onPriceSortChange={onPriceSortChange}
            />
          </div>
          {sections.map((section) => (
            <div key={section.id} className="mb-6">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full mb-3 font-semibold text-gray-800"
              >
                {t(`filters.sections.${section.id}`)}
                {section.isOpen ? (
                  <FaChevronUp className="w-4 h-4" />
                ) : (
                  <FaChevronDown className="w-4 h-4" />
                )}
              </button>
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
                  {section.id === 'brand' && (
                    <BrandFilter selectedBrand={selectedBrand} onBrandSelect={onBrandSelect} />
                  )}
                  {section.id === 'memory' && (
                    <MemoryFilter selectedMemory={selectedMemory} onMemorySelect={onMemorySelect} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-[#56B280] text-white py-3 rounded-lg font-medium hover:bg-[#4a9c6f] transition-colors"
          >
            {t('filters.apply')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterSidebar;
