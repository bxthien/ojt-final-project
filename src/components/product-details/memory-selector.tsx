type MemorySelectorProps = {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
};

const MemorySelector = ({ sizes, selectedSize, onSizeSelect }: MemorySelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2  lg:justify-start lg:text-left lg:items-start">
      {sizes.map((size, index) => (
        <div
          key={index}
          className={`w-16 h-10 md:w-18 md:h-12 lg:w-20 lg:h-14 rounded-lg border-2 cursor-pointer flex items-center justify-center 
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
