type ColorSelectorProps = {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
};

const ColorSelector = ({ colors, selectedColor, onColorSelect }: ColorSelectorProps) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2 font-semibold">Select Color:</h3>
      <div className="flex space-x-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-full cursor-pointer ${color === selectedColor ? 'border-4 border-[#56B280]' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
