import { useTranslation } from 'react-i18next';

type ColorSelectorProps = {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
};

const ColorSelector = ({ colors, selectedColor, onColorSelect }: ColorSelectorProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex space-x-2 mb-6">
      <h3 className="text-lg font-semibold mb-2">{t('productDetail.color')}:</h3>
      <div className="flex space-x-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2  ${color === selectedColor ? 'border-2 border-[#56B280]' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
