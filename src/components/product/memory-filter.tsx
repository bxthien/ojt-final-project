import { filterSections } from '../../constants/data';

interface MemoryFilterProps {
  selectedMemory: string;
  onMemorySelect: (memory: string) => void;
}

const MemoryFilter = ({ selectedMemory, onMemorySelect }: MemoryFilterProps) => {
  const memorySection = filterSections.find((section) => section.id === 'memory');

  return (
    <div className="space-y-2">
      {memorySection?.items?.map((item) => (
        <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="memory"
            value={item.id}
            checked={selectedMemory === item.id}
            onChange={() => onMemorySelect(item.id)}
            className="form-radio text-[#56B280] focus:ring-[#56B280]"
          />
          <span className="text-sm text-gray-600">{item.name}</span>
        </label>
      ))}
    </div>
  );
};

export default MemoryFilter;
