import { filterSections } from '../../constants//data';

interface BrandFilterProps {
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
}

const BrandFilter = ({ selectedBrand, onBrandSelect }: BrandFilterProps) => {
  const brandSection = filterSections.find((section) => section.id === 'brand');

  return (
    <div className="space-y-2">
      {brandSection?.items?.map((item) => (
        <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="brand"
            value={item.id}
            checked={selectedBrand === item.id}
            onChange={() => onBrandSelect(item.id)}
            className="form-radio text-[#56B280] focus:ring-[#56B280]"
          />
          <span className="text-sm text-gray-600">{item.name}</span>
        </label>
      ))}
    </div>
  );
};

export default BrandFilter;
