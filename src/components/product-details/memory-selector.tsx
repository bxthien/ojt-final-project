type MemorySelectorProps = {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
};

const MemorySelector = ({ sizes, selectedSize, onSizeSelect }: MemorySelectorProps) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2 font-semibold">Select Storage:</h3>
      <div className="flex space-x-2">
        {sizes.map((size, index) => (
          <div
            key={index}
            className={`w-20 h-12 rounded-lg border-2 cursor-pointer flex items-center justify-center 
                ${size === selectedSize ? 'border-black bg-gray-200' : 'border-gray-300'}`}
            onClick={() => onSizeSelect(size)}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemorySelector;
