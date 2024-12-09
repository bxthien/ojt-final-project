import { useTranslation } from 'react-i18next';

type MemorySelectorProps = {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
};

const MemorySelector = ({ sizes, selectedSize, onSizeSelect }: MemorySelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2 lg:justify-start lg:text-left lg:items-start">
      <h3 className="text-lg font-semibold mb-2">{t('productDetail.memory')}:</h3>
      {sizes.map((size, index) => (
        <div
          key={index}
          className={`w-16 h-10 md:w-18 md:h-12 lg:w-15 lg:h-10 rounded-lg border-2 cursor-pointer flex items-center justify-center 
            ${size === selectedSize ? 'border-black bg-gray-200' : 'border-gray-300'}
            transition-all`}
          onClick={() => onSizeSelect(size)}
        >
          {size}
        </div>
      ))}
    </div>
  );
};

export default MemorySelector;
