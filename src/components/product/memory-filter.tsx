import { Radio } from 'antd';
import { filterSections } from '../../constants/data';

interface MemoryFilterProps {
  selectedMemory: string;
  onMemorySelect: (memory: string) => void;
}

const MemoryFilter = ({ selectedMemory, onMemorySelect }: MemoryFilterProps) => {
  const memorySection = filterSections.find((section) => section.id === 'memory');

  return (
    <div className="flex flex-col space-y-2">
      <Radio.Group
        value={selectedMemory}
        onChange={(e) => onMemorySelect(e.target.value)}
        className="flex flex-col space-y-2"
      >
        {memorySection?.items?.map((item) => (
          <Radio key={item.id} value={item.id}>
            <span className="text-sm text-gray-600">{item.name}</span>
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default MemoryFilter;
