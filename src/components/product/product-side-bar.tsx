import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { filterSections } from '../../constants/data';
import PriceSlider from './price-slider';
import BrandFilter from './branch-filter';
import MemoryFilter from './memory-filter';
import MobileFilterSidebar from './mobile-filter-sidebar';

interface ProductSidebarProps {
  onBrandSelect: (brand: string) => void;
  onMemorySelect: (memory: string) => void;
  selectedBrand: string;
  selectedMemory: string;
}

const ProductSidebar = ({
  onBrandSelect,
  onMemorySelect,
  selectedBrand,
  selectedMemory,
}: ProductSidebarProps) => {
  const [sections, setSections] = useState(filterSections);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block p-6 w-64 bg-white border-r">
        <div className="p-6">
          {sections.map((section) => (
            <div key={section.id} className="mb-6">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full mb-3 font-semibold text-gray-800"
              >
                {section.title}
                {section.isOpen ? (
                  <FaChevronUp className="w-4 h-4" />
                ) : (
                  <FaChevronDown className="w-4 h-4" />
                )}
              </button>
              <hr className="mb-4" />

              {section.isOpen && (
                <div className="pl-2">
                  {section.id === 'price' && <PriceSlider />}
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
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={toggleMobileFilter}
        className="lg:hidden left-5 z-50 bg-[#56B280] text-white p-4 ml-4 rounded-lg shadow-lg"
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
        onBrandSelect={onBrandSelect}
        onMemorySelect={onMemorySelect}
        selectedBrand={selectedBrand}
        selectedMemory={selectedMemory}
      />
    </>
  );
};

export default ProductSidebar;
