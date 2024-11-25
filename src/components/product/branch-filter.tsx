import { Radio } from 'antd';
import { filterSections } from '../../constants/data';

interface BrandFilterProps {
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
}

const BrandFilter = ({ selectedBrand, onBrandSelect }: BrandFilterProps) => {
  const brandSection = filterSections.find((section) => section.id === 'brand');

  return (
    <div className="space-y-2">
      {brandSection?.items?.length ? (
        <Radio.Group
          value={selectedBrand}
          onChange={(e) => onBrandSelect(e.target.value)}
          className="w-full"
        >
          {brandSection.items.map((item) => (
            <Radio key={item.id} value={item.id} className="w-full mb-2 text-sm text-gray-600">
              {item.name}
            </Radio>
          ))}
        </Radio.Group>
      ) : null}
    </div>
  );
};

export default BrandFilter;
