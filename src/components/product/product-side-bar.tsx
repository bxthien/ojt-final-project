import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { filterSections } from '../../constants/data';
import PriceSlider from './price-slider';
import BrandFilter from './branch-filter';
import MemoryFilter from './memory-filter';

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
      <div className="hidden lg:block w-64 bg-white border-r">
        <div className="p-4">
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

      {/* Mobile Filter Button (Bottom-Right Corner) */}
      <button
        onClick={toggleMobileFilter}
        className="hidden md:block lg:hidden fixed top-4 left-4 z-50 bg-[#56B280] text-white px-6 py-3 rounded-lg shadow-lg font-medium hover:bg-[#4a9c6f] transition-colors"
        aria-label="Open filters"
      >
        Filter
      </button>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black bg-opacity-50 flex justify-end">
          <div className="w-3/4 bg-white h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={toggleMobileFilter}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close filters"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Filter Sections */}
            <div className="flex-1 overflow-y-auto p-4">
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
                        <MemoryFilter
                          selectedMemory={selectedMemory}
                          onMemorySelect={onMemorySelect}
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
                onClick={toggleMobileFilter}
                className="w-full bg-[#56B280] text-white py-3 rounded-lg font-medium hover:bg-[#4a9c6f] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductSidebar;
