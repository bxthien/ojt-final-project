type ColorSelectorProps = {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
};

const ColorSelector = ({ colors, selectedColor, onColorSelect }: ColorSelectorProps) => {
  return (
    <div className="flex flex-col mb-4">
      <h3 className="mb-2 font-semibold">Select Color:</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-9 h-9 rounded-full cursor-pointer transition-all ${color === selectedColor ? 'border-4 border-[#56B280]' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
